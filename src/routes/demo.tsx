import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/data/site";
import { GridBackdrop } from "@/components/GridBackdrop";
import { LogicGatePlayground } from "@/components/LogicGatePlayground";
import { CalendarCheck, Clock, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Book a Free Demo — MasterVLSI" },
      { name: "description", content: "Reserve a free demo class at MasterVLSI. See our pedagogy, meet mentors and tour the lab — all in 60 minutes." },
      { property: "og:title", content: "Free Demo Class — MasterVLSI" },
      { property: "og:description", content: "Try before you commit. Book a complimentary demo today." },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  return (
    <>
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Try before you commit</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
              Book a <span className="text-gradient">free demo class.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Experience our teaching firsthand. Meet the mentor, walk the lab, ask anything.
              60 minutes, zero obligation.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: CalendarCheck, label: "Any weekday", val: "Monday – Friday slots" },
                { icon: Clock, label: "60 minutes", val: "Live & interactive" },
                { icon: MapPin, label: "On-site or online", val: "Choose what works for you" },
                { icon: Users, label: "Small batch", val: "Max 6 students per demo" },
              ].map((b) => (
                <div key={b.label} className="flex items-start gap-4 rounded-xl border border-border bg-card/60 p-4">
                  <div className="h-10 w-10 shrink-0 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    <b.icon size={18} />
                  </div>
                  <div>
                    <p className="font-display font-bold">{b.label}</p>
                    <p className="text-sm text-muted-foreground">{b.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={SITE.demoFormUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
            >
              Reserve my seat →
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-card p-2 overflow-hidden glow-red">
            <iframe
              src={SITE.demoFormUrl}
              className="w-full h-[700px] rounded-xl bg-white"
              title="Book demo form"
            />
          </div>
        </div>
      </section>

      <section className="relative py-24 border-t border-border bg-card/20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// While you're here</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            Try our <span className="text-gradient">logic-gate playground.</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Toggle inputs, switch gates, watch the truth table light up. The same building blocks
            you'll wire into million-gate SoCs in our RTL course.
          </p>
          <div className="mt-8">
            <LogicGatePlayground />
          </div>
        </div>
      </section>
    </>
  );
}
