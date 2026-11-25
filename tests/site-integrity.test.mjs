import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

function publicFileExists(webPath) {
  if (!webPath || !webPath.startsWith("/")) return true;
  const rel = webPath.replace(/^\/+/, "");
  const full = path.join(PUBLIC_DIR, rel);
  return fs.existsSync(full) && fs.statSync(full).isFile();
}

test("data.ts references only existing public assets and omits removed projects", () => {
  const dataSource = fs.readFileSync(path.join(ROOT, "src", "lib", "data.ts"), "utf8");
  assert.equal(/ailarm|hirepriority/i.test(dataSource), false, "Removed project references must not exist in data.ts");

  const assetPaths = new Set();
  for (const match of dataSource.matchAll(/(?:image|logo):\s*"([^"]+)"/g)) {
    assetPaths.add(match[1]);
  }
  for (const block of dataSource.matchAll(/screenshots:\s*\[([\s\S]*?)\]/g)) {
    for (const item of block[1].matchAll(/"([^"]+)"/g)) {
      assetPaths.add(item[1]);
    }
  }

  assert.ok(assetPaths.size > 0, "Expected at least one local asset path in data.ts");
  for (const assetPath of assetPaths) {
    assert.ok(publicFileExists(assetPath), `Missing public asset referenced in data.ts: ${assetPath}`);
  }
});

test("every blog MDX file has valid slug, metadata, and existing local images", () => {
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
  assert.ok(files.length > 0, "Expected blog MDX files");

  let aeoPillarCount = 0;

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    assert.match(slug, /^[a-z0-9-]+$/, `Invalid blog slug format: ${slug}`);

    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);

    assert.equal(typeof data.title, "string", `${file} is missing a string title`);
    assert.ok(data.title.trim().length > 0, `${file} has an empty title`);

    const dateVal = data.publishedAt ?? data.date;
    assert.equal(typeof dateVal, "string", `${file} is missing publishedAt/date`);
    assert.ok(!Number.isNaN(new Date(dateVal).getTime()), `${file} has invalid date: ${dateVal}`);

    if (Array.isArray(data.keyTakeaways) && data.keyTakeaways.length > 0 && Array.isArray(data.faq) && data.faq.length > 0) {
      for (const item of data.faq) {
        assert.equal(typeof item.question, "string", `${file} faq entry missing question`);
        assert.equal(typeof item.answer, "string", `${file} faq entry missing answer`);
        assert.ok(item.question.trim().length > 0 && item.answer.trim().length > 0, `${file} has empty faq fields`);
      }
      aeoPillarCount += 1;
    }

    const cover = data.image ?? data.cover;
    if (typeof cover === "string" && cover.startsWith("/")) {
      assert.ok(publicFileExists(cover), `${file} references missing cover image: ${cover}`);
    }

    for (const match of content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)) {
      assert.ok(publicFileExists(match[1]), `${file} references missing markdown image: ${match[1]}`);
    }
    for (const match of content.matchAll(/src=["'](\/[^"']+)["']/g)) {
      assert.ok(publicFileExists(match[1]), `${file} references missing JSX image: ${match[1]}`);
    }
  }

  assert.ok(aeoPillarCount >= 10, `Expected >= 10 pillar posts with keyTakeaways + faq, found ${aeoPillarCount}`);
});

test("security headers, contact API, analytics CSP, and hardened blog/RSS configuration are in place", () => {
  const nextConfig = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
  for (const token of [
    "Content-Security-Policy",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "va.vercel-scripts.com",
    "vitals.vercel-insights.com",
  ]) {
    assert.ok(nextConfig.includes(token), `next.config.ts must include ${token}`);
  }

  const contactRoute = fs.readFileSync(path.join(ROOT, "src", "app", "api", "contact", "route.ts"), "utf8");
  assert.ok(contactRoute.includes("rateLimit"), "contact route must apply rateLimit");
  assert.ok(contactRoute.includes("website"), "contact route must check honeypot field");

  const blogLib = fs.readFileSync(path.join(ROOT, "src", "lib", "blog.ts"), "utf8");
  assert.ok(blogLib.includes("remark-gfm"), "src/lib/blog.ts must enable remark-gfm");
  assert.ok(blogLib.includes("isValidSlug"), "src/lib/blog.ts must validate slugs with isValidSlug");

  const feedRoute = fs.readFileSync(path.join(ROOT, "src", "app", "blog", "feed.xml", "route.ts"), "utf8");
  assert.ok(feedRoute.includes("siteConfig.url"), "feed.xml must use canonical siteConfig.url");
  assert.equal(feedRoute.includes('get("host")'), false, "feed.xml must not trust Host header");
  assert.equal(feedRoute.includes("x-forwarded-proto"), false, "feed.xml must not trust x-forwarded-proto header");
});
