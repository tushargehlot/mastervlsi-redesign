## SEO & AI Search Enhancement Plan

Comprehensive pass to fix all the checklist items you pasted (titles, descriptions, alt text, indexing, mobile, sitemap, robots, llms.txt, verification) and set up backlinks + AI-agent discoverability.

### 1. Per-page head metadata (title, description, og, canonical)
Audit every route and ensure unique `title`, `description`, `og:title`, `og:description`, `og:url`, and canonical link. Fill gaps on:
- `/` (home) — tighten title/description, add `og:image`
- `/about`, `/playlists`, `/demo`, `/blog` (list), `/blog/$slug` — verify all four tags + canonical
- `/services`, `/contact`, `/courses`, `/placements` — already partially done, verify

### 2. Homepage content & indexing
- Confirm homepage has crawlable H1 + descriptive text (no JS-only content gates)
- Verify no `noindex` meta anywhere unintended
- Ensure internal links from home reach every route (nav + footer already do this — audit)

### 3. Alt text audit
Sweep every `<img>` in components and routes; replace empty/generic alt with descriptive text:
- Hero, mentor wall, video testimonial thumbnails, playlist posters, accommodation photos, campus reach map pins, achievements strip, partner logos (recheck), footer logo, chatbot avatar, blog cover images.

### 4. Sitemap & robots
- Set `BASE_URL` in `src/routes/sitemap[.]xml.ts` to the published URL once known (leave placeholder note + relative fallback)
- `public/robots.txt` — verify `Allow: /` and absolute sitemap URL after publish

### 5. Structured data (JSON-LD) expansion
Add missing schemas:
- `BreadcrumbList` on blog post + deep pages
- `VideoObject` for testimonial videos on `/placements`
- `Course` entries already present — verify `provider` + `url`
- `LocalBusiness` on contact — verify geo coordinates from Google Maps link

### 6. llms.txt polish
Review `public/llms.txt` — ensure page list matches actual routes, add short section descriptions so LLMs cite accurately.

### 7. Mobile optimization audit
- Verify viewport meta (present)
- Sweep for horizontal overflow, tap targets <44px, unreadable font sizes on `/`, `/courses`, `/placements`, `/blog/$slug`
- Test 3D hero + chatbot launcher on small screens

### 8. Google Search Console verification
Add a placeholder `<meta name="google-site-verification">` slot in `__root.tsx` head, wired to an env var (`VITE_GSC_TOKEN`) so you can drop the token in without a code change. After publish, we run the GSC verify flow.

### 9. Backlinks strategy (content only — actual link-building is off-platform)
- Add an outbound "As featured on / partners" strip linking to reputable pages that link back (YouTube channel, LinkedIn, Google Business)
- Add `rel="me"` links in footer for social identity graph
- Ensure YouTube channel description links back to the site (manual — I'll give you the copy)
- Guide (in reply, not code): submit to VLSI directories, guest posts on Semiwiki, alumni LinkedIn tags, Reddit r/chipdesign AMA

### 10. AI search / NLWeb readiness
- Ensure `llms.txt` is complete
- Add `Speakable` schema fragments on FAQ answers
- Semantic HTML sweep (proper `<article>`, `<section>`, `<nav>`, `<time>`)

### 11. Verification steps after build
- Trigger SEO rescan
- Publish and share URL so I can run URL Inspection API against Google
- List any remaining findings and fix in a follow-up

### Technical notes
- All head changes go through TanStack `head()` per-route (no third-party SEO lib)
- Canonicals/og:url stay relative until published URL is confirmed, then swap to absolute
- No backend changes; purely presentation + static assets
- No new dependencies

### Out of scope (needs your input or off-platform action)
- Publishing the site (needed before GSC verification, absolute canonicals, and Google submission)
- Actual link-building outreach
- NLWeb registration (external product)
