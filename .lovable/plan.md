

# Logo + Brand Name Redesign -- Stacked Layout

## What Changes

### Modified file: `src/components/Header.tsx` (lines 93-110)

**Logo image -- slightly larger:**
- Current: `h-10 w-10 md:h-11 md:w-11`
- New: `h-11 w-11 md:h-12 md:w-12` (bump up one step)

**Brand text -- stacked "ScentBox" over "Hungary":**

Replace the single `<span>` with a stacked flex-column layout:

```
<div className="flex flex-col leading-none">
  <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground font-display">
    ScentBox
  </span>
  <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-primary/70">
    Hungary
  </span>
</div>
```

- "ScentBox" keeps the exact same `text-lg md:text-xl` size as the current text
- "Hungary" sits below in a smaller, gold-tinted, wide-tracked uppercase style -- elegant subtitle treatment
- Always visible on both mobile and desktop (currently "Hungary" is hidden on mobile)
- `leading-none` on the container keeps the two lines tight together

**Layout alignment:**
- The outer `<Link>` keeps `flex items-center gap-2 md:gap-3` so the logo and stacked text sit side-by-side, vertically centered
- No other header elements change

## Result

- Logo icon slightly larger for better visual weight
- "ScentBox" on top line, same font size as before
- "Hungary" on second line, smaller uppercase with gold accent color and wide letter-spacing
- Clean, professional look on both mobile and desktop
- No structural changes to nav, cart, or other header elements

