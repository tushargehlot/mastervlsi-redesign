import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SITE, waLink } from "@/data/site";
import { GridBackdrop } from "@/components/GridBackdrop";
import { Spotlight } from "@/components/fx/Spotlight";
import { Reveal } from "@/components/fx/Reveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { SectionDivider } from "@/components/vlsi/SectionDivider";
import { MapPin, MessageCircle, Mail, Phone, Youtube, ExternalLink, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact MasterVLSI — Bengaluru VLSI Institute | WhatsApp, Call, Visit" },
      { name: "description", content: "Visit our Bengaluru campus at Udayanagar Main Road near Tin-Factory, or reach us on WhatsApp (+91 98449 82345), email or phone. Response within a business day." },
      { property: "og:title", content: "Contact MasterVLSI — Bengaluru" },
      { property: "og:description", content: "WhatsApp, email, call or drop by our Bengaluru lab." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vlsiviz-sparkle.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://vlsiviz-sparkle.lovable.app/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.name,
          description: SITE.tagline,
          telephone: SITE.phone,
          email: SITE.email,
          url: "https://vlsiviz-sparkle.lovable.app/contact",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "1st Floor, opposite to Vinayaka Temple, Udayanagar Main Road, near Tin-Factory bus stop",
            addressLocality: "Bangalore",
            addressRegion: "Karnataka",
            postalCode: "560016",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 13.0067,
            longitude: 77.6784,
          },
          openingHoursSpecification: [{
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            opens: "09:30",
            closes: "18:30",
          }],
          hasMap: SITE.mapsUrl,
          sameAs: [SITE.youtubeChannel],
        }),
      },
    ],
  }),
  component: ContactPage,
});


function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
    // Falls through to WhatsApp for real handoff (no backend this phase).
    const msg = `Hi MasterVLSI! I'm ${form.name} (${form.email}). ${form.message}`;
    setTimeout(() => window.open(waLink(msg), "_blank"), 600);
  }

  const cards = [
    { icon: MessageCircle, title: "WhatsApp us", text: "Fastest reply — usually within the hour.", cta: "Open WhatsApp", href: waLink() },
    { icon: Mail, title: "Email", text: "info@mastervlsi.com", cta: "Send email", href: "mailto:info@mastervlsi.com" },
    { icon: Phone, title: "Call", text: "Speak to a counsellor", cta: "Get the number", href: waLink("Hi! Can you share the phone number please?") },
    { icon: Youtube, title: "YouTube", text: "200+ free tutorials", cta: "Subscribe", href: SITE.youtubeChannel },
  ];

  return (
    <>
      <section className="relative py-28 overflow-hidden">
        <GridBackdrop />
        <Spotlight size={700} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">// Get in touch</p>
            <h1 className="mt-3 h-display font-display font-bold">
              Let's <span className="text-gradient">talk silicon.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Whether you're exploring a course, planning a corporate engagement, or just curious about VLSI —
              pick a channel below and we'll get back to you within a business day.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:glow-soft transition-all relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <c.icon size={20} />
                </div>
                <h3 className="font-display text-lg font-bold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-primary font-mono uppercase tracking-wider">
                  {c.cta} <ExternalLink size={11} />
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <SectionDivider label="visit · message" />

      <section className="relative py-20 surface-1 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          {/* MAP IN CHIP FRAME */}
          <Reveal>
            <h2 className="font-display text-2xl font-bold">Find our lab.</h2>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.address}</p>
            <div className="mt-6 relative">
              {/* chip-package frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 via-trace/10 to-primary/30 blur-2xl opacity-50" />
              <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
                {/* pins */}
                <div className="absolute inset-x-0 -top-1 flex justify-around px-6 z-10">
                  {Array.from({ length: 16 }).map((_, i) => <span key={i} className="h-2 w-1 bg-border" />)}
                </div>
                <div className="absolute inset-x-0 -bottom-1 flex justify-around px-6 z-10">
                  {Array.from({ length: 16 }).map((_, i) => <span key={i} className="h-2 w-1 bg-border" />)}
                </div>
                <iframe
                  src={SITE.mapsEmbed}
                  className="w-full h-[420px] grayscale contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MasterVLSI location"
                  style={{ filter: "grayscale(1) contrast(1.2) invert(0.92) hue-rotate(180deg)" }}
                />
              </div>
              <Magnetic className="mt-4 inline-block">
                <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  <MapPin size={14} /> Get directions
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* FORM */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold">Or send us a quick note.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hits our WhatsApp inbox directly — fastest path to a human reply.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6">
              {[
                { k: "name", label: "Your name", type: "text", placeholder: "Tushar Gehlot" },
                { k: "email", label: "Email", type: "email", placeholder: "engineer@silicon.dev" },
              ].map((f) => (
                <div key={f.k} className="group">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{f.label}</label>
                  <input
                    type={f.type}
                    required
                    value={form[f.k as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    placeholder={f.placeholder}
                    className="mt-1.5 w-full bg-transparent border-b border-border px-1 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you're exploring…"
                  className="mt-1.5 w-full bg-transparent border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <Magnetic className="block">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red"
                >
                  {sent ? "Opening WhatsApp…" : <>Send message <Send size={14} /></>}
                </button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
