import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { Callout } from "@/components/mdx/Callout";

function MdxImage(props: ComponentProps<"img">) {
  const src = typeof props.src === "string" ? props.src : "";
  const alt = props.alt ?? "Blog image";

  if (!src) return null;

  return (
    <figure className="my-10 overflow-hidden rounded-3xl border border-card-border bg-card/40">
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={788}
        sizes="(min-width: 1024px) 768px, 100vw"
        className="h-auto w-full object-cover"
      />
      {alt && <figcaption className="border-t border-card-border px-5 py-3 text-sm text-muted">{alt}</figcaption>}
    </figure>
  );
}

function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-3xl border border-card-border bg-card/40">
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={788}
        sizes="(min-width: 1024px) 768px, 100vw"
        className="h-auto w-full object-cover"
      />
      {(caption || alt) && (
        <figcaption className="border-t border-card-border px-5 py-3 text-sm text-muted">
          {caption ?? alt}
        </figcaption>
      )}
    </figure>
  );
}

function KeyTakeaway({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-foreground/20 bg-foreground/[0.03] p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">Key takeaway</p>
      <div className="text-foreground/85">{children}</div>
    </div>
  );
}

export const mdxComponents = {
  Callout,
  Figure,
  KeyTakeaway,
  img: MdxImage,
};
