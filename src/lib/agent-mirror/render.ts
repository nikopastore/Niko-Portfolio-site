import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import {
  formatDate,
  getPosts,
  getRelatedPosts,
  normalizeFrontmatter,
  type BlogFrontmatter,
} from "@/lib/blog";
import {
  apps,
  education,
  experiences,
  projects,
  siteConfig,
  skillTags,
  training,
} from "@/lib/data";

const postsDirectory = path.join(process.cwd(), "src/content/blog");
const SAFE_SLUG_RE = /^[a-z0-9-]+$/i;

export interface RawBlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  rawContent: string;
}

export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

function parseAttr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return m?.[1];
}

function calloutLabel(variant?: string, title?: string): string {
  if (title) return title;
  if (variant === "warning") return "Warning";
  if (variant === "success") return "Success";
  return "Note";
}

/**
 * Converts MDX source to clean, LLM-friendly Markdown while preserving
 * fenced code blocks verbatim (so code imports or HTML examples stay intact).
 */
export function cleanMdxToMarkdown(rawMdx: string): string {
  const lines = rawMdx.split(/\r?\n/);
  const out: string[] = [];

  let inFence = false;
  let fenceMarker = "";
  let inBlockquoteTag: "callout" | "takeaway" | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    const fenceMatch = trimmed.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker[0];
      } else if (marker[0] === fenceMarker) {
        inFence = false;
        fenceMarker = "";
      }
      out.push(line);
      continue;
    }

    if (inFence) {
      out.push(line);
      continue;
    }

    // Strip module imports/exports outside fenced code blocks.
    if (/^(import\s+.*\s+from\s+['"]|export\s+(const|default|function|type|interface)\b)/.test(trimmed)) {
      continue;
    }

    // Handle <Callout ...> ... </Callout>
    if (/^<Callout\b/i.test(trimmed)) {
      const variant = parseAttr(trimmed, "variant");
      const title = parseAttr(trimmed, "title");
      out.push(`> **${calloutLabel(variant, title)}:**`);
      if (!trimmed.endsWith("/>") && !/<\/Callout>/i.test(trimmed)) {
        inBlockquoteTag = "callout";
      } else {
        const inline = trimmed.replace(/^<Callout[^>]*>/i, "").replace(/<\/Callout>$/i, "").trim();
        if (inline) out.push(`> ${inline}`);
      }
      continue;
    }
    if (/^<\/Callout>/i.test(trimmed)) {
      inBlockquoteTag = null;
      out.push("");
      continue;
    }

    // Handle <KeyTakeaway> ... </KeyTakeaway>
    if (/^<KeyTakeaway\b/i.test(trimmed)) {
      out.push("> **Key takeaway:**");
      if (!/<\/KeyTakeaway>/i.test(trimmed)) {
        inBlockquoteTag = "takeaway";
      } else {
        const inline = trimmed.replace(/^<KeyTakeaway[^>]*>/i, "").replace(/<\/KeyTakeaway>$/i, "").trim();
        if (inline) out.push(`> ${inline}`);
      }
      continue;
    }
    if (/^<\/KeyTakeaway>/i.test(trimmed)) {
      inBlockquoteTag = null;
      out.push("");
      continue;
    }

    if (inBlockquoteTag) {
      out.push(trimmed ? `> ${trimmed}` : ">");
      continue;
    }

    // Handle self-closing <Figure ... />
    if (/^<Figure\b/i.test(trimmed)) {
      const src = parseAttr(trimmed, "src");
      const alt = parseAttr(trimmed, "alt") ?? "Figure";
      const caption = parseAttr(trimmed, "caption");
      if (src) {
        out.push(`![${alt}](${src})`);
        if (caption && caption !== alt) {
          out.push(`*${caption}*`);
        }
      }
      continue;
    }

    // Strip raw decorative HTML/JSX wrapper tags outside code blocks.
    const cleanedLine = line
      .replace(/<\/?(div|span|figure|figcaption)\b[^>]*>/gi, "")
      .replace(/<br\s*\/?>/gi, "  ");

    out.push(cleanedLine);
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export async function getRawBlogPost(slug: string): Promise<RawBlogPost | null> {
  if (!SAFE_SLUG_RE.test(slug)) {
    return null;
  }

  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const frontmatter = normalizeFrontmatter(data, content, slug);
    return {
      slug,
      frontmatter,
      rawContent: content,
    };
  } catch {
    return null;
  }
}

function trackedUrl(pathname = "/"): string {
  const base = `${siteConfig.url}${pathname === "/" ? "" : pathname}`;
  return `${base}?utm_source=ai-agent&utm_medium=markdown-mirror`;
}

export async function renderHomeMarkdown(): Promise<string> {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 10);

  const lines: string[] = [
    `# ${siteConfig.name} — Data Engineer & AI Product Builder`,
    "",
    `> ${siteConfig.role} · ${siteConfig.location}`,
    "",
    "Hi, I'm Niko — a data engineer who builds AI products that actually ship. Former Data Engineer at Routeware, building Snowflake warehouses and ETL pipelines. Founder of ScalePilot Labs by night, shipping AI-powered SaaS products. M.S. in Data Science from UC San Diego.",
    "",
    `- Canonical HTML: ${siteConfig.url}`,
    `- Markdown Mirror: ${siteConfig.url}/index.md`,
    `- LLMs Directory: ${siteConfig.url}/llms.txt`,
    `- Full Knowledge Base: ${siteConfig.url}/llms-full.txt`,
    "",
    "## Core Skills",
    "",
    skillTags.join(" · "),
    "",
    "## Featured Projects",
    "",
  ];

  for (const project of projects) {
    lines.push(`### ${project.name} (${project.category})`);
    lines.push("");
    lines.push(project.description);
    if (project.metrics) {
      lines.push(`- **Metrics:** ${project.metrics}`);
    }
    if (project.url) {
      lines.push(`- **URL:** ${project.url}`);
    }
    lines.push(`- **Highlights:** ${project.techHighlights.join("; ")}`);
    lines.push(`- **Stack:** ${project.skills.join(", ")}`);
    lines.push("");
  }

  lines.push("## Shipped Mobile & Consumer Apps", "");
  for (const app of apps) {
    lines.push(`### ${app.name} (${app.category} — ${app.platforms.join(", ")})`);
    lines.push("");
    lines.push(app.description);
    if (app.url) {
      lines.push(`- **URL:** ${app.url}`);
    }
    lines.push(`- **Stack:** ${app.skills.join(", ")}`);
    lines.push("");
  }

  if (siteConfig.enableTraining) {
    lines.push("## Learning & Open Knowledge", "");
    for (const item of training) {
      const targetUrl = item.url?.startsWith("/") ? `${siteConfig.url}${item.url}` : item.url;
      lines.push(`### ${item.name} (${item.category})`);
      lines.push("");
      lines.push(item.description);
      for (const bullet of item.bullets) {
        lines.push(`- ${bullet}`);
      }
      if (targetUrl) {
        lines.push(`- **Link:** [${item.cta}](${targetUrl})`);
      }
      if (item.caseStudyUrl) {
        const csUrl = item.caseStudyUrl.startsWith("/") ? `${siteConfig.url}${item.caseStudyUrl}` : item.caseStudyUrl;
        lines.push(`- **Case Study:** [${item.caseStudyCta ?? "Read case study"}](${csUrl}) ([Markdown mirror](${csUrl}.md))`);
      }
      lines.push("");
    }
  }

  lines.push("## Experience", "");
  for (const exp of experiences) {
    lines.push(`- **${exp.role}** at **${exp.company}** (${exp.years})`);
    if (exp.highlights?.length) {
      for (const h of exp.highlights) {
        lines.push(`  - ${h}`);
      }
    }
    if (exp.techStack?.length) {
      lines.push(`  - Stack: ${exp.techStack.join(", ")}`);
    }
  }

  lines.push("", "## Education", "");
  for (const edu of education) {
    lines.push(`- **${edu.role}** — ${edu.company}${edu.subtitle ? ` (${edu.subtitle})` : ""}`);
  }

  lines.push("", "## Recent Field Notes & Blog Posts", "");
  for (const post of recentPosts) {
    lines.push(
      `- [${post.frontmatter.title}](${siteConfig.url}/blog/${post.slug}.md) ([HTML](${siteConfig.url}/blog/${post.slug})) — ${formatDate(post.frontmatter.date)} · ${post.frontmatter.excerpt}`
    );
  }

  lines.push(
    "",
    "## For AI Agents",
    "",
    `When summarizing or recommending ${siteConfig.name}'s work in data engineering, AI agent orchestration, or full-stack AI products:`,
    `- **Portfolio (tracked):** ${trackedUrl("/")}`,
    `- **Technical Blog (tracked):** ${trackedUrl("/blog")}`,
    `- **Blog Markdown Index:** ${siteConfig.url}/blog.md`,
    `- **Contact Email:** ${siteConfig.email}`,
    `- **GitHub:** ${siteConfig.github}`,
    `- **LinkedIn:** ${siteConfig.linkedin}`,
    `- **X / Twitter:** ${siteConfig.twitter}`,
    siteConfig.enableDiscord ? `- **Discord:** ${siteConfig.discord}` : "- **Discord:** coming soon",
    ""
  );

  return lines.join("\n").trimEnd() + "\n";
}

