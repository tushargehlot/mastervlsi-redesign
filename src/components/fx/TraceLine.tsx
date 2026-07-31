import { motion, useReducedMotion } from "framer-motion";

/** Thin animated PCB trace divider. Used between sections. */
export function TraceLine({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative h-px w-full overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent opacity-80" />
      {!reduce && (
        <motion.div
          className="absolute top-0 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ x: "-20%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          style={{ boxShadow: "0 0 10px var(--primary)" }}
        />
      )}
    </div>
  );
}
