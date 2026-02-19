

# Mobil Navigáció -- Sötét Luxus Háttér

## Mi Változik

A jelenlegi fehér háttérű mobil menü átalakítása a weboldal fő témájához illő sötét fekete-arany megjelenésre.

## Változások a `src/components/MobileNav.tsx` fájlban

### Panel háttér
- `bg-white` cseréje sötét háttérre: `#0a0a0a` (a weboldal fő háttérszíne)
- Box shadow megtartása a mélység érdekében

### Fejléc (Header)
- "ScentBox Hungary" szöveg: fehérre (`text-white`)
- X bezáró gomb: fehérre
- Border szín: `border-white/10` (halvány fehér vonal)

### CTA gomb
- Marad az arany gradient -- ez már jól illeszkedik

### Menüpontok
- Szöveg szín: `text-white/90` (halvány fehér) a korábbi `#2c2c2c` helyett
- Hover/aktív szín: marad `#d4af37` (arany)
- Border separator: `border-white/10` a korábbi `border-black/5` helyett
- Almenü szöveg: `text-white/60` a korábbi `#666` helyett
- Aktív háttér: `rgba(212,175,55,0.12)` (arany tint sötét felületen)

### Elérhetőségek szekció
- Szöveg: `text-white/60` a korábbi `#666` helyett
- Border: `border-white/10`
- Ikonok: maradnak arany

### Promóciós banner
- Ez már sötét -- csak finomhangolás, hogy simán illeszkedjen a panel háttérhez
- Felső border: halvány arany vonal (`border-t border-[#d4af37]/20`)

