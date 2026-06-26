import { motion, useReducedMotion } from "framer-motion";

/** Animated PCB-trace SVG underlay — etches in and pulses data along paths. */
export function PcbTraces({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const paths = [
    "M 0 120 H 160 V 60 H 320 V 200 H 540",
    "M 0 260 H 80 V 340 H 240 V 280 H 420 V 360 H 600",
    "M 0 440 H 200 V 380 H 360 V 460 H 540",
    "M 600 80 V 200 H 460 V 320",
    "M 600 540 V 420 H 480 V 360",
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="traceWire" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.02 240 / 0.0)" />
          <stop offset="50%" stopColor="oklch(0.78 0.02 240 / 0.35)" />
          <stop offset="100%" stopColor="oklch(0.78 0.02 240 / 0.0)" />
        </linearGradient>
        <radialGradient id="pad" r="1">
          <stop offset="0%" stopColor="oklch(0.66 0.24 25 / 0.9)" />
          <stop offset="100%" stopColor="oklch(0.66 0.24 25 / 0)" />
        </radialGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={i}>
          <motion.path
            d={d}
            fill="none"
            stroke="url(#traceWire)"
            strokeWidth={1}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: i * 0.18, ease: "easeOut" }}
          />
          {!reduce && (
            <motion.circle
              r={2.5}
              fill="oklch(0.78 0.14 70)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "linear",
              }}
              style={{
                offsetPath: `path('${d}')`,
                offsetRotate: "0deg",
                filter: "drop-shadow(0 0 4px oklch(0.78 0.14 70))",
              }}
            >
              <animate
                attributeName="offset-distance"
                from="0%"
                to="100%"
                dur="3.5s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
              />
            </motion.circle>
          )}
        </g>
      ))}
      {/* Solder pads at endpoints */}
      {[[160, 60], [320, 200], [240, 280], [420, 360], [200, 380], [360, 460], [460, 200], [480, 360]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill="url(#pad)" />
      ))}
    </svg>
  );
}
