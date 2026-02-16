

# Mobile Hero Declutter -- Luxury & CTA Focus

## Problem
The mobile hero feels crowded with too much text between the search bar and the headline. The two small buttons below the search bar lack CTA impact and the trust signals wrap awkwardly.

## Changes (Mobile Only -- Desktop Untouched)

All changes use responsive classes (`md:` breakpoints) so desktop stays exactly as-is.

### 1. Remove subheadline paragraph on mobile
- Hide the long description paragraph on mobile (`hidden md:block`)
- This is the biggest space-saver -- removes 3 lines of text
- Desktop keeps the full paragraph

### 2. Tighten mobile spacing
- Reduce `mb-8` (before search) to `mb-5` on mobile
- Reduce badge `mb-6` to `mb-4` on mobile
- Reduce divider `mb-5` to `mb-3` on mobile
- These small tweaks open up breathing room

### 3. Redesign CTA buttons for mobile
- Make both buttons slightly larger on mobile: `text-xs` instead of `text-[11px]`, `px-4 py-2` instead of `px-3.5 py-1.5`
- Give the "Böngészd az Illatokat" button a gold outline style to make it a clear CTA (border-primary/40, text-primary)
- Keep them in a horizontal row with `flex-nowrap` and `gap-2`

### 4. Compact trust signals on mobile
- Reduce to `text-[10px]` on mobile so it fits one line
- Reduce top margin to `mt-3` on mobile

## File Modified
- `src/components/Hero.tsx` -- responsive class adjustments only

## Technical Notes
- All changes are additive responsive prefixes (e.g., `hidden md:block`, `mb-4 md:mb-6`)
- No structural or desktop layout changes
- No new components or dependencies

