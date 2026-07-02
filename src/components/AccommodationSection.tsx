import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Home, MapPin, Users, ShieldCheck, Wifi, Utensils } from "lucide-react";
import { COLIVING_PG, GIRLS_PG, BOYS_PG, type PG } from "@/data/accommodation";
import { Reveal } from "@/components/fx/Reveal";

const TABS = [
  { key: "coliving", label: "Co-living", icon: Users, list: COLIVING_PG },
  { key: "girls", label: "Girls", icon: ShieldCheck, list: GIRLS_PG },
  { key: "boys", label: "Boys", icon: Home, list: BOYS_PG },
] as const;

const AMENITIES = [
  { icon: Wifi, label: "High-speed Wi-Fi" },
  { icon: Utensils, label: "3 meals · veg / non-veg" },
  { icon: ShieldCheck, label: "24×7 CCTV & security" },
  { icon: Home, label: "AC & non-AC rooms" },
];

function PgCard({ pg }: { pg: PG }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group relative rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all overflow-hidden"
    >
      <span
        className="absolute inset-x-0 top-0 h-px opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ background: "var(--gradient-ignite)" }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-display font-bold text-sm sm:text-base truncate">{pg.name}</h4>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] font-mono text-primary uppercase tracking-widest">
            <MapPin size={10} /> {pg.distance}
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" /> verified
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {pg.phones.map((p) => (
          <a
            key={p}
            href={`tel:+91${p.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 font-mono text-[11px] hover:border-primary/60 hover:text-primary transition"
          >
            <Phone size={10} /> +91 {p}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export function AccommodationSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("coliving");
  const active = TABS.find((t) => t.key === tab)!;

  return (
    <section className="relative py-20 sm:py-24 border-y border-border overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 grid-bg-fine"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// Accommodation</p>
          <h2 className="mt-3 h-display-sm font-display font-bold">
            Verified PGs <span className="text-gradient-ignite">10 m – 200 m</span> from the campus.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            15+ hand-picked co-living, boys and girls PGs — all within walking distance. We do the vetting;
            you focus on the labs.
          </p>
        </Reveal>

        {/* Amenities strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AMENITIES.map((a) => (
            <div
              key={a.label}
              className="rounded-xl border border-border bg-card/70 backdrop-blur px-3 py-3 flex items-center gap-2.5"
            >
              <span className="h-8 w-8 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <a.icon size={14} />
              </span>
              <span className="text-xs sm:text-sm font-medium">{a.label}</span>
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div
          role="tablist"
          className="mt-10 inline-flex p-1 rounded-xl border border-border bg-card overflow-x-auto max-w-full"
        >
          {TABS.map((t) => {
            const isActive = t.key === tab;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.key)}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="pg-tab"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--gradient-ignite)" }}
                    transition={{ type: "spring", stiffness: 340, damping: 32 }}
                  />
                )}
                <t.icon size={14} className="relative" />
                <span className="relative">
                  {t.label}
                  <span className="ml-1.5 font-mono text-[10px] opacity-70">({t.list.length})</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* PG grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {active.list.map((pg) => (
              <PgCard key={pg.name + tab} pg={pg} />
            ))}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-xs text-muted-foreground font-mono">
          * Room availability & rent vary — please call the PG directly to confirm.
        </p>
      </div>
    </section>
  );
}
