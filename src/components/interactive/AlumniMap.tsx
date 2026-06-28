import { useState } from "react";

const CITIES = [
  { id: "blr", name: "Bengaluru", x: 250, y: 460, count: 1820, top: "NVIDIA, Intel, Qualcomm" },
  { id: "hyd", name: "Hyderabad", x: 260, y: 410, count: 920, top: "Qualcomm, AMD, Micron" },
  { id: "pun", name: "Pune",      x: 190, y: 380, count: 540, top: "Intel, NVIDIA, Synopsys" },
  { id: "che", name: "Chennai",   x: 290, y: 490, count: 470, top: "Intel, TI, Cadence" },
  { id: "noi", name: "Noida",     x: 250, y: 230, count: 380, top: "STMicro, ST, Synopsys" },
  { id: "ahd", name: "Ahmedabad", x: 175, y: 290, count: 180, top: "eInfochips, einfochips" },
  { id: "mum", name: "Mumbai",    x: 170, y: 360, count: 240, top: "Tessolve, L&T" },
];

export function AlumniMap() {
  const [active, setActive] = useState(CITIES[0]);
  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 rounded-2xl border border-border bg-card p-6">
      <div className="relative aspect-[4/5] rounded-xl bg-gradient-to-br from-surface-2 to-background overflow-hidden">
        <svg viewBox="0 0 460 600" className="absolute inset-0 w-full h-full">
          {/* Simplified India outline */}
          <path
            d="M230 80 L290 120 L320 180 L340 240 L360 320 L340 400 L300 470 L260 540 L220 560 L180 540 L150 480 L130 420 L110 360 L100 290 L130 220 L170 160 L200 110 Z"
            fill="oklch(0.18 0.014 255)"
            stroke="oklch(0.45 0.05 25 / 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {CITIES.map((c) => {
            const isActive = c.id === active.id;
            const r = 6 + Math.log(c.count) * 1.4;
            return (
              <g key={c.id} onClick={() => setActive(c)} className="cursor-pointer">
                <circle cx={c.x} cy={c.y} r={r + 6} fill="oklch(0.62 0.24 25)" opacity={isActive ? 0.25 : 0.1}>
                  <animate attributeName="r" values={`${r + 6};${r + 14};${r + 6}`} dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={c.x} cy={c.y} r={r} fill={isActive ? "oklch(0.7 0.22 25)" : "oklch(0.55 0.18 25)"} stroke="white" strokeWidth={isActive ? 2 : 0.5} />
                <text x={c.x + r + 6} y={c.y + 4} className="fill-white" fontSize="11" fontFamily="JetBrains Mono">
                  {c.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex flex-col">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Alumni footprint</p>
        <h3 className="font-display text-xl font-bold mt-1">Where MasterVLSI engineers ship silicon</h3>
        <p className="mt-3 text-sm text-muted-foreground">Click a city to highlight the hiring cluster.</p>
        <div className="mt-5 rounded-xl border border-primary/40 bg-primary/5 p-5">
          <p className="font-display text-2xl font-bold text-gradient">{active.name}</p>
          <p className="mt-2 text-3xl font-mono font-bold">{active.count.toLocaleString()}+</p>
          <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">alumni placed</p>
          <p className="mt-4 text-xs"><span className="text-muted-foreground">Top employers:</span> <span className="text-foreground">{active.top}</span></p>
        </div>
        <div className="mt-auto pt-5 grid grid-cols-2 gap-2">
          {CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                active.id === c.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card/60 text-muted-foreground hover:border-primary/40"
              }`}
            >
              <p className="font-mono">{c.name}</p>
              <p className="text-[10px]">{c.count}+</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
