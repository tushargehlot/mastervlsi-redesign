import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, Quote, ArrowRight, Search } from "lucide-react";
import { VIDEO_TESTIMONIALS } from "@/data/placements";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Reveal } from "@/components/fx/Reveal";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Video Testimonials — 200+ MasterVLSI Alumni Stories | MasterVLSI" },
      { name: "description", content: "Watch 200+ video testimonials from MasterVLSI alumni working at Intel, NVIDIA, AMD, Qualcomm. Real engineers, real placements, real stories." },
      { property: "og:title", content: "MasterVLSI Video Testimonials" },
      { property: "og:description", content: "200+ unscripted video stories from placed engineers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vlsiviz-sparkle.lovable.app/testimonials" },
    ],
    links: [{ rel: "canonical", href: "https://vlsiviz-sparkle.lovable.app/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [q, setQ] = useState("");
  const [company, setCompany] = useState<string>("All");
  const [active, setActive] = useState<string | null>(null);

  const companies = useMemo(
    () => ["All", ...Array.from(new Set(VIDEO_TESTIMONIALS.map((t) => t.company)))],
    []
  );

  const filtered = VIDEO_TESTIMONIALS.filter((t) => {
    const matchQ = !q || `${t.name} ${t.company} ${t.role}`.toLowerCase().includes(q.toLowerCase());
    const matchC = company === "All" || t.company === company;
    return matchQ && matchC;
  });

  return (
    <>
      <section className="relative pt-28 pb-14">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Unscripted</p>
            <h1 className="mt-3 h-display font-display font-bold">
              200+ engineers, <span className="text-gradient">in their own words.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Every one of these videos is a MasterVLSI graduate now working in the industry. Filter by company or search a name.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <label className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, company or role…"
                className="w-full pl-9 pr-3 py-3 rounded-md bg-card border border-border text-sm focus:border-primary focus:outline-none"
              />
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="rounded-md bg-card border border-border text-sm px-3 py-3"
            >
              {companies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t, i) => {
              const isOpen = active === t.id;
              const thumb = t.videoId ? `https://i.ytimg.com/vi/${t.videoId}/hqdefault.jpg` : null;
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 12) * 0.03 }}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all"
                >
                  <div className="relative aspect-video bg-surface-2 overflow-hidden">
                    {isOpen && t.videoId ? (
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${t.videoId}?autoplay=1`}
                        title={t.name}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        onClick={() => (t.videoId ? setActive(t.id) : window.open(SITE.youtubeChannel, "_blank"))}
                        className="absolute inset-0 flex items-center justify-center"
                        aria-label={`Play testimonial from ${t.name}`}
                      >
                        {thumb ? (
                          <img src={thumb} alt={`${t.name} testimonial`} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-card" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        <span className="relative z-10 h-14 w-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={22} className="ml-1" fill="currentColor" />
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <Quote size={14} className="text-primary mb-1.5" />
                    <p className="text-sm text-foreground leading-snug line-clamp-3">"{t.quote}"</p>
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="font-display font-bold text-sm">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                        {t.role} · <span className="text-primary">{t.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-12 font-mono text-sm">No testimonials match your filter.</p>
          )}

          <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              We're actively transcoding 200+ testimonial videos onto this page.{" "}
              <a href={SITE.youtubeChannel} target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline">
                Watch the full library on our YouTube channel
              </a>
            </p>
            <div className="mt-6">
              <Link to="/demo" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Talk to a mentor <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
