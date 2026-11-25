import { getPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/data";

export async function GET() {
  const posts = await getPosts();
  const lines = [
    "# Niko Pastore",
    "",
    "Data engineer and AI product builder writing high-intent field notes on AI agents, data engineering, automation, and production software.",
    "",
    "## Markdown Mirror & Content Negotiation",
    "- Every core portfolio and blog route supports `Accept: text/markdown` content negotiation.",
    `- [Home Markdown Mirror](${siteConfig.url}/index.md): Clean Markdown representation of portfolio, projects, apps, and experience.`,
    `- [Blog Index Markdown](${siteConfig.url}/blog.md): Markdown index of all published field notes.`,
    `- [Full Knowledge Base (llms-full.txt)](${siteConfig.url}/llms-full.txt): Single-file portfolio + full post summaries, key takeaways, and FAQs.`,
    "",
    "## Core pages",
    `- [Home](${siteConfig.url}) ([.md](${siteConfig.url}/index.md)): Portfolio, projects, apps, experience, and contact links.`,
    `- [Blog](${siteConfig.url}/blog) ([.md](${siteConfig.url}/blog.md)): Practical AI systems and data engineering posts.`,
    `- [RSS](${siteConfig.url}/blog/feed.xml): Subscribe to new posts.`,
    "",
    "## Blog posts",
    ...posts.map(
      (post) =>
        `- [${post.frontmatter.title}](${siteConfig.url}/blog/${post.slug}.md) ([HTML](${siteConfig.url}/blog/${post.slug})): ${post.frontmatter.excerpt} Tags: ${post.frontmatter.tags.join(", ")}.`
    ),
    "",
    `## Social`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    `- X: ${siteConfig.twitter}`,
    `- GitHub: ${siteConfig.github}`,
    siteConfig.enableDiscord ? `- Discord: ${siteConfig.discord}` : "- Discord: coming soon",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
