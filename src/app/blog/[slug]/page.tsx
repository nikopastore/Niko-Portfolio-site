import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Comments from "@/components/Comments";
import NewsletterSignup from "@/components/NewsletterSignup";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import AutoPostDiagrams from "@/components/AutoPostDiagrams";
import { Prose } from "@/components/mdx/Prose";
import { formatDate, getPost, getPosts, getRelatedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post not found | Niko Pastore" };
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const image = post.frontmatter.image ? new URL(post.frontmatter.image, siteConfig.url).toString() : undefined;

  return {
    title: `${post.frontmatter.title} | Niko Pastore`,
    description: post.frontmatter.excerpt,
    alternates: { canonical: post.frontmatter.canonicalUrl ?? url },
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      url,
      siteName: "Niko Pastore",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedAt ?? post.frontmatter.date,
      authors: [siteConfig.name],
      tags: post.frontmatter.tags,
      images: image ? [{ url: image, width: 1200, height: 630, alt: post.frontmatter.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@nikopastore",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post, posts, 3);
  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;
  const fallbackFirst =
    post.frontmatter.tldr ||
    post.frontmatter.excerpt ||
    post.frontmatter.description ||
    "Practical notes on AI systems, data engineering, and automation.";
  const takeaways = (
    post.frontmatter.keyTakeaways.length > 0
      ? post.frontmatter.keyTakeaways
      : [
          fallbackFirst,
          "The goal is practical implementation: clear constraints, real tradeoffs, and examples a builder can reuse.",
          "AI visibility improves when the answer, examples, diagrams, and source structure are easy for both humans and agents to parse.",
        ]
  ).filter((t): t is string => Boolean(t && t.trim()));

  return (
    <>
      <ReadingProgress />
      <BlogJsonLd post={post} />
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-4xl mx-auto">
          <Link href="/blog" className="text-sm text-muted hover:text-foreground">
            ← Back to blog
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted uppercase tracking-wider">
              <span>{post.frontmatter.category ?? "Field note"}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{formatDate(post.frontmatter.date)}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{post.frontmatter.readTime}</span>
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight leading-tight">
              {post.frontmatter.title}
            </h1>
            <p className="mt-5 text-lg text-foreground/70">
              {post.frontmatter.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-card-border text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {post.frontmatter.image ? (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-card-border bg-card">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                priority
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <section data-key-takeaways className="mt-10 rounded-3xl border border-card-border bg-card/60 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-muted">TL;DR for humans and AI agents</p>
            <ul className="mt-4 space-y-3 text-foreground/80">
              {takeaways.map((takeaway) => (
                <li key={takeaway} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8">
            <ShareButtons url={canonicalUrl} title={post.frontmatter.title} />
          </div>

          <AutoPostDiagrams post={post} />

          <div className="mt-10">
            <Prose>{post.content}</Prose>
          </div>

          {siteConfig.enableDiscord ? (
            <section className="mt-14 rounded-3xl border border-card-border bg-foreground text-background p-7">
              <p className="text-xs uppercase tracking-[0.25em] opacity-70">Community</p>
              <h2 className="mt-3 text-2xl font-[family-name:var(--font-space-grotesk)] font-bold">
                Join the AI Agent Mastery Discord
              </h2>
              <p className="mt-3 max-w-2xl text-background/75">
                I share agent setups, automation breakdowns, and the implementation details that do not always make it into public posts.
              </p>
              <a
                href={siteConfig.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground"
              >
                Join free on Discord →
              </a>
            </section>
          ) : null}

          {siteConfig.enableNewsletter ? (
            <div className="mt-10">
              <NewsletterSignup variant="inline" />
            </div>
          ) : null}

          {related.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold">Read next</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {related.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="rounded-2xl border border-card-border bg-card/60 p-5 transition hover:border-foreground/40"
                  >
                    <p className="text-xs uppercase tracking-wider text-muted">{formatDate(relatedPost.frontmatter.date)}</p>
                    <h3 className="mt-3 font-semibold leading-snug">{relatedPost.frontmatter.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-14">
            <Comments postSlug={post.slug} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
