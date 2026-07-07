import { PROTOCOLS, PROTOCOL_FAMILIES } from "@/data/protocols";
import { Reveal } from "@/components/fx/Reveal";

export function ProtocolMatrix() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {PROTOCOL_FAMILIES.map((family, fi) => (
        <Reveal key={family} delay={fi * 0.08}>
          <div className="h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// {family}</p>
              <span className="text-xs text-muted-foreground font-mono">
                {PROTOCOLS.filter((p) => p.family === family).length} protocols
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-bold">
              {family === "AMBA" && "AMBA on-chip buses"}
              {family === "Low-Speed" && "Low-speed peripherals"}
              {family === "High-Speed" && "High-speed serial links"}
            </h3>
            <ul className="mt-5 space-y-3">
              {PROTOCOLS.filter((p) => p.family === family).map((p) => (
                <li key={p.id} className="group flex items-start gap-3 pb-3 border-b border-border/60 last:border-0 last:pb-0">
                  <span className="mt-1 inline-flex items-center justify-center min-w-14 h-6 rounded-md bg-primary/10 text-primary font-mono text-[10px] font-bold tracking-wider">
                    {p.name}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{p.short}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{p.bullets.join(" · ")}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
