import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BLOG_POSTS, getAdjacent, getPost } from "@/data/blog";
import { SITE, waLink } from "@/data/site";
import { BlogCover } from "@/components/blog/BlogCover";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Clock, ArrowLeft, ArrowRight, MessageCircle, Check, Link2, Share2 } from "lucide-react";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    const url = `${SITE.url}/blog/${params.slug}`;
    return {
      meta: p
        ? [
            { title: `${p.title} — MasterVLSI Blog` },
            { name: "description", content: p.excerpt },
            { property: "og:title", content: p.title },
            { property: "og:description", content: p.excerpt },
            { property: "og:image", content: `${SITE.url}/logo-mastervlsi.png` },
            { property: "og:type", content: "article" },
            { property: "og:url", content: url },
            { property: "article:published_time", content: p.date },
            { property: "article:author", content: p.author },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: p.title },
            { name: "twitter:description", content: p.excerpt },
            { name: "twitter:image", content: `${SITE.url}/logo-mastervlsi.png` },
          ]
        : [{ title: "Post — MasterVLSI Blog" }, { name: "robots", content: "noindex" }],
      links: p ? [{ rel: "canonical", href: url }] : [],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: p.title,
                description: p.excerpt,
                image: `${SITE.url}/logo-mastervlsi.png`,
                author: { "@type": "Organization", name: p.author },
                datePublished: p.date,
                dateModified: p.date,
                keywords: p.tags.join(", "),
                publisher: {
                  "@type": "Organization",
                  name: "MasterVLSI",
                  logo: { "@type": "ImageObject", url: `${SITE.url}/logo-mastervlsi.png` },
                },
                mainEntityOfPage: url,
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
                  { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
                  { "@type": "ListItem", position: 3, name: p.title, item: url },
                ],
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

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : `${SITE.url}/blog`;

  function share(provider: "wa" | "x" | "linkedin") {
    const text = `${title} — MasterVLSI Blog`;
    const href =
      provider === "wa"
        ? `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
        : provider === "x"
          ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
          : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy link:", url);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mr-1">
        <Share2 size={12} /> Share
      </span>
      <button onClick={() => share("wa")} className="px-3 py-1.5 rounded-full text-xs font-mono border border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary transition">WhatsApp</button>
      <button onClick={() => share("x")} className="px-3 py-1.5 rounded-full text-xs font-mono border border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary transition">X</button>
      <button onClick={() => share("linkedin")} className="px-3 py-1.5 rounded-full text-xs font-mono border border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary transition">LinkedIn</button>
      <button onClick={copy} className="px-3 py-1.5 rounded-full text-xs font-mono border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition inline-flex items-center gap-1.5">
        {copied ? <><Check size={11} /> Copied</> : <><Link2 size={11} /> Copy link</>}
      </button>
    </div>
  );
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const [progress, setProgress] = useState(0);
  const { prev, next } = getAdjacent(post.slug);

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
      <div className="fixed top-0 inset-x-0 h-0.5 z-40 bg-gradient-to-r from-crimson via-ignite to-trace" style={{ width: `${progress}%` }} />

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
          <h1 className="mt-4 h-display-sm font-display font-bold leading-tight">{post.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground font-mono">
            <span>{post.author}</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
          </div>
          <div className="mt-6">
            <ShareBar title={post.title} />
          </div>
        </div>
      </header>

      <BlogCover post={post} className="aspect-[2/1] max-h-[480px] border-b border-border" titleClassName="text-3xl sm:text-5xl max-w-3xl" />

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

        <div className="mt-16 rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-8 text-center glow-red">
          <h3 className="font-display text-2xl font-bold">Got questions about this topic?</h3>
          <p className="mt-2 text-muted-foreground">Ping us on WhatsApp — our mentors usually reply within the hour.</p>
          <a href={waLink(`Hi MasterVLSI! I read "${post.title}" and have a question.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <MessageCircle size={14} /> Chat with us
          </a>
        </div>

        <aside className="mt-10 rounded-2xl border border-border bg-card/60 p-6">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-crimson to-ignite flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
              MV
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Written by</p>
              <p className="mt-1 font-display font-bold">MasterVLSI Mentor Team</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Working silicon engineers from our Bengaluru institute — the RTL and DV leads who have placed 5000+
                engineers at Intel, AMD, NVIDIA, Qualcomm, Synopsys and Cadence.{" "}
                <Link to="/about" className="text-primary hover:underline">More about us →</Link>
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Last updated {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        </aside>

        {(prev || next) && (
          <nav className="mt-12 grid sm:grid-cols-2 gap-4" aria-label="Blog post navigation">
            {prev ? (
              <Link to="/blog/$slug" params={{ slug: prev.slug }} className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/60 transition-all">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  <ArrowLeft size={11} /> Previous
                </p>
                <p className="mt-2 font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{prev.title}</p>
              </Link>
            ) : <span />}
            {next ? (
              <Link to="/blog/$slug" params={{ slug: next.slug }} className="group rounded-2xl border border-border bg-card p-5 text-right hover:border-primary/60 transition-all">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1 justify-end">
                  Next <ArrowRight size={11} />
                </p>
                <p className="mt-2 font-display font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{next.title}</p>
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-card/20 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-2xl font-bold">Keep reading</h3>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 transition">
                  <BlogCover post={p} className="aspect-video" titleClassName="text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
