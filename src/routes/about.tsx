import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Counter } from "@/components/Counter";
import { STATS } from "@/data/site";
import { Target, Eye, Heart, Award } from "lucide-react";

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
  { year: "2015", title: "Founded", desc: "Started as a 12-student weekend cohort in Bengaluru." },
  { year: "2018", title: "1000+ Alumni", desc: "Crossed our first major milestone." },
  { year: "2020", title: "24/7 Online Lab", desc: "Pivoted to remote-first with full tool access." },
  { year: "2023", title: "5000+ Engineers Placed", desc: "Across Intel, AMD, NVIDIA, Qualcomm and more." },
  { year: "2026", title: "Global Cohort", desc: "Students from 14 countries learning live with us." },
];

function About() {
  return (
    <>
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// About</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold leading-tight">
              We build the engineers who <span className="text-gradient">build the chips.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              MasterVLSI started as a small mentor circle in 2015. A decade later we've trained 5000+
              engineers across India, the US, Europe and APAC. We obsess over one outcome: getting
              you into a real VLSI role at a real company in record time.
            </p>
          </motion.div>

          <div className="mt-16 grid md:grid-cols-2 gap-5">
            {[
              { icon: Target, title: "Our mission", text: "Make world-class VLSI education accessible, hands-on, and outcome-driven." },
              { icon: Eye, title: "Our vision", text: "Become the global default for chip-design talent training by 2030." },
              { icon: Heart, title: "Our values", text: "Honest mentorship. No shortcuts. Career-long support." },
              { icon: Award, title: "Our proof", text: "5000+ alumni at 30+ marquee silicon companies." },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <b.icon size={20} />
                </div>
                <h3 className="font-display text-xl font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl sm:text-5xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// Timeline</p>
          <h2 className="mt-3 font-display text-4xl font-bold">A decade in 5 beats.</h2>
          <div className="mt-12 relative pl-8 border-l-2 border-border">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="mb-10 relative"
              >
                <div className="absolute -left-[42px] top-1 h-4 w-4 rounded-full bg-primary glow-red" />
                <p className="font-mono text-xs text-primary uppercase tracking-widest">{t.year}</p>
                <h3 className="mt-1 font-display text-2xl font-bold">{t.title}</h3>
                <p className="mt-1 text-muted-foreground">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
