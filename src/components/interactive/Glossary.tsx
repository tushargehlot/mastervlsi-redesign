import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { GLOSSARY } from "@/data/glossary";

export function Glossary() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return GLOSSARY;
    return GLOSSARY.filter((t) =>
      t.term.toLowerCase().includes(s) ||
      (t.expansion ?? "").toLowerCase().includes(s) ||
      t.def.toLowerCase().includes(s) ||
      t.tag.toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Cheatsheet</p>
          <h3 className="font-display text-xl font-bold mt-1">VLSI Glossary</h3>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            aria-label="Search VLSI glossary terms"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search RTL, UVM, ECO…"
            className="pl-9 pr-3 py-2 rounded-md border border-border bg-surface-2 text-sm w-64 focus:border-primary outline-none"
          />
        </div>
      </div>
      <ul className="mt-5 grid sm:grid-cols-2 gap-2 max-h-[420px] overflow-y-auto pr-1">
        {list.map((t) => (
          <li key={t.term} className="group rounded-lg border border-border bg-surface-2/50 p-3 hover:border-primary/50 hover:bg-surface-2 transition-all">
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-primary">{t.term}</span>
              {t.expansion && <span className="text-[11px] text-muted-foreground">– {t.expansion}</span>}
              <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">{t.tag}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t.def}</p>
          </li>
        ))}
        {list.length === 0 && <li className="text-sm text-muted-foreground col-span-2 py-8 text-center">No matches. Try "UVM" or "ECO".</li>}
      </ul>
    </div>
  );
}
