import { siteConfig } from "@/lib/data";
import type { BlogPost } from "@/lib/blog";

export function BlogJsonLd({ post }: { post: BlogPost }) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const image = post.frontmatter.image
    ? new URL(post.frontmatter.image, siteConfig.url).toString()
    : `${siteConfig.url}/niko-photo.jpg`;

  const blogPostingNode = {
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

  const jsonLd =
    post.frontmatter.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": [
            blogPostingNode,
            {
              "@type": "FAQPage",
              mainEntity: post.frontmatter.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ],
        }
      : {
          "@context": "https://schema.org",
          ...blogPostingNode,
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
