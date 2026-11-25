"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  formattedDate: string;
  readTime: string;
  tags: string[];
  image?: string;
}

interface BlogExplorerProps {
  posts: BlogPostSummary[];
  featuredSlug?: string;
  aiTrainingHubUrl: string;
}

function PostCard({ post }: { post: BlogPostSummary }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-card-border bg-card/70 transition-all hover:border-foreground/35">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] bg-card">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-card" />
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-muted uppercase tracking-wider">
            <span>{post.formattedDate}</span>
            <span className="h-1 w-1 rounded-full bg-muted" />
            <span>{post.readTime}</span>
          </div>
          <h2 className="mt-4 text-2xl font-[family-name:var(--font-space-grotesk)] font-semibold leading-tight">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm text-foreground/70">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full border border-card-border text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/[\s_]+/g, "-");
}

export default function BlogExplorer({ posts, featuredSlug, aiTrainingHubUrl }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<{ key: string; label: string } | null>(null);

  const topTags = useMemo(() => {
    const groups = new Map<string, { count: number; variants: Map<string, number> }>();
    for (const post of posts) {
      const seenInPost = new Set<string>();
      for (const rawTag of post.tags) {
        const key = normalizeTag(rawTag);
        if (!key) continue;
        let entry = groups.get(key);
        if (!entry) {
          entry = { count: 0, variants: new Map() };
          groups.set(key, entry);
        }
        if (!seenInPost.has(key)) {
          entry.count += 1;
          seenInPost.add(key);
        }
        entry.variants.set(rawTag, (entry.variants.get(rawTag) ?? 0) + 1);
      }
    }
    return Array.from(groups.entries())
      .sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))
      .slice(0, 12)
      .map(([key, { variants }]) => {
        const bestLabel = Array.from(variants.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
        return { key, label: bestLabel };
      });
  }, [posts]);

  const normalizedQuery = query.trim().toLowerCase();
  const isFiltering = Boolean(normalizedQuery || selectedTag);

  const filteredPosts = useMemo(() => {
    if (!isFiltering) return posts;
    return posts.filter((post) => {
      if (selectedTag && !post.tags.some((tag) => normalizeTag(tag) === selectedTag.key)) {
        return false;
      }
      if (!normalizedQuery) return true;
      return (
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [posts, isFiltering, selectedTag, normalizedQuery]);

  const featured = useMemo(() => {
    if (!posts.length) return undefined;
    return posts.find((post) => post.slug === featuredSlug) ?? posts[0];
  }, [posts, featuredSlug]);

  const featuredIsTrainingHub = featured?.slug === "ai-training-hub-case-study";
  const rest = useMemo(
    () => posts.filter((post) => post.slug !== featured?.slug),
    [posts, featured]
  );

  const clearFilters = () => {
    setQuery("");
    setSelectedTag(null);
  };

  return (
    <>
      <div className="mb-10 space-y-5">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search field notes..."
            aria-label="Search blog posts"
            className="w-full rounded-full border border-card-border bg-card/60 py-2.5 pl-11 pr-10 text-sm text-foreground placeholder:text-muted focus:border-foreground/50 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter posts by topic tag">
          <button
            type="button"
            aria-pressed={selectedTag === null}
            onClick={() => setSelectedTag(null)}
            className={`rounded-full border px-3 py-1 text-xs transition cursor-pointer ${
              selectedTag === null
                ? "border-foreground bg-foreground text-background font-medium"
                : "border-card-border bg-card/60 text-muted hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            All ({posts.length})
          </button>
          {topTags.map((tag) => {
            const active = selectedTag?.key === tag.key;
            return (
              <button
                key={tag.key}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedTag(active ? null : tag)}
                className={`rounded-full border px-3 py-1 text-xs transition cursor-pointer ${
                  active
                    ? "border-foreground bg-foreground text-background font-medium"
                    : "border-card-border bg-card/60 text-muted hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {isFiltering ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-card-border bg-card/40 px-4 py-3 text-sm">
            <span className="text-foreground/80">
              Showing {filteredPosts.length} of {posts.length} field notes
              {selectedTag ? ` tagged "${selectedTag.label}"` : ""}
              {normalizedQuery ? ` matching "${query.trim()}"` : ""}
            </span>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-card-border px-3 py-1 text-xs font-medium text-foreground/80 transition hover:border-foreground/50 hover:text-foreground cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </div>

      {!isFiltering && featured ? (
        <article className="group mb-10 grid overflow-hidden rounded-3xl border border-card-border bg-card/70 transition hover:border-foreground/35 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[260px] bg-card">
            {featured.image ? (
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-card" />
            )}
          </div>
          <div className="p-7 md:p-9">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-muted">
              <span>{featuredIsTrainingHub ? "Featured project" : "Featured"}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{featured.formattedDate}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{featured.readTime}</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-[family-name:var(--font-space-grotesk)] font-semibold leading-tight">
              {featured.title}
            </h2>
            <p className="mt-4 text-foreground/70">{featured.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {featuredIsTrainingHub ? (
                <>
                  <a
                    href={aiTrainingHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                  >
                    Open AI Training Hub →
                  </a>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="inline-flex rounded-full border border-card-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/50 hover:text-foreground"
                  >
                    Read the case study →
                  </Link>
                  <span className="inline-flex rounded-full border border-card-border px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted">
                    60 courses · 74 tests · S/A/B/C tiers
                  </span>
                </>
              ) : (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Read the field note →
                </Link>
              )}
            </div>
          </div>
        </article>
      ) : null}

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card/70 p-8 text-muted">
          No posts yet. Check back soon.
        </div>
      ) : isFiltering && filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card/70 p-8 text-center">
          <p className="text-foreground/80">No field notes matched those filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 inline-flex rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90 cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(isFiltering ? filteredPosts : rest).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
