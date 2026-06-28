import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, Phone, BookOpen, MapPin, Cpu } from "lucide-react";
import { SITE, waLink } from "@/data/site";
import { safeInsert } from "@/integrations/supabase/client";

/**
 * VLSIa — a *scripted* assistant styled like an LLM chat. No model calls.
 * Custom "logic gate" loader, intent chips, and an unmistakable AI badge so
 * users feel the polish without us pretending to ship something we haven't.
 */
type Msg = { id: string; role: "user" | "bot"; text: string; chips?: string[] };

const GREETING: Msg = {
  id: "g",
  role: "bot",
  text: "Hi, I'm VLSIa — MasterVLSI's silicon-trained assistant. I can help with courses, fees, placements, demo bookings or directions. What brings you here?",
  chips: ["Courses", "Fees & EMI", "Placements", "Book a demo", "Visit campus"],
};

const SCRIPT: Record<string, { reply: string; chips?: string[]; intent: string }> = {
  Courses: {
    intent: "courses",
    reply: "We run 15 modules — RTL, DV (UVM), PD, STA, DFT, Low Power, AMS, Scripting and more. Most learners pick **RTL → DV** or **PD → STA**. Want me to recommend based on your background?",
    chips: ["I'm a fresher", "I have 1–3 yrs exp", "Open all courses"],
  },
  "Fees & EMI": {
    intent: "fees",
    reply: "Full-stack cohorts start at **₹80,000 + GST** (online or offline). EMI is available via partner NBFCs. Compared to other institutes (~₹2L+) you save ~60% with the same tool licences and 24/7 lab.",
    chips: ["EMI options", "Book a demo", "Talk to a counsellor"],
  },
  Placements: {
    intent: "placements",
    reply: "Placements kick off **within 30–60 days** of joining. We've placed 5,000+ engineers across Intel, AMD, NVIDIA, Qualcomm and more, with full post-placement mentorship for the first year.",
    chips: ["See alumni", "Hire from us", "Book a demo"],
  },
  "Book a demo": {
    intent: "demo",
    reply: "Tap the button below to open our demo form, or share your name and number here and a counsellor will call within 1 hour.",
    chips: ["Open demo form", "Talk on WhatsApp"],
  },
  "Visit campus": {
    intent: "directions",
    reply: `We're in **${SITE.address}**. The lab is open 6 AM – 10 PM for girls, 24/7 for boys. Want directions?`,
    chips: ["Open in Maps", "Talk on WhatsApp"],
  },
  "I'm a fresher": {
    intent: "fresher",
    reply: "Perfect — start with **Digital Fundamentals → Verilog → UVM**. That's our most-placed track for freshers, average package ₹7.2 LPA.",
    chips: ["Book a demo", "See curriculum"],
  },
  "I have 1–3 yrs exp": {
    intent: "experienced",
    reply: "For working engineers we recommend the **DV Acceleration** or **PD-STA Sprint** — both run weekends and finish in 3 months.",
    chips: ["Book a demo", "Talk on WhatsApp"],
  },
  "EMI options": {
    intent: "emi",
    reply: "0% interest EMIs from 3 to 12 months through Eduvanz and Propelld. Approval typically in 24 hours after KYC.",
    chips: ["Talk to a counsellor"],
  },
  "See alumni": { intent: "alumni", reply: "Head to the Placements page for video testimonials, the alumni map and the live salary heatmap. Spoiler: NVIDIA leads on hiring this quarter.", chips: ["Book a demo"] },
};

function gateLoader() {
  // Stylised AND-gate "thinking" dots
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full bg-primary"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
      <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        vlsia · computing
      </span>
    </div>
  );
}

export function VLSIa() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, thinking, open]);

  function pushBot(text: string, chips?: string[], intent?: string) {
    setThinking(true);
    const delay = 650 + Math.min(1400, text.length * 12);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "bot", text, chips }]);
      setThinking(false);
      if (intent) void safeInsert("bot_sessions", { intent, payload: { text } });
    }, delay);
  }

  function handleChip(c: string) {
    setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "user", text: c }]);
    if (c === "Open demo form") { window.open(SITE.demoFormUrl, "_blank"); return; }
    if (c === "Talk on WhatsApp") { window.open(waLink(), "_blank"); return; }
    if (c === "Open in Maps") { window.open(SITE.mapsUrl, "_blank"); return; }
    if (c === "Open all courses" || c === "See curriculum") { window.location.href = "/courses"; return; }
    if (c === "Hire from us") { window.location.href = "/placements"; return; }
    if (c === "Talk to a counsellor") { window.open(waLink("Hi, I'd like to talk to a counsellor."), "_blank"); return; }
    const node = SCRIPT[c];
    if (node) pushBot(node.reply, node.chips, node.intent);
    else pushBot("Got it — I'll loop in a human counsellor on WhatsApp for that.", ["Talk on WhatsApp"], "fallback");
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
    else if (/(address|location|map|visit)/.test(lc)) key = "Visit campus";
    else if (/(course|module|curriculum|syllabus)/.test(lc)) key = "Courses";
    if (key) {
      const n = SCRIPT[key];
      pushBot(n.reply, n.chips, n.intent);
    } else {
      pushBot(
        "I can route you faster if you pick one of these — or I'll hand you to a human on WhatsApp.",
        ["Courses", "Fees & EMI", "Placements", "Book a demo", "Talk on WhatsApp"],
        "freeform",
      );
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open VLSIa assistant"
        className="fixed bottom-5 right-5 z-[60] group"
      >
        <span className="absolute inset-0 rounded-full animate-pulse-ring" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary via-ignite to-trace text-primary-foreground shadow-elevated border border-white/10">
          <Cpu size={22} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:w-[380px] z-[60] rounded-2xl overflow-hidden border border-border bg-card/95 backdrop-blur-xl shadow-elevated"
          >
            {/* Header */}
            <div className="relative px-4 py-3 border-b border-border bg-gradient-to-br from-primary/20 via-card to-card">
              <div className="absolute inset-0 grid-bg-fine opacity-20 pointer-events-none" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-trace flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                    <span className="absolute -bottom-1 -right-1 px-1 py-px text-[8px] font-mono font-bold bg-emerald-500 text-black rounded">AI</span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm leading-tight">VLSIa</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">silicon assistant · online</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground p-1.5 rounded hover:bg-white/5" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="h-[420px] overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-background/60 to-card/30">
              {msgs.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-surface-2 border border-border text-foreground rounded-bl-sm"
                  }`}>
                    <p dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong class='text-primary'>$1</strong>") }} />
                    {m.chips && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {m.chips.map((c) => (
                          <button
                            key={c}
                            onClick={() => handleChip(c)}
                            className="text-[11px] font-mono px-2 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="bg-surface-2 border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                    {gateLoader()}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form onSubmit={handleSend} className="border-t border-border bg-surface-1 px-3 py-2.5 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about courses, fees, placements…"
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <button type="submit" className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90" aria-label="Send">
                <Send size={14} />
              </button>
            </form>
            <div className="px-3 pb-2.5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen size={10} /> Scripted, privacy-first</span>
              <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-emerald-400 hover:underline">
                <Phone size={10} /> Human on WhatsApp
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export const _icons = { MapPin };
