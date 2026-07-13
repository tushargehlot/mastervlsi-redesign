export function GridBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary),transparent_62%)] opacity-15" />
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-accent/16 blur-3xl" />
    </div>
  );
}
