import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Cpu, GraduationCap } from "lucide-react";
import { Hero3D } from "@/components/Hero3D";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Counter } from "@/components/Counter";
import { FlowVisualizer } from "@/components/FlowVisualizer";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { TiltCard } from "@/components/TiltCard";
import { COURSES } from "@/data/courses";
import { STATS, SITE } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MasterVLSI — Train. Tape-out. Get Placed." },
      { name: "description", content: "Premier VLSI training with 24/7 lab access, real-time mentors and placement within 30–45 days of joining." },
      { property: "og:title", content: "MasterVLSI — Premier VLSI Training" },
      { property: "og:description", content: "From RTL to GDSII — fueling careers with precision placements." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <GridBackdrop />
        <Hero3D />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1.5 text-xs font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">Cohort 2026 — Enrolling Now</span>
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              <span className="text-gradient">Master VLSI.</span>
              <br />
              <span className="text-foreground">Engineer the silicon</span>
              <br />
              <span className="text-foreground/70">that runs the world.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Industry-aligned training across RTL, Verification, Physical Design, DFT, STA & Low Power.
              Real mentors. 24/7 lab. Placement within 30–45 days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/demo"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
              >
                Book a Free Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/playlists"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 backdrop-blur px-6 py-3 text-sm font-medium hover:border-primary/60 hover:text-primary"
              >
                <Play size={16} /> Watch on YouTube
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 max-w-md gap-6 font-mono">
              {[
                { v: "30-45", l: "Days to placement" },
                { v: "6 mo", l: "Course duration" },
                { v: "24/7", l: "Lab access" },
              ].map((x) => (
                <div key={x.l}>
                  <p className="text-2xl text-primary font-bold">{x.v}</p>
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

      {/* PARTNER MARQUEE */}
      <section className="border-y border-border bg-card/30 py-6">
        <div className="mx-auto max-w-7xl px-4 mb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center">
            Our alumni engineer at
          </p>
        </div>
        <PartnerMarquee />
      </section>

      {/* STATS */}
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// By the numbers</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              A decade of <span className="text-gradient">silicon storytelling.</span>
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur hover:border-primary/50 hover:glow-red transition-all"
              >
                <p className="font-display text-5xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN FLOW */}
      <section className="relative py-24 bg-card/20 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Interactive</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              The complete <span className="text-gradient">VLSI design flow.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tap each stage to learn what you'll master at MasterVLSI.
            </p>
          </div>
          <div className="mt-10">
            <FlowVisualizer />
          </div>
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-xs text-primary uppercase tracking-widest">// 15 services</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
                Built for <span className="text-gradient">every silicon role.</span>
              </h2>
            </div>
            <Link to="/courses" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              All courses <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1000 }}>
            {COURSES.slice(0, 6).map((c) => (
              <TiltCard key={c.id} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:glow-red transition-all">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-primary">0{c.number}</span>
                  <Cpu size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.short}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PLAYLIST */}
      <section className="relative py-24 bg-card/20 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Free YouTube content</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              Learn for free on our <span className="text-gradient">YouTube channel.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              200+ deep-dive videos on Verilog, SystemVerilog, UVM, Physical Design and STA — all from working industry mentors.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={SITE.youtubeChannel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Play size={16} /> Subscribe
              </a>
              <Link to="/playlists" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm hover:border-primary/60 hover:text-primary">
                Browse all playlists
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-border glow-red">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed?listType=user_uploads&list=mastervlsi2526"
                title="MasterVLSI featured playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="absolute -top-3 -left-3 font-mono text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded">
              ● LIVE
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Why MasterVLSI</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              The unfair advantage <span className="text-gradient">our students carry.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Zap, title: "30-45 day placements", desc: "Industry alignment so tight that companies hire from us on rolling basis." },
              { icon: Sparkles, title: "24/7 lab access", desc: "Tool licenses + servers running round-the-clock. Practice when inspiration strikes." },
              { icon: GraduationCap, title: "Post-placement support", desc: "We mentor for the first year on the job — through promotions, switches, raises." },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-7 hover:border-primary/60 transition-all">
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <b.icon size={20} />
                </div>
                <h3 className="font-display text-xl font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-10 sm:p-16 glow-red">
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              Ready to <span className="text-gradient">tape-out your career?</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Book a complimentary demo class. See our pedagogy, meet the mentors, tour the lab — all in 60 minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/demo" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Book free demo <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm hover:border-primary/60 hover:text-primary">
                Talk to a counsellor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
