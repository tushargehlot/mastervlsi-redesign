import { motion, useScroll, useSpring } from "framer-motion";

/** Top page-scroll progress rail using the brand gradient. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: w, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[80] bg-gradient-to-r from-crimson via-ignite to-trace"
    />
  );
}
