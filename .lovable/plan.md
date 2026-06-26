
# v4 — Sophistication & Interactivity Pass

Goal: lift the site from "basic dark + red" to a classy, world-class, VLSI-inspired experience. Keep the current red accent direction (no RGB rainbow), deepen it, add cursor + scroll choreography, expand written content, and add a real Placements showcase.

---

## 1. Refined design system (no palette flip)

Stay in the current dark / crimson family, but make it feel like silicon, not gamer-red.

- Background: layered near-black with a faint blue-graphite undertone (`oklch(0.11 0.014 255)`), plus a second "panel" surface `oklch(0.15 0.014 255)` and a "raised" surface for cards.
- Primary accent: deepen current red to a richer crimson `oklch(0.58 0.22 22)` with a hotter "ignite" variant `oklch(0.66 0.24 25)` used only for active/hover states and glow.
- Add two supporting tokens (used sparingly, not as second brand colors):
  - `--wire`: cool steel `oklch(0.78 0.02 240)` for thin diagram strokes / wire animations.
  - `--trace`: warm amber `oklch(0.78 0.14 70)` for data-flow pulses on schematics.
- Add semantic surface tokens: `--surface-1/2/3`, `--border-strong`, `--border-faint`, plus `--gradient-ignite`, `--gradient-silicon`, `--shadow-elevated`, `--shadow-inset-trace`.
- Typography upgrade: keep Space Grotesk display, swap body to a quieter pairing — Inter Tight for UI, JetBrains Mono for code/labels; introduce a tighter editorial scale for hero (clamp-based fluid type).
- Global texture: subtle film-grain + a 1px hairline grid that responds to scroll velocity (opacity rises while scrolling, fades at rest).

All tokens defined in `src/styles.css` under `@theme inline`. No hard-coded colors in components.

## 2. Motion + interactivity layer (site-wide)

New shared primitives in `src/components/fx/`:

- `Cursor.tsx` — custom cursor: a thin crimson ring + a small "die" dot. Magnetic snap on `[data-magnetic]` elements (buttons, nav links). Hidden on touch.
- `SpotlightCursor.tsx` — radial gradient that follows the pointer on hero/section surfaces (`mix-blend-mode: screen`), giving a "probe light over silicon" feel.
- `RevealOnScroll.tsx` — IntersectionObserver wrapper using framer-motion variants (fade + 16px rise + slight blur-out). Replaces ad-hoc `animate-fade-in`.
- `ScrollProgressRail.tsx` — fixed left rail with a vertical trace that "etches" downward as you scroll, with stop nodes for each section (clickable).
- `useScrollSection` hook — drives a CSS variable `--scroll-tint` on `<html>` (0 → 1) so backgrounds shift from near-black to a faintly warmer graphite as the user scrolls a page; color transitions are token-driven, not new hues.
- `TiltCard` already exists — extend with parallax inner layers (logo / number floats above content).
- `MagneticButton.tsx` — buttons drift ~6px toward cursor within a 120px radius.
- `TraceLine.tsx` — SVG path that draws itself (`pathLength` 0→1) when in view, used as section dividers and inside diagrams. Amber data pulses travel along it on hover.

Performance rules: all heavy effects gated behind `prefers-reduced-motion` and a `useIsTouch` check. Cursor + spotlight disabled on mobile.

## 3. VLSI-inspired section animations

Each page gets at least one bespoke, on-brand animation (not generic blobs):

- **Home hero**: keep 3D chip, but add an animated PCB-trace SVG layer underneath that routes from the chip's pins out to the edges; traces light up sequentially. Headline uses a "mask-reveal" where each word is uncovered by a sweeping scanline.
- **Home — "What we do"**: a horizontally scroll-pinned strip showing the design flow (Spec → RTL → DV → Synthesis → DFT → PD → STA → Signoff → Tape-out). Each stage is a card with a tiny live mini-animation (waveform for DV, floorplan rectangles snapping into place for PD, timing arrows for STA).
- **Courses**: bento grid with cards that flip on hover to reveal module syllabus; hover triggers a faint waveform along the card border.
- **Services**: alternating zig-zag rows; each row has an inline SVG diagram (e.g. UVM testbench topology, CDC handshake, scan chain) that animates on scroll.
- **Playlists**: a "tape reel" carousel — playlists rendered as cassette-style cards; hover spins reel SVGs; embedded player loads on click.
- **Placements** (expanded — see §4).
- **Blog**: index becomes an editorial grid (one feature + grid); post page gets reading progress, table-of-contents that highlights active section, and a "circuit margin" — animated SVG running down the left gutter.
- **About**: timeline rendered as an etched PCB trace, milestones are solder pads that pulse on reveal.
- **Contact**: map embedded in a "chip package" frame; form fields underline animates like an oscilloscope trace on focus.

## 4. New Placements experience

`src/routes/placements.tsx` rebuilt with these sections, all data-driven from `src/data/placements.ts`:

