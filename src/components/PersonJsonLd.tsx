import { siteConfig } from "@/lib/data";

/**
 * Person JSON-LD for the homepage. Identity fields are aligned with
 * /llms.txt (Niko Pastore, data engineer & AI product builder) and the
 * social links exposed there (LinkedIn, X, GitHub).
 */
export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Data Engineer & AI Product Builder",
    description:
      "Data engineer and AI product builder writing high-intent field notes on AI agents, data engineering, automation, and production software.",
    url: siteConfig.url,
    sameAs: [siteConfig.linkedin, siteConfig.twitter, siteConfig.github],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}