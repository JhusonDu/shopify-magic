

# Add Price Range Filter + "Ajánlott" (Recommended) Sort Option

## Overview

Enhance the filter sidebar with two new features:
1. A **"Recommended" sort option** as the default in the sort dropdown
2. A **price range slider** with budget preset buttons beneath the sort section -- a dual-thumb slider with min/max inputs, plus quick-select budget buttons for common spending ranges

## What Changes

### 1. Update `ProductFiltersState` interface
- Add `priceRange: [number, number]` to the filter state (min, max in HUF)
- Update the `emptyFilters` default in `Products.tsx` to include the full price range

### 2. Sort Dropdown -- Add "Ajanlott" (Recommended)
- Rename the current "Alapertelmezett" (Default) option to **"Ajanlott"** (Recommended) with value `"recommended"`
- Keep the existing price and name sort options

### 3. Price Range Component (inside `ProductFilters.tsx`)
- **Dual-thumb Radix Slider** showing min-max range
- **Two small input fields** (min / max) showing formatted HUF values, editable
- **Budget preset buttons** beneath the slider as pill chips:
  - "< 5 000 Ft" (budget)
  - "5 000 - 10 000 Ft" (mid-range)
  - "10 000 - 20 000 Ft" (premium)
  - "20 000+ Ft" (luxury)
- Clicking a preset auto-sets the slider range with a smooth animation
- An "Osszes ar" (All prices) chip to reset the range
- The slider track fills with gold (primary color) between the two thumbs
- Animated transitions when presets are selected

### 4. Filter Logic Update (`applyFilters`)
- Add price range filtering: check if product's `minVariantPrice.amount` falls within `[min, max]`
- Include price range in `activeCount` (count +1 if range differs from full range)

### 5. Clear Behavior
- "Torles" (Clear all) resets price range back to full range
- Price range derives its min/max bounds dynamically from the loaded products

## Files to Modify

1. **`src/components/ProductFilters.tsx`**
   - Add `priceRange` to `ProductFiltersState`
   - Create `PriceRangeFilter` sub-component with dual Slider, inputs, and budget presets
   - Add price filtering logic in `applyFilters`
   - Rename default sort to "Ajanlott"
   - Insert price range section between sort and gender filters

2. **`src/pages/Products.tsx`**
   - Update `emptyFilters` to include `priceRange: [0, 100000]`
   - Pass price bounds derived from products to filters

3. **`src/components/ui/slider.tsx`**
   - Already supports Radix dual-thumb (just pass `value={[min, max]}`) -- no changes needed

## UI/UX Details

- The price range section appears between the Sort dropdown and the Gender filter, separated by dividers
- Budget preset pills use the same `FilterChip` style for visual consistency
- Slider thumbs have the existing gold/primary styling
- Min/max input fields are compact (w-20), right-aligned numbers, with "Ft" suffix label
- On mobile bottom sheet: same layout, stacked vertically
- Smooth `framer-motion` transitions on preset selection (slider animates to new range)
- Active budget preset gets the gold highlight like other filter chips

## Technical Notes

- Price values are stored as numbers in HUF (parsed from Shopify's `amount` string)
- The slider step is 500 Ft for practical granularity
- `extractFilterOptions` will also return `priceBounds: [min, max]` computed from products
- The dual-thumb Radix Slider component natively supports two thumbs when passed an array value

