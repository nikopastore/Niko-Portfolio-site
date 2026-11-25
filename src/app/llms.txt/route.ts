import { getPosts } from "@/lib/blog";
import { projects, siteConfig, training } from "@/lib/data";

export async function GET() {
  const posts = await getPosts();
  const visibleTraining = training.filter(
    (item) => siteConfig.enableTraining && (item.iconStyle !== "discord" || siteConfig.enableDiscord)
  );
  const lines = [
    "# Niko Pastore",
    "",
    "Data engineer and AI product builder writing high-intent field notes on AI agents, data engineering, automation, and production software.",
    "",
    "## Core pages",
    `- [Home](${siteConfig.url}): Portfolio, projects, apps, experience, and contact links.`,
    `- [Blog](${siteConfig.url}/blog): Practical AI systems and data engineering posts.`,
    `- [RSS](${siteConfig.url}/blog/feed.xml): Subscribe to new posts.`,
    "",
    "## Selected Projects",
    ...projects.map((project) => {
      const target = project.url ?? siteConfig.url;
      const summary = project.metrics ? `${project.description} (${project.metrics})` : project.description;
      return `- [${project.name}](${target}) (${project.category}): ${summary}`;
    }),
    "",
    ...(visibleTraining.length > 0
      ? [
          "## Teaching & Resources",
          ...visibleTraining.map((item) => {
            const target = item.url
              ? item.url.startsWith("/")
                ? `${siteConfig.url}${item.url}`
                : item.url
              : siteConfig.url;
            return `- [${item.name}](${target}) (${item.category}): ${item.description}`;
          }),
          "",
        ]
      : []),
    "## Blog posts",
    ...posts.map(
      (post) =>
        `- [${post.frontmatter.title}](${siteConfig.url}/blog/${post.slug}): ${post.frontmatter.excerpt} Tags: ${post.frontmatter.tags.join(", ")}.`
    ),
    "",
    `## Social`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    `- X: ${siteConfig.twitter}`,
    `- GitHub: ${siteConfig.github}`,
    ...(siteConfig.enableDiscord ? [`- Discord: ${siteConfig.discord}`] : []),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
      "x-robots-tag": "noindex, follow",
    },
  });
}
