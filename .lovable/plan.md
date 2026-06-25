
# MasterVLSI — High-End Techy Rebuild (v3, Vercel-ready)

Multi-route TanStack Start site with dark techy aesthetic, real 3D hero, scroll-driven animations, interactive educational elements, a 10-post blog, full hiring-partner roster, mock WhatsApp bot, YouTube playlist hub, and a Vercel deploy path.

## Visual & Motion Direction

- Palette: near-black bg `oklch(0.12 0.01 260)`, surfaces `oklch(0.16 0.012 260)`, primary signal-red `oklch(0.62 0.24 25)` (logo red), silver accent `oklch(0.85 0.01 250)`. Circuit-trace gradients + red glow shadows.
- Typography: Space Grotesk (display) + JetBrains Mono (labels) + Inter (body), via `<link>` in `__root.tsx`.
- Motion: Framer Motion — reveals, magnetic buttons, scroll-parallax, animated counters, marquee, route fades. Respects `prefers-reduced-motion`.
- 3D: React Three Fiber + drei. Hero = interactive rotating silicon chip / wafer with animated traces + floating red "M". Lazy-loaded, SVG fallback on small screens.
- Decorative layer: animated grid bg, scanning beam, typewriter taglines, particle field, gradient mesh blobs.

## Interactive / Educational Elements

- VLSI Design Flow visualizer (RTL → DV → Synthesis → DFT → PD → STA → Signoff → Tapeout) with clickable nodes + inline explainers.
- Scroll-driven 3D chip assembly story on home.
- Logic-Gate playground (AND/OR/NOT/XOR) with live truth-table highlight.
- Animated counters (24 / 16 / 5000+ / 99% / 10+).
- Course explorer: 15 modules as 3D tilt cards with hover glow + expandable detail.
- Floating mock WhatsApp FAB → slide-up chat panel with scripted quick-reply flows; number constant at top for easy swap.

## Routes

```text
src/routes/
  __root.tsx          shell: animated nav, footer, WhatsApp widget
  index.tsx           hero 3D chip, tagline, stats, flow visualizer, featured playlist, partner strip, CTA
  about.tsx           story, mission, mentors, why-us, timeline
  courses.tsx         15 modules as interactive cards + filter
  services.tsx        B2B framing of the 15 services
  playlists.tsx       YouTube playlists hub from @mastervlsi2526
  placements.tsx      stats, full hiring-partners marquee, testimonials
  blog.tsx            blog index — 10 posts, search + tag filter
  blog.$slug.tsx      dynamic blog post page (local markdown data)
  demo.tsx            book free demo (Google Form link) + gate playground teaser
  contact.tsx         Maps embed (user's link), contact cards, social, WhatsApp CTA
```

Each route has its own `head()` with unique title/description/og tags. Root has no og:image (only leaf routes do).

## Blog (10 posts)

Data in `src/data/blog.ts` (typed array). Per post: slug, title, excerpt, cover (generated image), author, date, readTime, tags, markdown body. Posts:

1. What is VLSI? A Beginner's Roadmap
2. RTL Design: Verilog vs SystemVerilog
3. UVM Verification Explained Simply
4. Physical Design Flow: Floorplan to GDSII
5. STA Demystified
6. DFT 101: Scan, BIST, ATPG
7. CDC Pitfalls & Fixes
8. Low Power Design (UPF, Clock Gating)
9. Cracking VLSI Interviews in 2026
10. Careers in VLSI: Roles, Salaries, Growth

Blog index: client-side search + tag chips. Post page: TOC, reading-progress bar, styled code blocks, related posts, WhatsApp CTA. Uses `react-markdown` + `remark-gfm`.

## Hiring Partners

Marquee + grid on Placements and home strip. Roster (re-verified during build):

Intel, AMD, NVIDIA, Qualcomm, Synopsys, Cadence, Siemens EDA, Texas Instruments, Samsung, MediaTek, Marvell, Broadcom, Western Digital, Micron, Renesas, NXP, STMicroelectronics, Analog Devices, Microchip, Xilinx (AMD), Wipro, HCL, L&T Technology Services, Tata Elxsi, Sasken, Capgemini Engineering, Mirafra, eInfochips, Tessolve, Sankalp Semiconductor.

Render as styled monochrome text-pill cards (no licensing risk); `src/data/partners.ts` exports the list with optional `logoUrl` field so real PNGs can be dropped in later.

