"use client";

import { useState } from "react";
import { SocialIcon, type SocialPlatform } from "@/components/SocialIcons";

function shareUrl(platform: SocialPlatform, url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  switch (platform) {
    case "x":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "hackernews":
      return `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`;
    case "discord":
      return `https://discord.com/channels/@me`;
    default:
      return url;
  }
}

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const buttons: Array<{ platform: SocialPlatform; label: string }> = [
    { platform: "linkedin", label: "Share on LinkedIn" },
    { platform: "x", label: "Share on X" },
    { platform: "hackernews", label: "Submit to Hacker News" },
  ];

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="rounded-2xl border border-card-border bg-card/50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">Share / Save</p>
          <p className="text-sm text-foreground/70">Send this to your team or save it for later.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {buttons.map((button) => (
            <a
              key={button.platform}
              href={shareUrl(button.platform, url, title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={button.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-background text-foreground/75 transition hover:border-foreground/40 hover:text-foreground"
            >
              <SocialIcon platform={button.platform} />
            </a>
          ))}
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-card-border bg-background px-4 text-sm text-foreground/75 transition hover:border-foreground/40 hover:text-foreground"
          >
            <SocialIcon platform="copy" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
