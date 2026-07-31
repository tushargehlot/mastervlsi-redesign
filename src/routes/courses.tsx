import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { COURSES, TRACKS } from "@/data/courses";
import { GridBackdrop } from "@/components/GridBackdrop";
import { TiltCard } from "@/components/TiltCard";
import { Search, Cpu, ArrowRight } from "lucide-react";
import { CostCalc } from "@/components/interactive/CostCalc";
import { Quiz } from "@/components/interactive/Quiz";
import { SectionDivider } from "@/components/vlsi/SectionDivider";
import { TracksOverview } from "@/components/TracksOverview";
import { ProtocolMatrix } from "@/components/ProtocolMatrix";
import { Reveal } from "@/components/fx/Reveal";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "VLSI Courses in Bangalore – RTL, UVM, DV, FPGA | MasterVLSI" },
      { name: "description", content: "VLSI institute in Bangalore offering RTL Design, Design Verification (UVM), FPGA, SoC, CDC, IP and AMS training. 15 modules, industry mentors, placement in 30–45 days." },
      { property: "og:title", content: "VLSI Courses in Bangalore – RTL & Design Verification" },
      { property: "og:description", content: "Pick the silicon track that fits your career – hands-on, mentor-led, placement-aligned." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.mastervlsi.com/courses" },
    ],
    links: [{ rel: "canonical", href: "https://www.mastervlsi.com/courses" }],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "MasterVLSI Course Modules",
          itemListElement: COURSES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Course",
              name: c.title,
              description: c.long,
              provider: { "@type": "Organization", name: "MasterVLSI" },
            },
          })),
        }),
      },
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
    <>
    <section className="relative pt-28 pb-16">
      <GridBackdrop />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// {TRACKS.length} tracks · {COURSES.length} modules · 14 protocols</p>
          <h1 className="mt-3 h-display font-display font-bold">
            Your <span className="text-gradient">silicon syllabus.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Three headline tracks – RTL Design, Design & Verification, Analog Design – each with basic, advance, and internship formats.
          </p>
        </div>
      </div>
    </section>

    <section className="relative pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// Headline tracks</p>
          <h2 className="mt-2 h-display-sm font-display font-bold">Pick your track.</h2>
        </Reveal>
        <div className="mt-8"><TracksOverview /></div>
      </div>
    </section>

    <SectionDivider label="protocols" />

    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// 14 protocols</p>
            <h2 className="mt-2 h-display-sm font-display font-bold">
              Every protocol <span className="text-gradient">on modern silicon.</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-8"><ProtocolMatrix /></div>
        <div className="mt-8 text-center">
          <Link to="/courses/protocols" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-semibold">
            Deep-dive on every protocol <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>

    <SectionDivider label="all modules" />

    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// {COURSES.length} modules</p>
          <h2 className="mt-2 h-display-sm font-display font-bold">All course modules.</h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              aria-label="Search course modules"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search modules…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-card border border-border text-sm focus:border-primary focus:outline-none"
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

    <SectionDivider label="planner" />

    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
        <Quiz />
        <CostCalc />
      </div>
    </section>
    </>
  );
}
