import type { ReactNode } from "react";
import type { BlogPost } from "@/lib/blog";

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-card-border bg-background/50 px-3 py-1 text-xs text-muted">
      {children}
    </span>
  );
}

export default function AutoPostDiagrams({ post }: { post: BlogPost }) {
  const tags = post.frontmatter.tags.slice(0, 4);
  const steps = [
    "Question",
    "Evidence",
    "Implementation",
    "Reusable answer",
  ];
  const loop = [
    "Publish field note",
    "Clip social posts",
    "Discuss in Discord",
    "Refresh with proof",
  ];

  return (
    <section aria-label="Post diagrams" className="my-10 grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border border-card-border bg-card/60 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">Answer map</p>
          <div className="flex flex-wrap justify-end gap-2">
            {tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
        </div>
        <h2 className="mt-4 text-xl font-[family-name:var(--font-space-grotesk)] font-semibold">
          How this post is structured for readers and AI agents
        </h2>
        <div className="mt-6 space-y-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                {index + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-card-border bg-background/40 px-4 py-3 text-sm text-foreground/80">
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-card-border bg-card/60 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Distribution loop</p>
        <h2 className="mt-4 text-xl font-[family-name:var(--font-space-grotesk)] font-semibold">
          Blog → social → Discord → better blog
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {loop.map((item, index) => (
            <div key={item} className="relative rounded-2xl border border-card-border bg-background/40 p-4">
              <span className="text-xs text-muted">0{index + 1}</span>
              <p className="mt-2 text-sm font-medium text-foreground/85">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          Every post should create a high-intent answer, a short-form social angle, and a Discord discussion prompt that produces the next revision.
        </p>
      </div>
    </section>
  );
}
