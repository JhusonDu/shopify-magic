

# Uj 2026-os Merfoldk hozzaadasa az Idovonalhoz

## Mi Valtozik

A `src/pages/AboutUs.tsx` fajlban a `milestones` tombhoz egy uj elem kerul a "2025" es a "Hamarosan" kozé.

## Technikai Reszletek

### Modositott fajl: `src/pages/AboutUs.tsx`

A `milestones` tomb jelenlegi 3 eleme kozé (2025 utan, Hamarosan elé) beszurasra kerul:

```
{
  year: "2026",
  title: "Elso Ertekesitesek",
  description:
    "Elinditottuk az ertekesitest — online es szemelyes csatornakon egyarant. A ScentBox Hungary hivatalosan is elkezdte a mukodesét, es megérkeztek az elso valos vasarlasok.",
}
```

Mas fajl nem modosul. Az idovonal komponens automatikusan kezeli az uj elemet (map + alternalo elrendezes).

