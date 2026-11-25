import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import BlogExplorer, { type BlogPostSummary } from "@/components/BlogExplorer";
import { formatDate, getPosts } from "@/lib/blog";
import { siteConfig, training } from "@/lib/data";

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
  const aiTrainingHubUrl =
    training.find((item) => item.id === "ai-training-hub")?.url ??
    "https://nikopastore.github.io/ai-training-hub/";

  const summaries: BlogPostSummary[] = posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    excerpt: post.frontmatter.excerpt,
    formattedDate: formatDate(post.frontmatter.date),
    readTime: post.frontmatter.readTime,
    tags: post.frontmatter.tags,
    image: post.frontmatter.image,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <section className="mb-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="text-sm text-muted tracking-[0.3em]">BLOG</span>
              <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight">
                High-intent field notes on AI systems, data, and automation.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-foreground/70">
                Not AI slop. These are answer-first writeups, implementation notes, diagrams, and playbooks for people building real systems.
              </p>
            </div>
            {siteConfig.enableNewsletter ? (
              <NewsletterSignup variant="compact" />
            ) : null}
          </section>

          <BlogExplorer
            posts={summaries}
            featuredSlug={featured?.slug}
            aiTrainingHubUrl={aiTrainingHubUrl}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
