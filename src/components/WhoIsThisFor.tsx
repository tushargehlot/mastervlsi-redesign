import { GraduationCap, Briefcase, RefreshCcw, ArrowRightLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { waLink } from "@/data/site";
import { Reveal } from "@/components/fx/Reveal";

const PERSONAS = [
  {
    icon: GraduationCap,
    tag: "Students",
    title: "College / Final-year",
    desc: "Pursuing or in your final year of B.E./B.Tech in ECE, EEE, E&C, EIE. Get placement-ready before you graduate.",
    bullets: ["Free internship track", "Live industry projects", "Campus-hire alignment"],
  },
  {
    icon: Briefcase,
    tag: "Freshers",
    title: "Passed-out fresher",
    desc: "Graduated but still hunting? We take you from zero to hire-ready in 5–6 months with real mock interviews.",
    bullets: ["Mock interviews weekly", "Resume + LinkedIn audit", "Direct alumni referrals"],
  },
  {
    icon: RefreshCcw,
    tag: "Career Gap",
    title: "PSU / Non-VLSI / Faculty → VLSI",
    desc: "A gap year or a switch from a non-core role. We reframe your experience level and prep you specifically for lateral interviews.",
    bullets: [
      "Interview prep with experience-level framing",
      "Sustainable practical exposure to industry flows",
      "Post-offer job support through first year",
    ],
  },
  {
    icon: ArrowRightLeft,
    tag: "Switch",
    title: "VLSI → Different VLSI sub-domain",
    desc: "Working in one domain (say, DV) but want to move (say, into PD or Analog)? Targeted upskilling with mentor referrals.",
    bullets: ["Domain-to-domain roadmap", "Weekend deep-dives", "1-on-1 mentor pairing"],
  },
] as const;

export function WhoIsThisFor() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// One-stop solution</p>
          <h2 className="mt-3 h-display-sm font-display font-bold">
            Wherever you're starting from — <span className="text-gradient">we get you into VLSI.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            12+ years of turning students, freshers, career-gap professionals and cross-domain switchers into shipping semiconductor engineers.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {PERSONAS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-[0_10px_30px_-12px_rgba(15,47,92,0.15)] transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <p.icon size={20} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-2">
                  <Link to="/demo" className="text-xs font-semibold text-primary hover:underline">
                    Book a free demo →
                  </Link>
                  <a href={waLink(`Hi! I'm interested in the ${p.title} track.`)} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
