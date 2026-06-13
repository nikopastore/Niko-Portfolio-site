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

function TrainingCard({ item, featured = false }: { item: Training; featured?: boolean }) {
  const isComingSoon = !item.url;
  const secondaryLink = !isComingSoon && item.caseStudyUrl ? item.caseStudyUrl : null;
  const secondaryCta = item.caseStudyCta ?? "Read the case study";

  return (
    <article
      className={
        featured
          ? "relative overflow-hidden rounded-3xl border border-card-border bg-card/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:p-10"
          : "flex h-full flex-col gap-5 rounded-2xl border border-card-border bg-card/70 p-7 transition-all hover:border-foreground/40"
      }
    >
      {featured ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,90,61,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(62,94,58,0.14),transparent_32%)]" />
      ) : null}

      <div className={featured ? "relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center" : "relative flex h-full flex-col gap-5"}>
        <div className={featured ? "rounded-2xl border border-card-border bg-background/45 p-5" : "flex items-start justify-between gap-4"}>
          {featured ? (
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-card-border bg-card/80 p-4">
                <span className="text-xs uppercase tracking-[0.25em] text-muted">Courses</span>
                <strong className="mt-2 block font-[family-name:var(--font-space-grotesk)] text-3xl">60</strong>
              </div>
              <div className="rounded-2xl border border-card-border bg-card/80 p-4">
                <span className="text-xs uppercase tracking-[0.25em] text-muted">Tests</span>
                <strong className="mt-2 block font-[family-name:var(--font-space-grotesk)] text-3xl">74</strong>
              </div>
              <div className="rounded-2xl border border-card-border bg-card/80 p-4">
                <span className="text-xs uppercase tracking-[0.25em] text-muted">Stack</span>
                <strong className="mt-2 block font-[family-name:var(--font-space-grotesk)] text-3xl">JS</strong>
              </div>
            </div>
          ) : (
            <>
              <TrainingIcon item={item} />
              <span className="rounded-full border border-card-border bg-background/40 px-3 py-1 text-xs uppercase tracking-wider text-muted">
                {item.category}
              </span>
            </>
          )}
        </div>

        <div className={featured ? "relative" : "relative flex h-full flex-col gap-5"}>
          <div className="flex flex-wrap items-center gap-3">
            {featured ? <TrainingIcon item={item} /> : null}
            <span className="rounded-full border border-card-border bg-background/40 px-3 py-1 text-xs uppercase tracking-wider text-muted">
              {featured ? "Featured AI training project" : item.category}
            </span>
          </div>

          <div>
            <h3 className={`font-[family-name:var(--font-space-grotesk)] font-bold leading-tight ${featured ? "mt-5 text-3xl md:text-5xl" : "text-2xl"}`}>
              {item.name}
            </h3>
            <p className={`mt-3 leading-relaxed text-foreground/70 ${featured ? "text-base md:text-lg" : "text-sm"}`}>
              {item.description}
            </p>
          </div>

          {item.bullets.length > 0 ? (
            <ul className={`space-y-2 text-foreground/75 ${featured ? "mt-5 text-sm md:text-base" : "text-sm"}`}>
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
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {item.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {secondaryLink ? (
              <a
                href={secondaryLink}
                className="inline-flex items-center gap-2 rounded-full border border-card-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/50 hover:text-foreground"
              >
                {secondaryCta}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TrainingSection({ items }: TrainingSectionProps) {
  if (!siteConfig.enableTraining || items.length === 0) return null;

  const visibleItems = items.filter((item) => {
    if (item.iconStyle === "discord" && !siteConfig.enableDiscord) return false;
    return true;
  });

  if (visibleItems.length === 0) return null;

  const featuredItem = visibleItems.find((item) => item.id === "ai-training-hub") ?? visibleItems[0];
  const supportingItems = visibleItems.filter((item) => item.id !== featuredItem.id);

  return (
    <section id="teach" className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm text-muted tracking-[0.3em]">TEACH</span>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold tracking-tight">
              Where I share the systems behind the projects.
            </h2>
          </div>
          <p className="max-w-md text-base text-foreground/70">
            Start with the AI Training Hub itself, then read the build notes and field notes behind the work.
          </p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <TrainingCard item={featuredItem} featured />
          </motion.div>

          {supportingItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {supportingItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.05 }}
                >
                  <TrainingCard item={item} />
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
