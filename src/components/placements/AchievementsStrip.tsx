import { motion } from "framer-motion";
import { Trophy, Rocket, Mail, Briefcase } from "lucide-react";

const ITEMS = [
  { icon: Briefcase, label: "Highest Career Gap", name: "Dr. Pradeep", note: "Started at MasterVLSI at 41 → now at Microchip (via UST Global)." },
  { icon: Rocket,    label: "Earliest Placement", name: "Yaswanth Verma", note: "Placed at Google · ₹50 L in 21 days after joining." },
  { icon: Mail,      label: "Most Offer Letters", name: "Harsha Reddy",   note: "30 offers across VLSI & non-VLSI roles." },
  { icon: Trophy,    label: "Highest Package",    name: "Basavaraj",      note: "₹70 LPA · settled in the UK." },
];

export function AchievementsStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ITEMS.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="group rounded-2xl border border-border bg-gradient-to-br from-card via-card to-accent/10 p-5 hover:border-accent/60 hover:shadow-elevated transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center border border-accent/30 group-hover:scale-110 transition">
              <it.icon size={18} />
            </span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{it.label}</p>
          </div>
          <p className="mt-4 font-display text-xl font-bold text-foreground">{it.name}</p>
          <p className="mt-1.5 text-xs text-muted-foreground leading-snug">{it.note}</p>
        </motion.div>
      ))}
    </div>
  );
}
