import { PARTNERS, logoUrl } from "@/data/partners";

export function PartnerMarquee() {
  const list = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <div className="relative w-full overflow-hidden mask-fade-x py-3">
      <div className="flex gap-6 animate-marquee w-max items-center">
        {list.map((p, i) => {
          const src = logoUrl(p.domain);
          return src ? (
            <img
              key={`${p.name}-${i}`}
              src={src}
              alt={p.name}
              loading="lazy"
              className="h-10 w-auto object-contain rounded grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