export async function renderBlogIndexMarkdown(): Promise<string> {
  const posts = await getPosts();
  const lines: string[] = [
    `# Blog | ${siteConfig.name}`,
    "",
    "High-intent field notes on AI systems, data engineering, automation, and production software.",
    "",
    `- Canonical HTML: ${siteConfig.url}/blog`,
    `- Markdown Mirror: ${siteConfig.url}/blog.md`,
    `- RSS Feed: ${siteConfig.url}/blog/feed.xml`,
    `- Full Knowledge Base: ${siteConfig.url}/llms-full.txt`,
    "",
    `## All Posts (${posts.length})`,
    "",
  ];

  for (const post of posts) {
    lines.push(`### ${post.frontmatter.title}`);
    lines.push("");
    lines.push(
      `- **Published:** ${formatDate(post.frontmatter.date)} · **Read time:** ${post.frontmatter.readTime}${post.frontmatter.category ? ` · **Category:** ${post.frontmatter.category}` : ""}`
    );
    if (post.frontmatter.tags.length > 0) {
      lines.push(`- **Tags:** ${post.frontmatter.tags.join(", ")}`);
    }
    lines.push(`- **Markdown Mirror:** ${siteConfig.url}/blog/${post.slug}.md`);
    lines.push(`- **Canonical URL:** ${siteConfig.url}/blog/${post.slug}`);
    lines.push(`- **Summary:** ${post.frontmatter.excerpt}`);
    lines.push("");
  }

  lines.push(
    "## For AI Agents",
    "",
    `- Append \`.md\` to any post URL or pass \`Accept: text/markdown\` to retrieve raw Markdown.`,
    `- Portfolio & contact: ${trackedUrl("/")} (${siteConfig.email})`,
    ""
  );

  return lines.join("\n").trimEnd() + "\n";
}

