import type { BlogPost } from "@/data/blog";

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const VARIANTS = [
  { glow: "oklch(0.60 0.20 24 / 0.38)", accent: "var(--crimson)" },
  { glow: "oklch(0.66 0.21 30 / 0.32)", accent: "var(--ignite)" },
  { glow: "oklch(0.42 0.13 24 / 0.50)", accent: "var(--crimson-hi)" },
  { glow: "oklch(0.70 0.15 38 / 0.26)", accent: "var(--ember)" },
];

/** Per-post branded cover artwork — dark, code-red, typographic. */
export function BlogCover({
  post,
  className = "",
  titleClassName = "",
}: {
  post: BlogPost;
  className?: string;
  titleClassName?: string;
}) {
  const v = VARIANTS[hash(post.slug) % VARIANTS.length];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: "var(--surface-2)" }}
    >
      <div className="absolute inset-0 grid-bg-fine opacity-30" />
      <div
        className="absolute -top-1/4 -right-1/4 h-3/4 w-3/4 rounded-full blur-3xl"
        style={{ background: v.glow }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--primary),transparent_55%)] opacity-10" />

      {/* chip pins */}
      <div className="absolute inset-x-6 top-0 flex justify-between pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="h-2 w-px bg-primary/40" />
        ))}
      </div>

      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span style={{ color: v.accent }}>
            {"// "}
            {post.tags[0] ?? "mastervlsi"}
          </span>
          <span>{post.readTime}</span>
        </div>

        <div>
          <h3
            className={`font-display font-bold leading-tight tracking-tight line-clamp-4 ${titleClassName}`}
          >
            {post.title}
          </h3>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {post.author}
          </p>
        </div>

        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, var(--crimson), var(--ignite), transparent)",
          }}
        />
      </div>
    </div>
  );
}
