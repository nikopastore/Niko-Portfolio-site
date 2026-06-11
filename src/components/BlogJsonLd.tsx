import { siteConfig } from "@/lib/data";
import type { BlogPost } from "@/lib/blog";

export function BlogJsonLd({ post }: { post: BlogPost }) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const image = post.frontmatter.image
    ? new URL(post.frontmatter.image, siteConfig.url).toString()
    : `${siteConfig.url}/og-image.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image: [image],
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updatedAt ?? post.frontmatter.date,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [siteConfig.linkedin, siteConfig.github, siteConfig.twitter],
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: post.frontmatter.tags.join(", "),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article [data-key-takeaways]"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
