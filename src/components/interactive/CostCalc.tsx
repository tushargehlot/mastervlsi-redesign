import { useMemo, useState } from "react";

export function CostCalc() {
  const [months, setMonths] = useState(6);
  const [mode, setMode] = useState<"online" | "offline">("offline");
  const [emi, setEmi] = useState(6);

  const base = mode === "offline" ? 80000 : 80000;
  const fee = base + (months - 6) * 4000;
  const gst = Math.round(fee * 0.18);
  const total = fee + gst;
  const perMonth = useMemo(() => Math.ceil(total / emi), [total, emi]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Live</p>
      <h3 className="font-display text-xl font-bold mt-1">Cost & EMI calculator</h3>

      <div className="mt-5 grid sm:grid-cols-2 gap-5">
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-muted-foreground">Duration</span>
            <span className="font-mono text-primary">{months} months</span>
          </div>
          <input type="range" min={3} max={12} value={months} onChange={(e) => setMonths(+e.target.value)} className="w-full accent-primary mt-2" />

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-muted-foreground">EMI tenure</span>
            <span className="font-mono text-primary">{emi} months</span>
          </div>
          <input type="range" min={3} max={12} value={emi} onChange={(e) => setEmi(+e.target.value)} className="w-full accent-primary mt-2" />

          <div className="mt-5 grid grid-cols-2 gap-2">
            {(["offline", "online"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`py-2 rounded-md border text-xs font-mono uppercase tracking-wider transition-all ${mode === m ? "border-primary bg-primary/10 text-primary" : "border-border bg-card/60 text-muted-foreground hover:border-primary/40"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-primary/40 bg-gradient-to-br from-primary/15 to-card p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Total</p>
          <p className="mt-1 font-display text-4xl font-bold text-gradient">₹{total.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">includes 18% GST</p>
          <div className="mt-5 pt-4 border-t border-border/60">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">EMI from</p>
            <p className="mt-1 font-display text-2xl font-bold">₹{perMonth.toLocaleString("en-IN")}<span className="text-base text-muted-foreground"> /mo</span></p>
            <p className="text-[11px] text-muted-foreground">0% interest · partner NBFC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
