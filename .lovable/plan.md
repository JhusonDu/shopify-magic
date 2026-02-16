

# Desktop Quick Buy Popup

## What Changes

Product cards on desktop will also open the **QuickBuy popup** when clicked or when the hover button is pressed -- reusing the exact same `ProductQuickBuy` dialog that mobile already uses.

## Current vs New Behavior

**Current desktop**: Clicking a card navigates to product detail page. Hover shows two buttons ("+ Kosar" and "Vasarlas") that add the first variant directly.

**New desktop**: Clicking a card opens the QuickBuy popup (size selector, quantity, add to cart). Hover shows **one clean button**: "Gyors valasztas" (Quick Choose) that also opens the popup.

## Recommendation: One Button on Hover

Having a single **"Gyors valasztas"** button on the hover overlay is the cleanest approach because:
- The popup already contains both "Kosarba" and "Vasarlas" actions
- Two buttons on the card that both open the same popup would be confusing
- One button keeps the card clean, premium, and uncluttered
- The button acts as a visual hint that tapping/clicking does something

The user can still reach the product detail page via links elsewhere (e.g., "Osszes Megtekintese", search, etc.).

## Technical Details

### File: `src/components/FeaturedProducts.tsx`

**1. Remove mobile-only click interception**
- Currently the `Link` `onClick` only intercepts on mobile (`window.innerWidth < 768`)
- Change this to **always** call `e.preventDefault()` and open the popup on both mobile and desktop
- This means clicking anywhere on the card opens the QuickBuy dialog

**2. Replace two hover buttons with one**
- Remove the "Vasarlas" (buy now) button from the hover overlay
- Rename the remaining button from "+ Kosar" to "Gyors valasztas" (Quick Choose)
- Change the button's action from `handleAddToCart` to opening the popup (`onMobileTap(product)` -- we'll rename this prop to `onQuickBuy`)
- Keep the hover-reveal animation (`md:opacity-0 md:group-hover:opacity-100`)

**3. Rename prop for clarity**
- Rename `onMobileTap` to `onQuickBuy` since it's now used on both mobile and desktop

**4. Remove unused handlers**
- Remove `handleAddToCart` and `handleBuyNow` from the `FeaturedCard` component since the popup handles everything

### File: `src/components/ProductQuickBuy.tsx`
- No changes needed -- it already handles variant selection, quantity, add-to-cart, and buy-now perfectly

### No new dependencies needed

