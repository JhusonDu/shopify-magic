
# Mobil Navigáció -- Pop-up Átalakulás

## Mi Változik

A jobbról becsúszó panel teljes cseréje egy középre pozicionált, elegáns pop-up modalra, amely professzionálisabb, luxusabb megjelenést ad mobil nézetben.

## Vizuális Koncepció

- **Központi pop-up**: A képernyő közepén jelenik meg (nem oldalról csúszik be)
- **Megjelenés animáció**: Scale-up + fade-in (0.85-ről 1-re skálázódik, mint egy prémium app modal)
- **Backdrop**: Erős blur + sötét overlay arany finom fénnyel
- **Panel**: Lekerekített sarkok (rounded-2xl), sötét háttér arany szegéllyel, belső glow effekt
- **Bezárás**: Elegáns X gomb arany hover-rel a jobb felső sarokban

## Struktúra

1. **Fejléc**: Logo + "ScentBox Hungary" + bezáró gomb -- arany alsó szegéllyel
2. **Navigációs linkek**: Középre igazítva, nagyobb betűméret, arany hover animáció, staggered fade-in
3. **Bővíthető Termékek almenü**: Animált kinyitás arany akcentusokkal
4. **Elválasztó vonal**: Arany gradient vonal
5. **Elérhetőségek**: Telefon + email ikonos linkek, arany ikonok
6. **CTA gomb**: Arany gradient gomb az alján, "Böngészd az Illatokat"

## Technikai Részletek

### Módosított fájl: `src/components/MobileNav.tsx`

Teljes újraírás:

- **Layout**: `fixed inset-0` konténer, flexbox center-rel a pop-up pozicionálásához
- **Panel méret**: `w-[90vw] max-w-[380px]`, `max-h-[85vh]` -- nem teljes képernyős, hanem lebegő kártya
- **Animációk**:
  - Backdrop: `opacity: 0 -> 1`, `backdrop-blur-md`
  - Panel: `scale: 0.85, opacity: 0 -> scale: 1, opacity: 1` (spring animáció)
  - Menüpontok: staggered `y: 15, opacity: 0 -> y: 0, opacity: 1`
  - Bezárásnál: `scale: 0.9, opacity: 0` (gyors exit)
- **Panel stílus**:
  - `bg-[#0c0c0c]` háttér
  - `border border-primary/20` arany szegély
  - `rounded-2xl` lekerekítés
  - `box-shadow: 0 0 60px rgba(212,175,55,0.08)` finom arany glow
- **Menüpontok**:
  - Középre igazítva (`text-center`)
  - `text-xl font-medium tracking-wide`
  - Hover: arany szín + enyhe translateY(-1px) emelkedés
  - Aktív állapot: `scale(0.98)` feedback
  - Arany pont dekoráció hover-re a szöveg alatt
- **Swipe gesztus eltávolítása** (pop-up esetén nem releváns, csak backdrop/X bezárás)
- **Promo banner eltávolítása** -- a pop-up kompaktabb, a CTA gomb elegendő
- Escape billentyű és backdrop kattintás bezárás megtartása
- Body scroll lock megtartása

### Módosított fájl: `src/components/Header.tsx`

- A hamburger ikon X-re váltása megtartása (már implementálva van)
- Egyéb változás nem szükséges, a `MobileNav` props interface nem változik
