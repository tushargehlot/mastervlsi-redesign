import { TrainFront, TramFront, Bus, Building2, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { RAILWAY, METRO, BUS, NEARBY_COMPANIES } from "@/data/connectivity";
import { Reveal } from "@/components/fx/Reveal";
import { SITE } from "@/data/site";

type Row = { name: string; km: string };

function DistanceList({
  icon: Icon,
  title,
  hint,
  items,
}: {
  icon: typeof TrainFront;
  title: string;
  hint: string;
  items: readonly Row[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden group">
      <div
        className="px-5 py-4 border-b border-border relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--surface-2), var(--surface-1))" }}
      >
        <span
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "var(--gradient-ignite)", opacity: 0.5 }}
        />
        <div className="flex items-center gap-3">
          <span
            className="h-10 w-10 rounded-lg text-primary-foreground flex items-center justify-center shadow-md"
            style={{ background: "var(--gradient-ignite)" }}
          >
            <Icon size={18} />
          </span>
          <div>
            <h3 className="font-display font-bold">{title}</h3>
            <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {hint}
            </p>
          </div>
        </div>
      </div>
      <ul className="divide-y divide-border/60">
        {items.map((r, i) => (
          <motion.li
            key={r.name}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-primary/5 transition"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
              <span className="truncate">{r.name}</span>
            </span>
            <span className="font-mono text-xs text-accent shrink-0">{r.km}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function CampusReach() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">
            // Location · Accessibility
          </p>
          <h2 className="mt-3 h-display-sm font-display font-bold">
            Perfectly placed in <span className="text-gradient-ignite">Bengaluru's silicon belt.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            {SITE.address}. Walk to Tin-Factory bus stop in 100 m, K.R. Puram station in 450 m,
            Benniganahalli Metro in 500 m – and you're one signal away from Samsung R&D.
          </p>
        </Reveal>

        {/* Map + summary */}
        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl border border-border overflow-hidden bg-card relative">
            <iframe
              title="MasterVLSI campus map"
              src={SITE.mapsEmbed}
              className="w-full h-[340px] sm:h-[420px] border-0 grayscale-[35%] hover:grayscale-0 transition-all duration-700"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background/85 backdrop-blur border border-border text-xs font-mono hover:border-primary/60 hover:text-primary transition"
            >
              <ExternalLink size={12} /> Open in Maps
            </a>
          </div>
          <div className="lg:col-span-2 grid gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-primary">
                <MapPin size={16} />
                <p className="font-mono text-[11px] uppercase tracking-widest">Campus address</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed">
                1st Floor, opposite to Vinayaka Temple, Udayanagar Main Road, Near Tin-Factory bus stop,
                Bangalore – 560016.
              </p>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline"
              >
                Get directions <ExternalLink size={11} />
              </a>
            </div>
            <div
              className="rounded-2xl p-5 text-primary-foreground border border-primary/20"
              style={{ background: "var(--gradient-ignite)" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-widest opacity-85">
                // Bengaluru East · silicon corridor
              </p>
              <p className="mt-2 font-display text-xl font-bold leading-tight">
                Samsung R&D at your doorstep. Google, TI, Synopsys within 1 km.
              </p>
              <p className="mt-2 text-xs opacity-90">
                Walk out for lunch, walk into your interview.
              </p>
            </div>
          </div>
        </div>

        {/* Distance grid */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <DistanceList
            icon={TrainFront}
            title="Railway stations"
            hint="road distance · approx"
            items={RAILWAY}
          />
          <DistanceList
            icon={TramFront}
            title="Metro stations"
            hint="walkable · &lt; 10 min"
            items={METRO}
          />
          <DistanceList
            icon={Bus}
            title="Bus stops"
            hint="BMTC network"
            items={BUS}
          />
        </div>

        {/* Nearby companies */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                // Silicon neighbours
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold">
                {NEARBY_COMPANIES.length} VLSI companies within a 6 km radius.
              </h3>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              interview → office → offer, all inside a lunch break
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {NEARBY_COMPANIES.map((c) => (
              <span
                key={c.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background/40 hover:border-primary/50 transition"
              >
                <Building2 size={12} className="text-primary" />
                <span className="text-sm font-medium">{c.name}</span>
                <span className="font-mono text-[10px] text-accent">{c.km}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
