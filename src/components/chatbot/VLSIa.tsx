import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Phone, Zap, Radio } from "lucide-react";
import { SITE, waLink } from "@/data/site";
import { safeInsert } from "@/integrations/supabase/client";
import { useDemoModal } from "@/components/DemoModal";

type Msg = { id: string; role: "user" | "bot"; text: string; chips?: string[] };

const GREETING: Msg = {
  id: "g",
  role: "bot",
  text:
    "Hi, I'm **VLSIa** – MasterVLSI's silicon-trained assistant. I can help with courses, fees, placements, demo bookings or campus directions. What brings you here today?",
  chips: ["Courses", "Fees & EMI", "Placements", "Book a demo", "Visit campus"],
};

const SCRIPT: Record<string, { reply: string; chips?: string[]; intent: string }> = {
  Courses: {
    intent: "courses",
    reply:
      "We run **20 modules** across Digital Fundamentals, Verilog, SystemVerilog, UVM, AXI/AHB/APB, low-power techniques and full-chip verification. Most learners pick **RTL → DV → UVM**. Want a recommendation based on your background?",
    chips: ["I'm a fresher", "I have 1–3 yrs exp", "Open all courses"],
  },
  "Fees & EMI": {
    intent: "fees",
    reply:
      "Full-stack cohorts are **₹90,000 + GST** (online or offline). Payment is split 50% at joining, 50% within the prescribed timeline. EMI is available via partner NBFCs.",
    chips: ["EMI options", "Book a demo", "Talk to a counsellor"],
  },
  Placements: {
    intent: "placements",
    reply:
      "Placements kick off **within 30–45 days** of joining. We've placed 5,000+ engineers across Intel, AMD, NVIDIA, Qualcomm, Samsung, Google, Synopsys, Cadence and more.",
    chips: ["See alumni", "Book a demo"],
  },
  "Book a demo": {
    intent: "demo",
    reply:
      "Free 60-minute demo – Monday to Friday. Meet the mentor, tour the lab, ask anything. Tap below to open the booking form.",
    chips: ["Open demo form", "Talk on WhatsApp"],
  },
  "Visit campus": {
    intent: "directions",
    reply: `We're at **${SITE.addressShort}**. That's 100 m from Tin Factory bus stop and 500 m from Benniganahalli Metro. Want directions?`,
    chips: ["Open in Maps", "Nearby PGs", "Talk on WhatsApp"],
  },
  "I'm a fresher": {
    intent: "fresher",
    reply:
      "Perfect – start with **Digital Fundamentals → Verilog → SystemVerilog → UVM**. That's our most-placed track for freshers.",
    chips: ["Book a demo", "See curriculum"],
  },
  "I have 1–3 yrs exp": {
    intent: "experienced",
    reply:
      "For working engineers we recommend the **DV Acceleration** track – weekend cohorts, finished in 3 months with placement support.",
    chips: ["Book a demo", "Talk on WhatsApp"],
  },
  "EMI options": {
    intent: "emi",
    reply:
      "0% interest EMIs from 3 to 12 months through partner NBFCs. Approval typically in 24 hours after KYC.",
    chips: ["Talk to a counsellor"],
  },
  "See alumni": {
    intent: "alumni",
    reply:
      "Head to the Placements page for video testimonials, achievements strip and hiring companies. NVIDIA and Samsung are leading this quarter.",
    chips: ["Book a demo"],
  },
  "Nearby PGs": {
    intent: "pg",
    reply:
      "There are 15+ verified PGs within 10–200 m of the institute – separate boys, girls and co-living options. See the Accommodation section on the About page.",
    chips: ["Visit campus", "Talk on WhatsApp"],
  },
};

const PIPELINE = ["PARSE", "INFER", "SYNTH", "RESPOND"] as const;

function Pipeline() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest">
      {PIPELINE.map((s, i) => (
        <div key={s} className="flex items-center gap-1.5">
          <motion.span
            className="inline-flex items-center gap-1"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: i % 2 ? "var(--ignite)" : "var(--crimson)" }}
            />
            <span className="text-foreground/80">{s}</span>
          </motion.span>
          {i < PIPELINE.length - 1 && <span className="text-muted-foreground/40">→</span>}
        </div>
      ))}
    </div>
  );
}

