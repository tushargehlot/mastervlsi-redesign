# MasterVLSI — Refinement Pass (v7)

Goal: fix the jarring blue accent, elevate the chatbot, tighten mobile, add missing accommodation/connectivity content, and swap in the new logo.

## 1. Color system — kill the blue

`src/styles.css`
- `--primary` → warm crimson `oklch(0.60 0.20 22)` (brand red from logo).
- `--accent` → ignited orange `oklch(0.72 0.19 45)`.
- `--ring`, `--gradient-ignite`, `--gradient-radial-glow`, `--glow` → rebuilt on red↔orange, no indigo/blue anywhere.
- Add `--trace` amber and a subtle `--wire` warm-grey so PCB/circuit graphics stay warm.
- Sweep `text-*-500/600`, hardcoded indigo classes, and any leftover `oklch(... 258)` in components (Hero3D glow, TraceLine, Spotlight, ScrollTint, chatbot).

## 2. Logo swap

- Upload `user-uploads://logo.png` via `lovable-assets` → `src/assets/logo.png.asset.json`.
- Replace usage in `Nav.tsx`, `Footer.tsx`, `__root.tsx` head icons/og. Keep intrinsic aspect ratio; render at fixed height (32–40px nav, 48px footer).

## 3. AI chatbot redesign (`src/components/chatbot/VLSIa.tsx`)

- New floating launcher: hexagonal chip-shaped button with concentric pulsing rings, orange→red gradient, animated "V" mark and a tiny status LED dot.
- Panel: taller (420×560), glassy surface, header shows animated waveform + "VLSIa · Silicon Intelligence · online".
- Custom loader: 4-stage pipeline strip ("PARSE → INFER → SYNTH → RESPOND") lighting up sequentially with a scanning bar — replaces plain dots.
- Message bubbles: assistant with left neon-trace border + monospace tag, user with warm-red gradient.
- Quick-reply chips styled as breaker switches.
- Keep existing scripted flow + Supabase session logging.

## 4. Mobile

- Delete `MobileActionBar` and its mount in `__root.tsx` (and safe-area padding compensation on `main`).
- Nav: audit `md:` breakpoints, ensure hamburger opens a full-screen sheet, no horizontal overflow.
- Global: add `overflow-x-hidden` on `body`; wrap wide grids with `min-w-0`; make `PartnerMarquee`, `SalaryHeatmap`, `AlumniMap`, `PosterPlaylistCard` grids stack cleanly < 640px.
- Hero3D: reduce canvas DPR & disable heavy shader effects on `< md` for perf.

## 5. Demo popup + section

- New `src/components/DemoModal.tsx`: radix Dialog, chip-frame styling, embeds the Google Form URL in an iframe (`https://docs.google.com/forms/d/e/1FAIpQLScEzfHndVUc8Jqx_1y-KN_dknCCYH4BNG2HHqJLeMzls5622Q/viewform?embedded=true`), plus a "Open in new tab" fallback.
- Global trigger via a small context/provider `useDemoModal()`; every existing "Book demo / Reserve seat / Get started" CTA opens it instead of routing.
- Update `SITE.demoFormUrl` in `src/data/site.ts`.
- `src/routes/demo.tsx`: keep as full page but embed the same form + add a hero, "what to expect", FAQ, and CTA-to-modal from other routes.

## 6. Custom cursor & scrollbar

- `src/components/fx/Cursor.tsx`: rebuild — outer ring + inner dot use `mix-blend-mode: difference` and a solid warm-white so it stays visible over any background; add hover-grow on `[data-cursor="hover"]` and shrink on text inputs. Disabled on touch devices.
- `src/styles.css`: custom webkit scrollbar (10px, translucent track, red→orange gradient thumb with inset trace, rounded), `scrollbar-color` for Firefox.

## 7. Hero background — rebuild

`src/components/Hero3D.tsx` (or new `HeroBackdrop.tsx`)
- Replace current scene with layered canvas:
  1. Animated SVG PCB mesh (paths drawing themselves on load, subtle drift).
  2. Three.js floating chip die (rotating slowly) with orange rim-light + red bloom.
  3. Particle "electron" stream flowing along traces, mouse-parallax reactive.
  4. Scanning horizontal laser line every 6s.
- Respect `prefers-reduced-motion` and mobile perf gate.

## 8. Accommodation section (from uploaded PG image)

New `src/components/AccommodationSection.tsx` used on `about` and `contact` routes:
- Three tabs: Co-living / Girls PG / Boys PG.
- Cards with name, phone(s), "Very Near · 10–200m" badge; grid 2/3/4 responsive.
- Highlights strip: 10–200m from institute, Safe & Secure, Hygienic, 24/7 Support.
- Office contacts (Sushil, Sharmila, Lipsa, Nitesh) as a side card.
- Data lives in `src/data/accommodation.ts`.

## 9. Campus tour + connectivity + location

New `src/components/CampusReach.tsx` on `about` & `contact`:
- Left: three lists — Nearest Railway Stations (8), Metro (2), Bus Stops (4) with distances.
- Right: reuse existing Google map iframe + a distance legend, "Excellent Connectivity" banner.
- Add "Campus Tour" block above with the campus-tour YouTube playlist poster + 3 stat pills (24/7 lab, 12k sq ft, 60-seat lecture hall).
- Update `src/data/site.ts` address to `1st Floor, opposite to Vinayaka Temple, Udayanagar, near Tin-Factory bus stop, Bangalore – 560016`.

## 10. Content additions

- `about`: founders expanded, milestones timeline, "Why Bangalore silicon corridor" block, campus gallery placeholder.
- `courses`: prerequisites, weekly cadence, tools covered per module.
- `services`: expanded copy for each of the 15 services.
- `placements`: extra pull-quotes, "Offer letter wall" grid.
- `home`: add "Why MasterVLSI" 6-tile bento, ticker of recent placements.
- Add `Fees & Terms` route content sourced from the fee-details poster (already scoped).

## 11. Interactive graphics

- `SignalBus`: animated multi-lane bit-flow divider between sections.
- `DieMap`: hoverable SVG chip floorplan on services page — each block highlights a service.
- `WaveformScroll`: scroll-scrubbed waveform on placements page.
- Micro-interactions: magnetic buttons everywhere primary CTAs live; number counters trigger on view; tilt on course cards refined.

## Technical notes

- Stack: TanStack Start, framer-motion, three/@react-three/fiber already installed. No new deps needed except optional `@radix-ui/react-dialog` (already via shadcn).
- Provider order in `__root.tsx`: `DemoModalProvider` wraps existing tree.
- All new colors flow through tokens — no hex in components.
- Preserve Supabase wiring; no schema changes.

## Out of scope

- No real AI backend (chatbot stays scripted, styled to feel intelligent).
- No new pages beyond what's listed.
- No changes to blog content this pass.
