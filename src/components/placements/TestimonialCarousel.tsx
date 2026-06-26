import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { WRITTEN_TESTIMONIALS } from "@/data/placements";

export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const n = WRITTEN_TESTIMONIALS.length;
  const t = WRITTEN_TESTIMONIALS[i];

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % n), 7000);
    return () => clearInterval(id);
  }, [n]);

  return (
    <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card via-card to-background p-8 sm:p-12 overflow-hidden">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-trace/10 blur-3xl pointer-events-none" />

      <Quote size={48} className="text-primary/40 mb-6" />

      <AnimatePresence mode="wait">
        <motion.blockquote
          key={t.name}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.45 }}
          className="text-xl sm:text-2xl font-display font-medium leading-snug text-foreground max-w-3xl"
        >
          "{t.quote}"
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${t.name}-meta`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-trace flex items-center justify-center font-display font-bold text-primary-foreground">
              {t.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-display font-bold">{t.name}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {t.role} · <span className="text-primary">{t.company}</span>
                {t.ctc && <span className="ml-2 inline-block px-2 py-0.5 rounded bg-primary/15 text-primary">{t.ctc}</span>}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setI((v) => (v - 1 + n) % n)}
            className="h-10 w-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5 mx-2">
            {WRITTEN_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setI((v) => (v + 1) % n)}
            className="h-10 w-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