/** Hex chip launcher with orbiting rings and status LED. */
function Launcher({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close VLSIa" : "Open VLSIa assistant"}
      className="fixed bottom-16 sm:bottom-5 right-5 z-[60] group"
    >
      {/* Orbit rings */}
      <span className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow" />
      <span
        className="absolute inset-0 rounded-full border border-accent/40"
        style={{ animation: "spin-slow 12s linear infinite reverse" }}
      />
      <span
        className="absolute inset-0 rounded-[22%] blur-xl"
        style={{ background: "var(--gradient-ignite)", opacity: 0.55 }}
      />
      {/* Hex chip body */}
      <span
        className="relative flex h-14 w-14 items-center justify-center text-white shadow-elevated border border-white/15"
        style={{
          background: "var(--gradient-ignite)",
          clipPath:
            "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
        }}
      >
        {open ? (
          <X size={20} />
        ) : (
          <span className="relative">
            <span
              className="absolute inset-0 blur-md opacity-70"
              style={{ background: "white" }}
            />
            {/* Stylised V mark */}
            <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="none">
              <path d="M4 5 L12 20 L20 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="20" r="1.5" fill="white" />
            </svg>
          </span>
        )}
        {/* Status LED */}
        <span className="absolute -top-0.5 right-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background animate-pulse" />
        {/* Corner pins */}
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-1 bg-white/40" />
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-1 bg-white/40" />
      </span>
    </button>
  );
}