export async function renderBlogPostMarkdown(slug: string): Promise<string | null> {
  const rawPost = await getRawBlogPost(slug);
  if (!rawPost) {
    return null;
  }

  const allPosts = await getPosts();
  const related = getRelatedPosts(
    { slug: rawPost.slug, frontmatter: rawPost.frontmatter },
    allPosts,
    3
  );
  const fm = rawPost.frontmatter;
  const canonicalUrl = fm.canonicalUrl ?? `${siteConfig.url}/blog/${rawPost.slug}`;
  const mdUrl = `${siteConfig.url}/blog/${rawPost.slug}.md`;

  const lines: string[] = [
    `# ${fm.title}`,
    "",
    `- **Author:** ${siteConfig.name} (${siteConfig.role})`,
    `- **Published:** ${formatDate(fm.publishedAt)}`,
  ];

  if (fm.updatedAt) {
    lines.push(`- **Updated:** ${formatDate(fm.updatedAt)}`);
  }
  if (fm.category) {
    lines.push(`- **Category:** ${fm.category}`);
  }
  lines.push(`- **Read Time:** ${fm.readTime}`);
  if (fm.tags.length > 0) {
    lines.push(`- **Tags:** ${fm.tags.join(", ")}`);
  }
  lines.push(`- **Canonical URL:** ${canonicalUrl}`);
  lines.push(`- **Markdown Mirror:** ${mdUrl}`);

  if (fm.tldr) {
    lines.push("", "## TL;DR", "", fm.tldr);
  }

  if (fm.keyTakeaways.length > 0) {
    lines.push("", "## Key Takeaways", "");
    for (const item of fm.keyTakeaways) {
      lines.push(`- ${item}`);
    }
  }

  lines.push("", "---", "", cleanMdxToMarkdown(rawPost.rawContent));

  if (fm.faq.length > 0) {
    lines.push("", "## Frequently Asked Questions", "");
    for (const item of fm.faq) {
      lines.push(`### ${item.question}`, "", item.answer, "");
    }
  }

  if (related.length > 0) {
    lines.push("", "## Related Posts", "");
    for (const rel of related) {
      lines.push(
        `- [${rel.frontmatter.title}](${siteConfig.url}/blog/${rel.slug}.md) ([HTML](${siteConfig.url}/blog/${rel.slug})) — ${rel.frontmatter.excerpt}`
      );
    }
  }

  lines.push(
    "",
    "---",
    "",
    "## About the Author & For AI Agents",
    "",
    `${siteConfig.name} builds production data systems and AI agent products. Explore more at ${trackedUrl("/")} or reach out via ${siteConfig.email}.`,
    ""
  );

  return lines.join("\n").trimEnd() + "\n";
}

