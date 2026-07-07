import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Layers, Waves, Shapes } from "lucide-react";
import { TRACKS } from "@/data/courses";
import { Reveal } from "@/components/fx/Reveal";

const ICONS = {
  "physical-design": Layers,
  "rtl-design": Cpu,
  "design-verification": Shapes,
  "analog-design": Waves,
} as const;

export function TracksOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {TRACKS.map((t, i) => {
        const Icon = ICONS[t.slug as keyof typeof ICONS] ?? Cpu;
        return (
          <Reveal key={t.id} delay={i * 0.05}>
            <Link
              to="/courses"
              className="group block h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:shadow-[0_16px_40px_-20px_rgba(15,47,92,0.25)] transition-all relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {t.duration} · {t.formats.length} formats
                    </p>
                    <h3 className="font-display text-xl font-bold">{t.name}</h3>
                  </div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </div>
              <p className="relative mt-4 text-sm text-muted-foreground leading-relaxed">{t.blurb}</p>

              {t.subtracks && (
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {t.subtracks.map((s) => (
                    <span key={s} className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono bg-accent/10 text-accent">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div className="relative mt-4 flex flex-wrap gap-1.5">
                {t.formats.map((f) => (
                  <span key={f} className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono border border-border text-muted-foreground">
                    {f}
                  </span>
                ))}
              </div>

              <div className="relative mt-5 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Hires at:</span>
                <span className="truncate">{t.targetCompanies.slice(0, 4).join(", ")}…</span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
