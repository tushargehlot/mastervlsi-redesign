import { TraceLine } from "@/components/fx/TraceLine";

/** Section divider with circuit-node decoration. */
export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 flex items-center gap-4">
      <TraceLine className="flex-1" />
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground shrink-0">
          ◆ {label}
        </span>
      )}
      <TraceLine className="flex-1" />
    </div>
  );
}