export function VLSIa() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const demoModal = useDemoModal();

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [msgs, thinking, open]);

  function pushBot(text: string, chips?: string[], intent?: string) {
    setThinking(true);
    const delay = 750 + Math.min(1600, text.length * 14);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "bot", text, chips }]);
      setThinking(false);
      if (intent) void safeInsert("bot_sessions", { intent, payload: { text } });
    }, delay);
  }

  function handleChip(c: string) {
    setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "user", text: c }]);
    if (c === "Open demo form") { demoModal.open(); return; }
    if (c === "Talk on WhatsApp") { window.open(waLink(), "_blank"); return; }
    if (c === "Open in Maps") { window.open(SITE.mapsUrl, "_blank"); return; }
    if (c === "Open all courses" || c === "See curriculum") { window.location.href = "/courses"; return; }
    if (c === "Talk to a counsellor") { window.open(waLink("Hi, I'd like to talk to a counsellor."), "_blank"); return; }
    const node = SCRIPT[c];
    if (node) pushBot(node.reply, node.chips, node.intent);
    else pushBot("Got it – I'll loop in a human counsellor on WhatsApp for that.", ["Talk on WhatsApp"], "fallback");
  }

  function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "user", text }]);
    const lc = text.toLowerCase();
    let key: keyof typeof SCRIPT | null = null;
    if (/(fee|cost|price|emi)/.test(lc)) key = "Fees & EMI";
    else if (/(place|job|salary|hire)/.test(lc)) key = "Placements";
    else if (/(demo|trial|book)/.test(lc)) key = "Book a demo";
    else if (/(address|location|map|visit|reach)/.test(lc)) key = "Visit campus";
    else if (/(pg|hostel|stay|accom)/.test(lc)) key = "Nearby PGs";
    else if (/(course|module|curriculum|syllabus)/.test(lc)) key = "Courses";
    if (key) {
      const n = SCRIPT[key];
      pushBot(n.reply, n.chips, n.intent);
    } else {
      pushBot(
        "I can route you faster if you pick one of these – or I'll hand you to a human on WhatsApp.",
        ["Courses", "Fees & EMI", "Placements", "Book a demo", "Talk on WhatsApp"],
        "freeform",
      );
    }
  }

  return (
    <>
      <Launcher open={open} onClick={() => setOpen((o) => !o)} />

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 sm:bottom-24 right-3 left-3 sm:left-auto sm:right-5 sm:w-[400px] z-[60] rounded-2xl overflow-hidden border border-primary/30 bg-card/95 backdrop-blur-xl shadow-elevated"
            style={{ maxHeight: "min(70vh, 520px)" }}
          >
            {/* Chip pins across top */}
            <div className="absolute inset-x-4 top-0 flex justify-between pointer-events-none z-10">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="h-1.5 w-0.5 bg-primary/50" />
              ))}
            </div>

            {/* Header */}
            <div className="relative px-4 pt-4 pb-3 border-b border-border/60"
              style={{ background: "linear-gradient(135deg, oklch(0.19 0.008 0 / 0.95), oklch(0.145 0.006 0 / 0.95))" }}
            >
              <div className="absolute inset-0 grid-bg-fine opacity-20 pointer-events-none" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Mini chip avatar */}
                  <div className="relative">
                    <div
                      className="h-10 w-10 flex items-center justify-center text-white border border-white/20"
                      style={{
                        background: "var(--gradient-ignite)",
                        clipPath:
                          "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                        <path d="M4 5 L12 20 L20 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-4 items-center gap-0.5 rounded bg-primary px-1 text-[8px] font-bold text-primary-foreground">
                      <Radio size={7} /> LIVE
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-base leading-tight flex items-center gap-2">
                      VLSIa
                      <span className="font-mono text-[9px] font-normal px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase tracking-widest">
                        AI · v2.6
                      </span>
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                      <Zap size={9} className="text-accent" /> silicon intelligence · online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground p-1.5 rounded hover:bg-white/5"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              {/* Signal waveform strip */}
              <svg viewBox="0 0 200 12" className="mt-2 w-full h-3 opacity-60">
                <motion.path
                  d="M0 6 L20 6 L25 2 L30 10 L35 6 L60 6 L65 1 L70 11 L75 6 L110 6 L115 3 L120 9 L125 6 L200 6"
                  stroke="url(#wave-g)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                <defs>
                  <linearGradient id="wave-g" x1="0" x2="1">
                    <stop offset="0%" stopColor="var(--crimson)" />
                    <stop offset="100%" stopColor="var(--ignite)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: "min(52vh, 380px)", overscrollBehavior: "contain" }}>
              {msgs.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className="max-w-[88%]">
                    {m.role === "bot" && (
                      <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-primary/70">
                        vlsia · silicon.model
                      </p>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "text-white rounded-br-sm"
                          : "border border-primary/25 rounded-bl-sm relative overflow-hidden"
                      }`}
                      style={
                        m.role === "user"
                          ? { background: "var(--gradient-ignite)" }
                          : { background: "oklch(0.17 0.006 0 / 0.92)", borderLeftWidth: 3, borderLeftColor: "var(--ignite)" }
                      }
                    >
                      <p
                        dangerouslySetInnerHTML={{
                          __html: m.text.replace(
                            /\*\*(.+?)\*\*/g,
                            "<strong class='text-accent'>$1</strong>",
                          ),
                        }}
                      />
                      {m.chips && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {m.chips.map((c) => (
                            <button
                              key={c}
                              onClick={() => handleChip(c)}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl rounded-bl-sm border border-primary/25 px-3.5 py-2.5 relative overflow-hidden"
                    style={{ background: "oklch(0.17 0.006 0 / 0.92)", borderLeftWidth: 3, borderLeftColor: "var(--ignite)" }}
                  >
                    {/* Scanning bar */}
                    <span
                      className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, color-mix(in oklab, var(--ignite) 25%, transparent), transparent)",
                        animation: "scan-sweep 1.8s ease-in-out infinite",
                      }}
                    />
                    <Pipeline />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSend}
              className="border-t border-border bg-surface-1/80 px-3 py-2.5 flex items-center gap-2 relative"
            >
              <span className="font-mono text-[10px] text-primary/60">&gt;</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about courses, fees, placements…"
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="h-8 w-8 rounded-md text-white flex items-center justify-center transition hover:brightness-110"
                style={{ background: "var(--gradient-ignite)" }}
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </form>
            <div className="px-3 pb-2.5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                encrypted · privacy-first
              </span>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <Phone size={10} /> Human on WhatsApp
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
