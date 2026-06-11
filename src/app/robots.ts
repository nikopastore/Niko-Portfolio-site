import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["GPTBot", "ClaudeBot", "CCBot", "Google-Extended", "Applebot-Extended", "Bytespider"],
        disallow: "/",
      },
      {
        userAgent: ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Googlebot", "Bingbot"],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
