import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Cpu, GraduationCap, Layers, Activity } from "lucide-react";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Counter } from "@/components/Counter";
import { FlowVisualizer } from "@/components/FlowVisualizer";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { TiltCard } from "@/components/TiltCard";
import { COURSES } from "@/data/courses";
import { STATS, SITE } from "@/data/site";
import { Spotlight } from "@/components/fx/Spotlight";
import { Reveal } from "@/components/fx/Reveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { PcbTraces } from "@/components/vlsi/PcbTraces";
import { MiniWaveform } from "@/components/vlsi/MiniWaveform";
import { SectionDivider } from "@/components/vlsi/SectionDivider";
import { FaqAccordion } from "@/components/FaqAccordion";
import { TestimonialCarousel } from "@/components/placements/TestimonialCarousel";
import { LiveCohortTicker } from "@/components/interactive/LiveCohortTicker";
import { FoundersNote } from "@/components/interactive/FoundersNote";
import { PosterPlaylistCard } from "@/components/PosterPlaylistCard";
import { CampusTour } from "@/components/CampusTour";
import { HeroBackdrop } from "@/components/HeroBackdrop";

import { PLAYLISTS } from "@/data/playlists";

import { FAQ_HOME } from "@/data/faqs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MasterVLSI — VLSI Training & Placement in Bengaluru | RTL, UVM, DV" },
      { name: "description", content: "India's premier VLSI training institute. Design & Verification (UVM), RTL, FPGA, SoC. 24/7 lab, industry mentors, 5000+ alumni placed at Intel, AMD, NVIDIA in 30–45 days." },
      { property: "og:title", content: "MasterVLSI — VLSI Training & Placement in 30–45 Days" },
      { property: "og:description", content: "From RTL to GDSII — Design & Verification training with placement at Intel, AMD, NVIDIA, Qualcomm and 60+ companies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vlsiviz-sparkle.lovable.app/" },
      { property: "og:site_name", content: "MasterVLSI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MasterVLSI — Premier VLSI Training" },
      { name: "twitter:description", content: "Design & Verification training with placement in 30–45 days." },
    ],
    links: [{ rel: "canonical", href: "https://vlsiviz-sparkle.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_HOME.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});


const MANIFESTO = [
  { icon: Layers, kw: "Lab-first", t: "Every concept lands in a real Verilog/SV file before a single slide." },
  { icon: Activity, kw: "Mentor-led", t: "1-on-1 reviews with engineers who tape out silicon for a living." },
  { icon: GraduationCap, kw: "Outcome-tied", t: "We measure ourselves by your offer letter, not by hours taught." },
];

const PILLARS = [
  { icon: Zap, n: "01", title: "30–45 day placements", desc: "Industry-aligned curriculum so tight that companies hire on a rolling basis from every cohort." },
  { icon: Sparkles, n: "02", title: "24/7 lab access", desc: "Tool licenses + servers running round the clock. Practice the moment inspiration strikes." },
  { icon: GraduationCap, n: "03", title: "Post-placement support", desc: "We mentor you through the first year on the job — promotions, switches, raises." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[94vh] flex items-center overflow-hidden bg-background">
        <HeroBackdrop />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/76 to-background/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-card/75 backdrop-blur px-3 py-1.5 text-xs font-mono shadow-[var(--glow)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-foreground">Cohort 2026 — AI + Design Verification enrolling now</span>
            </div>
            <h1 className="mt-7 h-display font-display font-bold text-on-glass">
              <span className="text-gradient">AI-augmented</span>
              <br />
              <span className="text-foreground">VLSI design mastery.</span>
              <br />
              <span className="text-muted-foreground">RTL, SystemVerilog, UVM.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-on-glass text-muted-foreground">
              India's longest-running VLSI institute — 12+ years, 5000+ engineers shipped to Intel,
              NVIDIA, AMD, Qualcomm & Google. Now with AI-assisted debug, RTL review and interview
              prep baked into every cohort.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Link
                  to="/demo"
                  className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
                >
                  Book a Free Demo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/playlists"
                  className="inline-flex items-center gap-2 rounded-md border border-primary/35 bg-card/72 backdrop-blur px-7 py-3.5 text-sm font-medium text-foreground hover:border-primary/70 hover:text-primary"
                >
                  <Play size={16} /> Watch on YouTube
                </Link>
              </Magnetic>
            </div>

            <div className="mt-14 grid grid-cols-3 max-w-md gap-6 font-mono">
              {[
                { v: "30-45", l: "Days to placement" },
                { v: "6 mo", l: "Course duration" },
                { v: "24/7", l: "Lab access" },
              ].map((x) => (
                <div key={x.l} className="rounded-lg border border-primary/20 bg-card/45 px-3 py-2 backdrop-blur">
                  <p className="text-2xl text-primary font-bold text-on-glass">{x.v}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{x.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground">
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* MANIFESTO STRIP */}
      <section className="relative py-14 surface-1 border-y border-border overflow-hidden">
        <div className="absolute inset-0 grid-bg-fine opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-5">
          {MANIFESTO.map((m, i) => (
            <Reveal key={m.kw} delay={i * 0.08} className="flex items-start gap-4">
              <div className="h-10 w-10 shrink-0 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <m.icon size={18} />
              </div>
              <div>
                <p className="font-mono text-xs text-primary uppercase tracking-widest">{m.kw}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <section className="border-b border-border bg-card/30 py-8">
        <div className="mx-auto max-w-7xl px-4 mb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center">
            Our alumni engineer at
          </p>
        </div>
        <PartnerMarquee />
      </section>

      {/* CAMPUS TOUR */}
      <CampusTour />

      {/* STATS */}

      <section className="relative py-28 overflow-hidden">
        <GridBackdrop />
        <Spotlight size={600} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// By the numbers</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              A decade of <span className="text-gradient">silicon storytelling.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group rounded-2xl border border-border bg-card/60 p-6 backdrop-blur hover:border-primary/60 hover:glow-soft transition-all relative overflow-hidden"
              >
                <span className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="relative font-display text-5xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="relative mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Live ticker */}
          <div className="mt-14 grid lg:grid-cols-[1fr_400px] gap-6">
            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// What we ship</p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                Every cohort is a small <span className="text-gradient">design house.</span>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Daily standups, peer code reviews, EDA tool licences from Cadence and Synopsys,
                weekly tape-out rehearsals. We don't lecture — we engineer.
              </p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-xs">
                {[
                  "1-on-1 mentor reviews",
                  "Industry-graded RTL repo",
                  "Tape-out simulation lab",
                  "Resume + LinkedIn audits",
                  "Mock interviews weekly",
                  "Lifetime alumni Slack",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />{x}
                  </li>
                ))}
              </ul>
            </div>
            <LiveCohortTicker />
          </div>
        </div>
      </section>

      <SectionDivider label="founder" />

      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FoundersNote />
        </div>
      </section>

      <SectionDivider label="design flow" />

      {/* DESIGN FLOW */}
      <section className="relative py-24 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Interactive</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              The complete <span className="text-gradient">VLSI design flow.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tap each stage. Live mini-animations show what happens under the hood.
            </p>
          </Reveal>
          <div className="mt-10">
            <FlowVisualizer />
          </div>
        </div>
      </section>

      <SectionDivider label="curriculum" />

      {/* COURSES PREVIEW */}
      <section className="relative py-24">
        <GridBackdrop />
        <Spotlight size={500} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <Reveal className="max-w-2xl">
              <p className="font-mono text-xs text-primary uppercase tracking-widest">// 15 modules</p>
              <h2 className="mt-3 h-display-sm font-display font-bold">
                Built for <span className="text-gradient">every silicon role.</span>
              </h2>
            </Reveal>
            <Link to="/courses" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              All courses <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1000 }}>
            {COURSES.slice(0, 6).map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <TiltCard className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:glow-soft transition-all h-full relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-primary">{String(c.number).padStart(2, "0")}</span>
                    <Cpu size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.short}</p>
                  <div className="mt-4 text-primary/40 group-hover:text-primary/80 transition-colors">
                    <MiniWaveform />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US — PILLARS */}
      <section className="relative py-24 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Why MasterVLSI</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              The unfair advantage <span className="text-gradient">our students carry.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/60 transition-all relative overflow-hidden"
              >
                <span className="font-mono text-xs text-primary/50">{p.n}</span>
                <div className="mt-3 h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <p.icon size={20} />
                </div>
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="featured playlist" />

      {/* FEATURED PLAYLIST */}
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Free YouTube content</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              Learn for free on our <span className="text-gradient">YouTube channel.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              200+ deep-dive videos on Verilog, SystemVerilog, UVM, Physical Design and STA — all from working industry mentors.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={SITE.youtubeChannel}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Play size={16} /> Subscribe
                </a>
              </Magnetic>
              <Magnetic>
                <Link to="/playlists" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm hover:border-primary/60 hover:text-primary">
                  Browse all playlists
                </Link>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-4">
              {PLAYLISTS.slice(0, 2).map((p, i) => (
                <PosterPlaylistCard key={p.id} p={p} idx={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider label="alumni" />

      {/* TESTIMONIAL */}
      <section className="relative py-24 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-10">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Alumni</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              From cohort to <span className="text-gradient">offer letter.</span>
            </h2>
          </Reveal>
          <TestimonialCarousel />
          <div className="mt-8 text-center">
            <Link to="/placements" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              See all placement stories <ArrowRight size={14} />
            </Link>
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
              Common <span className="text-gradient">questions.</span>
            </h2>
          </Reveal>
          <div className="mt-10">
            <FaqAccordion items={FAQ_HOME} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-10 sm:p-16 glow-soft relative overflow-hidden">
            <div className="absolute inset-0 grid-bg-fine opacity-30 pointer-events-none" />
            <h2 className="relative h-display-sm font-display font-bold">
              Ready to <span className="text-gradient">tape-out your career?</span>
            </h2>
            <p className="relative mt-4 text-muted-foreground max-w-xl mx-auto">
              Book a complimentary demo class. See our pedagogy, meet the mentors, tour the lab — all in 60 minutes.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Link to="/demo" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red">
                  Book free demo <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm hover:border-primary/60 hover:text-primary">
                  Talk to a counsellor
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
