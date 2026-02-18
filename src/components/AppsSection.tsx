import { ArrowUpRight } from "lucide-react";
import { App } from "@/lib/data";

interface AppsSectionProps {
  apps: App[];
}

export default function AppsSection({ apps }: AppsSectionProps) {
  if (apps.length === 0) {
    return null;
  }

  return (
    <section id="apps" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          APPS
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-card border border-card-border rounded-2xl p-6 flex flex-col gap-5 hover:border-muted transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-card-border bg-background/40 flex items-center justify-center overflow-hidden">
                    {app.logo ? (
                      <img
                        src={app.logo}
                        alt={`${app.name} logo`}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-2xl" aria-hidden="true">
                        {app.icon}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-muted uppercase tracking-wider">
                      {app.category}
                    </span>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mt-1">
                      {app.name}
                    </h3>
                  </div>
                </div>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  Open
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <p className="text-sm text-muted leading-relaxed">{app.description}</p>

              {app.screenshots && app.screenshots.length > 0 ? (
                <div className="flex gap-3 overflow-x-auto pb-2 pr-2 scrollbar-hide">
                  {app.screenshots.map((screenshot, index) => (
                    <div
                      key={`${app.id}-shot-${index}`}
                      className="w-[150px] aspect-[9/19.5] rounded-2xl border border-card-border bg-card/60 shadow-sm overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={screenshot}
                        alt={`${app.name} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {app.platforms.map((platform) => (
                  <span
                    key={`${app.id}-${platform}`}
                    className="text-xs px-2.5 py-1 rounded-full border border-card-border text-muted"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {app.skills.map((skill) => (
                  <span
                    key={`${app.id}-${skill}`}
                    className="text-xs px-3 py-1 rounded-full bg-card/60 text-muted border border-card-border/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
