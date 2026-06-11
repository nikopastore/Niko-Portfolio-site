import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.updatedAt ?? post.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
