import { PARTNERS, logoUrl } from "@/data/partners";

export function PartnerMarquee() {
  const list = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <div className="relative w-full overflow-hidden mask-fade-x py-3">
      <div className="flex gap-6 animate-marquee w-max items-center">
        {list.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="h-10 w-10 shrink-0 rounded-lg border border-border/50 bg-card/40 flex items-center justify-center overflow-hidden brightness-110 hover:brightness-125 transition-all duration-500"
          >
            <img
              src={logoUrl(p.domain)}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-contain p-1"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
