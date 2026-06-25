import { createFileRoute } from "@tanstack/react-router";
import { STATS } from "@/data/site";
import { PARTNERS } from "@/data/partners";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Counter } from "@/components/Counter";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placements — MasterVLSI" },
      { name: "description", content: "5000+ alumni placed at Intel, AMD, NVIDIA, Qualcomm, Synopsys, Cadence and 25+ more. Placement within 30–45 days." },
      { property: "og:title", content: "Placements — MasterVLSI" },
      { property: "og:description", content: "Where MasterVLSI engineers work today." },
    ],
  }),
  component: PlacementsPage,
});

const TESTIMONIALS = [
  { name: "Priya R.", role: "Design Verification Engineer @ NVIDIA", quote: "Joined with zero UVM knowledge. Six months later I was running constrained-random regressions on a GPU subsystem." },
  { name: "Arjun M.", role: "Physical Design Engineer @ AMD", quote: "The 24/7 lab access changed everything. I could iterate on floorplans at 2 AM and message my mentor at 9." },
  { name: "Sneha K.", role: "RTL Designer @ Qualcomm", quote: "Best decision I made coming out of college. Got 3 offers within 6 weeks of completion." },
];

function PlacementsPage() {
  return (
    <>
      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Outcomes</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
              Where our engineers <span className="text-gradient">work today.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Placement starts within 30–45 days of joining MasterVLSI. Below is a snapshot of the
              companies that have hired our alumni across India, the US and APAC.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-5 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card/60 p-6">
                <p className="font-display text-4xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 mb-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Trusted by 30+ hiring partners
          </p>
        </div>
        <PartnerMarquee />
        <div className="mx-auto max-w-7xl px-4 mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="aspect-[5/2] rounded-xl border border-border bg-background flex items-center justify-center font-mono text-sm text-muted-foreground hover:text-primary hover:border-primary/60 transition"
            >
              {p.name}
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-24">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold max-w-2xl">
            Voices from our <span className="text-gradient">alumni.</span>
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-7">
                <Quote size={20} className="text-primary mb-3" />
                <blockquote className="text-sm text-foreground leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-5">
                  <p className="font-display font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
