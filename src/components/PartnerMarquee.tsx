import { PARTNERS, logoUrl, initials } from "@/data/partners";

export function PartnerMarquee() {
  const list = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <div className="relative w-full overflow-hidden mask-fade-x py-3">
      <div className="flex gap-6 animate-marquee w-max items-center">
        {list.map((p, i) => {
          const src = logoUrl(p.domain);
          return (
            <div
              key={`${p.name}-${i}`}
              className="h-10 w-10 shrink-0 rounded-lg border border-border/50 bg-card/40 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
            >
              <img
                src={src}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-contain p-1"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <span className="absolute font-mono text-[9px] font-bold text-primary/50 pointer-events-none">
                {initials(p.name)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
