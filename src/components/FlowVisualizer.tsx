import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const STEPS = [
  { id: "spec", label: "Spec", color: "from-zinc-400", desc: "Architectural spec, microarchitecture, performance & power targets." },
  { id: "rtl", label: "RTL", color: "from-primary", desc: "Verilog / SystemVerilog coding for design intent; lint-clean, synth-friendly." },
  { id: "dv", label: "DV", color: "from-primary", desc: "UVM testbenches, constrained-random stim, coverage closure." },
  { id: "syn", label: "Synthesis", color: "from-primary", desc: "RTL → gates with constraints (SDC). DC/Genus." },
  { id: "dft", label: "DFT", color: "from-primary", desc: "Scan stitching, BIST/MBIST, ATPG pattern generation." },
  { id: "pd", label: "PD", color: "from-primary", desc: "Floorplan → Place → CTS → Route. ICC2/Innovus." },
  { id: "sta", label: "STA", color: "from-primary", desc: "Multi-corner, multi-mode timing closure. PrimeTime/Tempus." },
  { id: "signoff", label: "Signoff", color: "from-primary", desc: "DRC, LVS, antenna, EM/IR, power. Calibre/PVS." },
  { id: "tapeout", label: "Tape-out", color: "from-red-500", desc: "GDSII handoff to the foundry. Champagne. 🍾" },
] as const;

export function FlowVisualizer() {
  const [active, setActive] = useState<number>(1);
  return (
    <div>
      <div className="relative">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mask-fade-x">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="group flex items-center shrink-0"
            >
              <div
                className={`relative px-4 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider border transition-all ${
                  active === i
                    ? "bg-primary text-primary-foreground border-primary glow-red"
                    : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                <span className="opacity-50 mr-1.5">0{i + 1}</span>
                {s.label}
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight
                  size={14}
                  className={`mx-0.5 ${active === i ? "text-primary" : "text-border"}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-6 rounded-xl border border-border bg-card/60 p-6"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-primary">STAGE {String(active + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-2xl font-bold">{STEPS[active].label}</h3>
          </div>
          <p className="mt-3 text-muted-foreground leading-relaxed">{STEPS[active].desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
