import { useMemo, useState } from "react";

const ROLES = ["RTL Design", "DV (UVM)", "FPGA Prototyping", "SoC Integration", "Embedded / Firmware", "CDC / Formal"];
const EXP = ["0–1 yr", "1–3 yr", "3–6 yr", "6–10 yr"];

// LPA midpoints — illustrative ranges aggregated from alumni outcomes.
const DATA: number[][] = [
  [7, 12, 22, 38],
  [8, 14, 26, 42],
  [7, 13, 24, 38],
  [9, 15, 28, 44],
  [7, 12, 22, 36],
  [8, 14, 26, 40],
];

function heat(v: number, max: number) {
  const t = v / max;
  // cool indigo → bright periwinkle ramp
  const l = 0.22 + t * 0.45;
  return `oklch(${l} 0.16 ${260 - t * 10})`;
}

export function SalaryHeatmap() {
  const max = useMemo(() => Math.max(...DATA.flat()), []);
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Alumni heatmap</p>
          <h3 className="font-display text-xl font-bold mt-1">Salary by role & experience</h3>
        </div>
        <p className="text-[11px] font-mono text-muted-foreground">All figures in ₹ LPA</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate" style={{ borderSpacing: 4 }}>
          <thead>
            <tr>
              <th className="text-left text-[10px] font-mono text-muted-foreground uppercase">Role</th>
              {EXP.map((e) => (
                <th key={e} className="text-[10px] font-mono text-muted-foreground uppercase">{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLES.map((r, ri) => (
              <tr key={r}>
                <td className="text-xs font-display pr-3 whitespace-nowrap">{r}</td>
                {DATA[ri].map((v, ci) => {
                  const active = hover?.r === ri && hover?.c === ci;
                  return (
                    <td key={ci} className="relative">
                      <div
                        onMouseEnter={() => setHover({ r: ri, c: ci })}
                        onMouseLeave={() => setHover(null)}
                        className={`h-12 rounded-md flex items-center justify-center text-xs font-mono font-bold text-white transition-all cursor-default ${active ? "scale-110 ring-2 ring-white/40 z-10" : ""}`}
                        style={{ background: heat(v, max), boxShadow: active ? "0 8px 24px -8px oklch(0.62 0.24 25 / 0.7)" : undefined }}
                      >
                        {v}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hover && (
        <p className="mt-4 text-xs text-muted-foreground">
          <span className="text-primary font-mono">{ROLES[hover.r]}</span> @ <span className="font-mono">{EXP[hover.c]}</span> ≈ <span className="text-foreground font-bold">₹{DATA[hover.r][hover.c]} LPA</span>
        </p>
      )}
    </div>
  );
}
