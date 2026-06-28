import { motion } from "framer-motion";
import { Reveal } from "@/components/fx/Reveal";

/** Letter-style founder note with handwritten signature stroke. */
export function FoundersNote() {
  return (
    <Reveal>
      <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-8 sm:p-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg-fine opacity-20 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/15 blur-3xl" />
        <p className="relative font-mono text-[10px] uppercase tracking-widest text-primary">// From the founder</p>
        <h3 className="relative mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
          "We don't sell certificates. <span className="text-gradient">We ship engineers.</span>"
        </h3>
        <div className="relative mt-6 max-w-3xl text-base text-muted-foreground leading-relaxed space-y-3">
          <p>I started MasterVLSI after a decade in the trenches at top semiconductor companies, watching brilliant graduates fail interviews not because they lacked talent — but because nobody taught them how silicon really gets built.</p>
          <p>Every cohort here is run like a real design house: code reviews, daily standups, EDA tools licensed from Cadence and Synopsys, and mentors who taped out chips last quarter. If you put in the hours, we'll match them — and we won't stop until your offer letter is on your phone.</p>
        </div>
        <div className="relative mt-8 flex items-center gap-4">
          <svg width="120" height="48" viewBox="0 0 120 48" className="text-primary">
            <motion.path
              d="M5 30 C 20 8, 30 8, 40 28 S 60 48, 75 22 S 100 8, 115 30"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          <div>
            <p className="font-display font-bold">Founder, MasterVLSI</p>
            <p className="text-xs text-muted-foreground">10+ years · ex-Intel, ex-Qualcomm</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
