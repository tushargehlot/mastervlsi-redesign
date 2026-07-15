
## Goals

1. Logo shows reliably on Vercel and everywhere else.
2. Alumni/placement section rebuilt with correct names + real Wix-hosted photos (single source of truth).
3. YouTube video thumbnails visible on every page.
4. Preview matches the hosted site at mastervlsi.com.
5. Rank-ready SEO for **"VLSI institute in Bangalore"**.
6. Physical Design fully removed from the site.

---

## 1. Logo — hard-code, no CDN dependency

The current logo is served from the Lovable CDN asset pointer. On Vercel that URL 404s.

- Convert the black MasterVLSI mark into an inline SVG component `src/components/brand/LogoMark.tsx` — pure vector, no network call, no image tag.
- Replace every consumer (Nav, Footer, mobile nav, chatbot header, favicons) with the SVG component.
- For favicon and og:image (which must be raster/URL), copy the PNG into `public/favicon.png` and `public/og-cover.png` and reference `/favicon.png` — served by the app itself, not the CDN.
- Delete the old `.asset.json` imports in `src/assets/logo*.png.asset.json` from the components that render on-screen.

## 2. Rebuild the alumni / placement section from Wix (single source of truth)

Remove all current placeholder alumni data and photos. Rescrape the full `/placement-list` Wix page — every entry has name, package, location, company, optional review, and a Wix-hosted image URL.

- Save the full scraped list into `src/data/alumni.ts` as a hard-coded array of `{ name, package, from, company, review?, photo }` where `photo` is the direct `static.wixstatic.com` URL (hotlinked — Wix serves these publicly with CORS-open image endpoints).
- Rewrite `src/components/AlumniWall.tsx` to render this exact schema, keep the course filter, and show name, company, location, package badge, and review quote.
- New `/placements` grid uses the same data source; drop the mocked testimonial arrays.
- Remove every hard-coded placeholder photo / initial-avatar fallback for records that have a real Wix photo.

## 3. YouTube thumbnails — fix everywhere

Symptom: Wix `wsrv.nl` proxy and `i.ytimg.com/vi_webp` sometimes 404.

- Central helper `src/lib/youtube.ts`:
  - `youtubeId(url)` — parse id from any playlist/video/short URL.
  - `youtubeThumb(id)` — return `https://img.youtube.com/vi/{id}/hqdefault.jpg` (highest guaranteed variant); fall back to `mqdefault.jpg` on error via `<img onError>`.
- Update `PosterPlaylistCard`, homepage playlists section, campus tour embed, and any other `img` referencing `ytimg` to use the helper.
- Add `loading="lazy"` and explicit width/height to prevent CLS.

## 4. Preview ↔ hosted parity

Fetch the live hosted site and diff key sections against the preview:

- Sections present on mastervlsi.com but missing/broken on preview → port them (address block, phone strip, review counts, exact tagline).
- Confirm nav order and footer links match.
- Fix any 404 asset paths surfaced by the diff.

## 5. SEO for "VLSI institute in Bangalore"

Hard-code `https://www.mastervlsi.com` as the canonical domain everywhere (canonical links, `og:url`, JSON-LD `url`, sitemap `BASE_URL`, robots.txt `Sitemap:`).

Per-page head upgrades in `src/routes/*`:

- **Home** — title `Best VLSI Institute in Bangalore | RTL & Design Verification Training — MasterVLSI`; description built around the target phrase; H1 rewritten to include "VLSI Training Institute in Bangalore".
- **Courses / Alumni / Placements / About / Contact** — Bangalore-tagged titles and unique descriptions.
- Add `keywords` meta (not a Google ranking factor, but Bing/Yandex use it).

Structured data (in `__root.tsx` + leaf routes):

- Upgrade Organization → **EducationalOrganization** with `areaServed: Bangalore`, `hasCredential`, aggregateRating pulled from the Google reviews array, and full postal address.
- Add **LocalBusiness** JSON-LD with geo coordinates from the maps URL, opening hours, phone.
- Add **BreadcrumbList** on every leaf route.
- Add **Course** JSON-LD on `/courses` for each track (RTL, UVM DV, FPGA, etc. — no PD).
- Add **FAQPage** JSON-LD on Home using the existing FAQ data.
- Add **VideoObject** JSON-LD for the campus tour video.

Discovery / crawlability:

- Refresh `public/robots.txt` with the correct `Sitemap: https://www.mastervlsi.com/sitemap.xml`.
- Refresh `public/llms.txt` with the mastervlsi.com URLs and updated course list (no PD).
- Extend `src/routes/sitemap[.]xml.ts` to include every existing route (about, alumni, testimonials, contact, demo, blog posts) and set `BASE_URL` to `https://www.mastervlsi.com`.
- Add `<link rel="preconnect">` for `static.wixstatic.com`, `img.youtube.com`, `fonts.googleapis.com` in `__root.tsx`.
- Add a real 1200×630 og-cover (generate once) and reference on Home only.

Content signals (on-page, still frontend-only):

- Bangalore mentions in Hero, About, Footer, and every service card.
- Location-rich alt text on hero and campus tour images.
- Internal linking: every course card → `/courses`; every alumnus → `/placements`; footer link cluster to `about, courses, placements, alumni, blog, contact`.

Off-site backlink note (I can't create real backlinks, but I'll document what you should do): submit to Sulekha, Justdial, UrbanPro, IndiaMart, Google Business Profile posts — added to a `docs/SEO_LAUNCH.md` checklist.

## 6. Remove Physical Design everywhere

Grep and strip PD/PNR from: `src/data/courses.ts`, `src/data/protocols.ts`, `src/data/playlists.ts`, `src/data/faqs.ts`, `src/data/blog.ts`, `TracksOverview`, `Nav`, `Footer`, JSON-LD courseList, llms.txt, sitemap. Verify with a final `rg -i "physical design|\\bpd\\b|floorplan"` sweep.

---

## Verification (post-build)

- `bun run build` succeeds.
- Playwright: load `/`, `/alumni`, `/placements`, `/courses` — screenshot each; confirm logo, alumni photos, and YouTube thumbnails render.
- `rg -i "physical design"` returns nothing in `src/`.
- View `sitemap.xml` and `robots.txt` at the built output — confirm mastervlsi.com URLs.

## Out of scope

- Actual DNS setup / connecting `mastervlsi.com` in Lovable (you do this in Settings → Domains — I'll remind you at the end).
- Any backend or Supabase change.
- Real backlink creation (only the checklist doc).
