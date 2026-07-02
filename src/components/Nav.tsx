import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";
import { Magnetic } from "@/components/fx/Magnetic";
import { DemoTrigger } from "@/components/DemoModal";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/services", label: "Services" },
  { to: "/playlists", label: "Playlists" },
  { to: "/placements", label: "Placements" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border shadow-[0_4px_30px_-12px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" data-magnetic className="flex items-center gap-2.5 group min-w-0">
          <span className="relative shrink-0">
            <span className="absolute -inset-2 rounded-xl bg-primary/25 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={logoAsset.url}
              alt="MasterVLSI"
              width={160}
              height={40}
              className="relative h-9 sm:h-10 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-magnetic
              className="relative px-2.5 py-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors group"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              <span className="relative">
                {l.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </span>
            </Link>
          ))}
          <Magnetic className="ml-2">
            <DemoTrigger className="relative inline-flex items-center overflow-hidden rounded-md px-4 py-2 text-[13px] font-semibold text-white transition-all glow-red hover:brightness-110">
              <span
                className="absolute inset-0"
                style={{ background: "var(--gradient-ignite)" }}
                aria-hidden
              />
              <span className="relative">Book Free Demo</span>
            </DemoTrigger>
          </Magnetic>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-foreground"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-card hover:text-foreground"
                activeProps={{ className: "text-foreground bg-card" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <DemoTrigger className="relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2.5 text-sm font-semibold text-white">
              <span
                className="absolute inset-0"
                style={{ background: "var(--gradient-ignite)" }}
                aria-hidden
              />
              <span className="relative" onClick={() => setOpen(false)}>Book Free Demo</span>
            </DemoTrigger>
          </nav>
        </div>
      )}
    </header>
  );
}
