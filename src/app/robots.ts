import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "CCBot",
          "Google-Extended",
          "Applebot-Extended",
          "Bytespider",
        ],
        disallow: "/",
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "Claude-Code",
          "PerplexityBot",
          "Perplexity-User",
          "YouBot",
          "DuckAssistBot",
          "Googlebot",
          "Bingbot",
        ],
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
