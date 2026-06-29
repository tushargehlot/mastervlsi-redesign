## Goals
1. Tone down the heavy red — keep brand crimson as an accent only.
2. Fix mobile viewport clipping across all pages.
3. Replace text "company chips" with real logos in the Placements roster.
4. Wire up the 8 specific YouTube playlists (and individual videos) with real thumbnails to dedicated sections instead of one generic channel link.
5. Remove all Physical Design / STA / DFT / PD-backend content — MasterVLSI teaches **Design & Verification only**.
6. Absorb new content from the uploaded posters & PDFs.

---

## 1. Palette retune (subtle, not a redesign)
`src/styles.css` tokens:
- `--primary` shifts from crimson → deeper graphite-indigo (`oklch(0.62 0.14 255)`) as the dominant accent.
- Crimson kept as `--accent` for badges, highlights, alerts only (~15% of surfaces, was ~60%).
- Glow utilities (`glow-red`, `text-gradient`) re-pointed at the new primary; one new `glow-accent` for crimson highlights.
- Background tints (`surface-1`, scroll-tint) lose the red wash.
- Net effect: techy slate/indigo base with crimson punctuation — no component rewrite needed.

## 2. Mobile viewport fixes
Audit pages flagged by the user. Apply the responsive-row pattern:
- `Nav.tsx`: collapse stats/CTA into hamburger sheet earlier (`sm:` not `lg:`).
- `placements.tsx` filter chips → horizontal scroll on `<sm`.
- `Hero3D`, partner grid, salary heatmap, alumni map → wrap in `overflow-x-auto` with `min-w-0` text containers.
- Add `clamp()` font sizing for `h-display` so headings don't blow out 360px screens.
- Add `px-4 max-w-[100vw] overflow-x-hidden` guard on `__root.tsx` body.

## 3. Real company logos
New `src/data/partners.ts` schema: `{ name, logoUrl, category, tier }`.
- Source logos from Simple Icons CDN (`https://cdn.simpleicons.org/{slug}/{color}`) — free, monochrome, swap color per theme. Fallback to Clearbit (`logo.clearbit.com/{domain}`) for non-tech logos.
- `PartnerMarquee` and the placements grid render `<img>` with grayscale → color on hover.
- Roster expanded from the "Master VLSI Student Placed" poster: Sankalp, Tessolve, eInfochips, Wipro, HCLTech, Tata Elxsi, L&T, Tech Mahindra, LTIMindtree, Mirafra, Insemi, Moschip, Signoff, Radiant, Aura, Excel, LeadSoc, Relicuus, Vaan, Zreyah, Siliconis, Cognicadz, Tachyon, Agmatel, Aware, e-Zest, Mindgrove, Saankhya, Steradian, Signalchip, Morphing, Blueberry, RISC-V India, Kalray, IIT Madras/Bombay/Kanpur Research Parks, CeNSE, DRDO, BEL, ISRO, CDAC, SCL, BHEL, Polar, Prayog, HANA, 3rdiTech, ACME, ChipSofy, Mavenir, Hughes, Lattice, Xilinx, Zebu, Quicklogic, GUC, Semi, Morphin, Analog Devices, VVDN, Diodes, Silicon Labs, Realtek, Novatek, ROHM, ON Semi, NXP, ST, Renesas, Infineon, Intel, Samsung, Micron, TI, AMD, NVIDIA, Broadcom, Qualcomm, MediaTek, Marvell, Cisco, Meta, Microsoft, Amazon, Bosch, Google, Oppo, Vivo, Xiaomi, OnePlus, Lava, Honor, Sensing, TCS, KPIT, Cyient, Sonata, Delphi-TVS, AltenLabs, UST, Quest Global, Atos, Synapse, Unisoc, Verilog Solutions, SmartWire, Aaviniys, Agamenx, Mavenir, Embibe, Beegolab, Airoha, Truechip, Frontier, Kaynes, Niral, Brainchip, Paras, Pixelsoft, Innosilicon, Agnit, Pravega, VCC, RTE, Truchip, Sequilabs, Embcalas, Signate, Sitmec, OPRCK, Coreel, Brosee, DLTekggar, J.iscle Voc Coo, Transcors, CGS Global, Dobetech, Arasan, Embecosm, CG Power, Efinix, Index, Fossee, Ridgetech, Helios.

