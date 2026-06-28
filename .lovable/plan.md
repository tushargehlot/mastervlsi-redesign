
# v5 — "World-class polish + backend + intelligence layer"

Heads-up on the credentials you pasted: I'll wire the project to your Supabase using the **publishable key** and the **project URL**. The **service_role** and **secret keys** should never sit in chat or code — please **rotate both immediately** in your Supabase dashboard (Settings → API → Reset). I'll request the new service_role via the secure secrets form so it's only stored as an env var, never in the repo.

---

## 1. Backend wiring (BYO Supabase — `boorervstizsweornnpk`)

- Add `.env` entries:
  - `VITE_SUPABASE_URL=https://boorervstizsweornnpk.supabase.co`
  - `VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_…` (safe to ship)
  - `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` (server mirror)
- Create `src/integrations/supabase/client.ts` (browser) and `client.server.ts` (server, service_role from env after you rotate).
- Generate typed `Database` types.
- Migrations (via SQL you run in Supabase dashboard — I'll provide the file):
  - `contact_submissions` — name, email, phone, course_interest, message
  - `demo_requests` — name, email, phone, preferred_slot
  - `newsletter_subscribers` — email (unique)
  - `chatbot_conversations` + `chatbot_messages` — to log the fake-AI chats
  - `testimonials` (admin-editable seed) + `placements` (company, ctc, year)
  - `user_roles` enum (`admin`,`user`) + `has_role()` SECURITY DEFINER
  - RLS on every table + explicit GRANTs (anon insert for forms, authenticated select for admin)
- Server fns under `src/lib/`: `submitContact`, `submitDemo`, `subscribeNewsletter`, `logChatMessage`, `listTestimonials`.
- No auth UI in this pass — admin tables are seed-only, forms are anon-insert.

## 2. Content + media import from the Wix site

- Scrape `mastervlsivideo.wixsite.com/my-site-2` (all pages: Home, About, Courses, Placements, Gallery, Contact).
- Extract and add: longer about/mission text, founder bio, methodology paragraphs, FAQ entries, complete address + phone + email, social handles, gallery captions, alumni names + companies + photos.
- Download every student/alumni image (placements grid + gallery) → `src/assets/students/*.jpg` with proper alt text.
- Update `src/data/{placements,site,faqs,courses}.ts` with the merged content.

## 3. YouTube fix + richer playlist UX

- Current cards 404 because `videoId` is `null` and embed URLs are wrong.
- Pull real playlist IDs from `youtube.com/@mastervlsi2526/playlists` and per-page fetch the first 6 videos via the public oEmbed/`noembed.com` endpoint (no API key).
- Each section gets a themed playlist:
  - Home → "Featured"
  - Courses → "RTL & SystemVerilog"
  - Services → "Industry Flows"
  - Placements → "Student Stories"
  - Blog → "Concept Deep-Dives"
  - Playlists page → full grid with filter chips
- Use `lite-youtube-embed` (zero-JS thumbnail until click) so previews always render and Core Web Vitals stay green.

## 4. Pretend-AI chatbot ("VLSIa — Silicon Co-pilot")

- Replace WhatsApp-only widget with a dual-mode dock: **VLSIa (AI Assistant)** + **WhatsApp**.
- Custom SVG avatar (hex-chip "V" mark with pulse).
- "Thinking" loader = animated logic-gate trace + token-by-token streaming reveal of pre-scripted answers (intent-matched).
- Intent library: courses, fees, placements, schedule, demo, location, mentor profiles, syllabus PDFs, contact. Fallback → "Connect me to a human" → WhatsApp deep link.
- Every message logged to `chatbot_conversations` (anon-safe, no PII required).
- Header badge "AI Assistant · Beta" and disclaimer line "Responses generated from our knowledge base" — honest framing, not claiming real AI.

## 5. Twenty new sections / features

I'll distribute these across pages, each with custom interactive graphics:

1. **Interactive Tape-out Timeline** (horizontal scroll-pinned, RTL→GDSII)
2. **Cost-of-Silicon Calculator** (node + area sliders → estimated NRE)
3. **Mentor Wall** with hover-flip cards (photo → bio → LinkedIn)
4. **24/7 Lab Live Status** (mock telemetry: stations occupied, EDA tool licences in use)
5. **Career Path Visualizer** (sankey from "Fresher" → roles)
6. **Salary Benchmark Heatmap** (role × experience, India)
7. **Syllabus PDF Vault** with one-click email-gated download
8. **Mock Interview Booker** (slot picker → `demo_requests` table)
9. **Coverage Closure Gauge** (animated dashboard mocking UVM coverage)
10. **Logic Gate Sandbox v2** (add MUX/FF, truth-table auto-gen)
11. **Verilog → Waveform Live Editor** (Monaco editor + canvas wave)
12. **STA Slack Inspector** (drag clock period, see violations light up)
13. **Floorplan Puzzle** (drag blocks into die area, area utilisation %)
14. **Alumni Map** (India + global pins with company logos)
15. **Industry News Ticker** (curated headlines, marquee)
16. **Glossary / VLSI Dictionary** (Cmd+K searchable, 150+ terms)
17. **Weekly Tech Quiz** (5-Q multiple choice, stored in localStorage + leaderboard later)
18. **Compare Cohorts** (table: Full-stack DV vs PD vs Analog)
19. **Founder's Note** with signature SVG draw-in
20. **Press & Recognition strip** (logos, dates, links)

## 6. Graphics & interactive visual pass

- New scene primitives: animated **die-shot SVG** (mask reveal), **clock-tree fan-out** anim, **bus-vector marching ants**, **metal-stack 3D card** (CSS perspective).
- Section dividers become **circuit cross-sections** instead of plain lines.
- Cursor: add an **inspection lens** mode on technical figures (magnifies SVG on hover).
- Hero: orbiting wafer with parallax pads tied to scrollY.
- Replace generic icons with custom **hex-tile lucide overrides**.

## 7. Accessibility / text contrast

- Audit every page for low-contrast pairs (foreground over hero gradients, glass cards over PCB traces).
- Add a `--ink` token and a `text-on-glass` utility that auto-applies backdrop scrim on translucent surfaces.
- Bump body text on dark backgrounds to `oklch(0.94 0 0)` and add `text-shadow` for hero overlays.
- Add visible focus rings, skip-link, prefers-reduced-motion respected by all new animations.

## 8. Mobile enhancements

- Re-do Nav as a full-screen radial menu (chip-tile icons).
- All hero scenes get a mobile-specific simpler variant (no R3F on `<sm` — switch to SVG poster).
- Section padding tokens (`--pad-sm/md/lg`) replace one-off `py-*`.
- Sticky bottom action bar on mobile: WhatsApp + Call + Demo.
- Test matrix: 360 / 390 / 414 / 768.

## 9. Security pass

- Move `whatsappNumber` and any contact secrets to env.
- Add Zod validation on every form server fn (length, email, phone regex).
- Set strict CSP, X-Frame-Options, Referrer-Policy via root route headers.
- Honeypot field + per-IP rate limit on form server fns (using KV-style counter in `contact_submissions`).
- Sanitize all user-rendered text (DOMPurify) — chatbot transcripts especially.
- Audit: no `dangerouslySetInnerHTML`, no service_role in client graph (`*.server.ts` enforcement).
- After you rotate, I'll request the new `SUPABASE_SERVICE_ROLE_KEY` via the secrets form.

## 10. Files I'll add / change (high level)

```text
src/integrations/supabase/{client.ts, client.server.ts, types.ts}
src/lib/{contact,demo,newsletter,chatbot}.functions.ts
src/components/chatbot/{VLSIa.tsx, IntentEngine.ts, ThinkingTrace.tsx}
src/components/interactive/{TapeoutTimeline, CostCalc, MentorWall,
  LabStatus, CareerSankey, SalaryHeatmap, SyllabusVault, SlotBooker,
  CoverageGauge, GateSandboxV2, VerilogPlayground, StaInspector,
  FloorplanPuzzle, AlumniMap, NewsTicker, Glossary, Quiz,
  CohortCompare, FoundersNote, PressStrip}.tsx
src/components/fx/{InspectionLens, DieShot, ClockTree, MetalStack}.tsx
src/assets/students/*.jpg
src/data/{mentors, glossary, quiz, alumni, press}.ts
supabase/migrations/001_init.sql  (you run manually)
.env.example  (urls + publishable key only)
```

## What I need from you before build starts

1. Confirm you'll **rotate the service_role and secret keys** in the Supabase dashboard — then I'll prompt for the new `SUPABASE_SERVICE_ROLE_KEY` via the secure form.
2. Confirm the chatbot persona name **"VLSIa"** or pick another.
3. Anything in the 20-feature list you want **dropped or reprioritised** — otherwise I'll build all 20.
