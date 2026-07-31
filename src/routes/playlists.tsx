import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PLAYLISTS } from "@/data/playlists";
import { SITE } from "@/data/site";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Spotlight } from "@/components/fx/Spotlight";
import { Reveal } from "@/components/fx/Reveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { SectionDivider } from "@/components/vlsi/SectionDivider";
import { PosterPlaylistCard } from "@/components/PosterPlaylistCard";
import { Glossary } from "@/components/interactive/Glossary";
import { Play, ExternalLink } from "lucide-react";


export const Route = createFileRoute("/playlists")({
  head: () => ({
    meta: [
      { title: "Free VLSI YouTube Playlists — Verilog, SystemVerilog, UVM | MasterVLSI" },
      { name: "description", content: "200+ free VLSI tutorial videos organised by topic: Verilog, SystemVerilog, UVM, Design Verification and interview prep from working industry mentors in Bangalore." },
      { property: "og:title", content: "Free VLSI Video Tutorials — MasterVLSI" },
      { property: "og:description", content: "Curated playlists from our YouTube channel @mastervlsi2526." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.mastervlsi.com/playlists" },
    ],
    links: [{ rel: "canonical", href: "https://www.mastervlsi.com/playlists" }],
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
              200+ videos, organised by topic. Verilog basics through to UVM, Design Verification and full interview prep —
              all from working industry mentors. Start anywhere, work at your own pace.
            </p>
            <Magnetic className="mt-6 inline-block">
              <a
                href={SITE.youtubeChannel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <PosterPlaylistCard key={p.id} p={p} idx={i} />
          ))}
        </div>
      </section>

      <SectionDivider label="cheatsheet" />

      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Glossary />
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
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
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
