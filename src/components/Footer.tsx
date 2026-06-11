"use client";

import { SocialLogoButton } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-card-border px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted">
            &copy; {currentYear} Niko Pastore. Built with Next.js.
          </p>
          <p className="mt-1 text-sm text-muted">
            AI agents, data engineering, and production automation notes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SocialLogoButton platform="linkedin" href={siteConfig.linkedin} />
          <SocialLogoButton platform="x" href={siteConfig.twitter} />
          <SocialLogoButton platform="github" href={siteConfig.github} />
          <SocialLogoButton platform="discord" href={siteConfig.discord} />
          <SocialLogoButton platform="rss" href="/blog/feed.xml" label="RSS feed" />
        </div>
      </div>
    </footer>
  );
}
