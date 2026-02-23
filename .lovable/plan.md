

# Refined ScentBox Wordmark -- Tight, Professional Lockup

## Problem
The current header brand reads as a tiny flame icon floating next to "centBox" with "HUNGARY" drifting below. It looks like separate elements, not a unified luxury brand wordmark.

## What Changes

### Modified file: `src/components/Header.tsx` (lines 93-116)

Replace the current brand lockup structure entirely with a horizontal icon + text-stack layout:

### New structure

```tsx
<Link to="/" className="group">
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="flex items-center gap-[6px]"
  >
    <img
      src="/lovable-uploads/cffba5ca-0963-46f8-895d-57cc9d9a8eed.png"
      alt="S"
      className="h-8 w-8 md:h-9 md:w-9 object-contain drop-shadow-lg"
    />
    <div className="flex flex-col leading-none">
      <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground font-display whitespace-nowrap">
        centBox
      </span>
      <span className="text-[9px] md:text-[10px] font-medium tracking-[0.25em] uppercase text-primary/70 mt-[1px]">
        Hungary
      </span>
    </div>
  </motion.div>
</Link>
```

### Specific changes and rationale

1. **Outer container**: Changed from `flex flex-col items-start` to `flex items-center gap-[6px]`
   - This places the flame icon and the text stack side-by-side in a single row
   - `items-center` vertically centers the icon against the combined text block (both lines)
   - `gap-[6px]` provides a tight, intentional gap between icon and text (not too close to overlap, not too far to look disconnected)

2. **Removed nested span wrappers**: The `<span className="flex items-baseline gap-0 text-xl md:text-2xl">` wrapper and the `<span className="relative top-[2px]">` around the icon are both removed -- they added complexity and misalignment

3. **Icon sizing stays at h-8/w-8 (md:h-9/w-9)**: This size matches well with the text -- no change needed here

4. **Text stack**: A simple `div` with `flex flex-col leading-none` holds "centBox" on top and "Hungary" below
   - `leading-none` eliminates extra line-height between the two lines
   - "centBox" keeps `text-lg md:text-xl font-semibold tracking-tight font-display` -- same as current
   - `whitespace-nowrap` prevents any wrapping on narrow screens

5. **"Hungary" subtitle**: 
   - Reduced from `text-[10px]` to `text-[9px]` (md stays at `text-[10px]`) for tighter proportions
   - Changed from `mt-[-2px]` to `mt-[1px]` -- just enough breathing room without a floating gap
   - Left-aligned under "centBox" naturally (both in same flex-col)
   - Keeps `tracking-[0.25em] uppercase text-primary/70 font-medium`

6. **Removed background/blur glow div**: No `bg-primary/20 rounded-full blur-xl` element exists anymore (was already removed in prior iteration, confirmed clean)

7. **Removed `ml-[-4px]`** on "centBox" text -- no longer needed since icon and text are in separate flex children with a controlled gap

### Visual result
- Flame icon sits to the left, vertically centered against both "centBox" and "Hungary"
- "centBox" and "Hungary" are stacked tightly with minimal vertical spacing
- The whole lockup reads as one unified brand mark
- Clean on both mobile (h-14 header) and desktop (h-20 header)
- No floating elements, no misalignment, no odd gaps

### No other files modified
