import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { SITE, waLink } from "@/data/site";

type Msg = { from: "bot" | "user"; text: string };

const FLOWS: Record<string, { reply: string; followups?: string[] }> = {
  Courses: {
    reply:
      "We offer 24 modules across RTL, DV, PD, DFT, STA, Low Power & more. Course duration is 6 months, validity 1 year. Want a syllabus?",
    followups: ["Send syllabus", "Fees", "Demo class"],
  },
  Placements: {
    reply:
      "Placement starts within 30–45 days of joining. 5000+ alumni at Intel, AMD, NVIDIA, Qualcomm, Synopsys, Cadence and more.",
    followups: ["Hiring partners", "Demo class"],
  },
  Demo: {
    reply:
      "Free demo class available — book any weekday. Should I send the booking link on WhatsApp?",
    followups: ["Yes, send link", "Fees"],
  },
  "Demo class": {
    reply:
      "Free demo class available — book any weekday. Should I send the booking link on WhatsApp?",
    followups: ["Yes, send link", "Fees"],
  },
  Fees: {
    reply:
      "Fee depends on the module bundle you pick. Connect on WhatsApp and our counsellor will share the latest pricing & EMI options.",
    followups: ["Open WhatsApp"],
  },
  Location: {
    reply:
      "We're in Bengaluru with 24/7 lab access. Online live cohort also available globally.",
    followups: ["Get directions"],
  },
  "Send syllabus": {
    reply: "Tap 'Continue on WhatsApp' below and we'll send the PDF instantly.",
    followups: ["Open WhatsApp"],
  },
  "Hiring partners": {
    reply:
      "Top hires include Intel · AMD · NVIDIA · Qualcomm · Samsung · Synopsys · Cadence · Marvell · TI · NXP · MediaTek and 20+ more.",
    followups: ["Placements page", "Demo class"],
  },
  "Yes, send link": {
    reply: "Sliding the demo link to your WhatsApp now — tap below to open the chat.",
    followups: ["Open WhatsApp"],
  },
  "Get directions": {
    reply: "Opening Google Maps in a new tab — see you at the lab!",
    followups: ["Open WhatsApp"],
  },
  "Placements page": {
    reply: "Head over to /placements for our full alumni & company strip.",
    followups: ["Open WhatsApp"],
  },
  "Open WhatsApp": {
    reply: "Tap the button below to continue on real WhatsApp.",
  },
};

const QUICK_REPLIES = ["Courses", "Placements", "Demo class", "Fees", "Location"];

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Hi! 👋 I'm the ${SITE.name} bot. Ask me anything about courses, fees or placements.` },
  ]);
  const [pending, setPending] = useState<string[]>(QUICK_REPLIES);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send(text: string) {
    setMsgs((m) => [...m, { from: "user", text }]);
    setPending([]);
    setTyping(true);
    const flow = FLOWS[text];
    setTimeout(() => {
      setTyping(false);
      if (flow) {
        setMsgs((m) => [...m, { from: "bot", text: flow.reply }]);
        setPending(flow.followups ?? QUICK_REPLIES);
      } else {
        setMsgs((m) => [
          ...m,
          {
            from: "bot",
            text: "Got it — let's continue on WhatsApp so our team can help you personally.",
          },
        ]);
        setPending(["Open WhatsApp"]);
      }
    }, 650);
  }

  return (
    <>
      <button
        aria-label="Chat on WhatsApp"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl animate-pulse-ring hover:scale-105 transition-transform"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-5 z-50 w-[min(94vw,360px)] max-h-[70vh] rounded-2xl border border-border bg-card overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="bg-gradient-to-r from-primary to-red-700 px-4 py-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white leading-tight">MasterVLSI Bot</p>
                <p className="text-[10px] text-white/80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> online · typically replies instantly
                </p>
              </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-background/60">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                    m.from === "bot"
                      ? "bg-card border border-border rounded-bl-sm self-start mr-auto"
                      : "bg-primary text-primary-foreground rounded-br-sm self-end ml-auto"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="bg-card border border-border self-start mr-auto px-3 py-2 rounded-2xl rounded-bl-sm">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce" />
                  </span>
                </div>
              )}
            </div>
            <div className="border-t border-border p-3 space-y-2 bg-card/60">
              <div className="flex flex-wrap gap-1.5">
                {pending.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <a
                href={waLink(msgs.length > 1 ? msgs[msgs.length - 1].text : SITE.whatsappPrefill)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-md bg-primary text-primary-foreground px-3 py-2.5 text-sm font-medium hover:bg-primary/90 transition"
              >
                <Send size={14} /> Continue on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
