

# Mobile Product Card Popup -- Size & Quantity Selector

## What Changes

On **mobile only**, the product cards in "Legnepszerubb Termekek" will no longer show the "Kosar" and "Vasarlas" buttons overlaid on the image. Instead:

1. **Tapping a product card on mobile** opens a bottom-sheet style **Dialog popup**
2. The popup shows the product image, name, price, and lets the user:
   - **Choose a variant/size (ml)** from the product's available options
   - **Select quantity** with +/- buttons
   - **Add to cart** or **Buy now**
3. **Desktop stays exactly the same** -- hover-reveal buttons on the image

## Technical Details

### File: `src/components/FeaturedProducts.tsx`

**1. Hide overlay buttons on mobile**
- Change the action buttons container from `opacity-100 md:opacity-0` to `hidden md:flex md:opacity-0` 
- This completely hides buttons on mobile, keeps hover-reveal on desktop

**2. Add tap handler for mobile**
- On mobile, tapping the card opens a product popup dialog instead of navigating to the product page
- On desktop, clicking still navigates via the `Link` as before
- Implement this by intercepting the click on mobile (`window.innerWidth < 768`) and opening the dialog instead of following the link

**3. Create `ProductQuickBuy` dialog component** (inline in same file)
- Uses the existing `Dialog` component
- Shows:
  - Product image (small thumbnail)
  - Product title + vendor
  - **Variant selector**: renders the product's `variants.edges` as selectable chips (showing the ml/size from `selectedOptions`), highlighted when selected
  - **Quantity selector**: simple -/+ row with a number display, default 1
  - **Price**: updates based on selected variant
  - **Two buttons**: "Kosarba" (add to cart) and "Vasarlas most" (buy now)
- All text in Hungarian

**4. State management**
- `selectedProduct` state on the `FeaturedProducts` component (or `null` when closed)
- `selectedVariant` and `quantity` state inside the dialog
- Uses existing `useCartStore` for add-to-cart with the chosen variant and quantity

### No new dependencies needed
- Uses existing `Dialog` from `@/components/ui/dialog`
- Uses existing cart store and Shopify types

