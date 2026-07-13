import { motion } from "framer-motion";
import heroPcb from "@/assets/cyber-pcb-hero.jpg";

/**
 * HeroBackdrop — dark cyber-blue PCB hero inspired by the user's references.
 * Realistic processor imagery + animated traces, scan beams, and data particles.
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <img
        src={heroPcb}
        alt=""
        aria-hidden
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover opacity-95"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,oklch(0.105_0.030_250/0.76)_34%,oklch(0.105_0.030_250/0.08)_72%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--background)_0%,transparent_22%,transparent_72%,var(--background)_100%)]" />

      {/* Holographic mesh */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="cyber-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 H 0 V 56" fill="none" stroke="var(--primary)" strokeOpacity="0.16" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.6" fill="var(--primary)" fillOpacity="0.26" />
          </pattern>
          <linearGradient id="blue-trace" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--primary)" stopOpacity="0.96" />
            <stop offset="72%" stopColor="var(--accent)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <filter id="cyber-glow">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="left-readable-fade">
            <rect width="100%" height="100%" fill="white" />
            <rect x="0" y="0" width="560" height="760" fill="black" opacity="0.48" />
          </mask>
        </defs>
        <rect width="1200" height="760" fill="url(#cyber-grid)" mask="url(#left-readable-fade)" />

        {[
          "M10 210 H190 L242 262 H420 L470 312 H830 L900 382 H1190",
          "M0 428 H155 L215 368 H392 L458 432 H700 L760 492 H1120",
          "M92 0 V112 L150 170 V308 L206 364",
          "M612 0 V118 L680 186 V322 L750 392",
          "M980 80 H820 L758 142 H562 L505 202 H360",
          "M1120 618 H930 L870 558 H690 L620 490 H480",
          "M300 760 V620 L362 558 V445 L430 376",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#blue-trace)"
            strokeWidth={i % 3 === 0 ? 2.2 : 1.35}
            fill="none"
            filter="url(#cyber-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.45, 1, 0.62] }}
            transition={{ duration: 3.4, delay: i * 0.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        ))}

        {[
          [242, 262], [470, 312], [760, 492], [680, 186], [505, 202], [870, 558], [430, 376], [930, 618],
        ].map(([x, y], i) => (
          <motion.circle
            key={`n-${i}`}
            cx={x}
            cy={y}
            r="3.5"
            fill="var(--primary)"
            filter="url(#cyber-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.22, 1, 0.22], r: [2.2, 6.4, 2.2] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.28 }}
          />
        ))}

        {Array.from({ length: 34 }).map((_, i) => (
          <motion.circle
            key={`p-${i}`}
            cx={520 + ((i * 37) % 410)}
            cy={170 + ((i * 53) % 330)}
            r={i % 4 === 0 ? 1.8 : 1.1}
            fill="var(--primary)"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: [0, 0.92, 0], y: [-6, -76] }}
            transition={{ duration: 3.8 + (i % 5) * 0.35, repeat: Infinity, delay: i * 0.11, ease: "easeOut" }}
          />
        ))}
      </svg>

      <motion.div
        aria-hidden
        className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm"
        initial={{ x: "-20vw", opacity: 0 }}
        animate={{ x: "112vw", opacity: [0, 0.75, 0] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
