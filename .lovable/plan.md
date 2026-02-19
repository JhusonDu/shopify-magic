
# Header (Toolbar) Ujratervezes

## Mi valtozik
Kizarolag a `Header.tsx` komponens kerul ujraepitesre. Minden mas (oldalak, szekciok, ToolboxPanel, CartDrawer, LoginDialog, SearchCommand) valtozatlan marad.

## Uj Header Design

### Asztali nezet (md+)
- **Bal oldal**: Logo ikon + "ScentBox Hungary" -- valtozatlan pozicio es stilus
- **Kozep**: Navigacios linkek kozepre igazitva (`flex-1 justify-center`): Termekek, Rolunk, Segitseg -- arany underline hover animacioval es `framer-motion` staggered fade-in-nel
- **Jobb oldal**: Felhasznalo ikon, Kosar ikon, Menu (hamburger) ikon -- mint eddig, de finomabb hover glow effekttel

### Mobil nezet (< md)
- **Bal oldal**: Logo ikon + "ScentBox" (rovid nev, mint eddig)
- **Kozep**: Ures (linkek elrejtve, a Menu panelbol erheto el)
- **Jobb oldal**: Felhasznalo, Kosar, Menu ikonok kompaktan

### Animaciok
- Header beuszas: `motion.header` y:-100 -> 0 (meglevo)
- Nav linkek: staggered `motion.div` fade-in + slide-up kulon-kulon
- Hover: Arany underline animacio (`scaleX(0) -> scaleX(1)`) es finom `text-primary` szin atmenet
- Ikonok: `whileHover={{ scale: 1.1 }}` es `whileTap={{ scale: 0.95 }}` spring animacio
- Scroll allapot: Meglevo backdrop-blur + also arany gradient vonal

### Scroll viselkedes
Valtozatlan: scroll > 20px eseten `bg-background/95 backdrop-blur-xl` hatter, arany also hatarvonal AnimatePresence-szel.

## Technikai Reszletek

### Modositott fajl
- **`src/components/Header.tsx`** -- A navigacios linkek elrendezese: `flex-1 justify-center` a kozepre igazitashoz. Az ikonok `whileHover` / `whileTap` animaciokat kapnak. Staggered link animaciok `motion.div` wrapper-ekkel. Az aktiv link jelzese a `useLocation()` hook-kal tortenik (arany also vonal az aktiv oldalon).

### Nem valtozo fajlok
- `ToolboxPanel.tsx` -- valtozatlan
- `CartDrawer.tsx` -- valtozatlan
- `LoginDialog.tsx` -- valtozatlan
- `SearchCommand.tsx` -- valtozatlan
- Osszes oldal es szekció -- valtozatlan
