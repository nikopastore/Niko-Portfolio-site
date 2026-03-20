import { headers } from "next/headers";
import { siteConfig } from "@/lib/data";
import { getPosts } from "@/lib/blog";

export const runtime = "nodejs";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPosts();
  const headersList = headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${protocol}://${host}`;

  const items = posts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      return `\n    <item>\n      <title>${escapeXml(
        post.frontmatter.title
      )}</title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${new Date(
        post.frontmatter.date
      ).toUTCString()}</pubDate>\n      <description>${escapeXml(
        post.frontmatter.excerpt
      )}</description>\n    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${escapeXml(
      siteConfig.name
    )} Blog</title>\n    <link>${baseUrl}/blog</link>\n    <description>${escapeXml(
      "Practical lessons from building AI-powered products."
    )}</description>\n    <language>en-us</language>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}\n  </channel>\n</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
