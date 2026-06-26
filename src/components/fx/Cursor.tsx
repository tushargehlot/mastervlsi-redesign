import { useEffect, useRef, useState } from "react";

/**
 * Custom crimson ring + die-dot cursor with magnetic snap on
 * [data-magnetic], anchors and buttons. Disabled on touch / reduced-motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    setEnabled(true);
    document.documentElement.setAttribute("data-fx-cursor", "on");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let dx = x;
    let dy = y;
    let raf = 0;
    let isMagnet = false;

    const SNAP = "a, button, [data-magnetic], [role='button'], input, textarea, select, summary, label";

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      const el = (e.target as HTMLElement)?.closest(SNAP) as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dxm = (tx - cx) * 0.18;
        const dym = (ty - cy) * 0.18;
        tx = cx + dxm;
        ty = cy + dym;
        isMagnet = true;
      } else {
        isMagnet = false;
      }
    }

    function loop() {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dx += (tx - dx) * 0.45;
      dy += (ty - dy) * 0.45;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0) scale(${isMagnet ? 1.6 : 1})`;
        ring.current.style.borderColor = isMagnet
          ? "oklch(0.66 0.24 25 / 0.9)"
          : "oklch(0.66 0.24 25 / 0.45)";
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${dx - 2.5}px, ${dy - 2.5}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.removeAttribute("data-fx-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-9 w-9 rounded-full border transition-[border-color,transform] duration-150 ease-out mix-blend-difference"
        style={{ borderWidth: "1px" }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-[5px] w-[5px] rounded-full bg-primary mix-blend-screen"
      />
    </>
  );
}
