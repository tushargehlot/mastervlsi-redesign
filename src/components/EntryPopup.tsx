import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Sparkles, Cpu, Users } from "lucide-react";
import { SITE } from "@/data/site";

const KEY = "mvlsi-entry-popup-v3";

export function EntryPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 4500);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setOpen(false);
    try { sessionStorage.setItem(KEY, "1"); } catch {}
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_120px_-30px_oklch(0.60_0.20_24_/_0.45)]"
          >
            <div
              className="absolute inset-x-0 top-0 h-40 opacity-90"
              style={{ background: "var(--gradient-ignite)" }}
              aria-hidden
            />
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/90 hover:bg-background text-foreground flex items-center justify-center shadow"
            >
              <X size={16} />
            </button>

            <div className="relative pt-14 px-6 sm:px-8 pb-7 text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-background shadow-xl ring-1 ring-border flex items-center justify-center">
                <Sparkles className="text-primary" size={26} />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
                // Free 1:1 mentorship
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight">
                Talk to a mentor before <span className="text-gradient">you enroll.</span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                Get a personalised roadmap – RTL, SystemVerilog, UVM or protocols – plus a call from
                our placement team. Zero cost, no obligation.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3 text-[11px] font-mono">
                {[
                  { icon: Cpu, v: "12+ yrs", l: "Industry" },
                  { icon: Users, v: "5000+", l: "Placed" },
                  { icon: Sparkles, v: "30–45", l: "Days" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-border bg-surface-1/60 p-2.5">
                    <s.icon size={14} className="mx-auto text-primary" />
                    <p className="mt-1 font-display font-bold text-sm">{s.v}</p>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <a
                  href={SITE.demoFormUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={dismiss}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                  style={{ background: "var(--gradient-ignite)" }}
                >
                  Book my free demo <ArrowRight size={15} />
                </a>
                <button
                  onClick={dismiss}
                  className="rounded-md border border-border bg-card px-4 py-3 text-xs text-muted-foreground hover:text-foreground"
                >
                  Maybe later
                </button>
              </div>

              <p className="mt-3 text-[10px] font-mono text-muted-foreground">
                No spam. We call once, share the plan, done.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
