import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/data/blog";
import { SITE } from "@/data/site";
import { BlogCover } from "@/components/blog/BlogCover";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Search, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const PER_PAGE = 6;

export const Route = createFileRoute("/blog")({
  validateSearch: (search: Record<string, unknown>): { page?: number } => ({
    page: typeof search.page === "number" && search.page >= 1 ? Math.floor(search.page) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "VLSI Blog — Interview Prep, RTL & DV Guides | MasterVLSI" },
      { name: "description", content: "Deep-dives on Verilog, SystemVerilog, UVM, static timing, CDC, low-power design, and VLSI interview prep — written by working silicon engineers." },
      { property: "og:title", content: "MasterVLSI Blog — VLSI Guides & Interview Prep" },
      { property: "og:description", content: "Sharp, practical writing on chip design and careers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/blog` }],
  }),
  component: BlogIndex,
});


function BlogIndex() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const { page = 1 } = Route.useSearch();
  const navigate = Route.useNavigate();
  const tags = useMemo(() => Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags))).sort(), []);
  const filtered = useMemo(
    () =>
      BLOG_POSTS.filter((p) => {
        const matchQ = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase());
        const matchT = !tag || p.tags.includes(tag);
        return matchQ && matchT;
      }),
    [q, tag],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const [hero, ...rest] = filtered.slice(start, start + PER_PAGE);
  const showHero = safePage === 1;

  function go(p: number) {
    navigate({ search: (prev) => ({ ...prev, page: Math.min(Math.max(1, p), totalPages) }) });
  }

  function resetPage() {
    navigate({ search: (prev) => ({ ...prev, page: 1 }) });
  }

  return (
    <section className="relative py-24">
      <GridBackdrop />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// Blog</p>
          <h1 className="mt-3 h-display-sm font-display font-bold">
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
              onChange={(e) => { setQ(e.target.value); resetPage(); }}
              placeholder="Search posts…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-card border border-border text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => { setTag(null); resetPage(); }} className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${!tag ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}>
              All
            </button>
            {tags.map((t) => (
              <button key={t} onClick={() => { setTag(t === tag ? null : t); resetPage(); }} className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${tag === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {showHero && hero && (
          <Link
            to="/blog/$slug"
            params={{ slug: hero.slug }}
            className="mt-12 group grid md:grid-cols-2 gap-0 rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all"
          >
            <BlogCover
              post={hero}
              className="aspect-video md:aspect-auto md:h-full"
              titleClassName="text-2xl sm:text-3xl"
            />
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
                <BlogCover
                  post={p}
                  className="aspect-video"
                  titleClassName="text-base sm:text-lg group-hover:text-primary transition-colors"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="inline-flex items-center gap-1"><Clock size={11} /> {p.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">No posts match your filters.</p>
        )}

        {totalPages > 1 && (
          <nav className="mt-14 flex items-center justify-center gap-3" aria-label="Blog pages">
            <button
              onClick={() => go(safePage - 1)}
              disabled={safePage <= 1}
              aria-label="Previous page"
              className="h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary/60 hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground transition"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i + 1)}
                  aria-current={safePage === i + 1 ? "page" : undefined}
                  className={`h-10 min-w-10 px-2 rounded-full font-mono text-sm border transition ${
                    safePage === i + 1
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => go(safePage + 1)}
              disabled={safePage >= totalPages}
              aria-label="Next page"
              className="h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary/60 hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground transition"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