1. Hero with animated counters + crimson-on-graphite stat band.
2. Hiring partners — keep marquee, upgrade tiles to glassy chips with hover glow; add tabs to filter by Product / Services / Fabless / EDA.
3. **Video testimonials** — responsive grid of YouTube/Vimeo embeds (lazy-loaded `<iframe>` via lite-youtube pattern). Data shape: `{ name, role, company, videoId, thumbnail, quote }`. 6 placeholder slots ready for the user to drop in real video IDs.
4. **Written testimonials carousel** — large pull-quote layout with avatar, role, company logo, and LinkedIn link; auto-advance with manual controls; keyboard accessible.
5. **Google Reviews section** — card grid styled to match Google's review look (stars, reviewer name, relative date, review text, "Posted on Google" badge). Initially seeded from a static `googleReviews` array; a clear `TODO` comment + helper stub for swapping to the Google Places API later (no backend wired this round, per the user's prior instruction).
6. **Placement journey** — 4-step illustrated path: Train → Mock interviews → Referral → Offer; animated on scroll.
7. CTA band linking to WhatsApp bot + demo form.

## 5. Content expansion (every page gets more)

Right now most pages are thin. Add real, written, VLSI-credible copy (not lorem):

- **Home**: hero, manifesto strip, design-flow scroll-pin, featured course bento, mentor strip, outcomes band, featured playlist, latest blog teasers, hiring-partner marquee, testimonial highlight, FAQ accordion, final CTA.
- **About**: mission, founder note, methodology (lab-first, mentor-led, placement-tied), facilities (24/7 lab, EDA tools list), team grid (placeholders), timeline, "Why MasterVLSI" comparison table vs generic bootcamps.
- **Courses**: intro, full 15-module catalog with deep descriptions (from user-provided list), prerequisites, duration, outcomes, tools used per module, suggested learning path diagram, FAQ.
- **Services**: industry offering split into RTL, DV, PD, DFT, AMS, Automation; each with deliverables, tools, sample engagement model.
- **Playlists**: intro, featured playlist embed, full grid by topic (Verilog, SV, UVM, PD, STA, DFT, Interview), channel CTA.
- **Placements**: see §4.
- **Blog**: keep 10 posts but rewrite intros + add a "Topics" landing sub-grid; add author bio block and related-by-tag.
- **Contact**: address, map, hours, WhatsApp CTA, form (mock submit), directions, FAQ.

## 6. Functional additions

- Global command palette (`⌘K` / `Ctrl K`) for navigating sections, courses, playlists — uses existing `cmdk` shadcn `Command` component.
- Sticky section nav on long pages (Courses, Services, Placements) that highlights active section.
- FAQ accordions (shadcn `Accordion`) on Home, Courses, Placements, Contact.
- Newsletter strip in footer (mock submit, success state).
- Floating bottom-right cluster: WhatsApp widget + "Back to top" + "Toggle motion" (respects + can override `prefers-reduced-motion`).

## 7. Files to add / change

```text
src/styles.css                        # new tokens, fluid type, grain, scroll-tint var
src/components/fx/Cursor.tsx
src/components/fx/SpotlightCursor.tsx
src/components/fx/RevealOnScroll.tsx
src/components/fx/ScrollProgressRail.tsx
src/components/fx/MagneticButton.tsx
src/components/fx/TraceLine.tsx
src/components/fx/Grain.tsx
src/components/vlsi/DesignFlowPinned.tsx   # horizontal scroll flow
src/components/vlsi/MiniWaveform.tsx
src/components/vlsi/FloorplanAnim.tsx
src/components/vlsi/PcbTraces.tsx          # hero underlay
src/components/vlsi/TapeReelCard.tsx
src/components/placements/VideoTestimonialGrid.tsx
src/components/placements/TestimonialCarousel.tsx
src/components/placements/GoogleReviewsGrid.tsx
src/components/placements/PlacementJourney.tsx
src/components/CommandPalette.tsx
src/components/FaqAccordion.tsx
src/components/NewsletterForm.tsx
src/data/placements.ts                # videos, written quotes, google reviews
src/data/faqs.ts
src/data/courses.ts                   # expand to full 15 with deep copy
src/data/blog.ts                      # rewrite intros, add hero images
src/routes/__root.tsx                 # mount Cursor, Spotlight, ScrollRail, CommandPalette
src/routes/index.tsx                  # full rebuild per §5
src/routes/about.tsx                  # expand
src/routes/courses.tsx                # expand
src/routes/services.tsx               # expand + diagrams
src/routes/playlists.tsx              # tape-reel grid
src/routes/placements.tsx             # full rebuild per §4
src/routes/blog.tsx + blog.$slug.tsx  # editorial layout, TOC, circuit gutter
src/routes/contact.tsx                # chip-frame map, oscilloscope inputs
```

No backend changes this round (per prior instruction). Google Reviews + video testimonials stay data-driven so the user can swap IDs/text without code edits.

## 8. Quality bar

- Lighthouse a11y ≥ 95: every animation respects `prefers-reduced-motion`; cursor effects keep native cursor visible on focus-visible.
- All interactive elements keyboard reachable; command palette + carousels have full keyboard support.
- No layout shift on hero (fixed aspect for 3D + PCB layer).
- Mobile: cursor/spotlight off, scroll-pin replaced by vertical stack, marquees still play, tap targets ≥ 44px.

## 9. Out of scope this round

- Real Google Places API integration (needs backend + key) — stub only.
- Real video IDs / partner logos — placeholder slots clearly marked.
- CMS for blog — markdown in `src/data/blog.ts` continues.
