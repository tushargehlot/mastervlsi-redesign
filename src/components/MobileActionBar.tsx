import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { SITE, waLink } from "@/data/site";

/** Sticky mobile-only action bar — primary CTAs always reachable. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-background/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-3 text-center">
        <a href={waLink()} className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-mono text-primary hover:bg-primary/5">
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <a href={`tel:${SITE.phone.replace(/[^+0-9]/g, "")}`} className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-mono text-foreground border-x border-border hover:bg-white/5">
          <Phone size={18} />
          Call
        </a>
        <Link to="/demo" className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-mono text-primary hover:bg-primary/5">
          <Calendar size={18} />
          Demo
        </Link>
      </div>
    </nav>
  );
}
