

# Integrated Wordmark: [S-logo]centBox

## What Changes

### Modified file: `src/components/Header.tsx` (lines 93-113)

Replace the current separate logo icon + text layout with a single unified wordmark block.

**Remove:**
- The standalone `motion.div` containing the separate logo `<img>` (lines 94-104)
- The separate text `<div>` with "ScentBox" and "Hungary" (lines 105-112)
- The `gap-2 md:gap-3` on the outer `<Link>` (no longer needed since logo merges into text)

**Replace with:**
A single `motion.div` (keeping hover/tap animations) containing a stacked `flex-col` layout:

**Top line -- the wordmark:**
```
<span className="flex items-baseline">
  <img
    src="/lovable-uploads/cffba5ca-0963-46f8-895d-57cc9d9a8eed.png"
    alt="S"
    className="h-[1.15em] w-auto object-contain inline-block -mr-[0.05em] drop-shadow-lg"
  />
  <span className="font-semibold tracking-tight text-foreground font-display">
    centBox
  </span>
</span>
```

Key details:
- `items-baseline` aligns the logo bottom with the text baseline
- Logo height set to `1.15em` so it scales relative to the text's cap-height (slightly taller than lowercase to match capital "S" height)
- Negative right margin `-mr-[0.05em]` pulls "centBox" tight against the logo for a seamless wordmark feel
- No background, circle, or container around the logo icon

**Bottom line -- "Hungary":**
```
<span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-primary/70 text-center">
  Hungary
</span>
```
Centered under the full wordmark. Same styling as current.

**Overall scale increase (~10-15%):**
- Outer text size bumped from `text-lg md:text-xl` to `text-xl md:text-2xl` on the wordmark container
- This makes the entire wordmark (logo-S + centBox + Hungary) proportionally larger

**Hover glow:**
- The `group-hover` glow effect moves to a pseudo-element inside the `motion.div`, positioned behind the logo-S portion only (using `absolute` positioning on the img wrapper)

**Full replacement structure:**
```tsx
<Link to="/" className="group">
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="flex flex-col items-start leading-none"
  >
    <span className="flex items-baseline text-xl md:text-2xl">
      <span className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
          src="/lovable-uploads/cffba5ca-0963-46f8-895d-57cc9d9a8eed.png"
          alt="S"
          className="h-[1.15em] w-auto object-contain relative z-10 drop-shadow-lg -mr-[0.05em]"
        />
      </span>
      <span className="font-semibold tracking-tight text-foreground font-display">
        centBox
      </span>
    </span>
    <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-primary/70">
      Hungary
    </span>
  </motion.div>
</Link>
```

**Mobile:** The `em`-based logo sizing ensures proportional scaling. At `text-xl` on mobile the logo-S and text stay cohesive and legible.

**No other files are modified.** The `logoIcon` import can be removed since we use the `/lovable-uploads/` path directly (matching current code).

