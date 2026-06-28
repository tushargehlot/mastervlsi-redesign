import { motion } from "framer-motion";

const ITEMS = [
  "🎓  Priya joined the DV cohort · 2m ago",
  "💼  Rohan placed @ NVIDIA · ₹24 LPA · 8m ago",
  "🎓  Sneha joined the RTL cohort · 14m ago",
  "💼  Karthik placed @ AMD · ₹19 LPA · 22m ago",
  "📝  43 new demo bookings this week",
  "💼  Anu placed @ Qualcomm · ₹22 LPA · 1h ago",
  "🎓  Vikram joined the PD-STA Sprint · 1h ago",
  "🏆  Cohort 24 hits 97% placement rate",
];

/** Mocked live activity ticker — vertical marquee inside a chip-style frame. */
export function LiveCohortTicker() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">live activity</p>
        </div>
        <p className="font-mono text-[10px] text-emerald-400">streaming</p>
      </div>
      <div className="relative h-44 overflow-hidden mask-fade-y">
        <motion.ul
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 px-5 space-y-3 py-3"
        >
          {[...ITEMS, ...ITEMS].map((t, i) => (
            <li key={i} className="text-sm font-mono text-foreground/90 border-l-2 border-primary/60 pl-3">
              {t}
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
