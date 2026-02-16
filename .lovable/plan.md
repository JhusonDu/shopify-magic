

# Header Toolbar Redesign Plan

## Overview
A complete redesign of the header for both desktop and mobile, updating branding to "ScentBox Hungary", restructuring navigation links, and building a functional search overlay that queries your Shopify product catalog.

---

## 1. Branding Update

- Change the two-line logo text ("ScentBox" + small "Hungary") into a single clickable line: **"ScentBox Hungary"**
- Keep the gold 3D logo icon and its hover/glow animations exactly as they are

## 2. Navigation Links (Desktop + Mobile)

Replace the current nav links with these:

| Label | Type | Target |
|---|---|---|
| Kezdolap | Route | `/` |
| Illatok | Route | `/termekek` |
| Rolunk | Anchor | `#authenticity` |
| Kapcsolat | Anchor | `#footer` (scroll to footer) |

This removes the old "Doboz Osszeallitasa" and "Kedvencek" links from the header (they remain accessible on the homepage itself).

## 3. Search Bar -- Command Palette Style

Instead of a plain search bar in the header, implement a **search overlay/modal** (using the existing `cmdk` + `CommandDialog` component already installed):

- **Desktop**: Clicking the Search icon opens a centered command palette overlay with a text input. As the user types, it queries Shopify products via the existing `fetchProducts(first, query)` function and shows results with product image, title, and price.
- **Mobile**: Same overlay, full-width, triggered from the mobile menu or a search icon in the header.
- Selecting a result navigates to `/product/{handle}`.
- Keyboard shortcut: `Ctrl+K` / `Cmd+K` opens it on desktop.

## 4. Desktop Header Layout

```text
[Logo + "ScentBox Hungary"]  [Kezdolap] [Illatok] [Rolunk] [Kapcsolat]  [Search icon] [User icon] [Cart icon]
```

- Left: Logo + brand name (single line)
- Center: Navigation links with existing gold underline hover animation
- Right: Search, Account, Cart icons in a row

## 5. Mobile Header Layout

```text
[Hamburger]  [Logo + "ScentBox Hungary"]  [Search icon] [Cart icon]
```

- The hamburger opens the existing slide-out Sheet with updated nav links
- Search icon opens the same command palette overlay
- User/Account icon moves inside the mobile menu's footer section
- Cart icon stays visible in the header

## 6. Account Icon (Placeholder)

The User icon currently does nothing. It will remain as a visual placeholder button for now -- no auth flow will be added in this phase.

---

## Technical Details

### Files to modify:
1. **`src/components/Header.tsx`** -- Main changes:
   - Update `navLinks` array with new labels/targets
   - Change brand text to single-line "ScentBox Hungary"
   - Add search state (`isSearchOpen`) and `Ctrl+K` keyboard listener
   - Import and render the new `SearchCommand` component
   - Reorganize mobile header to show search + cart icons (move User icon into mobile menu)

2. **New file: `src/components/SearchCommand.tsx`** -- Search overlay component:
   - Uses existing `CommandDialog`, `CommandInput`, `CommandList`, `CommandItem`, `CommandEmpty` from `src/components/ui/command.tsx`
   - Uses `useProducts` hook with debounced search query
   - Shows product results with thumbnail, title, price
   - `useNavigate` to go to product detail on selection
   - Accepts `open` and `onOpenChange` props

### No new dependencies needed
- `cmdk` is already installed
- `CommandDialog` component already exists
- `useProducts` hook already supports a `query` parameter
- `framer-motion` already in use for animations

### Search debouncing
- Add a `useState` for the search term and a simple `useEffect` with a 300ms `setTimeout` debounce before passing the query to `useProducts`

