import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/data/googleReviews";
import { SITE } from "@/data/site";

const COLORS = ["#EA4335", "#FBBC04", "#34A853", "#4285F4", "#EA4335", "#FBBC04"];

export function GoogleReviewsGrid() {
  const reviews = GOOGLE_REVIEWS.filter((r) => r.rating >= 4);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-sm">
          <GoogleG />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold">{avg.toFixed(1)}</span>
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {reviews.length}+ verified 4★+ reviews
            </p>
          </div>
        </div>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary hover:text-primary transition"
        >
          View on Google <ExternalLink size={12} />
        </a>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary hover:underline font-mono"
        >
          Write a review →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <motion.article
            key={r.name + i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 9) * 0.04 }}
            className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-[0_10px_30px_-15px_rgba(15,47,92,0.20)] transition"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm"
                style={{ background: COLORS[i % COLORS.length] }}
              >
                {r.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm truncate">{r.name}</p>
                <p className="text-[11px] text-muted-foreground font-mono">{r.date}</p>
              </div>
              <GoogleG className="h-4 w-4 shrink-0" />
            </div>
            <div className="mt-3 flex gap-0.5">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={s < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/40"}
                />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function GoogleG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.7 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6c1.9-5.6 7.1-9.7 13.6-9.7z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/>
      <path fill="#FBBC04" d="M10.4 28.8c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.8-6C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.8-6z"/>
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.4 0-11.8-4.1-13.7-9.7l-7.8 6C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  );
}
