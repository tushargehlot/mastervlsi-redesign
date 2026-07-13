import { useEffect, useRef, useState } from "react";

/**
 * High-contrast custom cursor tuned for the dark cyber-blue interface.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none)").matches || "ontouchstart" in window;
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
    let mode: "idle" | "hover" | "text" = "idle";

    const HOVER_SEL = "a, button, [data-magnetic], [role='button'], summary, label";
    const TEXT_SEL = "input, textarea, [contenteditable='true']";

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      const el = e.target as HTMLElement | null;
      if (el?.closest(TEXT_SEL)) mode = "text";
      else if (el?.closest(HOVER_SEL)) mode = "hover";
      else mode = "idle";
    }

    function loop() {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dx += (tx - dx) * 0.5;
      dy += (ty - dy) * 0.5;
      const scale = mode === "hover" ? 1.9 : mode === "text" ? 0.4 : 1;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0) scale(${scale})`;
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
        dot.current.style.opacity = mode === "text" ? "0" : "1";
      }
      if (label.current) {
        label.current.style.transform = `translate3d(${x + 20}px, ${y - 8}px, 0)`;
        label.current.style.opacity = mode === "hover" ? "1" : "0";
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
      {/* Difference-blend ring — always readable */}
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-9 w-9 rounded-full border-2 border-white transition-transform duration-150 ease-out"
        style={{ mixBlendMode: "difference" }}
      />
      {/* Cyan core */}
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full transition-opacity duration-150"
        style={{
          background: "var(--primary)",
          boxShadow: "0 0 10px var(--primary), 0 0 26px var(--accent)",
        }}
      />
      {/* Tiny hover label */}
      <div
        ref={label}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] px-1.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-widest opacity-0 transition-opacity duration-200"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          boxShadow: "0 4px 12px oklch(0 0 0 / 0.4)",
        }}
      >
        interact
      </div>
    </>
  );
}
