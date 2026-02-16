

# Bundle Builder Redesign: Inline Section with Full Flow

## Overview
Remove the "Allitsd Ossze a Dobozod" button from the Hero section. Replace the current `BundleBuilder` component with a completely redesigned inline section that appears as the **3rd block** on the landing page (after Bestsellers). The new builder walks customers through selecting size, picking perfumes from the real Shopify catalog, reviewing their box, and adding it to the cart -- all within an interactive, animated inline widget.

---

## Landing Page Section Order (after changes)

1. Hero (search bar + single "Bongeszd az Illatokat" CTA only)
2. BestsellersSection ("Kedvenceink")
3. **BundleBuilder** (redesigned inline builder) -- NEW POSITION, same as current
4. AuthenticitySection
5. HowItWorksSection
6. NewsletterSection
7. Footer

The `BundleBuilder` is already in position 3 in `Index.tsx` (after `BestsellersSection`), so no reordering is needed -- only the Hero button removal and the component rewrite.

---

## Hero Changes

**File: `src/components/Hero.tsx`**

- Remove the secondary "Allitsd Ossze a Dobozod" outline button entirely (lines 177-192)
- Keep only the primary "Bongeszd az Illatokat" button, centered and full-width on mobile
- Remove the `flex-row` split layout since there is now only one button

---

## Redesigned BundleBuilder: Step-by-Step Flow

**File: `src/components/BundleBuilder.tsx`** (full rewrite)

### Section Header
- Gold badge: "Egyedi Osszeallitas"
- Title: "Allitsd Ossze a Sajat Dobozkadat"
- Subtitle explaining the concept
- A small help icon (HelpCircle / CircleHelp from lucide) next to the title that opens a tooltip or small popover explaining the decanting process, with a "Tudj meg tobbet" link pointing to a future `/rolunk` or `/dekantolas` page

### Progress Stepper (4 steps)
Horizontal stepper with numbered circles, connecting lines, and step labels:

| Step | Title | Description |
|---|---|---|
| 1 | Meret Kivalasztasa | Choose decant size |
| 2 | Illatok Kivalasztasa | Pick perfumes from the catalog |
| 3 | Attekintes | Review selections and see total price |
| 4 | Kosarba | Add to cart confirmation |

Each step circle animates: completed = gold with checkmark, current = gold filled, future = gray outline. `framer-motion` `layoutId` transitions on the progress indicator.

### Step 1: Size Selection
Three size cards in a grid (md:grid-cols-3):

| Size | Description | Price hint |
|---|---|---|
| 5ml | Tokeletes kiprobalashoz | From the cheapest 5ml variant price in Shopify |
| 10ml | Idealis mindennapi hasznalatra | From 10ml variant prices |
| 15ml | Premium meretu dekant | From 15ml variant prices |

- Cards show size, description, and starting price
- Selected card gets a gold border + subtle glow animation
- Clicking a card selects that size and enables the "Tovabb" button

### Step 2: Perfume Selection (from Shopify)
- Fetch all products using the existing `useProducts` hook
- Display products in a scrollable grid (2 cols mobile, 3 cols desktop)
- Each product card shows: image thumbnail, title, vendor, and the **price for the selected size variant**
- Cards are toggleable (click to select/deselect)
- Selected cards get a gold border + a small check badge in the corner
- A sticky bottom bar shows: "X illat kivalasztva" count + running total price
- The number of selectable perfumes depends on size:
  - 5ml: select 1-5 perfumes
  - 10ml: select 1-3 perfumes
  - 15ml: select 1-3 perfumes
- Search/filter input at the top to filter products by name

### Step 3: Review
- Summary card showing:
  - Selected size (e.g., "5ml dekantok")
  - List of selected perfumes with image, name, vendor, and individual price
  - Total price calculation (sum of selected variant prices)
  - An edit button per section that jumps back to that step
- A small info box with a CircleHelp icon: "Hogyan keszulnek a dekantjaink?" linking to the decanting info page

### Step 4: Add to Cart
- On clicking "Kosarba", use the existing cart store (`useCartStore`) to add each selected variant
- Show a success animation (checkmark + confetti-style gold sparkle)
- Display a "Tovabb a fizeteshez" button that opens the cart drawer
- Also show a "Folytasd a bongeszes" link to scroll back up

### Navigation Buttons
- "Vissza" (back) and "Tovabb" (next) buttons at the bottom of each step
- "Tovabb" is disabled until the step's requirements are met (e.g., size selected, at least 1 perfume chosen)
- `AnimatePresence` slide transitions between steps (slide left on forward, right on backward)

---

## Help/Info Popover: Decanting Process

A small popover (using the existing Popover component) triggered by a CircleHelp icon, containing:

- **Title**: "Mi az a dekantolas?"
- **Short text**: 2-3 sentences explaining that decanting means transferring perfume from the original bottle into smaller atomizer vials, maintaining 100% authenticity
- **Bullet points**: Quality control, certified process, original bottles
- **Link**: "Reszletes informacio" pointing to `/rolunk` (or a future dedicated page)

This popover appears:
1. Next to the section title in the header area
2. In the Step 3 review summary

---

## Technical Details

### Files to modify:
1. **`src/components/Hero.tsx`** -- Remove the secondary "Allitsd Ossze a Dobozod" button and simplify the CTA layout to a single centered button
2. **`src/components/BundleBuilder.tsx`** -- Full rewrite with the 4-step flow described above

### Files unchanged:
- `src/pages/Index.tsx` -- Section order remains the same (BundleBuilder is already the 3rd section after BestsellersSection)
- `src/lib/shopify.ts` -- Existing product fetching and cart APIs are reused as-is
- `src/stores/cartStore.ts` -- Existing cart store handles adding items

### Data flow:
- Step 1 selection determines which variant price to show per product in Step 2
- Products are fetched via `useProducts()` which calls Shopify Storefront API
- Each product's variants are filtered by the selected size option (matching `selectedOptions` where name = "Meret" and value = "5ml" / "10ml" / "15ml")
- Adding to cart uses the existing `addItem` from the cart store with the correct `variantId`

### Animations:
- `framer-motion` `AnimatePresence` for step transitions (slide direction based on forward/backward)
- `motion.div` with `layoutId` for the progress indicator active state
- Hover scale effects on product cards and size cards
- Success step: spring animation on the checkmark icon

### No new dependencies needed
- All UI components (Popover, Button, Progress, etc.) already exist
- `framer-motion` already installed
- `useProducts` hook already available
- Cart store already handles adding items
