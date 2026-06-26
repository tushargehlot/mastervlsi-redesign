import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";
import { VIDEO_TESTIMONIALS } from "@/data/placements";
import { SITE } from "@/data/site";

export function VideoTestimonialGrid() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {VIDEO_TESTIMONIALS.map((t, i) => {
        const isOpen = active === t.id;
        const thumb = t.videoId
          ? `https://i.ytimg.com/vi/${t.videoId}/hqdefault.jpg`
          : null;
        return (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-video bg-black overflow-hidden">
              {isOpen && t.videoId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${t.videoId}?autoplay=1`}
                  title={t.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => (t.videoId ? setActive(t.id) : window.open(SITE.youtubeChannel, "_blank"))}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={`Play testimonial from ${t.name}`}
                >
                  {thumb ? (
                    <img src={thumb} alt={t.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-card to-card" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="relative z-10 h-16 w-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-2xl animate-pulse-ring group-hover:scale-110 transition-transform">
                    <Play size={24} className="ml-1" fill="currentColor" />
                  </span>
                </button>
              )}
            </div>
            <div className="p-5">
              <Quote size={16} className="text-primary mb-2" />
              <p className="text-sm text-foreground leading-snug line-clamp-3">"{t.quote}"</p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-display font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {t.role} · <span className="text-primary">{t.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
