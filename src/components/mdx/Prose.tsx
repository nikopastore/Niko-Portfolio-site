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
        "[& h1]:mt-10 [& h1]:text-3xl [& h1]:font-[family-name:var(--font-space-grotesk)] [& h1]:font-bold [& h1]:tracking-tight",
        "[& h2]:mt-10 [& h2]:text-2xl [& h2]:font-[family-name:var(--font-space-grotesk)] [& h2]:font-semibold [& h2]:tracking-tight",
        "[& h3]:mt-8 [& h3]:text-xl [& h3]:font-[family-name:var(--font-space-grotesk)] [& h3]:font-semibold",
        "[& p]:mt-4 [& p]:text-foreground/80",
        "[& a]:text-foreground [& a]:underline [& a]:decoration-muted [& a]:underline-offset-4 [& a]:transition-colors [& a:hover]:decoration-foreground",
        "[& ul]:mt-4 [& ul]:pl-6 [& ul]:list-disc",
        "[& ol]:mt-4 [& ol]:pl-6 [& ol]:list-decimal",
        "[& li]:mt-2 [& li]:text-foreground/80",
        "[& blockquote]:mt-6 [& blockquote]:border-l-2 [& blockquote]:border-card-border [& blockquote]:pl-4 [& blockquote]:text-foreground/70",
        "[& hr]:my-10 [& hr]:border-card-border",
        "[& pre]:mt-6 [& pre]:overflow-x-auto [& pre]:rounded-2xl [& pre]:border [& pre]:border-card-border [& pre]:bg-card [& pre]:p-5",
        "[& pre code]:bg-transparent",
        "[& :not(pre)>code]:rounded-md [& :not(pre)>code]:border [& :not(pre)>code]:border-card-border [& :not(pre)>code]:bg-card [& :not(pre)>code]:px-1.5 [& :not(pre)>code]:py-0.5 [& :not(pre)>code]:font-[family-name:var(--font-space-mono)] [& :not(pre)>code]:text-[0.85em]",
        "[& code]:font-[family-name:var(--font-space-mono)]",
        className
      )}
    >
      {children}
    </div>
  );
}
