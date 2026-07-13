import { useEffect, useRef } from "react";

/**
 * Section-scoped probe light that follows the pointer.
 * Drop inside a `relative` container — sits absolutely behind content.
 */
export function Spotlight({
  className = "",
  color = "oklch(0.76 0.155 220 / 0.18)",
  size = 520,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    function move(e: MouseEvent) {
      const r = parent!.getBoundingClientRect();
      el!.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el!.style.setProperty("--my", `${e.clientY - r.top}px`);
      el!.style.opacity = "1";
    }
    function leave() {
      el!.style.opacity = "0";
    }
    parent.addEventListener("mousemove", move);
    parent.addEventListener("mouseleave", leave);
    return () => {
      parent.removeEventListener("mousemove", move);
      parent.removeEventListener("mouseleave", leave);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 60%)`,
      }}
    />
  );
}
