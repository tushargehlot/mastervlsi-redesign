import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ALUMNI, ALUMNI_COURSES, type Alumnus } from "@/data/alumni";

const PAGE = 24;

const initials = (n: string) =>
  n.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();


export function AlumniWall({ initialCount = PAGE }: { initialCount?: number }) {
  const [course, setCourse] = useState<(typeof ALUMNI_COURSES)[number] | "All">("All");
  const [visible, setVisible] = useState(initialCount);

  const filtered = useMemo(
    () => (course === "All" ? ALUMNI : ALUMNI.filter((a) => a.course === course)),
    [course]
  );
  const slice = filtered.slice(0, visible);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(["All", ...ALUMNI_COURSES] as const).map((c) => (
          <button
            key={c}
            onClick={() => { setCourse(c); setVisible(initialCount); }}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-all ${
              course === c
                ? "bg-primary text-primary-foreground border-primary glow-navy"
                : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {slice.map((a, i) => (
          <AlumnusCard key={a.id} a={a} i={i} />
        ))}
      </div>

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE)}
            className="rounded-md border border-border bg-card px-5 py-2.5 text-sm hover:border-primary hover:text-primary transition"
          >
            Load {Math.min(PAGE, filtered.length - visible)} more
          </button>
        </div>
      )}
    </div>
  );
}

function AlumnusCard({ a, i }: { a: Alumnus; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 12) * 0.03 }}
      className="group relative rounded-2xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-[0_10px_30px_-12px_oklch(0.60_0.20_24_/_0.22)] transition-all overflow-hidden"
    >
      <p className="font-display font-bold text-sm leading-tight truncate">{a.name}</p>
      {a.package && (
        <p className="mt-1 text-[11px] font-mono font-semibold text-primary">
          ₹{a.package}
        </p>
      )}
      {a.from_loc && (
        <p className="mt-0.5 text-[10px] text-muted-foreground truncate italic">{a.from_loc}</p>
      )}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-surface-1 to-surface-2 mt-3">
        {a.photo ? (
          <img src={a.photo} alt={`${a.name} – ${a.company}`} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { const el = e.currentTarget as HTMLImageElement; el.onerror = null; el.style.display = "none"; }} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-3xl text-primary/50">
            {initials(a.name)}
          </div>
        )}
      </div>
      {a.quote && (
        <p className="mt-2 text-[10px] text-muted-foreground line-clamp-2 italic">"{a.quote}"</p>
      )}
    </motion.article>
  );
}
