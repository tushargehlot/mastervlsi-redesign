import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Youtube, Linkedin, Instagram, Twitter, MapPin, MessageCircle, Send, Star } from "lucide-react";
import { SITE, waLink } from "@/data/site";
import markAsset from "@/assets/mark.png.asset.json";
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
    <footer className="relative bg-surface-1 mt-24 border-t border-border">
      <TraceLine />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter strip */}
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-10 mb-14 relative overflow-hidden shadow-sm">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <p className="font-mono text-xs text-primary uppercase tracking-widest">// Silicon weekly</p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
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
                className="flex-1 px-4 py-3 rounded-md bg-background border border-border text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 glow-navy transition"
              >
                {sent ? "✓ Subscribed" : <>Subscribe <Send size={14} /></>}
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center rounded-md bg-white ring-1 ring-border p-1">
                <img src={markAsset.url} alt="MasterVLSI logo" width={32} height={32} className="h-8 w-8" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                MASTER<span className="text-accent">VLSI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              {SITE.tagline} 12+ years, 5000+ engineers placed. Real-time industry mentors and a 24/7 lab from RTL to GDSII.
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
              <a href={waLink()} target="_blank" rel="noreferrer" className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-accent/10 text-accent px-3 py-2 text-xs font-medium hover:bg-accent/20 transition">
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-yellow-100 text-yellow-800 px-3 py-2 text-xs font-medium hover:bg-yellow-200 transition">
                <Star size={14} className="fill-yellow-500 text-yellow-500" /> Google reviews
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Tracks</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-primary transition">Physical Design</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition">RTL Design</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition">Design & Verification</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition">Analog Design</Link></li>
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
              <li><Link to="/alumni" className="hover:text-primary transition">Alumni wall</Link></li>
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
            © 2026 MasterVLSI — 12+ years of shaping semiconductor engineers.
          </p>
          <p className="text-xs text-muted-foreground">
            All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
