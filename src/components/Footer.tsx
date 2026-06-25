import { Link } from "@tanstack/react-router";
import { Youtube, Linkedin, Instagram, Twitter, MapPin, MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/data/site";
import markAsset from "@/assets/mark.png.asset.json";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30 mt-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={markAsset.url} alt="" width={36} height={36} className="h-9 w-9" />
              <span className="font-display text-xl font-bold tracking-tight">
                MASTER<span className="text-primary">VLSI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              {SITE.tagline} Real-time mentors. 24/7 lab. Placement-aligned curriculum
              from RTL to GDSII.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={SITE.social.youtube} target="_blank" rel="noreferrer" className="p-2 rounded-md bg-card hover:bg-primary/10 hover:text-primary transition" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href={SITE.social.linkedin} className="p-2 rounded-md bg-card hover:bg-primary/10 hover:text-primary transition" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={SITE.social.instagram} className="p-2 rounded-md bg-card hover:bg-primary/10 hover:text-primary transition" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={SITE.social.twitter} className="p-2 rounded-md bg-card hover:bg-primary/10 hover:text-primary transition" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href={waLink()} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-primary/10 text-primary px-3 py-2 text-xs font-medium hover:bg-primary/20 transition">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/courses" className="hover:text-primary">Courses</Link></li>
              <li><Link to="/playlists" className="hover:text-primary">Playlists</Link></li>
              <li><Link to="/placements" className="hover:text-primary">Placements</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/demo" className="hover:text-primary">Book Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Visit</h4>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{SITE.address}</p>
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
              <MapPin size={14} /> Open in Maps
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 MasterVLSI — Designed by Tushar Gehlot
          </p>
          <p className="text-xs text-muted-foreground">
            All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
