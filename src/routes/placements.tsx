import { createFileRoute, Link } from "@tanstack/react-router";
import { STATS, SITE } from "@/data/site";
import { PARTNERS, logoUrl } from "@/data/partners";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Counter } from "@/components/Counter";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { Spotlight } from "@/components/fx/Spotlight";
import { Reveal } from "@/components/fx/Reveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { SectionDivider } from "@/components/vlsi/SectionDivider";
import { VideoTestimonialGrid } from "@/components/placements/VideoTestimonialGrid";
import { TestimonialCarousel } from "@/components/placements/TestimonialCarousel";
import { GoogleReviewsGrid } from "@/components/placements/GoogleReviews";
import { PlacementJourney } from "@/components/placements/PlacementJourney";
import { AchievementsStrip } from "@/components/placements/AchievementsStrip";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_PLACEMENTS } from "@/data/faqs";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SalaryHeatmap } from "@/components/interactive/SalaryHeatmap";
import { AlumniMap } from "@/components/interactive/AlumniMap";
import { waLink } from "@/data/site";
import { AlumniWall } from "@/components/AlumniWall";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "VLSI Placements — 5000+ Alumni at Intel, NVIDIA, AMD | MasterVLSI" },
      { name: "description", content: "5000+ MasterVLSI alumni placed at Intel, AMD, NVIDIA, Qualcomm, Synopsys, Cadence and 60+ semiconductor companies within 30–45 days of course completion." },
      { property: "og:title", content: "Placements at MasterVLSI — 5000+ Silicon Engineers" },
      { property: "og:description", content: "Video stories, written quotes, Google reviews — see where MasterVLSI engineers land." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vlsiviz-sparkle.lovable.app/placements" },
    ],
    links: [{ rel: "canonical", href: "https://vlsiviz-sparkle.lovable.app/placements" }],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_PLACEMENTS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PlacementsPage,
});

const FILTERS = ["All", "Product", "Fabless", "EDA", "Services", "R&D", "Startup"] as const;
type Filter = typeof FILTERS[number];

function PlacementsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = filter === "All"
    ? PARTNERS
    : PARTNERS.filter((p) => p.category === filter);

  return (
    <>
      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <GridBackdrop />
        <Spotlight size={700} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Outcomes</p>
            <h1 className="mt-3 h-display font-display font-bold">
              Where our engineers <span className="text-gradient">work today.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Placement starts within 30–45 days of completing the core modules. Below is the proof —
              hiring partners, video stories from alumni, written testimonials, and unfiltered Google reviews.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-14 grid grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 hover:border-primary/50 transition-all">
                <p className="font-display text-4xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <SectionDivider label="hiring partners" />

      {/* PARTNERS */}
      <section className="py-16 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">// 60+ companies</p>
            <h2 className="mt-2 h-display-sm font-display font-bold">
              Alumni currently shipping silicon at.
            </h2>
          </Reveal>
          <div className="-mx-4 px-4 overflow-x-auto sm:mx-0 sm:px-0 sm:overflow-visible">
            <div className="flex gap-1.5 w-max sm:w-auto sm:flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-all ${
                    filter === f
                      ? "bg-primary text-primary-foreground border-primary glow-red"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <PartnerMarquee />
        <div className="mx-auto max-w-7xl px-4 mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2"
            >
              {filtered.map((p, i) => {
                const src = logoUrl(p.domain);
                return src ? (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.025, ease: "easeOut" }}
                    className="group aspect-square rounded-xl border border-border bg-background/50 backdrop-blur flex items-center justify-center hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-all relative overflow-hidden cursor-default"
                  >
                    <img
                      src={src}
                      alt={p.name}
                      loading="lazy"
                      className="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                      onError={(e) => ((e.currentTarget.style.display = "none"))}
                    />
                    <span className="absolute bottom-0 left-0 right-0 text-[9px] font-mono text-muted-foreground/0 group-hover:text-muted-foreground/60 text-center pb-1 transition-all duration-300 truncate">
                      {p.name}
                    </span>
                  </motion.div>
                ) : null;
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SectionDivider label="alumni wall" />
      <section className="relative py-16 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Names, roles, packages</p>
            <h2 className="mt-2 h-display-sm font-display font-bold">
              Real engineers — <span className="text-gradient">real offers.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Filter by track to see who landed where, and what they draw.
            </p>
          </Reveal>
          <div className="mt-10">
            <AlumniWall />
          </div>
        </div>
      </section>

      <SectionDivider label="special achievements" />

      <section className="relative py-16">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-accent uppercase tracking-widest">// Records</p>
            <h2 className="mt-2 h-display-sm font-display font-bold max-w-2xl">
              Standout <span className="text-gradient">alumni achievements.</span>
            </h2>
          </Reveal>
          <div className="mt-10">
            <AchievementsStrip />
          </div>
        </div>
      </section>

      <SectionDivider label="video stories" />

      {/* VIDEO TESTIMONIALS */}
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// In their own voices</p>
            <h2 className="mt-3 h-display-sm font-display font-bold max-w-2xl">
              Alumni stories, <span className="text-gradient">unscripted.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Real engineers — at real companies — telling you what changed when they joined MasterVLSI.
              Tap any thumbnail to hear them out.
            </p>
          </Reveal>
          <div className="mt-12">
            <VideoTestimonialGrid />
          </div>
        </div>
      </section>

      <SectionDivider label="written testimonials" />

      {/* WRITTEN CAROUSEL */}
      <section className="relative py-20 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Detailed wins</p>
            <h2 className="mt-3 h-display-sm font-display font-bold max-w-2xl">
              The long-form <span className="text-gradient">success stories.</span>
            </h2>
          </Reveal>
          <div className="mt-10">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      <SectionDivider label="google reviews" />

      {/* GOOGLE REVIEWS */}
      <section className="relative py-24">
        <GridBackdrop />
        <Spotlight size={560} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Verified · Google</p>
            <h2 className="mt-3 h-display-sm font-display font-bold max-w-2xl">
              What students post <span className="text-gradient">publicly on Google.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              No filter, no curation — direct from our Google Business profile.
            </p>
          </Reveal>
          <div className="mt-10">
            <GoogleReviewsGrid />
          </div>
        </div>
      </section>

      <SectionDivider label="journey" />

      {/* PLACEMENT JOURNEY */}
      <section className="relative py-24 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// 4 stops</p>
            <h2 className="mt-3 h-display-sm font-display font-bold max-w-2xl">
              From cohort intake to <span className="text-gradient">offer letter.</span>
            </h2>
          </Reveal>
          <div className="mt-14">
            <PlacementJourney />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// FAQ</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              Placement <span className="text-gradient">questions.</span>
            </h2>
          </Reveal>
          <div className="mt-10">
            <FaqAccordion items={FAQ_PLACEMENTS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-10 sm:p-14 text-center glow-soft relative overflow-hidden">
            <div className="absolute inset-0 grid-bg-fine opacity-30 pointer-events-none" />
            <h2 className="relative h-display-sm font-display font-bold">
              Ready to join the <span className="text-gradient">next cohort?</span>
            </h2>
            <p className="relative mt-3 text-muted-foreground max-w-xl mx-auto">
              Talk to a counsellor in under 2 minutes — straight on WhatsApp.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Link to="/demo" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red">
                  Book free demo <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Magnetic>
                <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm hover:border-primary/60 hover:text-primary">
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider label="data" />

      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Outcomes, visualised</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              The placements <span className="text-gradient">heatmap & map.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Hover the salary grid for live tooltips. Click a city to inspect the hiring cluster.</p>
          </Reveal>
          <SalaryHeatmap />
          <AlumniMap />
        </div>
      </section>
    </>
  );
}
