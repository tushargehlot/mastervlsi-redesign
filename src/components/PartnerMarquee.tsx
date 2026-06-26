import { PARTNERS } from "@/data/partners";

export function PartnerMarquee() {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <div className="relative w-full overflow-hidden mask-fade-x py-2">
      <div className="flex gap-3 animate-marquee w-max">
        {list.map((p, i) => (
          <div
            key={i}
            className="shrink-0 rounded-lg border border-border/70 bg-gradient-to-b from-card to-background/40 backdrop-blur px-6 py-3.5 text-sm font-mono tracking-tight text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-[0_0_24px_-8px_oklch(0.66_0.24_25/0.5)] transition-all"
          >
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
