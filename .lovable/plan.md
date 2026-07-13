## Redesign Plan: Dark Cyber-Blue VLSI Website

### 1. Replace the entire color system
- Move the site away from the current mixed red/blue/grey/orange/light palette.
- Use one cohesive dark tech palette inspired by the uploaded references:
  - Near-black PCB background
  - Electric cyan/blue primary glow
  - Subtle violet holographic secondary accent
  - High-contrast white/blue text
- Update global semantic tokens in `src/styles.css` so every page inherits the new scheme.
- Remove light-mode surfaces that currently make text disappear.

### 2. Rebuild the hero graphic and animation
- Replace the current hero background with a realistic futuristic PCB/chip visual language:
  - Dark board texture
  - Glowing cyan circuit traces
  - Central processor / holographic AI-core feeling
  - Animated trace drawing, data particles, scan sweep, and glow pulses
- Update the homepage hero so the text sits on a readable dark overlay.
- Highlight AI strongly in the hero while keeping the main message focused on RTL, SystemVerilog, UVM, Design and Verification.

### 3. Fix text visibility across the site
- Retune global tokens for cards, muted text, borders, inputs, popovers, and buttons.
- Remove red/yellow/light utility classes from key components where they clash with the new scheme.
- Make CTAs, badges, section labels, stat cards, and form fields readable on dark backgrounds.

### 4. Redesign recurring graphics and animations
- Update `GridBackdrop`, `PcbTraces`, `TraceLine`, `Spotlight`, `Cursor`, and `ChipScene` to use cyan/blue/violet holographic effects instead of red/orange/light-mode styling.
- Make section dividers and background circuit animations feel like premium VLSI/EDA graphics.
- Keep animations decorative but not childish: thin traces, glow, scanlines, particles, and controlled depth.

### 5. Clean key layout conflicts
- Adjust homepage hero stats/buttons for mobile readability.
- Keep logo visible by placing the black logo on a controlled light backplate.
- Remove outdated/footer references that conflict with the user’s Design & Verification-only positioning.

### Technical notes
- Main files to update: `src/styles.css`, `src/components/HeroBackdrop.tsx`, `src/routes/index.tsx`, `src/components/GridBackdrop.tsx`, `src/components/vlsi/PcbTraces.tsx`, `src/components/fx/*`, `src/components/ChipScene.tsx`, `src/components/Nav.tsx`, `src/components/Footer.tsx`.
- No backend changes.
- After implementation, verify the homepage visually and check for obvious contrast problems.