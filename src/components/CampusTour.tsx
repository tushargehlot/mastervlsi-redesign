import { useState } from "react";
import { motion } from "framer-motion";
import { Play, MapPin, Wifi, Coffee, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import { SITE } from "@/data/site";

const CAMPUS_VIDEO_ID = "GEBNnsaYTvw";

const HIGHLIGHTS = [
  { icon: MapPin, t: "450m from Krishnarajapuram railway station" },
  { icon: Wifi, t: "24×7 lab with Cadence / Synopsys / Mentor tool licences" },
  { icon: ShieldCheck, t: "CCTV-secured floor, dedicated PG accommodations nearby" },
  { icon: Coffee, t: "Founders on floor · walk into Nitesh Sir's cabin anytime" },
];

export function CampusTour() {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${CAMPUS_VIDEO_ID}/maxresdefault.jpg`;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-silicon)" }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// Take the tour</p>
          <h2 className="mt-3 h-display-sm font-display font-bold">
            Walk through the <span className="text-gradient">MasterVLSI campus.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            The lab where 5000+ engineers wrote their first testbench, taped out their first block,
            and signed their first offer letter. Full walkthrough – 90 seconds.
          </p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-elevated group bg-black"
          >
            {play ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${CAMPUS_VIDEO_ID}?autoplay=1&rel=0`}
                title="MasterVLSI Campus Tour"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setPlay(true)}
                aria-label="Play MasterVLSI campus tour"
                className="absolute inset-0"
              >
                <img
                  src={thumb}
                  alt="MasterVLSI campus tour"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = `https://i.ytimg.com/vi/${CAMPUS_VIDEO_ID}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="h-20 w-20 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform">
                    <Play size={28} className="ml-1.5" fill="currentColor" />
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/70">// 01:32</p>
                  <p className="mt-1 font-display text-white text-lg sm:text-xl font-bold drop-shadow">
                    Inside MasterVLSI – Bengaluru
                  </p>
                </div>
              </button>
            )}
          </motion.div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Campus at a glance</p>
            <h3 className="mt-2 font-display text-xl font-bold leading-tight">
              Bangalore · Udayanagar · Tin-Factory
            </h3>
            <ul className="mt-5 space-y-3">
              {HIGHLIGHTS.map((h) => (
                <li key={h.t} className="flex items-start gap-3">
                  <span className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <h.icon size={14} />
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.t}</p>
                </li>
              ))}
            </ul>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-surface-1 px-4 py-2.5 text-xs font-mono hover:border-primary hover:text-primary transition"
            >
              <MapPin size={12} /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
