

# Rólunk Oldal -- Teljes Professzionális Újratervezés

## Áttekintés

A jelenlegi Rólunk oldal egyszerű és minimális -- mindössze egy hero, egy rövid szöveges blokk, 4 érték-kártya és egy CTA. Az új verzió egy teljes értékű, 7 szekciós, történetmesélő luxus oldal lesz, amely bizalmat épít és a márka prémium pozícióját erősíti.

## Szekciók

### 1. Hero Szekció
- **60vh** magasság asztalon, **50vh** mobilon
- Arany radiális háttérfény (ugyanaz a minta, mint a Termékek oldalon)
- "RÓLUNK" badge-gold jelvény felül
- Cím: "A ScentBox Hungary Története" -- Playfair Display, `text-5xl md:text-6xl`
- Alcím: "Prémium parfümök, autentikus élmények -- 100% eredetiség garantálva."
- Staggered framer-motion animációk (badge, cím, alcím sorban)

### 2. Történet Szekció ("Hogyan Kezdődött Minden")
- Kétoszlopos elrendezés: **60/40** arány (`md:grid-cols-5`, 3+2)
- Bal oldal: Cím + hosszabb történetmesélő szöveg a márka eredetéről (2020-as indulás, dekantálás koncepciója)
- Jobb oldal: `hero-vault.jpg` kép arany kerettel (`border border-primary/20`), `rounded-lg`
- Mobilon egymás alá kerül (kép felül, szöveg alul)
- Scroll-triggered fade-in animáció

### 3. Küldetés és Értékek (3 Kártya)
- Három oszlopos rács (`md:grid-cols-3`)
- Kártyák:
  1. **Eredetiség Mindenekelőtt** -- `ShieldCheck` ikon
  2. **Szenvedély az Illatokért** -- `Heart` ikon
  3. **Kiváló Minőség** -- `Star` ikon
- Kártya design: `bg-white/[0.03]` háttér, `border border-primary/15`, hover-on `border-primary`, `translateY(-8px)` emelkedés
- Framer-motion `whileInView` animáció kártyánként eltolva

### 4. Utazásunk -- Idővonal
- Függőleges arany vonal középen (asztalon), bal oldalon (mobilon)
- 5 mérföldkő: 2020, 2021, 2022, 2023, 2024
- Minden mérföldkő: arany kör az idővonalon, évszám, cím, rövid leírás
- Asztali: váltakozó bal-jobb elrendezés
- Mobil: mind bal oldalra igazítva
- Minden elem scroll-triggered animációval jelenik meg

### 5. Minőségi Elkötelezettség
- Kétoszlopos elrendezés (fordított: bal oldal kép, jobb oldal szöveg)
- Cím: "100% Eredeti Garantált"
- 4 ellenőrzőpont `Check` ikonnal, arany színben:
  - Kizárólag hivatalos forgalmazóktól
  - Minden termék eredetiség-ellenőrzött
  - Precíz dekantálás steril környezetben
  - Luxus üvegek és címkézés
- Kép: `hero-vault.jpg` újrahasználva (vagy az egyik termékfotó)

### 6. Számok Szekcio (Bonus -- a specifikációban nem volt, de illeszkedik)
- Kihagyva, a specifikáció nem kérte

### 7. CTA Szekció
- Háttér: `bg-gradient-to-br from-secondary to-background`
- Cím: "Fedezd Fel Kínálatunkat"
- Leírás: "Több mint 500 prémium parfüm várja felfedezésedet."
- Két gomb egymás mellett:
  1. **"Böngészd a Kollekciót"** -- elsődleges arany gomb (`/termekek`)
  2. **"Lépj Velünk Kapcsolatba"** -- outline gomb (`/tamogatas`)

## Technikai Részletek

### Módosított fájl:
- **`src/pages/AboutUs.tsx`** -- Teljes újraírás a 7 szekciós struktúrával

### Felhasznált technológiák:
- `framer-motion` -- `whileInView` scroll animációk, staggered entrances
- `lucide-react` -- `ShieldCheck`, `Heart`, `Star`, `Check`, `ChevronRight` ikonok
- Meglévő Tailwind utilities: `badge-gold`, `card-luxury`, `noise-texture`, `text-gradient-gold`
- Meglévő assets: `hero-vault.jpg`

### Reszponzivitás:
- Minden szekció mobilra optimalizálva (`grid-cols-1` mobilon, `md:grid-cols-X` asztalon)
- Idővonal mobilon balra igazított egyoszlopos verzió
- Hero magasság csökken mobilon
- Szöveges méretek responsívan skálázódnak

### Animációk:
- Hero: `initial/animate` azonnali belépés (badge -> cím -> alcím sorrendben)
- Minden más szekció: `whileInView` + `viewport={{ once: true }}` scroll-triggered
- Kártyák: staggered delay (`i * 0.1s`)
- Idővonal elemek: fade-up + bal/jobb slide-in asztali nézetben

