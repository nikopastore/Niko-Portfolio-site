"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useToast } from "@/components/Toast";
import { SocialIcon, type SocialPlatform } from "@/components/SocialIcons";

const socialsBase: Array<{ name: string; url: string; platform: SocialPlatform }> = [
  { name: "GitHub", url: siteConfig.github, platform: "github" },
  { name: "LinkedIn", url: siteConfig.linkedin, platform: "linkedin" },
  { name: "X", url: siteConfig.twitter, platform: "x" },
];

const discordSocial: { name: string; url: string; platform: SocialPlatform } = {
  name: "Discord",
  url: siteConfig.discord,
  platform: "discord",
};

const socials = siteConfig.enableDiscord
  ? [...socialsBase, discordSocial]
  : socialsBase;

function PhoenixClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "America/Phoenix",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-muted text-sm font-[family-name:var(--font-space-mono)] tabular-nums">
      {time ? `${time} MST` : "MST"}
    </span>
  );
}

export default function Contact() {
  const { showToast } = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      showToast("Email copied to clipboard!");
    } catch {
      showToast(`Email: ${siteConfig.email}`);
    }
  };

  return (
    <section id="contact" className="py-16 px-6 border-t border-card-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-bold tracking-wide">
            LET&apos;S GET IN TOUCH
          </h2>

          <div className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border border-card-border rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-200"
              >
                <SocialIcon platform={social.platform} />
                {social.name}
              </a>
            ))}
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-2 border border-card-border rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              Copy Email
            </button>
          </div>

          <PhoenixClock />
        </div>
      </div>
    </section>
  );
}
