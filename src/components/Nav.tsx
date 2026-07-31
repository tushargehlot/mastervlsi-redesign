import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
const LOGO_URL = "/logo-mastervlsi.png";
import { Magnetic } from "@/components/fx/Magnetic";
import { DemoTrigger } from "@/components/DemoModal";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/placements", label: "Our Placements" },
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
          ? "bg-background/88 backdrop-blur-2xl border-b border-border shadow-[var(--shadow-elevated)]"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" data-magnetic className="flex items-center gap-2.5 group min-w-0">
          <span className="relative shrink-0 flex items-center justify-center rounded-lg ring-1 ring-border/60 px-2 py-1" style={{ background: "var(--logo-backplate)" }}>
            <img
              src={LOGO_URL}
              alt="MasterVLSI"
              width={160}
              height={40}
              className="relative h-8 sm:h-9 w-auto max-w-[45vw] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-magnetic
              className="relative px-2.5 py-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors group"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              <span className="relative">
                {l.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </span>
            </Link>
          ))}
          <Magnetic className="ml-2">
            <DemoTrigger className="relative inline-flex items-center overflow-hidden rounded-md px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-all glow-red hover:brightness-110">
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
          className="xl:hidden p-2 -mr-2 text-foreground shrink-0"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-background/98 backdrop-blur-xl">
          <nav className="px-4 py-4 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-surface-1 hover:text-foreground"
                activeProps={{ className: "text-primary bg-primary/5 font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <DemoTrigger className="relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2.5 text-sm font-semibold text-primary-foreground">
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
