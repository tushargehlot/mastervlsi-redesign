import { motion, useReducedMotion } from "framer-motion";

/** A tiny animated digital waveform — used as decoration in cards. */
export function MiniWaveform({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 200 40" className={`w-full h-10 ${className}`} aria-hidden>
      <motion.path
        d="M 0 30 L 20 30 L 20 10 L 50 10 L 50 30 L 80 30 L 80 10 L 110 10 L 110 30 L 140 30 L 140 10 L 170 10 L 170 30 L 200 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      {!reduce && (
        <motion.circle
          r="2"
          fill="oklch(0.78 0.14 70)"
          animate={{ cx: [0, 200], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          cy={20}
        />
      )}
    </svg>
  );
}