## 4. Per-playlist YouTube wiring
Update `src/data/playlists.ts` with the 8 real playlist IDs:
| Slot on site | Playlist |
|---|---|
| Home → "Demo Lectures" | Verilog Session demo, Number Systems demo |
| Courses → DV brochure CTA | Internship Bootcamp |
| Placements → after testimonials | Student Reviews, Internship Feedback |
| About → "Inside the campus" | Campus Tour |
| Services → "Protocols in action" | AXI Protocol videos |
| Playlists hub page | Complete VLSI Career Roadmap + all 8 |

`PosterPlaylistCard` upgraded to:
- Real `https://i.ytimg.com/vi/{firstVideoId}/hqdefault.jpg` thumbnails (already works for known IDs you provided).
- Hover → faint play overlay, click opens that specific playlist (`youtube.com/playlist?list=...`), with `iframe` modal option for individual demo videos so users can watch inline.
- Each card carries playlist meta: title, level, est. videos.

## 5. Scope to Design & Verification only
Remove PD/STA/DFT/Physical-Design/Low-Power-UPF/AMS/Post-Silicon items from:
- `src/data/courses.ts` — drop modules 6 (PD), 7 (DFT), 8 (STA), 9 (Low Power), 10 (Post-Silicon), 14 (AMS) from the 15-service list. Keep RTL, DV, FPGA Prototyping, Embedded, SoC Integration, ASIC Flow (RTL→GDSII handoff mention only), CDC, IP, Automation.
- `src/data/glossary.ts` — drop PD/STA/DFT entries.
- `src/data/mentors.ts` — remove PD-tagged mentors or relabel to DV/RTL.
- `placements.tsx` filter list: drop "PD/STA" category.
- Quiz tracks (`Quiz.tsx`): keep only RTL Design, Functional Verification (UVM), FPGA, Embedded.
- Replace the 20-block curriculum poster content into a new `CurriculumGrid` (Digital Fundamentals → Verilog → SV → SVA/Coverage → UVM → Scripting → AMBA → PCIe → USB → CXL → HDMI/DP → GLS → IP/SoC verification → Low-speed protocols → Tools → Industry projects → Additional training). This **matches** the user's Design+Verification scope.

## 6. New content sections (from posters/PDFs)
- **Fees & Terms page** (`/fees`): ₹90,000 + GST, 50/50 installments, refund/transfer/negotiation policies, late-payment consequences, 2-month max clearance, GST invoice rules. Visual table with icon rail.
- **Accommodation (PG) section** on `/contact`: Co-living / Girls / Boys PG cards with phone numbers from the poster, "10–200 m from institute" badges. Photos via lovable-assets from uploaded posters.
- **Connectivity** strip on `/contact`: nearest railway (Krishnarajapuram 450 m, Banaswadi 6 km…), metro (Benniganahalli 500 m, KR Puram 550 m), bus stops, distances. Rendered as a stylised list, not a re-uploaded map.
- **Nearby companies** strip on `/about` & `/placements`: distance-to-company list (Google 1 km, Synopsys 1 km, Samsung R&D 0 km, Cadence 1 km, Intel 4 km…) — reinforces ecosystem proximity.
- **Special achievements** strip on `/placements`: Highest career gap (Dr. Pradeep, 42 y → Microchip), Early placement (Yaswanth Verma, 21 days, Google, ₹50 L), Most offers (Harsha Reddy, 30 offers), Highest package (Basavaraj, 70 LPA UK).
- **Office contacts** in footer/contact: Sushil 7338429473, Sharmila 8431520978, Lipsa Madam 9019232425, Nitesh Sir 9844982345; `hr@mastervlsi.com`; Mon–Sat 9:30–18:30.
- **DV brochure CTA** on `/courses`: link the uploaded `Design Verification (DV) Course Brochure.pdf` (uploaded via lovable-assets) with a "Download brochure" button.
- **Recent placements ticker** on `/placements`: pulled from the VLSIGuru placements PDF — names anonymised to initials + company + package, scrolling vertical strip.

## 7. Verification
- `tsgo` typecheck.
- Playwright at 375 × 812 and 1280 × 1800 — screenshot every route, confirm no horizontal scroll, headings fit, filter chips reachable.
- Logo CDN smoke check (one fetch per source per build).

## Technical notes
- No backend changes; Supabase wiring untouched.
- Asset pipeline: uploaded poster photos for PG cards → `lovable-assets create`. PDF brochure → asset pointer, served via CDN.
- Logos use remote CDN URLs (no binary commits). Add `<link rel="preconnect" href="https://cdn.simpleicons.org">` in `__root.tsx`.
- Curriculum grid is a pure data file (`src/data/curriculum.ts`) consumed by a new `CurriculumGrid` component reused on Home + Courses.
