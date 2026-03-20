import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate, getPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 mb-12">
            <span className="text-sm text-muted tracking-[0.3em]">BLOG</span>
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight">
              Notes on building AI products
            </h1>
            <p className="text-foreground/70 max-w-2xl">
              Practical lessons, systems thinking, and the experiments behind shipping
              real-world AI applications.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-card-border bg-card/70 p-8 text-muted">
              No posts yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-2xl border border-card-border bg-card/70 p-6 transition-all hover:border-muted"
                >
                  <div className="flex items-center gap-3 text-xs text-muted uppercase tracking-wider">
                    <span>{formatDate(post.frontmatter.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-muted" />
                    <span>{post.frontmatter.readTime}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-[family-name:var(--font-space-grotesk)] font-semibold">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm text-foreground/70">
                    {post.frontmatter.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full border border-card-border text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm text-foreground/80 hover:text-foreground"
                    >
                      Read post →
                    </Link>
                  </div>
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
