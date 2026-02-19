

# Keresés UI Újratervezés -- Szebb, Felhasználóbarátabb Kialakítás

## Jelenlegi Probléma

A keresés a default `CommandDialog`-ot használja, ami egyszerű és nem illeszkedik a ScentBox luxus arculatához. A találatok listája szűk, a képek kicsik, a "Finder" kérdőív pedig átlagosan néz ki.

## Tervezett Változtatások

### 1. Egyedi Dialog a CommandDialog helyett

A `CommandDialog` wrapper helyett saját `Dialog`-ra váltás, amely teljes kontrollt ad a megjelenés felett:
- Nagyobb modal (max-w-2xl), lekerekített sarkok, sötét háttérrel
- Arany akcentusok a ScentBox márkához illően
- Háttér blur effekt a backdrop-on

### 2. Szebb Tab Selector

- Pill-stílusú tab-ok arany aktív háttérrel (a jelenlegi underline helyett)
- Ikonok + szöveg a tabokban, finomabb animáció a váltáskor

### 3. Keresés Tab -- Továbbfejlesztett Találatok

- Nagyobb termékkép (48x48px helyett 56x56px, lekerekített)
- Termék neve + márka + rövid leírás 1 sorban
- Ár jobb oldalon arany színnel, kiemelten
- Hover effekt: enyhe háttérszín-változás arany tintával
- "Nincs találat" állapot illusztráció vagy ikon + szöveg kombinációval
- Keresési mező: nagyobb, arany fókusz-ring, ikon animáció

### 4. Finder Tab -- Vizuálisabb Kérdőív

- Kártyás opció-gombok ikonokkal (pl. nap/hold ikon az évszakokhoz, szív a randihoz stb.)
- Progress bar arany színű kitöltéssel
- Kérdés szám kör-badge-ben (1/3 stílus)
- Animáltabb opció-gombok hover-re (arany border + enyhe glow)
- Eredmények kártya-nézetben (nem listaszerűen): nagyobb kép, név, ár, "Megnézem" gomb

### 5. Általános Fejlesztések

- Bezáró gomb egyértelmű elhelyezéssel (jobb felső sarok, arany hover)
- Kbd shortcut jelző (Ctrl+K) a keresőmezőben
- Betöltési állapot: skeleton loading a találatokhoz
- Üres állapot: illusztrált "Kezdj el gépelni" üzenet parfümös ikonnal

## Technikai Részletek

### Módosított fájl: `src/components/SearchCommand.tsx`

Teljes újraírás a következő struktúrával:

- `Dialog` + `DialogContent` használata `CommandDialog` helyett (a `Command` primitív megtartásával a keresési logikához)
- Pill-stílusú tabváltó a tetején, arany aktív állapottal
- Keresés tab:
  - Egyedi input mező arany fókuszgyűrűvel, Search ikon animációval
  - Találati lista: nagyobb képek, vendor badge, ár kiemelés
  - Skeleton loader betöltés közben (3 placeholder sor)
  - Üres állapot: parfümös ikon + "Kezdj el gépelni" szöveg
- Finder tab:
  - Arany progress bar (`bg-primary` kitöltés)
  - Kérdés kör-badge-ben (1/3)
  - Opció kártyák: `border-primary/30` hover, ikon hozzáadás (emoji/lucide)
  - Eredmények: kártya-grid (2 oszlop), nagyobb kép, "Megnézem" arany gomb

### Finder opció ikonok hozzárendelése:
- "Hétköznapi" -> Sun ikon
- "Esti / Randis" -> Moon ikon  
- "Irodai" -> Briefcase ikon
- "Különleges alkalom" -> Star ikon
- "Fás / Woody" -> TreePine ikon
- "Friss / Citrusos" -> Citrus/Droplets ikon
- "Virágos" -> Flower2 ikon
- "Orientális / Fűszeres" -> Flame ikon
- "Tavasz / Nyár" -> Sun ikon
- "Ősz / Tél" -> Snowflake ikon
- "Egész évben" -> Calendar ikon

### Finder eredmények kártya-nézet:
- 2 oszlopos grid mobilon is
- Kártya: kép (aspect-square), név, vendor, ár, "Megnézem" pill gomb
- Staggered fade-in animáció megtartása

