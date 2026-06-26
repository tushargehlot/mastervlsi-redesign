import { motion } from "framer-motion";
import { PLACEMENT_STEPS } from "@/data/placements";

export function PlacementJourney() {
  return (
    <div className="relative">
      {/* connector trace */}
      <svg
        aria-hidden
        className="absolute left-0 right-0 top-12 hidden lg:block"
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
        height="40"
      >
        <motion.path
          d="M 60 20 H 940"
          stroke="url(#journeyGrad)"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="journeyGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.22 22 / 0.2)" />
            <stop offset="100%" stopColor="oklch(0.66 0.24 25 / 0.9)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
        {PLACEMENT_STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative"
          >
            <div className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 hover:border-primary/60 hover:glow-soft transition-all relative">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-trace flex items-center justify-center font-display font-bold text-primary-foreground mb-4">
                {s.n}
              </div>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
            {/* solder pad over the trace */}
            <div className="hidden lg:block absolute -top-1.5 left-9 h-5 w-5 rounded-full bg-primary glow-red ring-4 ring-background" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
