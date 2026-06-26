/** Site-wide film grain — mount once near the top of the tree. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="grain-overlay pointer-events-none fixed inset-0 z-[60]"
      style={{ opacity: 0.18 }}
    />
  );
}
