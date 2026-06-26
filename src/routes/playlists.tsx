import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PLAYLISTS } from "@/data/playlists";
import { SITE } from "@/data/site";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Spotlight } from "@/components/fx/Spotlight";
import { Reveal } from "@/components/fx/Reveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { SectionDivider } from "@/components/vlsi/SectionDivider";
import { Play, ExternalLink, Disc } from "lucide-react";

export const Route = createFileRoute("/playlists")({
  head: () => ({
    meta: [
      { title: "YouTube Playlists — MasterVLSI" },
      { name: "description", content: "Free deep-dive YouTube playlists on Verilog, UVM, Physical Design, STA, DFT and VLSI interviews." },
      { property: "og:title", content: "Free VLSI Tutorials — MasterVLSI" },
      { property: "og:description", content: "Curated playlists from our YouTube channel @mastervlsi2526." },
    ],
  }),
  component: PlaylistsPage,
});

function PlaylistsPage() {
  const cats = useMemo(() => ["All", ...Array.from(new Set(PLAYLISTS.map((p) => p.category)))], []);
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? PLAYLISTS : PLAYLISTS.filter((p) => p.category === cat);

  return (
    <>
      <section className="relative py-28 overflow-hidden">
        <GridBackdrop />
        <Spotlight size={700} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Free learning</p>
            <h1 className="mt-3 h-display font-display font-bold">
              VLSI on <span className="text-gradient">YouTube.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              200+ videos, organised by topic. Verilog basics through to UVM, PD, STA, DFT and full interview prep —
              all from working industry mentors. Start anywhere, work at your own pace.
            </p>
            <Magnetic className="mt-6 inline-block">
              <a
                href={SITE.youtubeChannel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
              >
                <Play size={14} /> Subscribe on YouTube <ExternalLink size={12} />
              </a>
            </Magnetic>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary glow-red"
                    : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="playlists" />

      <section className="relative py-20 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:glow-soft transition-all"
            >
              <div className="aspect-video bg-black relative overflow-hidden">
                {p.listId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/videoseries?list=${p.listId}`}
                    title={p.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <a
                    href={SITE.youtubeChannel}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/25 via-card to-card group-hover:from-primary/40 transition"
                  >
                    {/* Tape reel decoration */}
                    <div className="relative">
                      <Disc size={64} className="text-primary group-hover:animate-spin-slow" />
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
                    </div>
                    <span className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Watch on @mastervlsi2526
                    </span>
                  </a>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-black/70 backdrop-blur text-primary border border-primary/30">
                    {p.level}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">{p.category}</p>
                <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-10 glow-soft">
            <h2 className="h-display-sm font-display font-bold">
              200+ free videos. <span className="text-gradient">Zero excuses.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Subscribe and ring the bell — new mentor-led tutorials drop every week.
            </p>
            <Magnetic className="mt-6 inline-block">
              <a
                href={SITE.youtubeChannel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
              >
                <Play size={16} /> Open channel
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
