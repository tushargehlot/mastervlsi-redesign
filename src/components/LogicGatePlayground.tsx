import { useState } from "react";

type Gate = "AND" | "OR" | "XOR" | "NAND" | "NOR" | "NOT";

const COMPUTE: Record<Gate, (a: 0 | 1, b: 0 | 1) => 0 | 1> = {
  AND: (a, b) => (a && b ? 1 : 0),
  OR: (a, b) => (a || b ? 1 : 0),
  XOR: (a, b) => (a ^ b ? 1 : 0) as 0 | 1,
  NAND: (a, b) => (a && b ? 0 : 1),
  NOR: (a, b) => (a || b ? 0 : 1),
  NOT: (a) => (a ? 0 : 1),
};

export function LogicGatePlayground() {
  const [gate, setGate] = useState<Gate>("AND");
  const [a, setA] = useState<0 | 1>(0);
  const [b, setB] = useState<0 | 1>(0);
  const out = COMPUTE[gate](a, b);
  const isUnary = gate === "NOT";

  const rows: { a: 0 | 1; b: 0 | 1 }[] = [
    { a: 0, b: 0 },
    { a: 0, b: 1 },
    { a: 1, b: 0 },
    { a: 1, b: 1 },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mr-2">Gate</span>
        {(["AND", "OR", "XOR", "NAND", "NOR", "NOT"] as Gate[]).map((g) => (
          <button
            key={g}
            onClick={() => setGate(g)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium border transition ${
              gate === g
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <svg viewBox="0 0 320 180" className="w-full h-auto">
            <line x1="20" y1="60" x2="100" y2="60" stroke={a ? "#e50914" : "#555"} strokeWidth={3} />
            {!isUnary && <line x1="20" y1="120" x2="100" y2="120" stroke={b ? "#e50914" : "#555"} strokeWidth={3} />}
            <line x1="220" y1="90" x2="300" y2="90" stroke={out ? "#e50914" : "#555"} strokeWidth={3} />
            <rect x="100" y={isUnary ? 65 : 50} width="120" height={isUnary ? 50 : 80} rx="14" fill="#16161a" stroke={out ? "#e50914" : "#3a3a44"} strokeWidth={2} />
            <text x="160" y={isUnary ? 96 : 96} textAnchor="middle" fill="#fff" fontFamily="JetBrains Mono" fontSize="18" fontWeight="700">{gate}</text>
            <circle cx="20" cy="60" r="7" fill={a ? "#e50914" : "#333"} stroke="#666" />
            {!isUnary && <circle cx="20" cy="120" r="7" fill={b ? "#e50914" : "#333"} stroke="#666" />}
            <circle cx="300" cy="90" r="9" fill={out ? "#e50914" : "#333"} stroke="#666" />
          </svg>

          <div className="mt-4 flex gap-4 justify-center">
            <button onClick={() => setA((v) => ((v ? 0 : 1) as 0 | 1))} className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground border border-border font-mono">
              A = {a}
            </button>
            {!isUnary && (
              <button onClick={() => setB((v) => ((v ? 0 : 1) as 0 | 1))} className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground border border-border font-mono">
                B = {b}
              </button>
            )}
            <div className={`px-4 py-2 rounded-md font-mono font-bold ${out ? "bg-primary text-primary-foreground glow-red" : "bg-card border border-border text-muted-foreground"}`}>
              Y = {out}
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Truth Table</p>
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left py-2">A</th>
                {!isUnary && <th className="text-left py-2">B</th>}
                <th className="text-left py-2">Y</th>
              </tr>
            </thead>
            <tbody>
              {(isUnary ? [{ a: 0, b: 0 }, { a: 1, b: 0 }] : rows).map((r) => {
                const y = COMPUTE[gate](r.a, r.b as 0 | 1);
                const matched = a === r.a && (isUnary || b === r.b);
                return (
                  <tr key={`${r.a}${r.b}`} className={`border-t border-border ${matched ? "bg-primary/10 text-foreground" : ""}`}>
                    <td className="py-2">{r.a}</td>
                    {!isUnary && <td className="py-2">{r.b}</td>}
                    <td className={`py-2 ${y ? "text-primary font-bold" : ""}`}>{y}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