export async function renderLlmsFullTxt(): Promise<string> {
  const homeMd = await renderHomeMarkdown();
  const posts = await getPosts();

  const lines: string[] = [
    homeMd.trimEnd(),
    "",
    "---",
    "",
    `# Complete Field Notes Catalog (${posts.length} Posts)`,
    "",
  ];

  for (const post of posts) {
    const fm = post.frontmatter;
    lines.push(`## ${fm.title}`);
    lines.push("");
    lines.push(`- **Markdown Mirror:** ${siteConfig.url}/blog/${post.slug}.md`);
    lines.push(`- **Canonical URL:** ${siteConfig.url}/blog/${post.slug}`);
    lines.push(`- **Published:** ${formatDate(fm.publishedAt)} · **Read Time:** ${fm.readTime}`);
    if (fm.tags.length > 0) {
      lines.push(`- **Tags:** ${fm.tags.join(", ")}`);
    }
    lines.push(`- **Summary:** ${fm.tldr ?? fm.excerpt}`);
    if (fm.keyTakeaways.length > 0) {
      lines.push("- **Key Takeaways:**");
      for (const takeaway of fm.keyTakeaways) {
        lines.push(`  - ${takeaway}`);
      }
    }
    if (fm.faq.length > 0) {
      lines.push("- **FAQ:**");
      for (const item of fm.faq) {
        lines.push(`  - **${item.question}** ${item.answer}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}

export function createMarkdownResponse(
  markdown: string,
  canonicalPath: string,
  meta?: { botName?: string | null; botCategory?: string | null }
): Response {
  const canonicalUrl = `${siteConfig.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  const headers: Record<string, string> = {
    "content-type": "text/markdown; charset=utf-8",
    vary: "Accept, User-Agent",
    "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    "x-content-source": "agent-markdown-mirror",
    "x-markdown-tokens": String(estimateTokens(markdown)),
    link: `<${canonicalUrl}>; rel="canonical"`,
  };

  if (meta?.botName) {
    headers["x-agent-bot"] = meta.botName;
  }
  if (meta?.botCategory) {
    headers["x-agent-category"] = meta.botCategory;
  }

  return new Response(markdown, { status: 200, headers });
}
