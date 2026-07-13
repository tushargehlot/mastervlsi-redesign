import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const STEPS = [
  { id: "spec", label: "Spec", desc: "Decode product requirements into architecture, interfaces, performance and power targets." },
  { id: "rtl", label: "RTL", desc: "Write lint-clean Verilog/SystemVerilog that captures design intent with synthesis-aware discipline." },
  { id: "tb", label: "Testbench", desc: "Build reusable drivers, monitors, scoreboards and assertions around the DUT." },
  { id: "uvm", label: "UVM", desc: "Create constrained-random environments with sequences, agents, config DB and factory patterns." },
  { id: "coverage", label: "Coverage", desc: "Close functional and code coverage using targeted regressions and debug dashboards." },
  { id: "protocols", label: "Protocols", desc: "Verify AMBA, AXI, AHB, APB, UART, SPI, I2C and high-speed interface behaviours." },
  { id: "debug", label: "AI Debug", desc: "Use AI-assisted trace review, waveform reasoning and interview-style defect analysis." },
  { id: "portfolio", label: "Portfolio", desc: "Ship Git-backed RTL and DV projects that recruiters can inspect with confidence." },
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
