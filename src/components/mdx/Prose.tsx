import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "text-[15px] leading-relaxed text-foreground/90",
        "[&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-[family-name:var(--font-space-grotesk)] [&_h1]:font-bold [&_h1]:tracking-tight",
        "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-[family-name:var(--font-space-grotesk)] [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-[family-name:var(--font-space-grotesk)] [&_h3]:font-semibold",
        "[&_p]:mt-4 [&_p]:text-foreground/80",
        "[&_a]:text-foreground [&_a]:underline [&_a]:decoration-muted [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:decoration-foreground",
        "[&_ul]:mt-4 [&_ul]:pl-6 [&_ul]:list-disc",
        "[&_ol]:mt-4 [&_ol]:pl-6 [&_ol]:list-decimal",
        "[&_li]:mt-2 [&_li]:text-foreground/80",
        "[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-card-border [&_blockquote]:pl-4 [&_blockquote]:text-foreground/70",
        "[&_hr]:my-10 [&_hr]:border-card-border",
        "[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-card-border [&_pre]:bg-card [&_pre]:p-5",
        "[&_pre_code]:bg-transparent",
        "[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:border [&_:not(pre)>code]:border-card-border [&_:not(pre)>code]:bg-card [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-[family-name:var(--font-space-mono)] [&_:not(pre)>code]:text-[0.85em]",
        "[&_code]:font-[family-name:var(--font-space-mono)]",
        "[&_thead]:border-b [&_thead]:border-card-border [&_thead]:bg-card/80",
        "[&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-foreground",
        "[&_td]:border-t [&_td]:border-card-border/60 [&_td]:px-4 [&_td]:py-3 [&_td]:text-foreground/80",
        "[&_del]:opacity-60",
        className
      )}
    >
      {children}
    </div>
  );
}
