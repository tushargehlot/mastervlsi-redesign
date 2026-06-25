import { createFileRoute, Link } from "@tanstack/react-router";
import { COURSES } from "@/data/courses";
import { GridBackdrop } from "@/components/GridBackdrop";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — MasterVLSI" },
      { name: "description", content: "End-to-end VLSI design services: RTL, DV, FPGA, SoC, PD, DFT, STA, Low Power, Post-Si, ASIC, CDC, IP, AMS, automation." },
      { property: "og:title", content: "VLSI Design Services" },
      { property: "og:description", content: "Industry-grade silicon engineering, on demand." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <section className="relative py-24">
      <GridBackdrop />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// For companies</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
            Silicon engineering, <span className="text-gradient">on demand.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Beyond training, we partner with semiconductor companies and startups on full-flow VLSI
            engagements — from architecture to tape-out, with deliverables you can trust.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {COURSES.map((c) => (
            <div key={c.id} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition-all">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold">
                  {String(c.number).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-bold">{c.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.long}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-10 text-center glow-red">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Have a silicon project? <span className="text-gradient">Let's talk.</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            NDA-friendly, milestone-based engagement. Reach out and we'll respond within a business day.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Contact us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
