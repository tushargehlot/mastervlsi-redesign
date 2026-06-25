# MasterVLSI — Deploying to Vercel

This site is built with **TanStack Start** on **Vite + Nitro**. The default Nitro preset targets Cloudflare; for Vercel we just swap the preset.

## One-time setup

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel → **Add New Project** → import the repo.
3. **Framework Preset:** `Other`
4. **Install Command:** leave default (`bun install` is auto-detected from `bun.lock`, or `npm install`).
5. **Build Command:** `npm run build` (or `bun run build`).
6. **Output Directory:** leave **blank** — Nitro writes Vercel's Build Output API v3 to `.vercel/output/` which Vercel picks up automatically.
7. **Environment Variables** → add:

   | Key | Value |
   |---|---|
   | `NITRO_PRESET` | `vercel` |

8. **Node version:** 20.x (already set via `.nvmrc`).
9. Click **Deploy**.

## Custom domain

After the first deploy, go to **Settings → Domains** in Vercel and add your domain.

## What's deployed

- Fully static / SSR-ready React app.
- All site data (blog, courses, partners) is bundled — **no backend required** in this phase.
- WhatsApp widget is currently a frontend mock. Real bot integration ships in phase 2.
- YouTube playlist iframes pull live from `youtube.com/@mastervlsi2526`. Drop real playlist IDs into `src/data/playlists.ts`.

## Local development

```bash
bun install
bun run dev
```

Then open http://localhost:8080.

## Updating site constants

Edit `src/data/site.ts`:
- `whatsappNumber` — swap the placeholder.
- `mapsEmbed` / `mapsUrl` — already pointed at the institute.
- `demoFormUrl` — Google Form for the free demo class.

---

© 2026 MasterVLSI — Designed by Tushar Gehlot
