

# Hero Search Bar and Layout Redesign

## Overview
Move the search experience from the header toolbar into the Hero section, creating a prominent search bar that acts as the main call-to-action. Reorganize Hero buttons and remove the search icon from the header.

---

## 1. Remove Search Icon from Header

**File: `src/components/Header.tsx`**

- Remove the Search icon button from the desktop actions area (lines 253-260)
- Remove the mobile search icon button (lines 238-245)
- Remove the search icon from the mobile menu footer (lines 145-155)
- Keep the `SearchCommand` component and `isSearchOpen` state -- the Hero search bar will trigger it
- Keep `Ctrl+K` / `Cmd+K` keyboard shortcut working
- Keep User icon and Cart icon in the header

**New desktop actions layout:**
```text
[User icon] [Cart icon]
```

**New mobile header layout:**
```text
[Hamburger] [Logo + "ScentBox Hungary"] [Cart icon]
```

---

## 2. Add Search Bar to Hero Section

**File: `src/components/Hero.tsx`**

Restructure the Hero CTA area into three stacked elements:

### New layout (top to bottom):
1. **Search bar** -- a clickable fake input that opens the `SearchCommand` dialog
2. **"Bongeszd az Illatokat"** button (primary CTA)
3. **"Allitsd Ossze a Dobozod"** button (secondary CTA)

### Search bar design:
- A wide, styled container that looks like a search input but is actually a button
- Contains a Search icon on the left and placeholder text: **"Milyen illatot keresnel?"** ("What scent are you looking for?")
- On click, it opens the existing `SearchCommand` dialog (which has both Search and Finder tabs)
- **Mobile**: spans the full width of the content area (matching the width from the first button's left edge to the second button's right edge)
- **Desktop**: same max-width as the content area (~500-600px)
- Styled with a semi-transparent background, border, and subtle glow to match the luxury aesthetic

### Button reordering:
- **"Bongeszd az Illatokat"** stays as the primary gold button
- **"Allitsd Ossze a Dobozod"** moves below it (after the "100% Eredeti" text line)

The Hero component will need to accept a callback or state setter to open the search. Since `SearchCommand` lives in `Header.tsx`, we will lift the search state up:
- Move `isSearchOpen` and `setIsSearchOpen` into Index.tsx and pass them as props to both `Header` and `Hero`
- Alternatively, keep it simpler: pass `onSearchOpen` callback from `Header` to `Hero` -- but since they are siblings, **lift state to Index.tsx**

---

## 3. State Management

**File: `src/pages/Index.tsx`**

- Add `isSearchOpen` state here
- Pass `isSearchOpen` and `setIsSearchOpen` (or `onSearchOpen`) to both `Header` and `Hero`
- `Header` still renders the `SearchCommand` dialog and handles `Ctrl+K`
- `Hero` calls `onSearchOpen()` when the fake search bar is clicked

---

## 4. Responsive Sizing

### Mobile:
- Search bar spans full width of the content container (`w-full`)
- Both CTA buttons stack vertically below, also full width
- All three elements align left-to-right edges

### Desktop:
- Search bar has a max-width matching the button group (~max-w-lg or similar)
- Centered within the Hero content
- Buttons remain side-by-side below the search bar

---

## Technical Summary

| File | Changes |
|---|---|
| `src/pages/Index.tsx` | Add `isSearchOpen` state, pass props to Header and Hero |
| `src/components/Header.tsx` | Accept `isSearchOpen`/`onSearchOpenChange` props, remove all Search icon buttons |
| `src/components/Hero.tsx` | Accept `onSearchOpen` prop, add clickable search bar above CTAs, move "Allitsd Ossze a Dobozod" below authenticity text |
| `src/components/SearchCommand.tsx` | No changes needed |

No new dependencies required.

