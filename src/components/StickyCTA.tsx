import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { SITE } from "@/data/site";

export function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="sticky-cta"
          href={SITE.demoFormUrl}
          target="_blank"
          rel="noreferrer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 260 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden md:inline-flex group items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_-15px_oklch(0.60_0.20_24_/_0.45)] hover:brightness-110"
          style={{ background: "var(--gradient-ignite)" }}
        >
          <Calendar size={15} />
          <span className="hidden sm:inline">Book your free VLSI demo</span>
          <span className="sm:hidden">Free Demo</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
