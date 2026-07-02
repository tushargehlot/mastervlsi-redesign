import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Counter } from "@/components/Counter";
import { Spotlight } from "@/components/fx/Spotlight";
import { Reveal } from "@/components/fx/Reveal";
import { SectionDivider } from "@/components/vlsi/SectionDivider";
import { STATS } from "@/data/site";
import { Target, Eye, Heart, Award, Check, X } from "lucide-react";
import { MentorWall } from "@/components/interactive/MentorWall";
import { AccommodationSection } from "@/components/AccommodationSection";
import { CampusReach } from "@/components/CampusReach";
import { HeroBackdrop } from "@/components/HeroBackdrop";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MasterVLSI" },
      { name: "description", content: "10+ years of VLSI excellence. Real-time mentors, industry-aligned curriculum, 5000+ alumni." },
      { property: "og:title", content: "About MasterVLSI" },
      { property: "og:description", content: "A decade of placing engineers at the world's top silicon companies." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { year: "2015", title: "Founded", desc: "Started as a 12-student weekend cohort in Bengaluru with two senior engineers and a borrowed lab." },
  { year: "2017", title: "First Intel offer", desc: "An alumna joins Intel's DV team — our first marquee placement and our first written testimonial." },
  { year: "2018", title: "1000+ Alumni", desc: "Crossed our first major milestone with curated cohorts across DV, RTL and PD tracks." },
  { year: "2020", title: "24/7 Online Lab", desc: "Pivoted to remote-first with full EDA tool access for every enrolled student, no geographic limits." },
  { year: "2022", title: "Services arm launched", desc: "Began delivering NDA-grade RTL & DV engagements to fabless startups in addition to training." },
  { year: "2023", title: "5000+ engineers placed", desc: "Across Intel, AMD, NVIDIA, Qualcomm, Synopsys, Cadence and 25 more." },
  { year: "2026", title: "Global Cohort", desc: "Students from 14 countries learning live with us, with placement support across India, US and APAC." },
];

const TOOLS = [
  "Synopsys VCS", "Cadence Xcelium", "Mentor Questa",
  "Synopsys Design Compiler", "Cadence Genus", "Synopsys ICC2",
  "Cadence Innovus", "Synopsys PrimeTime", "Cadence Tempus",
  "Mentor Calibre", "Synopsys Formality", "Cadence Conformal",
];

const COMPARE = [
  { row: "Mentor-to-student ratio", us: "1 : 6", them: "1 : 40+" },
  { row: "Lab access", us: "24 / 7", them: "Scheduled slots only" },
  { row: "Tool licenses", us: "Industry-grade EDA", them: "Open-source / FPGA boards" },
  { row: "Mock interviews", us: "Weekly, by hiring engineers", them: "Group prep sessions" },
  { row: "Placement window", us: "30–45 days post completion", them: "Self-driven, weeks–months" },
  { row: "Post-placement support", us: "First year on the job", them: "None" },
];

function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-28 overflow-hidden">
        <GridBackdrop />
        <Spotlight size={700} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// About</p>
            <h1 className="mt-3 h-display font-display font-bold leading-[0.95]">
              We build the engineers who <span className="text-gradient">build the chips.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              MasterVLSI started in 2015 as a small mentor circle. A decade later we've trained 5000+
              engineers across India, the US, Europe and APAC. We obsess over one outcome: getting
              you into a real VLSI role at a real company in record time.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 grid md:grid-cols-2 gap-5">
            {[
              { icon: Target, title: "Our mission", text: "Make world-class VLSI education accessible, hands-on, and outcome-driven — for every serious engineer regardless of pedigree." },
              { icon: Eye, title: "Our vision", text: "Become the global default for chip-design talent training by 2030, with alumni shipping silicon at every major foundry-bound company." },
              { icon: Heart, title: "Our values", text: "Honest mentorship. No shortcuts. Career-long support. We pick up the call after you've graduated, signed and shipped." },
              { icon: Award, title: "Our proof", text: "5000+ alumni at 30+ marquee silicon companies. 4.9★ average Google review across 200+ verified reviewers." },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-7 hover:border-primary/40 transition-all">
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <b.icon size={20} />
                </div>
                <h3 className="font-display text-xl font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <SectionDivider label="by the numbers" />

      <section className="relative py-20 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center rounded-2xl border border-border bg-background/40 p-6">
                <p className="font-display text-4xl sm:text-5xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          <Reveal className="lg:col-span-2">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Methodology</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              How a MasterVLSI cohort <span className="text-gradient">actually runs.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              We don't believe in tutorial-style learning. Every concept is taught against a real artifact you build —
              a UART, a DMA, a 32-bit pipelined adder, a floorplan, a UVM testbench. By the end of the cohort, you have
              not a certificate — a portfolio.
            </p>
          </Reveal>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {[
              { n: "01", t: "Live, capped batches", d: "Max 12 students. Cameras on. Mentor knows your name and your last bug." },
              { n: "02", t: "Lab-first delivery", d: "We open the EDA tool before opening a slide. Theory follows the keystroke." },
              { n: "03", t: "Graded weekly labs", d: "Every assignment is reviewed line-by-line. No 'completion' — only quality." },
              { n: "04", t: "1-on-1 design reviews", d: "Senior engineers review your RTL/testbench like a real PR — comments, requested changes, sign-off." },
            ].map((m) => (
              <div key={m.n} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-xs text-primary">{m.n}</span>
                <h3 className="mt-2 font-display font-bold text-lg">{m.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="relative py-20 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Industry tools</p>
            <h2 className="mt-3 h-display-sm font-display font-bold max-w-2xl">
              You'll graduate on the same EDA stack <span className="text-gradient">your manager uses.</span>
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <span key={t} className="font-mono text-xs px-3.5 py-2 rounded-md border border-border bg-card hover:border-primary/60 hover:text-primary transition">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="relative py-24">
        <GridBackdrop />
        <Spotlight size={600} />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Honest comparison</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              MasterVLSI vs <span className="text-gradient">a typical bootcamp.</span>
            </h2>
          </Reveal>
          <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-3 px-6 py-4 border-b border-border bg-surface-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span></span>
              <span className="text-primary text-center">MasterVLSI</span>
              <span className="text-center">Typical bootcamp</span>
            </div>
            {COMPARE.map((r, i) => (
              <div key={r.row} className={`grid grid-cols-3 px-6 py-5 items-center text-sm ${i % 2 ? "bg-background/40" : ""}`}>
                <span className="text-muted-foreground">{r.row}</span>
                <span className="text-center font-semibold flex items-center justify-center gap-2">
                  <Check size={16} className="text-primary" /> {r.us}
                </span>
                <span className="text-center text-muted-foreground flex items-center justify-center gap-2">
                  <X size={16} className="text-muted-foreground/60" /> {r.them}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative py-24 surface-1 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Timeline</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">A decade etched in silicon.</h2>
          </Reveal>
          <div className="mt-14 relative pl-8 border-l-2 border-border">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="mb-10 relative"
              >
                <div className="absolute -left-[42px] top-1 h-4 w-4 rounded-full bg-primary glow-red ring-4 ring-background" />
                <p className="font-mono text-xs text-primary uppercase tracking-widest">{t.year}</p>
                <h3 className="mt-1 font-display text-2xl font-bold">{t.title}</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="mentors" />

      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-10">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// The bench</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              Engineers who <span className="text-gradient">tape out silicon</span> — not lecturers.
            </h2>
            <p className="mt-4 text-muted-foreground">Hover any card to see specialties. Every mentor still works on production silicon.</p>
          </Reveal>
          <MentorWall />
        </div>
      </section>
    </>
  );
}
