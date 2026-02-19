

# Böngészési Élmény Teljes Újratervezése -- Luxus & Professzionális UI

## Probléma

A jelenlegi oldalon a sötét szekciók túl hasonlóak egymáshoz (background: #0a0a0a, card: #141414, secondary: #1a1a1a -- mindegyik szinte fekete), emiatt a szöveg nehezen olvasható, a szekciók összemosódnak, és az összhatás lapos, nem prémium érzetű.

## Mi Változik

Összesen **8 fájl** módosítása egy koherens, professzionális luxus megjelenés érdekében.

---

### 1. Szín- és Kontrasztjavítás (`src/index.css`)

- **Muted foreground** fényerő emelése 65%-ról 75%-ra -- a szürke szöveg sokkal olvashatóbb lesz
- **Card háttér** enyhe emelése 8%-ról 10%-ra, jobban elkülönül a háttértől
- **Border** szín fényerő emelése 14%-ról 18%-ra, finomabb de láthatóbb vonalak
- Új CSS utility osztályok:
  - `.section-dark` -- sötétebb szekció háttér enyhe felső/alsó belső árnyékkal
  - `.section-elevated` -- kártya-szintű háttér finomabb textúrával
  - `.text-luxury` -- enyhe text-shadow a fehér szövegeknek a jobb olvashatóságért

### 2. Hero Szekció Finomhangolás (`src/components/Hero.tsx`)

- Szöveg text-shadow erősítése a jobb olvashatóságért a háttérképen
- "A Te Illatod" arany felirat nagyobb kontrasztú árnyékkal
- Keresősáv: erősebb border (primary/40-ről primary/50-re), sötétebb háttér a szöveg kiemelésére
- Trust signals szöveg fényesebbé tétele (primary/80-ról primary-ra)

### 3. Legnépszerűbb Termékek Szekció (`src/components/FeaturedProducts.tsx`)

- Szekció háttér: finomabb gradient (from-background via-card/50 to-background) -- vizuálisan elkülönül
- Szekció cím: nagyobb, Playfair Display serif font, alatta arany divider vonal
- Termékkártya info rész: vendor szöveg fényesebbé (text-primary/80), cím nagyobb sortáv
- "Összes Megtekintése" gomb: arany outlined pill-stílusú gomb, nem csak szimpla link

### 4. Márka Bemutató Szekció (`src/components/BrandIntroSection.tsx`)

- Háttér: enyhe arany radiális gradient hozzáadása a mélység érdekében
- Highlight kártyák: finomabb border (border-primary/15), hover-re arany glow shadow
- Ikonok: nagyobb méret (w-6 h-6), konténer arany gradient háttérrel
- Szöveg: leírás szöveg fényesebbé (muted-foreground/90 hatás)

### 5. Bundle Builder Szekció (`src/components/BundleBuilder.tsx`)

- Badge szöveg javítás: emoji eltávolítása, elegánsabb badge stílus
- Szekció háttér: finomabb elkülönítés a többi szekciótól (enyhe gradient overlay)
- CTA gombok: erősebb vizuális kiemelés, hover glow effekt

### 6. Eredetiség Szekció (`src/components/AuthenticitySection.tsx`)

- Háttér: enyhe radiális arany glow a központban
- Kártyák: nagyobb padding, erősebb hover effekt arany glow-val
- Ikon konténerek: gradient border hozzáadása a prémium érzet érdekében

### 7. Hogyan Működik Szekció (`src/components/HowItWorksSection.tsx`)

- Lépés számok: arany gradient háttérben, nem sima szövegként
- Összekötő vonalak: arany gradient animált vonal asztali nézetben
- Ikon konténerek: finomabb gold glow és hover animáció

### 8. Hírlevél Szekció (`src/components/NewsletterSection.tsx`)

- Háttér: erősebb arany tint (primary/8 helyett primary/12)
- Input mező: nagyobb, arany fókusz-ring, sötétebb háttér
- Szöveg kontrasztja: fehéresebb foreground

---

## Technikai Összefoglaló

| Fájl | Változás típusa |
|------|----------------|
| `src/index.css` | CSS változók finomhangolása + új utility osztályok |
| `src/components/Hero.tsx` | Text shadow, keresősáv kontraszt, trust signals fényerő |
| `src/components/FeaturedProducts.tsx` | Szekció gradient, cím stílus, kártya info kontraszt |
| `src/components/BrandIntroSection.tsx` | Háttér gradient, kártya hover glow, ikon stílus |
| `src/components/BundleBuilder.tsx` | Badge javítás, háttér elkülönítés |
| `src/components/AuthenticitySection.tsx` | Háttér glow, kártya stílus javítás |
| `src/components/HowItWorksSection.tsx` | Lépés számok design, összekötő vonalak |
| `src/components/NewsletterSection.tsx` | Háttér, input, szöveg kontraszt |

A változtatások fő célja: **minden szöveg legyen jól olvasható**, a **szekciók vizuálisan elkülönüljenek** egymástól, és az **arany akcentusok koherens luxus érzetet** adjanak az egész oldalon.

