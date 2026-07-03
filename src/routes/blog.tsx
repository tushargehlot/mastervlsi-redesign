import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/data/blog";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Search, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — MasterVLSI" },
      { name: "description", content: "VLSI guides, interview prep, and silicon engineering deep-dives from the MasterVLSI team." },
      { property: "og:title", content: "MasterVLSI Blog" },
      { property: "og:description", content: "Sharp, practical writing on chip design and careers." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const tags = useMemo(() => Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags))).sort(), []);
  const list = useMemo(
    () =>
      BLOG_POSTS.filter((p) => {
        const matchQ = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase());
        const matchT = !tag || p.tags.includes(tag);
        return matchQ && matchT;
      }),
    [q, tag],
  );

  const [hero, ...rest] = list;

  return (
    <section className="relative py-24">
      <GridBackdrop />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// Blog</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
            Notes from the <span className="text-gradient">silicon trenches.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Practical guides, interview prep, and deep-dives on chip design — written by mentors
            who ship silicon every day.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              aria-label="Search blog posts"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts…"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-card border border-border text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => setTag(null)} className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${!tag ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}>
              All
            </button>
            {tags.map((t) => (
              <button key={t} onClick={() => setTag(t === tag ? null : t)} className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${tag === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {hero && (
          <Link
            to="/blog/$slug"
            params={{ slug: hero.slug }}
            className="mt-12 group grid md:grid-cols-2 gap-8 rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all"
          >
            <div className="aspect-video md:aspect-auto overflow-hidden">
              <img src={hero.cover} alt={hero.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" width={1280} height={768} />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/15 text-primary">Featured</span>
                {hero.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary">{t}</span>
                ))}
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight group-hover:text-primary transition-colors">{hero.title}</h2>
              <p className="mt-3 text-muted-foreground">{hero.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span>{hero.author}</span>
                <span>·</span>
                <span>{new Date(hero.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1"><Clock size={11} /> {hero.readTime}</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary font-medium">
                Read article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group h-full flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:glow-red transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width={1280} height={768} loading="lazy" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span className="inline-flex items-center gap-1"><Clock size={11} /> {p.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">No posts match your filters.</p>
        )}
      </div>
    </section>
  );
}
