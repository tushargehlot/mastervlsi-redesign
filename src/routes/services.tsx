import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { COURSES } from "@/data/courses";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Spotlight } from "@/components/fx/Spotlight";
import { Reveal } from "@/components/fx/Reveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { SectionDivider } from "@/components/vlsi/SectionDivider";
import { MiniWaveform } from "@/components/vlsi/MiniWaveform";
import { ArrowRight, FileCheck, GitBranch, Layers, Lock, Zap, Cpu } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — MasterVLSI" },
      { name: "description", content: "End-to-end VLSI design services: RTL, DV, FPGA, SoC, PD, DFT, STA, Low Power, Post-Si, ASIC, CDC, IP, AMS, automation." },
      { property: "og:title", content: "VLSI Design Services" },
      { property: "og:description", content: "Industry-grade silicon engineering, on demand." },
    ],
  }),
  component: ServicesPage,
});

const ENGAGEMENT = [
  { icon: FileCheck, t: "Scoped SOW", d: "Tight, milestone-based statement of work. Fixed-bid or T&M." },
  { icon: Lock, t: "NDA-friendly", d: "Air-gapped environments, audit trails, IP custody from day one." },
  { icon: GitBranch, t: "PR-style delivery", d: "Reviewable commits, daily syncs, demo every sprint." },
  { icon: Zap, t: "Fast ramp", d: "Mentored teams kick off within 2 weeks of contract." },
];

const PILLARS = [
  { icon: Cpu, kw: "Frontend", t: "RTL · DV · CDC · IP" },
  { icon: Layers, kw: "Backend", t: "PD · DFT · STA · Low Power" },
  { icon: Zap, kw: "Specialty", t: "AMS · Post-Si · Automation" },
];

function ServicesPage() {
  return (
    <>
      <section className="relative py-28 overflow-hidden">
        <GridBackdrop />
        <Spotlight size={700} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// For companies</p>
            <h1 className="mt-3 h-display font-display font-bold">
              Silicon engineering, <span className="text-gradient">on demand.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Beyond training, MasterVLSI partners with semiconductor companies and fabless startups on
              full-flow VLSI engagements — from architecture exploration to tape-out — with deliverables
              you can drop into your repo and ship.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-12 grid sm:grid-cols-3 gap-4">
            {PILLARS.map((p) => (
              <div key={p.kw} className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4 hover:border-primary/40 transition">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <p.icon size={22} />
                </div>
                <div>
                  <p className="font-mono text-xs text-primary uppercase tracking-widest">{p.kw}</p>
                  <p className="font-display font-semibold mt-0.5">{p.t}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <SectionDivider label="capabilities" />

      <section className="relative py-24 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            {COURSES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:glow-soft transition-all relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold">
                    {String(c.number).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-bold">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.long}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-secondary/60 border border-border">{t}</span>
                  ))}
                </div>
                <div className="mt-4 text-primary/30 group-hover:text-primary/70 transition-colors">
                  <MiniWaveform />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="engagement model" />

      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// How we work</p>
            <h2 className="mt-3 h-display-sm font-display font-bold">
              Predictable delivery, <span className="text-gradient">silicon-grade rigour.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENGAGEMENT.map((e, i) => (
              <motion.div
                key={e.t}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <e.icon size={18} />
                </div>
                <h3 className="font-display text-lg font-bold">{e.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-10 sm:p-14 text-center glow-soft relative overflow-hidden">
            <div className="absolute inset-0 grid-bg-fine opacity-30 pointer-events-none" />
            <h2 className="relative h-display-sm font-display font-bold">
              Have a silicon project? <span className="text-gradient">Let's talk.</span>
            </h2>
            <p className="relative mt-3 text-muted-foreground max-w-xl mx-auto">
              NDA-friendly, milestone-based engagement. We respond within a business day.
            </p>
            <Magnetic className="relative mt-8">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red">
                Start a conversation <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
