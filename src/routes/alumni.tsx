import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AlumniWall } from "@/components/AlumniWall";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Reveal } from "@/components/fx/Reveal";
import { ALUMNI } from "@/data/alumni";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Wall – 5000+ MasterVLSI Engineers Placed | MasterVLSI" },
      { name: "description", content: "Meet MasterVLSI alumni working at Intel, NVIDIA, AMD, Qualcomm, Synopsys, Cadence and 60+ semiconductor companies. Names, roles, packages – verified placements." },
      { property: "og:title", content: "MasterVLSI Alumni Wall" },
      { property: "og:description", content: "5000+ engineers placed across the global semiconductor industry." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/alumni` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/alumni` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          numberOfItems: ALUMNI.length,
          itemListElement: ALUMNI.slice(0, 20).map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Person",
              name: a.name,
              jobTitle: a.role,
              worksFor: { "@type": "Organization", name: a.company },
              alumniOf: { "@type": "EducationalOrganization", name: "MasterVLSI" },
            },
          })),
        }),
      },
    ],
  }),
  component: AlumniPage,
});

function AlumniPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 overflow-hidden">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Alumni Wall</p>
            <h1 className="mt-3 h-display font-display font-bold">
              5000+ engineers <span className="text-gradient">shipping silicon.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              These are real MasterVLSI graduates – names, roles, packages, companies. Filter by the track they took to see who's landed where.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AlumniWall />
          <p className="mt-6 text-center text-xs text-muted-foreground font-mono">
            Showing {Math.min(24, ALUMNI.length)} of 5000+ placements. Real photos rolling out as we digitise the archive.
          </p>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-10 sm:p-14 text-center">
            <h2 className="h-display-sm font-display font-bold">
              You could be <span className="text-gradient">next on this wall.</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Join the next cohort. Placement starts within 30–45 days of the core modules.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/demo" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-navy">
                Book free demo <ArrowRight size={16} />
              </Link>
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm hover:border-primary hover:text-primary">
                See all tracks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
