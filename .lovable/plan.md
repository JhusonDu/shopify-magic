
# Koncentracio Tabos Rendszer a QuickBuy Pop-up-ban es Termekkartyakon

## Attekintes

A rendszer kibovitese koncentracio-alapu (EDT / EDP / Parfum / Intense) csoportositassal. A termekek cimet elemezzuk, kivonjuk a koncentracio tipust es az alap parfum nevet, majd a QuickBuy pop-up-ban tabokkal jelennek meg a kapcsolodo termekek. A termekkartyakon pedig kis badge mutatja a koncentracio tipust.

## Hogyan Mukodik

**Cim feldolgozas pelda:**
- "Dior Sauvage EDP - Dekant" -> alap nev: "Dior Sauvage", koncentracio: "EDP", tipus: "Dekant"
- "Chanel Bleu de Chanel Parfum - Dekant" -> alap nev: "Chanel Bleu de Chanel", koncentracio: "Parfum", tipus: "Dekant"
- "Dior Homme Intense - Dekant" -> alap nev: "Dior Homme", koncentracio: "Intense", tipus: "Dekant"
- "YSL Libre Intense - Dekant" -> alap nev: "YSL Libre", koncentracio: "Intense", tipus: "Dekant"

**QuickBuy pop-up viselkedese:**
1. Megnyitaskor megkeresi az osszes terméket, amelynek ugyanaz az alap neve (pl. ha lenne "Dior Sauvage EDT" es "Dior Sauvage EDP", mindketto megjelenne tabkent)
2. Ha tobb koncentracio letezik: tabok jelennek meg (pl. EDT | EDP | Parfum), es a kivalasztott tab alatt latszodnak az adott koncentracio ml variantjai
3. Ha csak egy koncentracio van: a koncentracio badge-kent jelenik meg tab helyett, es a meretvalaszto marad a jelenlegi modon
4. A pop-up cime az alap nev (pl. "Dior Sauvage"), nem a teljes cim

**Termekkartyakon:**
- Kis badge a kepen (felso jobb sarok): "EDP", "EDT", "Parfum", "Intense"
- Arany szin, atlatszosag, premium megjelenes

## Technikai Reszletek

### Uj fajl: `src/lib/perfumeUtils.ts`

Utility fuggvenyek a cim feldolgozashoz:

```text
extractConcentration(title: string) -> { baseName: string, concentration: string | null, isDecant: boolean }
```

- Regex-szel keresi az EDP, EDT, Parfum, Extrait, Intense kulcsszavakat a cimben
- Eltavolitja a "- Dekant" toldalekot
- Visszaadja a tiszta alap nevet es a koncentracio tipust

```text
groupProductsByBaseName(products: ShopifyProduct[]) -> Map<string, ShopifyProduct[]>
```

- Csoportositja a termekeket alap nev szerint
- Ha tobb termek osztozik egy alap neven (kulonbozo koncentracio), azok egy csoportba kerulnek

### Modositott fajl: `src/components/ProductCard.tsx`

- Import `extractConcentration` a perfumeUtils-bol
- Koncentracio badge hozzaadasa a kep jobb felso sarkaba
- A badge stilus: `bg-background/80 backdrop-blur-sm text-[10px] font-semibold text-primary border border-primary/20 px-2 py-0.5 rounded-full`
- Csak akkor jelenik meg, ha van kinyerheto koncentracio

### Modositott fajl: `src/components/ProductQuickBuy.tsx`

- Uj prop: `allProducts: ShopifyProduct[]` -- az osszes termek listaja a csoportositas erdekeben
- `useMemo`-ban csoportositas: megkeresi az osszes terméket, amelynek azonos az alap neve mint a kivalasztott termeknek
- Ha tobb koncentracio van:
  - Radix Tabs komponens jelenik meg a meret valaszto felett
  - Minden tab egy koncentracio (pl. "EDP", "Parfum")
  - Tab valtas betolti az adott termek variantjait
  - Animalt tab valtas (framer-motion)
- Ha egy koncentracio van:
  - A koncentracio kis badge-kent jelenik meg a termek neve mellett
  - Nincs tab, meretvalaszto marad a jelenlegi modon
- A pop-up fejleceben az alap nev jelenik meg (nem a teljes Shopify cim)
- A vendor kiemelten marad

### Modositott fajl: `src/components/ProductGrid.tsx`

- Az `allProducts` lista atadasra kerul a `ProductQuickBuy`-nak, hogy az csoportositani tudjon

### Vizualis reszletek

- Tab stilus: pill-shaped, arany aktiv hatter, atlatszodo inaktiv, sima atmenetek
- Tab valtas animacio: tartalom enyhe slide + fade (framer-motion)
- A koncentracio badge a kartyakon: enyhe arany glow, premium erzes
- A pop-up cim az alap nev, a koncentracio a tabokban vagy badge-ben jelenik meg

### Osszefoglalo tabla

| Fajl | Valtozas |
|------|----------|
| `src/lib/perfumeUtils.ts` (uj) | Cim parser: alap nev + koncentracio kinyerese, termekek csoportositasa |
| `src/components/ProductCard.tsx` | Koncentracio badge a kep jobb felso sarkaban |
| `src/components/ProductQuickBuy.tsx` | Koncentracio tabok (ha tobb van), alap nev fejlec, allProducts prop |
| `src/components/ProductGrid.tsx` | allProducts prop atadasa a QuickBuy-nak |
