import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  info: {
    label: "Note",
    className: "border-foreground/20 border-l-foreground/60",
  },
  warning: {
    label: "Warning",
    className: "border-amber-500/30 border-l-amber-500/70",
  },
  success: {
    label: "Success",
    className: "border-emerald-500/25 border-l-emerald-500/70",
  },
};

type CalloutVariant = keyof typeof variants;

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

export function Callout({ variant = "info", title, children }: CalloutProps) {
  const selected = variants[variant] ?? variants.info;

  return (
    <div
      className={cn(
        "rounded-2xl border border-card-border border-l-4 bg-card/70 px-5 py-4",
        selected.className
      )}
    >
      <div className="text-xs uppercase tracking-wider text-muted">
        {title ?? selected.label}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-foreground/80">
        {children}
      </div>
    </div>
  );
}
