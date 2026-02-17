
# Footer Redesign + About Us & Support Pages

## Overview

Completely redesign the footer inspired by the reference images, adapted to ScentBox's luxury perfume brand identity (dark obsidian background, gold accents). Also create dedicated "Rolunk" (About Us) and "Tamogatas" (Support) pages with proper routing and working links throughout.

## Footer Redesign

### Structure (top to bottom)

1. **CTA Banner** -- A full-width strip above the main footer: "Kerdesed van? Segitunk valasztani!" with a gold "Kapcsolatfelvetel" button linking to the Support page.

2. **Main Footer Grid** (5 columns desktop, stacked mobile):
   - **Column 1 (brand, span 2)**: ScentBox logo + short description + contact info (email icon + email, location icon + "Budapest, Magyarorszag"), social media icons (Instagram, TikTok, Facebook)
   - **Column 2 "Termekek"**: Osszes Termek (/termekek), Ferfi illatok (/termekek?gender=Ferfi), Noi illatok (/termekek?gender=Noi), Kedvenceink (#bestsellers)
   - **Column 3 "Segitseg"**: Hogyan Rendeljek? (/tamogatas), Szallitasi Informaciok (/tamogatas), Fizetesi modok (/tamogatas), Visszakuldes (/tamogatas)
   - **Column 4 "Ceg"**: Rolunk (/rolunk), Eredetiseg (#authenticity), Kapcsolat (/tamogatas)

3. **Bottom Bar**: Copyright left, "Adatvedelem" + "ASZF" links right

### Design Details
- Dark background using `bg-obsidian` or `bg-[#0a0a0a]` for contrast from the rest of the site
- Gold accent on hover states and CTA button
- Trust row removed from footer (it already appears elsewhere on the page)
- Smooth hover transitions on all links
- Mobile: single column, sections collapsed with clear spacing

## New Pages

### About Us Page (`/rolunk`)
- Hero section with brand story heading
- "Kik Vagyunk" section -- short brand mission paragraph
- "Miert ScentBox?" section -- 3-4 value cards (Eredetiseg, Preciz Dekantalas, Gyors Szallitas, Elegedettsegi Garancia)
- Trust badges row
- CTA to browse products
- Uses Header + Footer layout

### Support Page (`/tamogatas`)
- Hero with "Segitseg" heading
- Tabbed or accordion FAQ sections:
  - "Hogyan Rendeljek?" -- ordering steps
  - "Szallitas" -- delivery info (GLS, 1-3 nap)
  - "Fizetesi modok" -- payment methods (card, transfer)
  - "Visszakuldes" -- 14-day return policy
  - "Kapcsolat" -- email, response time
- Uses Header + Footer layout

## Technical Details

### Files to modify:
1. **`src/components/Footer.tsx`** -- Complete rewrite with new structure, CTA banner, 5-col grid, contact info, social icons
2. **`src/App.tsx`** -- Add routes for `/rolunk` and `/tamogatas`
3. **`src/components/ToolboxPanel.tsx`** -- Update "Rolunk" tab links to point to `/rolunk`, "Szallitas es Visszakuldes" to `/tamogatas`, "Kapcsolat" to `/tamogatas`

### Files to create:
1. **`src/pages/AboutUs.tsx`** -- About Us page with brand story, value cards
2. **`src/pages/Support.tsx`** -- Support/FAQ page with accordion sections

### Dependencies:
- No new packages needed
- Uses existing: `framer-motion`, `lucide-react`, `react-router-dom`, shadcn `Accordion`
