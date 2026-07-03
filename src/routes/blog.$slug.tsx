import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BLOG_POSTS, getPost } from "@/data/blog";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Clock, ArrowLeft, MessageCircle } from "lucide-react";
import { waLink } from "@/data/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    return {
      meta: p
        ? [
            { title: `${p.title} — MasterVLSI Blog` },
            { name: "description", content: p.excerpt },
            { property: "og:title", content: p.title },
            { property: "og:description", content: p.excerpt },
            { property: "og:image", content: p.cover },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `/blog/${params.slug}` },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:image", content: p.cover },
          ]
        : [{ title: "Post — MasterVLSI Blog" }],
      links: p ? [{ rel: "canonical", href: `/blog/${params.slug}` }] : [],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: p.title,
                description: p.excerpt,
                image: p.cover,
                author: { "@type": "Person", name: p.author },
                datePublished: p.date,
                dateModified: p.date,
                keywords: p.tags.join(", "),
                publisher: { "@type": "Organization", name: "MasterVLSI" },
                mainEntityOfPage: `/blog/${params.slug}`,
              }),
            },
          ]
        : [],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <p className="font-mono text-primary text-sm">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Post not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-primary hover:underline">← Back to blog</Link>
    </div>
  ),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);

  return (
    <article className="relative">
      <div className="fixed top-16 inset-x-0 h-0.5 bg-border z-40">
        <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${progress}%` }} />
      </div>

      <header className="relative pt-16 pb-12 border-b border-border">
        <GridBackdrop />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft size={14} /> Back to blog
          </Link>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((t: string) => (
              <span key={t} className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/15 text-primary">{t}</span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground font-mono">
            <span>{post.author}</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
          </div>
        </div>
      </header>

      <div className="aspect-[2/1] max-h-[480px] overflow-hidden border-b border-border">
        <img src={post.cover} alt={post.title} className="w-full h-full object-cover" width={1280} height={768} />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-display prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8
          prose-p:text-foreground/85 prose-p:leading-relaxed
          prose-strong:text-foreground
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-primary prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl
          prose-blockquote:border-primary prose-blockquote:text-foreground/80
          prose-table:text-sm prose-th:text-foreground prose-th:border-border prose-td:border-border
          prose-li:marker:text-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-8 text-center glow-red">
          <h3 className="font-display text-2xl font-bold">Got questions about this topic?</h3>
          <p className="mt-2 text-muted-foreground">Ping us on WhatsApp — our mentors usually reply within the hour.</p>
          <a href={waLink(`Hi MasterVLSI! I read "${post.title}" and have a question.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <MessageCircle size={14} /> Chat with us
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-card/20 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-2xl font-bold">Keep reading</h3>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 transition">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display font-bold group-hover:text-primary transition-colors line-clamp-2">{p.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
