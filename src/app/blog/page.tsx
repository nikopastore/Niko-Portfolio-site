import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import { formatDate, getPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | Niko Pastore",
  description:
    "High-intent notes on AI agents, data engineering, automation, and building production systems.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Niko Pastore Blog",
    description:
      "Practical essays on AI agents, data engineering, automation, and real production systems.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();
  const projectCaseStudy = posts.find((post) => post.slug === "ai-training-hub-case-study");
  const featured = projectCaseStudy ?? posts[0];
  const featuredIsTrainingHub = featured?.slug === "ai-training-hub-case-study";
  const rest = posts.filter((post) => post.slug !== featured?.slug);
  const tags = Array.from(new Set(posts.flatMap((post) => post.frontmatter.tags))).slice(0, 10);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="text-sm text-muted tracking-[0.3em]">BLOG</span>
              <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight">
                High-intent field notes on AI systems, data, and automation.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-foreground/70">
                Not AI slop. These are answer-first writeups, implementation notes, diagrams, and playbooks for people building real systems.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-card-border bg-card/60 px-3 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {siteConfig.enableNewsletter ? (
              <NewsletterSignup variant="compact" />
            ) : null}
          </section>

          {featured ? (
            <article className="group mb-10 grid overflow-hidden rounded-3xl border border-card-border bg-card/70 transition hover:border-foreground/35 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[260px] bg-card">
                {featured.frontmatter.image ? (
                  <Image
                    src={featured.frontmatter.image}
                    alt={featured.frontmatter.title}
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
                  <span>{formatDate(featured.frontmatter.date)}</span>
                  <span className="h-1 w-1 rounded-full bg-muted" />
                  <span>{featured.frontmatter.readTime}</span>
                </div>
                <h2 className="mt-4 text-3xl md:text-4xl font-[family-name:var(--font-space-grotesk)] font-semibold leading-tight">
                  {featured.frontmatter.title}
                </h2>
                <p className="mt-4 text-foreground/70">{featured.frontmatter.excerpt}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {featuredIsTrainingHub ? (
                    <>
                      <a
                        href="https://nikopastore.github.io/ai-training-hub/"
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
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post) => (
                <article
                  key={post.slug}
                  className="group overflow-hidden rounded-2xl border border-card-border bg-card/70 transition-all hover:border-foreground/35"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/9] bg-card">
                      {post.frontmatter.image ? (
                        <Image
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title}
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
                        <span>{formatDate(post.frontmatter.date)}</span>
                        <span className="h-1 w-1 rounded-full bg-muted" />
                        <span>{post.frontmatter.readTime}</span>
                      </div>
                      <h2 className="mt-4 text-2xl font-[family-name:var(--font-space-grotesk)] font-semibold leading-tight">
                        {post.frontmatter.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm text-foreground/70">
                        {post.frontmatter.excerpt}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {post.frontmatter.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full border border-card-border text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
