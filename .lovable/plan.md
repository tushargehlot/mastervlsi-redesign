## Goal

Rebuild MasterVLSI to feel like a trusted 12-year-old institute (reference: vlsiguru.com, maven-silicon.com) — light theme, real students with photos, deep content on every course and protocol, and a testimonial hub that scales to 200+ videos. Fix the missing logo and the color-fatigue problem.

---

## 1. Theme: dark red → Clean Light + Trust Blue

Rewrite `src/styles.css` tokens (light mode default):

- `--background: #ffffff`, `--surface-1: #f5f7fb`, `--foreground: #0b1220`
- `--primary: #0f2f5c` (deep navy — trust)
- `--accent: #e11d2e` (red used ONLY for CTAs, badges, highlights — not backgrounds)
- `--trace: #0d7a8a` (teal for tech accents / waveforms)
- `--border: #e2e8f0`, `--muted-foreground: #475569`
- Retire `glow-red`, `blood-red` washes; replace with soft navy shadows + subtle grid.
- Update `Hero3D`/`HeroBackdrop`/`ChipScene` to a light silicon-wafer palette (navy traces on white grid, teal pulses, thin red data-flow lines).
- Sweep every component using hard-coded reds (`text-primary` red, `bg-primary/20` on wide sections, `glow-red`, gradients from red) — swap to navy primary with red only on CTAs and stat highlights.
- `Nav`, `Footer`, section dividers, cards → light surfaces with navy text.

## 2. Logo fix

- Re-inspect `src/assets/logo.png.asset.json` and confirm rendering path in `Nav` and `Footer`. Add explicit width/height, `object-contain`, and `bg-white` wrapper so the dark PNG shows on light backgrounds.
- If the uploaded `WhatsApp_Image_2026-07-07…jpeg` is a cleaner mark, upload it via `lovable-assets create` and repoint the JSON pointer used by `Nav`/`Footer`/favicon.
- Ensure favicon link in `__root.tsx` uses the same asset.

## 3. Alumni Wall with real photos (200+ ready)

- New route `/alumni` + prominent section on `/placements` and home.
- New data file `src/data/alumni.ts` — typed array `{name, photo, company, role, package, course, batch, linkedin?, quote?}`.
- New component `AlumniWall.tsx`: filterable grid (by company, course, package band) with:
  - Real headshot (rounded), name, company logo overlay, role, package chip, course tag.
  - Hover: quote flip / LinkedIn link.
  - "Load more" pagination (24 at a time) so 200+ scales.
- **Data ingestion (user action required):** user exports the linked Google Sheet to CSV and uploads it here along with a ZIP of headshots. Agent then:
  - Places photos under `src/assets/alumni/` via `lovable-assets create` (CDN pointers, not repo bloat).
  - Generates `alumni.ts` from the CSV.
- Placeholder: ship 12 seed entries (initials avatar + company logo) so the page is live before the CSV arrives.

## 4. Testimonial hub (scales to 200 videos)

- New route `/testimonials` (linked from Nav + Placements).
- New data file `src/data/testimonials.ts` — `{youtubeId, name, company, role, course, package, year}`.
- Component `TestimonialHub.tsx`: filter chips (Company / Course / Year), search box, responsive grid of YouTube thumbnails with lightbox player, "Load more".
- Agent seeds 30–50 entries by curating the MasterVLSI YouTube channel (via user-supplied channel/playlist URL — need one clarification: which playlist URL, added as a follow-up if not already in `SITE`).
- Existing `VideoTestimonialGrid` on `/placements` becomes a "featured 6" preview linking to `/testimonials`.

## 5. Google Reviews wall (live 4★+ only)

- User will paste 15–25 top reviews. Agent stores them in `src/data/googleReviews.ts` (`{name, rating, date, text, avatar?}`).
- Rebuild `GoogleReviews.tsx` as a masonry wall with star ratings, verified-Google badge, reviewer initial avatar, "Write a review" CTA linking to the Google Business profile.
- Filter to `rating >= 4` at render time.
- Add a "View all reviews on Google" outbound link (user provides GMB URL — captured in `SITE.googleReviewsUrl`).

## 6. Courses & Protocols — deep content

Restructure `/courses` from a card grid into a full curriculum hub. Update `src/data/courses.ts` with the exact taxonomy:

**Tracks**
- Physical Design
- RTL Design
- Design & Verification → sub-tracks: IP Verification, SoC Verification, RTL Verification, GLS Verification
- Analog Design

