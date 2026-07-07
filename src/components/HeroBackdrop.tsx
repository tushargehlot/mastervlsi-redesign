import { motion } from "framer-motion";

/**
 * HeroBackdrop — light-mode circuit backdrop.
 * Soft navy grid, thin teal traces, subtle red data pulses on white.
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Radial navy glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 20%, oklch(0.55 0.13 258 / 0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, oklch(0.55 0.10 200 / 0.09), transparent 60%)",
        }}
      />
      {/* Hex mesh */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hex-mesh" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon
              points="30,2 58,17 58,45 30,60 2,45 2,17"
              fill="none"
              stroke="oklch(0.55 0.10 258 / 0.28)"
              strokeWidth="0.7"
            />
          </pattern>
          <linearGradient id="mesh-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="40%" stopColor="black" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </linearGradient>
          <mask id="mesh-mask">
            <rect width="100%" height="100%" fill="url(#mesh-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-mesh)" mask="url(#mesh-mask)" />
      </svg>

      {/* Circuit trace paths — self-drawing */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trace-g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.32 0.09 258 / 0)" />
            <stop offset="50%" stopColor="oklch(0.55 0.10 200 / 0.85)" />
            <stop offset="100%" stopColor="oklch(0.32 0.09 258 / 0)" />
          </linearGradient>
          <filter id="glow-f">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[
          "M0 120 L180 120 L220 160 L420 160 L460 200 L800 200",
          "M0 300 L120 300 L160 260 L360 260 L400 300 L620 300 L660 340 L800 340",
          "M0 460 L200 460 L240 420 L500 420 L540 460 L800 460",
          "M100 0 L100 80 L140 120 L140 260",
          "M540 0 L540 100 L580 140 L580 260 L620 300",
          "M700 240 L700 380 L660 420 L660 600",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#trace-g)"
            strokeWidth="1.2"
            fill="none"
            filter="url(#glow-f)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}

        {/* Node dots pulsing — red accents on light bg */}
        {[
          [180, 120],
          [420, 160],
          [360, 260],
          [620, 300],
          [500, 420],
          [140, 260],
          [700, 380],
        ].map(([x, y], i) => (
          <motion.circle
            key={`n-${i}`}
            cx={x}
            cy={y}
            r="3"
            fill="oklch(0.58 0.22 25)"
            filter="url(#glow-f)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3], r: [3, 4.5, 3] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </svg>

      {/* Soft top-to-bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(1 0 0 / 0) 60%, oklch(0.975 0.006 250 / 0.90) 100%)",
        }}
      />
    </div>
  );
}
