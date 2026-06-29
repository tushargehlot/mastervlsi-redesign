import { PARTNERS, logoUrl } from "@/data/partners";

function LogoChip({ name, domain }: { name: string; domain?: string }) {
  const src = logoUrl(domain);
  return (
    <div className="shrink-0 group h-14 min-w-[160px] rounded-lg border border-border/70 bg-card/60 backdrop-blur px-5 flex items-center gap-3 hover:border-primary/50 hover:bg-card transition-all">
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          width={28}
          height={28}
          className="h-7 w-7 object-contain rounded brightness-[1.15] grayscale group-hover:grayscale-0 transition"
          onError={(e) => ((e.currentTarget.style.display = "none"))}
        />
      ) : null}
      <span className="font-mono text-xs tracking-tight text-muted-foreground group-hover:text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function PartnerMarquee() {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <div className="relative w-full overflow-hidden mask-fade-x py-2">
      <div className="flex gap-3 animate-marquee w-max">
        {list.map((p, i) => (
          <LogoChip key={`${p.name}-${i}`} name={p.name} domain={p.domain} />
        ))}
      </div>
    </div>
  );
}