**Protocols taught** (dedicated `/courses/protocols` section or in-page tab):
- AMBA: APB, AHB, AXI
- Low-speed: UART, SPI, I2C, GPIO, JTAG
- High-speed: PCIe, DDR, USB, CXL, CHI, Ethernet

**Formats offered** (surface as chips on every course card):
- Free internship · Paid internship · Basic course · Advance course

Each track gets its own page (`/courses/$slug`) with: syllabus (weeks), tools taught, prerequisites, outcomes, sample projects, target companies, faculty, fees CTA, related protocols. Reuses TanStack dynamic routes + per-page SEO head.

## 7. "Who is this for" section (career-gap positioning)

New home + `/about` section "MasterVLSI is your one-stop switch" with four persona cards:
- College student (pursuing / final year)
- Fresher / passed-out
- Career gap (PSU, non-VLSI, faculty → VLSI)
- Domain switcher (VLSI → different VLSI sub-domain)

For career-gap persona: highlight 3 pillars — (1) interview prep with experience-level framing, (2) sustainable practical exposure, (3) job support. Anchor to a WhatsApp CTA.

## 8. General content depth (match vlsiguru / maven density)

- **Home**: add sections — "Why MasterVLSI" (12+ years, industry mentors, 5000+ alumni), "Our tracks at a glance", "Protocols we cover" strip, "Featured alumni", "Latest testimonials", "Google reviews snapshot", "Career-gap solution", "Free vs Paid internship comparison", extended FAQ.
- **About**: founder story, 12-year timeline, faculty grid with photos, campus reach map (already exists — restyle), accommodation section (already exists — restyle), MoUs / affiliations.
- **Blog**: keep, restyle to light.
- **Contact**: keep, add campus tour CTA and larger embedded map.

## 9. Nav / Footer / mobile polish

- Nav: mega-menu for Courses (tracks + protocols columns), separate Testimonials + Alumni links.
- Footer: add columns for Tracks, Protocols, Formats, Company; add Google review badge, YouTube subscribe, WhatsApp.
- Mobile: re-verify no horizontal overflow after theme swap; nav drawer redesigned for light mode.

## 10. Technical / SEO

- Every new route gets unique `head()` (title, description, og:*, canonical) and JSON-LD (`Course` schema per track page, `ItemList` for alumni, `VideoObject` for testimonials, aggregate `Review` for Google reviews wall).
- Update `sitemap[.]xml.ts` with the new routes.
- Update `public/llms.txt` with the new track/protocol taxonomy.

---

## Files to add
`src/routes/alumni.tsx`, `src/routes/testimonials.tsx`, `src/routes/courses.$slug.tsx`, `src/routes/courses.protocols.tsx`, `src/data/alumni.ts`, `src/data/testimonials.ts`, `src/data/googleReviews.ts`, `src/data/protocols.ts`, `src/components/AlumniWall.tsx`, `src/components/TestimonialHub.tsx`, `src/components/WhoIsThisFor.tsx`, `src/components/ProtocolMatrix.tsx`, `src/components/CourseTrackDetail.tsx`.

## Files to substantially edit
`src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/courses.tsx`, `src/routes/placements.tsx`, `src/components/Nav.tsx`, `src/components/Footer.tsx`, `src/components/Hero3D.tsx`, `src/components/HeroBackdrop.tsx`, `src/components/ChipScene.tsx`, `src/components/placements/GoogleReviews.tsx`, `src/data/courses.ts`, `src/data/site.ts`.

## Follow-ups needed from you (do not block v1)
1. **CSV export of the alumni Google Sheet + ZIP of headshots** — required for the real alumni wall. I ship 12 seed placeholders now and swap when you upload.
2. **Top 15–25 Google reviews (text + reviewer name + star rating)** — pasted in chat.
3. **Google Business Profile URL** — for the "Write a review" and "View all" buttons.
4. **YouTube channel / testimonials playlist URL** — so I can curate the first 30–50 video testimonial IDs.

## Out of scope (this pass)
- Live Google Places API integration (chosen paste-in approach instead).
- Auto-scraping YouTube (agent hand-curates).
- Backend / auth / Cloud — no persistence needed for these features.

## Rollout order
1. Theme swap + logo fix + Nav/Footer restyle (foundation — everything else depends on it).
2. Courses restructure + Protocols page + Who-is-this-for section (content depth).
3. Alumni wall + Testimonial hub scaffolding with seed data.
4. Google reviews wall.
5. SEO/head/sitemap/llms.txt updates.
6. Second pass once you upload alumni CSV/photos + reviews + playlist URL.
