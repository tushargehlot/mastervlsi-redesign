import { motion } from "framer-motion";
import { MENTORS } from "@/data/mentors";

/** Hover-flip mentor cards — front: silhouette + name, back: specialties. */
export function MentorWall() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: 1200 }}>
      {MENTORS.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="group relative h-64 rounded-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative h-full w-full rounded-2xl transition-transform duration-700"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-card via-card to-primary/10 p-5 flex flex-col justify-between group-hover:[transform:rotateY(180deg)] transition-transform duration-700"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] px-2 py-1 rounded bg-primary/10 text-primary border border-primary/30">
                  {m.badge}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{m.years}y</span>
              </div>
              <div className="relative h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary/40 to-trace/40 flex items-center justify-center text-2xl font-display font-bold text-white shadow-elevated">
                {m.name.split(" ").map(n => n[0]).slice(0,2).join("")}
              </div>
              <div className="text-center">
                <p className="font-display font-bold">{m.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.role}</p>
                <p className="text-[11px] font-mono text-primary mt-1">@ {m.company}</p>
              </div>
            </div>
            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border border-primary/50 bg-gradient-to-br from-primary/20 via-card to-card p-5 flex flex-col justify-center text-center [transform:rotateY(180deg)] group-hover:[transform:rotateY(360deg)] transition-transform duration-700"
              style={{ backfaceVisibility: "hidden" }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">Specialties</p>
              <ul className="space-y-1.5">
                {m.taglines.map((t) => (
                  <li key={t} className="text-sm font-display">{t}</li>
                ))}
              </ul>
              <p className="mt-4 text-[10px] font-mono text-muted-foreground">{m.years}+ yrs · {m.company}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
