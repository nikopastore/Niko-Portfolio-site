"use client";

import { ArrowUpRight, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/components/Toast";
import { SocialIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    showToast("Email copied to clipboard!");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={copyEmail}
            className="text-sm text-muted hover:text-foreground transition-colors hidden lg:block cursor-pointer"
          >
            {siteConfig.email}
          </button>

          <Link href="/" className="flex flex-col items-start lg:items-center text-left lg:text-center">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium tracking-wide">
                {siteConfig.role}
              </span>
            </div>
            <span className="text-xs text-muted tracking-wider">
              {siteConfig.location}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <a
              href={siteConfig.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-card-border px-3 py-2 text-sm text-muted transition hover:text-foreground hover:border-foreground/40"
            >
              <SocialIcon platform="discord" />
              Discord
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-card-border text-muted transition hover:text-foreground hover:border-foreground/40"
            >
              <SocialIcon platform="linkedin" />
            </a>
            <a
              href={siteConfig.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-card-border text-muted transition hover:text-foreground hover:border-foreground/40"
            >
              <SocialIcon platform="x" />
            </a>
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full border border-card-border",
                "hover:bg-card transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-foreground/20"
              )}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
