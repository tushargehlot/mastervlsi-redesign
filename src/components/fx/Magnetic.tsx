import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Wraps a button/link; element drifts ~8px toward the cursor on hover. */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 22 });
  const sy = useSpring(my, { stiffness: 280, damping: 22 });
  const x = useTransform(sx, (v) => v * strength);
  const y = useTransform(sy, (v) => v * strength);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = ref.current!.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      data-magnetic
      className={`inline-block ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
