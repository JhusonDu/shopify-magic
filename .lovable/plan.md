

# Professzionális Mobil Navigációs Menü

## Mi Változik

Egy teljesen új, luxus megjelenésű mobil navigációs menü jön létre, amely jobbról csúszik be, fehér háttérrel, arany akcentusokkal, bővíthető almenükkel, elérhetőségi információkkal és promóciós bannerrel.

A jelenlegi Header komponensben a Menu (hamburger) ikon mobilon ezt az új menüt fogja megnyitni a meglévő ToolboxPanel helyett.

## Fő Elemek

1. **Hamburger ikon animáció**: Mobilon a Menu ikon X-re változik nyitott állapotban
2. **Jobbról becsúszó panel**: 85vw széles (max 400px), fehér háttér, sötét backdrop
3. **Fejléc**: Logo + "Böngészd az Illatokat" arany CTA gomb + bezáró X
4. **4 menüpont**: Termékek (bővíthető almenüvel), Rólunk, Kapcsolat, Segítség -- arany chevron, hover/tap effektekkel
5. **Elérhetőségek**: Telefon + email ikonos linkek
6. **Promóciós banner**: Sötét luxus háttér, arany szegélyű CTA gomb

## Technikai Részletek

### Új fájl:
- **`src/components/MobileNav.tsx`** -- A teljes mobil navigációs menü komponens
  - `framer-motion` `AnimatePresence` + `motion.div` a panel csúsztatásához és backdrop fade-hez
  - Bővíthető "Termékek" almenü (Férfi, Női, Unisex, Kedvenceink) saját állapottal
  - Body scroll lock nyitott állapotban (`overflow: hidden`)
  - Escape billentyű és backdrop kattintás bezárja
  - Swipe-right gesztus bezáráshoz (touch event kezelés)
  - Staggered fade-in animáció a menüpontokra
  - Elérhetőségek: `tel:` és `mailto:` linkek arany ikonokkal
  - Promóciós banner sötét gradienssel és outlined arany CTA gombbal
  - ARIA attribútumok: `role="dialog"`, `aria-modal="true"`, `aria-label`

### Módosított fájl:
- **`src/components/Header.tsx`**
  - Új `isMobileMenuOpen` állapot
  - Mobilon a Menu gomb az új `MobileNav`-ot nyitja meg a `ToolboxPanel` helyett
  - A Menu ikon animáltan X-re vált nyitott állapotban
  - A `MobileNav` komponens importálása és renderelése
  - A meglévő ToolboxPanel csak desktopon marad elérhető

### Stílus megközelítés:
- Inline Tailwind osztályok + néhány egyedi szín fehér háttérhez (a globális téma sötét, ezért a fehér panel explicit `bg-white text-gray-900` stílusokat kap)
- Reszponzív méretezés: 90vw kis telefonokon, 85vw alapértelmezetten, max 400px

