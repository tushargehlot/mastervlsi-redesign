## 1. New color scheme (kill the red/blue/grey/orange chaos)

Commit to ONE cohesive direction — **Deep Emerald + Warm Ivory** (premium, technical, trustworthy, distinct from every competitor's red/blue).

Tokens in `src/styles.css` (OKLCH):
- `--background`: ivory `oklch(0.985 0.005 90)`
- `--foreground`: near-black graphite `oklch(0.18 0.01 240)`
- `--primary`: deep emerald `oklch(0.45 0.14 165)` (silicon/circuit green)
- `--primary-glow`: `oklch(0.62 0.16 165)`
- `--accent`: molten gold `oklch(0.78 0.14 82)` (used sparingly for CTAs/highlights)
- `--surface-1/2`: warm off-whites with faint emerald tint
- `--border`: `oklch(0.9 0.01 165)`
- Gradients: `--gradient-hero: linear-gradient(135deg, emerald → gold)`, `--gradient-mesh` for hero blobs
- Shadows: soft emerald-tinted elevation, no harsh blacks

Sweep every component (`Nav`, `Footer`, `HeroBackdrop`, `ChipScene`, `AlumniWall`, `PartnerMarquee`, `VLSIa` chatbot, `DemoModal`, all badges/chips) — remove hardcoded `text-white`, `bg-black`, red/orange/blue Tailwind classes; use semantic tokens only.

## 2. Logo + favicon (black logo)

- Upload attached black MasterVLSI logo via `lovable-assets create` → `src/assets/logo-black.png.asset.json`.
- Replace logo reference in `Nav.tsx` and `Footer.tsx` (drop dark-mode inversion — palette is light now).
- Copy same PNG to `public/favicon.png`, remove `public/favicon.ico`, update `<link rel="icon">` in `__root.tsx`.

## 3. Hero — highlight AI + campus tour

- Rewrite `src/routes/index.tsx` hero: headline "**Where India's VLSI + AI Engineers Are Built**" with animated "AI" chip glyph, subhead about GenAI-for-EDA, AI-assisted verification, ML-driven PD.
- Replace `HeroBackdrop`/`Hero3D` visuals with realistic futuristic wafer/die render: layered SVG die shot + subtle 3D chip (keep `ChipScene` but re-skin emerald/gold, add glowing AI neural mesh overlay). Add reveal-on-scroll parallax.
- Add **Campus Tour** section on home embedding `https://youtu.be/GEBNnsaYTvw` via `PosterPlaylistCard` (autoplays on click, high-res `maxresdefault.jpg` thumbnail with poster fallback).

## 4. Realistic futuristic graphics pass

- Replace flat/childish SVGs with dense, photoreal-feeling composites:
  - Hero: silicon wafer macro + neural mesh + circuit trace overlay
  - Section dividers: die-shot strips, waveform ribbons, PCB traces
  - Cards: subtle glassmorphism + emerald edge glow + gold accent lines
  - Backgrounds: layered mesh gradients + hex grid + node pulses
- Generate 4–6 hero/section images via `imagegen` (premium) — realistic silicon wafer, engineer at workstation, neural + chip fusion, futuristic clean-room lab.
- Upgrade `FlowVisualizer`, `ProtocolMatrix`, `LogicGatePlayground` with denser techy chrome (etched panels, LED indicators, motion trails).

## 5. YouTube thumbnails — global fix

- Root cause: some IDs use unavailable `hqdefault`. Standardize on `PosterPlaylistCard` everywhere (`testimonials.tsx`, `playlists.tsx`, home).
- Thumbnail resolver: try `maxresdefault.jpg` → `sddefault.jpg` → `hqdefault.jpg` → `mqdefault.jpg` via `onError` chain.
- Apply to `VIDEO_TESTIMONIALS` grid, playlists page, campus tour card.

## 6. Real company logos (60+)

- Extend `src/data/partners.ts` to full 60+ list with `{ name, domain }`.
- Logo source cascade: Clearbit (`logo.clearbit.com/{domain}`) → Google favicon fallback → Simple Icons CDN → text chip.
- Rebuild `PartnerMarquee` and the "Alumni currently shipping silicon at" grid on placements/home to render logo tiles ONLY (no text label unless load fails). Larger tiles, monochrome→color on hover, dense 6-per-row grid + marquee.

## 7. Alumni — hardcoded names + photos

- Scrape the Wix `placement-list` page (via `fetch_website`) to extract every alumnus name, company, role, photo URL.
- Mirror each image: upload to Lovable Assets (`lovable-assets create --file <tmp>`) so we own the CDN URL; store pointer JSON per student under `src/assets/alumni/`.
- Rebuild `src/data/alumni.ts` with the full hardcoded roster: `{ id, name, company, role, package?, photo (asset URL), course, linkedin? }`.
- `AlumniWall` already renders `a.photo` — just needs the real data. Bump initial page to 60, keep load-more.
- Add same-styled grid section on home ("Recent Placements") showing top 12.

## 8. Content density — scrape VLSI Guru + Maven Silicon

- `fetch_website` both sites; extract course outlines, module syllabi, tool lists, FAQs, "why us" bullets, career-path content.
- Rewrite/expand (paraphrased, not verbatim) into MasterVLSI voice:
  - `src/data/courses.ts`: full syllabus per module, prerequisites, tools taught, duration, outcomes, projects
  - `src/data/faqs.ts`: 30+ FAQs across admission, fees, placement, curriculum, hostel
  - New `src/data/whyUs.ts`, `src/data/careerPaths.ts`, `src/data/tools.ts` (Cadence/Synopsys/Siemens tool coverage)
- New/expanded sections on home + courses + about: "Career Paths", "Tools You'll Master", "Curriculum Depth", "Industry Advisory", "Hiring Process We Prep You For".

## 9. Lead-gen CTAs everywhere + entry popup

- Single source of truth in `src/data/site.ts`: `LEAD_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScEzfHndVUc8Jqx_1y-KN_dknCCYH4BNG2HHqJLeMzls5622Q/viewform"`.
- Update `DemoModal` to iframe this form directly.
- Add sticky CTAs at end of every section on every page: hero, after each module card, after alumni grid, after testimonial rail, before footer. Variants: "Book Free Demo", "Get Syllabus", "Talk to Mentor", "Reserve My Seat" — all trigger the modal.
- New `EntryPopup` component: shown on first mount after 6s (or 30% scroll, whichever first); dismiss stored in `localStorage` (`mvlsi_lead_popup_v1`) for 7 days. Renders the Google Form iframe inside a centered dialog with emerald/gold framing and a small "Skip for now" link.
- Mount `<EntryPopup />` in `__root.tsx`.

## 10. SEO / metadata / social

- Regenerate `og:image` per key route with the new emerald/gold hero renders.
- Update `llms.txt` and JSON-LD Organization logo → new black logo URL.

---

## Technical notes

- Palette + logo + popup ship first (immediate visible impact).
- Alumni scrape + asset uploads run in a batched shell loop; expect ~5–8 min for image mirroring.
- If Wix scrape returns fewer than expected students, fall back to preserving existing seed + flagging gaps rather than blocking.
- Thumbnail resolver added as a shared util in `src/lib/youtube.ts` and used by every video component.
- No backend changes; all data static in `src/data/*`.
- Vercel build stays green (no new heavy deps beyond what's installed).

## Out of scope this pass

- Live Google Reviews API sync (still hardcoded from prior curated list).
- WhatsApp bot backend.
- Blog content expansion beyond existing 10 posts.
