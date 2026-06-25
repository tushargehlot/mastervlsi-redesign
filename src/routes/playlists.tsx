import { createFileRoute } from "@tanstack/react-router";
import { PLAYLISTS } from "@/data/playlists";
import { SITE } from "@/data/site";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Play, ExternalLink } from "lucide-react";

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
  return (
    <section className="relative py-24">
      <GridBackdrop />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// Free learning</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
            VLSI on <span className="text-gradient">YouTube.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            200+ videos, organised by topic. Start anywhere, work through at your own pace.
          </p>
          <a
            href={SITE.youtubeChannel}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
          >
            <Play size={14} /> Subscribe on YouTube <ExternalLink size={12} />
          </a>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {PLAYLISTS.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/60 transition-all">
              <div className="aspect-video bg-black relative">
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
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/30 via-card to-card group-hover:from-primary/40 transition"
                  >
                    <Play size={48} className="text-primary" />
                    <span className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Watch on @mastervlsi2526
                    </span>
                  </a>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary/15 text-primary">
                    {p.level}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                    {p.category}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