## YouTube Playlists

Channel: `https://www.youtube.com/@mastervlsi2526/playlists` (no specific playlist IDs provided).

- `/playlists`: grid of `<iframe src="https://www.youtube.com/embed/videoseries?list=<ID>">` slots seeded with channel link + placeholders.
- Home: 1 featured playlist embed.
- Footer + nav: channel link button.
- `src/data/playlists.ts` constants — drop real IDs in to activate.

## WhatsApp Bot (Mock)

Floating red pulse FAB → slide-up panel. Flows: Courses, Placements, Demo, Fees, Location. Quick-reply chips → typed bot replies → "Continue on WhatsApp" CTA (`https://wa.me/<NUMBER>?text=...`, single constant up top).

## Contact / Location

- Google Maps iframe pointed at user's shared link.
- Address text + "Get directions" button.
- Email/phone TBD placeholders.

## Footer

- Brand mark, tagline, column nav, socials (YouTube, WhatsApp, LinkedIn, Instagram placeholders).
- Bottom bar: `© 2026 MasterVLSI — Designed by Tushar Gehlot`.

## Vercel Deployment (concrete)

The stack uses **TanStack Start on Vite with Nitro** (managed by `@lovable.dev/vite-tanstack-config`), default Nitro preset = Cloudflare. To deploy on Vercel:

1. **Switch the Nitro preset to Vercel.** Set the env var `NITRO_PRESET=vercel` in Vercel project settings (Settings → Environment Variables) — Nitro reads it automatically. No `vite.config.ts` edit required; the Lovable wrapper forwards Nitro env. (If env-var route fails, fall back to passing `nitro: { preset: "vercel" }` to `defineConfig({...})`.)
2. **Vercel project settings:**
   - Framework Preset: **Other** (TanStack Start is not a built-in preset; Nitro outputs Vercel's required `.vercel/output/` directly).
   - Install Command: `bun install` (Vercel detects `bun.lock`) or leave default (`npm install`).
   - Build Command: `bun run build` (or `npm run build`).
   - Output Directory: leave **blank** — Nitro's Vercel preset writes the Build Output API v3 layout to `.vercel/output/`, which Vercel picks up automatically.
   - Node version: 20.x (add `"engines": { "node": ">=20" }` to `package.json` and an `.nvmrc` with `20`).
3. **No backend this phase:** server functions stay unused; the build produces static prerendered routes + SSR fallback at the edge. All data (blog, courses, partners, playlists) lives in static TS modules, zero env secrets required.
4. **Cache headers / SPA routing:** Nitro's Vercel preset emits correct routing + `_headers` automatically. We do **not** add `vercel.json` (it would conflict). If user later needs custom headers, we add a minimal `vercel.json` then.
5. **Env vars to set in Vercel:** only `NITRO_PRESET=vercel`. (Future: `LOVABLE_API_KEY`, WhatsApp number, etc.)
6. **README.md "Deploy to Vercel" section** with step-by-step (import repo → set env var → deploy → connect domain).
7. **Per-route canonical tags** in `head()` and proper `og:image` at leaf routes only, so prerendered pages SEO-rank on Vercel's edge.

When backend is added next phase, the same Vercel preset handles server functions automatically — no rewiring needed.

## Tech / Dependencies

`bun add`:
- `framer-motion`
- `three`, `@react-three/fiber`, `@react-three/drei`
- `@fontsource/space-grotesk`, `@fontsource/jetbrains-mono`, `@fontsource/inter`
- `react-markdown`, `remark-gfm`

Already present: `lucide-react`, `clsx`, `tailwind-merge`, full Radix/shadcn set.

## Assets

- Upload logo via `lovable-assets` from `/mnt/user-uploads/image.png` (full) and `image-4.png` (icon) → nav, hero, favicon.
- Generate hero backdrop + 10 blog covers via imagegen (fast tier, techy/circuit theme).

## Design Tokens

Added to `src/styles.css` under `@theme inline`: red primary, glow shadows, gradient utilities, font tokens, custom red scrollbar.

## Open Items (defaults used, easy to swap)

- WhatsApp number → `+91XXXXXXXXXX` constant.
- Specific YouTube playlist IDs → channel link + placeholder slots.
- Phone/email → omitted unless provided.
- Real partner logo PNGs → text-pill placeholders today.

Ready to build on approval.
