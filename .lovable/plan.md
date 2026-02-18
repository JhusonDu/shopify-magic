

# Rólunk Oldal -- Piaci Pozícionálás és Versenyelőny Tartalom Bővítés

## Mi Változik

A design marad, csak a **szöveges tartalom** bővül a versenyelőny-történettel: miért olcsóbbak a termékeitek, hogyan dolgoztok, és mit kap a vásárló.

## Tartalmi Változások

### 1. Történet Szekció -- Kibővített Szöveg (2. szekció)
A jelenlegi két bekezdés helyett három, gazdagabb bekezdés:

- **1. bekezdés** (marad hasonló): 2024-ben indultatok, mert láttátok, hogy a piac túlárazott
- **2. bekezdés** (uj): A piaci megzavarás ("disruption") üzenet -- a nagy szereplők azért kérnek többet, mert megtehetik. Ti ugyanazt a minőséget adjátok, minősített magyar forgalmazótól, 20-30-40%-kal olcsóbban
- **3. bekezdés** (uj): A cél nem csak az ár -- hanem a teljes vásárlói élmény: versenyképes árak + kiváló ügyfélszolgálat + megbízható szállítás + hamarosan saját márkás dekantok

### 2. Értékek Kártyák -- Finomított Leírások (3. szekció)
- **Tisztességes Árak**: Bővül a "20-30-40%-kal olcsóbb" üzenettel és a minősített magyar forgalmazó említésével
- **A Vásárló az Első**: Hangsúlyozza, hogy a legjobb összélményt adjátok, nem csak a legjobb árat

### 3. Minőségi Elkötelezettség -- Frissített Pontok (5. szekció)
A `qualityPoints` lista bővül/módosul:
- "Ugyanaz a minőség, mint a nagy játékosoknál"
- "Minősített magyarországi hivatalos forgalmazótól"
- "20-40%-kal kedvezőbb árak"
- "Kiváló ügyfélszolgálat és szállítás"
- "Hamarosan saját márkás dekantok"

A szekció leíró bekezdése is frissül, hogy tartalmazza a "nem azért olcsóbb, mert rosszabb -- azért olcsóbb, mert nem dolgozunk hatalmas árrésekkel" üzenetet.

### 4. CTA Szekció -- Finomhangolás (7. szekció)
- Leírás: "Ugyanaz a minőség, jobb árak, jobb kiszolgálás."

## Technikai Részletek

### Módosított fájl:
- **`src/pages/AboutUs.tsx`** -- Szöveges konstansok (`values`, `qualityPoints`) és inline szövegek frissítése

### Ami NEM változik:
- Design, animációk, elrendezés, komponens struktúra, importok
- Csak string értékek bővülnek/módosulnak

### Megjegyzés a Landing Page-hez:
A felhasználó említette, hogy ez a versenyelőny-üzenet a főoldalon is meg fog jelenni (hero után). Ez egy külön feladat lesz később -- most csak a Rólunk oldal frissül.

