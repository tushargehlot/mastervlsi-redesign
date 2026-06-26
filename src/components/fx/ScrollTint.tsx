import { useEffect } from "react";

/** Drives the global --scroll-tint CSS variable (0 → 1) from page scroll. */
export function ScrollTint() {
  useEffect(() => {
    let raf = 0;
    const root = document.documentElement;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.body.scrollHeight - window.innerHeight;
        const v = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
        root.style.setProperty("--scroll-tint", v.toFixed(3));
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
