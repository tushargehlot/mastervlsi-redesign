import { createContext, useContext, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Clock, MapPin, Users } from "lucide-react";
import { SITE } from "@/data/site";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const DemoCtx = createContext<Ctx | null>(null);

export function useDemoModal() {
  const c = useContext(DemoCtx);
  if (!c) throw new Error("useDemoModal must be used inside DemoModalProvider");
  return c;
}

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <DemoCtx.Provider value={{ isOpen, open: () => setOpen(true), close: () => setOpen(false) }}>
      {children}
      <AnimatePresence>{isOpen && <DemoDialog onClose={() => setOpen(false)} />}</AnimatePresence>
    </DemoCtx.Provider>
  );
}

function DemoDialog({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-border bg-card shadow-elevated grid md:grid-cols-[300px_1fr]"
      >
        {/* Chip pin frame */}
        <div className="absolute inset-x-4 -top-1 flex justify-between pointer-events-none">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} className="h-2 w-1 bg-primary/40" />
          ))}
        </div>
        <div className="absolute inset-x-4 -bottom-1 flex justify-between pointer-events-none">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} className="h-2 w-1 bg-primary/40" />
          ))}
        </div>

        {/* Left rail */}
        <div className="hidden md:flex flex-col justify-between p-6 bg-gradient-to-br from-primary/15 via-card to-card border-r border-border">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Free · 60 min</p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight">
              Book your <span className="text-gradient-ignite">free demo class.</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Meet the mentor, walk the lab, ask anything. Zero commitment.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { Icon: Calendar, label: "Any weekday", sub: "Mon – Fri slots" },
                { Icon: Clock, label: "60 minutes", sub: "Live & interactive" },
                { Icon: MapPin, label: "On-site or online", sub: "You pick" },
                { Icon: Users, label: "Small batch", sub: "Max 6 per demo" },
              ].map(({ Icon, label, sub }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 h-8 w-8 shrink-0 rounded-md bg-primary/15 text-primary flex items-center justify-center">
                    <Icon size={14} />
                  </span>
                  <span>
                    <span className="block font-semibold">{label}</span>
                    <span className="block text-xs text-muted-foreground">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <a
            href={SITE.demoFormUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-xs text-primary hover:text-accent transition"
          >
            <ExternalLink size={12} /> Open form in new tab
          </a>
        </div>

        {/* Iframe body */}
        <div className="relative flex flex-col min-h-[70vh] md:min-h-[600px] bg-white">
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
          >
            <X size={16} />
          </button>
          <iframe
            src={SITE.demoFormEmbedUrl}
            title="Book a free demo"
            className="flex-1 w-full border-0"
            loading="lazy"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Convenient trigger — a button that opens the demo modal. */
export function DemoTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useDemoModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
