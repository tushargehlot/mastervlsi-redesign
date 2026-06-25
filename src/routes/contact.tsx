import { createFileRoute } from "@tanstack/react-router";
import { SITE, waLink } from "@/data/site";
import { GridBackdrop } from "@/components/GridBackdrop";
import { MapPin, MessageCircle, Mail, Phone, Youtube, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MasterVLSI" },
      { name: "description", content: "Visit our Bengaluru lab, chat on WhatsApp or send an email. We respond within a business day." },
      { property: "og:title", content: "Contact MasterVLSI" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    { icon: MessageCircle, title: "WhatsApp us", text: "Fastest reply — usually within the hour.", cta: "Open WhatsApp", href: waLink() },
    { icon: Mail, title: "Email", text: "info@mastervlsi.com", cta: "Send email", href: "mailto:info@mastervlsi.com" },
    { icon: Phone, title: "Call", text: "Speak to a counsellor", cta: "Get the number", href: waLink("Hi! Can you share the phone number please?") },
    { icon: Youtube, title: "YouTube", text: "200+ free tutorials", cta: "Subscribe", href: SITE.youtubeChannel },
  ];

  return (
    <section className="relative py-24">
      <GridBackdrop />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-widest">// Get in touch</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
            Let's <span className="text-gradient">talk silicon.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Whether you're exploring a course, planning a corporate engagement, or just curious
            about VLSI — we'd love to chat.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <a key={c.title} href={c.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:glow-red transition-all">
              <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <c.icon size={20} />
              </div>
              <h3 className="font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-primary font-mono uppercase tracking-wider">
                {c.cta} <ExternalLink size={11} />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-7">
            <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <MapPin size={20} />
            </div>
            <h3 className="font-display text-xl font-bold">Visit our lab</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{SITE.address}</p>
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Get directions
            </a>
          </div>
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border bg-card glow-red">
            <iframe
              src={SITE.mapsEmbed}
              className="w-full h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MasterVLSI location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
