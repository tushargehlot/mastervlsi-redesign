import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Youtube, Linkedin, Instagram, Twitter, Facebook, MapPin, MessageCircle, Send, Star } from "lucide-react";
import { SITE, waLink } from "@/data/site";
const LOGO_URL = "/logo-mastervlsi.png";
import { TraceLine } from "@/components/fx/TraceLine";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <footer className="relative bg-surface-1 mt-12 sm:mt-24 border-t border-border">
      <TraceLine />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter strip */}
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-8 sm:p-10 mb-14 relative overflow-hidden shadow-[0_30px_80px_-35px_oklch(0.60_0.20_24_/_0.30)]">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <p className="font-mono text-xs text-primary uppercase tracking-widest">// Silicon weekly</p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight">
                One VLSI deep-dive in your inbox <span className="text-gradient">every Friday.</span>
              </h3>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineer@silicon.dev"
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-red transition"
              >
                {sent ? "✓ Subscribed" : <>Subscribe <Send size={14} /></>}
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center rounded-md ring-1 ring-border p-1" style={{ background: "var(--logo-backplate)" }}>
                <img src={LOGO_URL} alt="MasterVLSI logo" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                MASTER<span className="text-accent">VLSI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              {SITE.tagline} 12+ years, 5000+ engineers placed. Real-time industry mentors and a 24/7 EDA lab focused on RTL Design and UVM Verification.
            </p>
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              <a href={SITE.social.youtube} target="_blank" rel="noreferrer" className="p-2.5 rounded-md bg-card border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition" aria-label="YouTube">
                <Youtube size={16} />
              </a>
              <a href={SITE.social.linkedin} className="p-2.5 rounded-md bg-card border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href={SITE.social.instagram} className="p-2.5 rounded-md bg-card border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href={SITE.social.twitter} className="p-2.5 rounded-md bg-card border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer" className="p-2.5 rounded-md bg-card border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href={SITE.social.pinterest} target="_blank" rel="noreferrer" className="p-2.5 rounded-md bg-card border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.31-.09-.79-.17-2.01.03-2.87.19-.78 1.2-5.02 1.2-5.02s-.31-.62-.31-1.54c0-1.44.84-2.51 1.88-2.51.89 0 1.32.67 1.32 1.47 0 .89-.57 2.23-.86 3.47-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.34-4.23-2.96 0-4.69 2.22-4.69 4.51 0 .89.34 1.85.77 2.37.08.1.1.19.07.29-.08.32-.25 1.02-.28 1.16-.04.19-.15.23-.34.14-1.28-.6-2.08-2.46-2.08-3.96 0-3.23 2.34-6.19 6.76-6.19 3.55 0 6.31 2.53 6.31 5.91 0 3.53-2.22 6.37-5.31 6.37-1.04 0-2.01-.54-2.35-1.18l-.64 2.43c-.23.89-.85 2-1.27 2.68.96.3 1.97.46 3.02.46 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </a>
              <a href={waLink()} target="_blank" rel="noreferrer" className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-accent/10 text-accent px-3 py-2 text-xs font-medium hover:bg-accent/20 transition">
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 text-accent px-3 py-2 text-xs font-medium hover:bg-accent/20 transition">
                <Star size={14} className="fill-current" /> Google reviews
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Tracks</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-primary transition">RTL Design</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition">Design Verification</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition">SystemVerilog</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition">UVM Methodology</Link></li>
              <li><Link to="/courses/protocols" className="hover:text-primary transition">Protocols</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Learn</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/playlists" className="hover:text-primary transition">Playlists</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition">Blog</Link></li>
              <li><Link to="/demo" className="hover:text-primary transition">Free demo</Link></li>
              <li><Link to="/services" className="hover:text-primary transition">Services</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Proof</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/placements" className="hover:text-primary transition">Alumni wall</Link></li>
              <li><Link to="/testimonials" className="hover:text-primary transition">Testimonials</Link></li>
              <li><Link to="/placements" className="hover:text-primary transition">Placements</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">About us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Visit</h4>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{SITE.address}</p>
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
              <MapPin size={14} /> Open in Maps
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 MasterVLSI – 12+ years of shaping semiconductor engineers. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            All trademark and design reserved by mastervlsi
          </p>
          <p className="text-xs text-muted-foreground">
            Designed by{" "}
            <a
              href="mailto:ghttushar2002@gmail.com?subject=i%20wanna%20inquire%20for%20a%20freelance%20project"
              className="text-primary hover:underline transition"
            >
              Tushar Gehlot
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
