"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SocialIcon } from "@/components/SocialIcons";
import { siteConfig, type Training } from "@/lib/data";

interface TrainingSectionProps {
  items: Training[];
}

function TrainingIcon({ item }: { item: Training }) {
  if (item.iconStyle === "discord") {
    return (
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-card-border bg-background/50">
        <SocialIcon platform="discord" className="h-6 w-6" />
      </span>
    );
  }
  if (item.iconStyle === "whop") {
    return (
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-card-border bg-background/50">
        <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold tracking-tight">
          whop
        </span>
      </span>
    );
  }
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-card-border bg-background/50 font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
      {item.iconInitials ?? "AI"}
    </span>
  );
}

export default function TrainingSection({ items }: TrainingSectionProps) {
  if (!siteConfig.enableTraining || items.length === 0) return null;

  const visibleItems = items.filter((item) => {
    if (item.iconStyle === "discord" && !siteConfig.enableDiscord) return false;
    return true;
  });

  if (visibleItems.length === 0) return null;

  return (
    <section id="teach" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm text-muted tracking-[0.3em]">TEACH</span>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold tracking-tight">
              Where I share the systems behind the projects.
            </h2>
          </div>
          <p className="max-w-md text-base text-foreground/70">
            I document what works, what doesn&apos;t, and the implementation details most
            tutorials skip. Free for builders, deeper for serious students.
          </p>
        </div>

        <div
          className={
            visibleItems.length === 1
              ? "grid grid-cols-1"
              : "grid gap-6 md:grid-cols-2"
          }
        >
          {visibleItems.map((item, index) => {
            const isComingSoon = !item.url;
            const Wrapper = isComingSoon ? "div" : "a";
            const wrapperProps = isComingSoon
              ? {}
              : {
                  href: item.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                };
            const secondaryLink =
              !isComingSoon && item.caseStudyUrl ? item.caseStudyUrl : null;
            const secondaryCta = item.caseStudyCta ?? "Read the case study";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Wrapper
                  {...(wrapperProps as Record<string, string>)}
                  className="group flex h-full flex-col gap-5 rounded-2xl border border-card-border bg-card/70 p-7 transition-all hover:border-foreground/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <TrainingIcon item={item} />
                    <span className="rounded-full border border-card-border bg-background/40 px-3 py-1 text-xs uppercase tracking-wider text-muted">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold leading-tight">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {item.description}
                    </p>
                  </div>

                  {item.bullets.length > 0 ? (
                    <ul className="space-y-2 text-sm text-foreground/75">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                    {isComingSoon ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-card-border px-4 py-2 text-sm font-medium text-muted">
                        Coming soon
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity group-hover:opacity-90">
                        {item.cta}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    )}
                    {secondaryLink ? (
                      <a
                        href={secondaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-card-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/50 hover:text-foreground"
                      >
                        {secondaryCta}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
