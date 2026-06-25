import { PARTNERS } from "@/data/partners";

export function PartnerMarquee() {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <div className="relative w-full overflow-hidden mask-fade-x py-2">
      <div className="flex gap-3 animate-marquee w-max">
        {list.map((p, i) => (
          <div
            key={i}
            className="shrink-0 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
          >
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
