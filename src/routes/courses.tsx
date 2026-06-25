import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { COURSES } from "@/data/courses";
import { GridBackdrop } from "@/components/GridBackdrop";
import { TiltCard } from "@/components/TiltCard";
import { Search, Cpu } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — MasterVLSI" },
      { name: "description", content: "15 industry-aligned VLSI modules: RTL, DV, PD, DFT, STA, Low Power, ASIC, CDC, IP, AMS and more." },
      { property: "og:title", content: "VLSI Courses — MasterVLSI" },
      { property: "og:description", content: "Pick the silicon track that fits your career." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => Array.from(new Set(COURSES.flatMap((c) => c.tags))).sort(), []);

  const list = useMemo(
    () =>
      COURSES.filter((c) => {
        const matchQ =
          !q ||
          c.title.toLowerCase().includes(q.toLowerCase()) ||
          c.short.toLowerCase().includes(q.toLowerCase());
        const matchT = !tag || c.tags.includes(tag);
        return matchQ && matchT;
      }),
    [q, tag],
  );

  return (
    <section className="relative py-24">
      <GridBackdrop />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// 15 modules</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
            Your <span className="text-gradient">silicon syllabus.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Every module is hands-on, mentor-led, lab-backed, and aligned with what the top 30
            silicon employers actually need today.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search modules…"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-card border border-border text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${!tag ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
            >
              All
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t === tag ? null : t)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${tag === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1000 }}>
          {list.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <TiltCard className="group h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:glow-red transition-all">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-primary">{String(c.number).padStart(2, "0")}</span>
                  <Cpu size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.long}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
