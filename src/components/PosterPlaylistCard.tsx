import { motion } from "framer-motion";
import { Play, Clock, ListVideo, ExternalLink } from "lucide-react";
import type { Playlist } from "@/data/playlists";
import { CHANNEL_URL } from "@/data/playlists";

const ACCENT: Record<Playlist["accent"], { from: string; to: string; ring: string }> = {
  crimson: { from: "from-primary/30", to: "to-rose-500/10", ring: "ring-primary/40" },
  amber:   { from: "from-amber-500/30", to: "to-orange-500/10", ring: "ring-amber-400/40" },
  cyan:    { from: "from-cyan-500/30", to: "to-blue-500/10", ring: "ring-cyan-400/40" },
  violet:  { from: "from-violet-500/30", to: "to-fuchsia-500/10", ring: "ring-violet-400/40" },
};

/**
 * Rich poster card — replaces the unreliable YouTube iframe with an
 * always-rendering, on-brand visual that opens the channel in a new tab.
 */
export function PosterPlaylistCard({ p, idx }: { p: Playlist; idx: number }) {
  const a = ACCENT[p.accent];
  const href = p.listId
    ? `https://www.youtube.com/playlist?list=${p.listId}`
    : CHANNEL_URL;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{ y: -6 }}
      className={`group block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all ring-1 ${a.ring} hover:shadow-elevated`}
    >
      {/* Poster */}
      <div className={`relative aspect-video bg-gradient-to-br ${a.from} ${a.to} overflow-hidden`}>
        {/* circuit decoration */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 225" fill="none" aria-hidden>
          <defs>
            <pattern id={`grid-${p.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" stroke="currentColor" strokeWidth="0.5" className="text-white/15" />
            </pattern>
          </defs>
          <rect width="400" height="225" fill={`url(#grid-${p.id})`} />
          <g className="text-white/40">
            <path d="M40 60h120l30 30h150" stroke="currentColor" strokeWidth="1.2" fill="none" strokeDasharray="2 4" />
            <path d="M40 150h80l40-40h200" stroke="currentColor" strokeWidth="1.2" fill="none" strokeDasharray="2 4" />
            <circle cx="160" cy="60" r="3" fill="currentColor" />
            <circle cx="190" cy="90" r="3" fill="currentColor" />
            <circle cx="120" cy="150" r="3" fill="currentColor" />
            <circle cx="160" cy="110" r="3" fill="currentColor" />
          </g>
        </svg>

        {/* Title overlay */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-black/60 backdrop-blur text-white border border-white/10">
              {p.category} · {p.level}
            </span>
            <ExternalLink size={14} className="text-white/70 group-hover:text-white" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {p.title}
            </h3>
            <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-white/80">
              <span className="flex items-center gap-1"><ListVideo size={11} /> {p.videoCount} videos</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {p.hours} hrs</span>
            </div>
          </div>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-14 w-14 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-transform shadow-elevated">
            <Play size={22} className="text-primary-foreground translate-x-[1px]" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="p-5 bg-card">
        <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
        <p className="mt-3 text-[11px] font-mono text-primary inline-flex items-center gap-1">
          Open on YouTube <ExternalLink size={10} />
        </p>
      </div>
    </motion.a>
  );
}
