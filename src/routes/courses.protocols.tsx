import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Reveal } from "@/components/fx/Reveal";
import { ProtocolMatrix } from "@/components/ProtocolMatrix";

export const Route = createFileRoute("/courses/protocols")({
  head: () => ({
    meta: [
      { title: "Protocols We Teach — AMBA, PCIe, DDR, USB, CXL, Ethernet | MasterVLSI" },
      { name: "description", content: "MasterVLSI protocol training: AMBA (APB/AHB/AXI), UART, SPI, I2C, GPIO, JTAG, PCIe, DDR, USB, CXL, CHI, Ethernet. Design and verification depth on every protocol." },
      { property: "og:title", content: "Protocols we teach at MasterVLSI" },
      { property: "og:description", content: "AMBA, low-speed and high-speed serial protocols — end-to-end coverage." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vlsiviz-sparkle.lovable.app/courses/protocols" },
    ],
    links: [{ rel: "canonical", href: "https://vlsiviz-sparkle.lovable.app/courses/protocols" }],
  }),
  component: ProtocolsPage,
});

function ProtocolsPage() {
  return (
    <>
      <section className="relative pt-28 pb-14">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Protocol training</p>
            <h1 className="mt-3 h-display font-display font-bold">
              Every protocol <span className="text-gradient">on modern silicon.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              From AMBA on-chip fabric to high-speed serial links — we cover the protocols semiconductor companies actually hire for.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProtocolMatrix />
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-card p-10 sm:p-14 text-center">
            <h2 className="h-display-sm font-display font-bold">
              Learn any protocol <span className="text-gradient">in depth.</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Protocol modules are bundled into the Design & Verification track and available as advance electives.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-navy">
                See tracks <ArrowRight size={16} />
              </Link>
              <Link to="/demo" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm hover:border-primary hover:text-primary">
                Book free demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
