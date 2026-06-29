import { useState } from "react";

const QUESTIONS = [
  { q: "Do you enjoy writing code more than running simulations?", a: { yes: "rtl", no: "dv" } },
  { q: "Do you like debugging waveform traces for hours?", a: { yes: "dv", no: "rtl" } },
  { q: "Would you rather bring up hardware than write testbenches?", a: { yes: "fpga", no: "dv" } },
  { q: "Do you love low-level firmware, drivers and bare-metal C?", a: { yes: "emb", no: null } },
  { q: "Would you rather work on reusable IP than full SoCs?", a: { yes: "rtl", no: "dv" } },
];

const RESULT: Record<string, { title: string; track: string; line: string }> = {
  rtl: { title: "RTL Design", track: "Verilog → SystemVerilog → AMBA", line: "You'll thrive writing clean, synthesizable RTL." },
  dv:  { title: "Design Verification", track: "SV → UVM → Coverage", line: "You'll love building rigorous, reusable testbenches." },
  fpga:{ title: "FPGA Prototyping", track: "Verilog → Vivado/Quartus → Bring-up", line: "You'll thrive bringing silicon to life on real boards." },
  emb: { title: "Embedded Systems", track: "C → ARM → RTOS → Drivers", line: "You'll write the firmware that runs on what we verify." },
};

export function Quiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState<Record<string, number>>({});
  const [done, setDone] = useState<string | null>(null);

  function answer(v: "yes" | "no") {
    const pick = QUESTIONS[step].a[v];
    const next = { ...score };
    if (pick) next[pick] = (next[pick] ?? 0) + 1;
    setScore(next);
    if (step + 1 >= QUESTIONS.length) {
      const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "rtl";
      setDone(winner);
    } else {
      setStep(step + 1);
    }
  }

  function reset() { setStep(0); setScore({}); setDone(null); }

  if (done) {
    const r = RESULT[done];
    return (
      <div className="rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/15 via-card to-card p-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Recommended track</p>
        <h3 className="mt-3 font-display text-3xl font-bold text-gradient">{r.title}</h3>
        <p className="mt-2 text-muted-foreground">{r.line}</p>
        <p className="mt-4 font-mono text-xs text-primary">{r.track}</p>
        <button onClick={reset} className="mt-6 text-xs text-muted-foreground hover:text-primary underline">Retake quiz</button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Track quiz</p>
        <p className="text-[10px] font-mono text-muted-foreground">Q {step + 1} / {QUESTIONS.length}</p>
      </div>
      <div className="h-1 w-full bg-surface-2 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${((step) / QUESTIONS.length) * 100}%` }} />
      </div>
      <h3 className="mt-6 font-display text-2xl font-bold leading-snug">{QUESTIONS[step].q}</h3>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={() => answer("yes")} className="rounded-lg border border-border bg-surface-2 py-3 font-mono text-sm hover:border-primary hover:bg-primary/10 hover:text-primary transition-all">YES</button>
        <button onClick={() => answer("no")}  className="rounded-lg border border-border bg-surface-2 py-3 font-mono text-sm hover:border-primary hover:bg-primary/10 hover:text-primary transition-all">NO</button>
      </div>
    </div>
  );
}
