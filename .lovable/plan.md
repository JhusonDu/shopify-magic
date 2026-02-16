

# Hero Szekció Ujratervezes -- Reszletes Terv

## Jelenlegi Problemak
- A hatterkep alig latszik (tulzottan sotet overlay)
- A CTA gombok a hajtás alatt vannak, nem lathatoak azonnal
- Nincs parallax effekt, scroll indikator vagy fade-out
- A layout statikus, nem reagal gorgetesre
- Mobilon a szovegmeretek tul nagyok

---

## Uj Hero Design -- Felepites

### Retegek (alulrol felfelé)

```text
+-----------------------------------------------+
|  1. Hatterkep (parallax 0.5x sebesseggel)     |
|     - object-position: center 30%              |
|     - Sotetebb gradient overlay (nem flat)      |
+-----------------------------------------------+
|  2. Opcionallis arany glow effekt (kozepre)    |
|     - Finom radial gradient                    |
+-----------------------------------------------+
|  3. Fo tartalom (kozepre igazitva)             |
|     - Badge: arany pont + "THE OBSIDIAN..."    |
|     - Cim: "THE ART OF" + "Authenticity"       |
|     - Alcim: 1-2 sor leiras                    |
|     - 2 CTA gomb egymas mellett                |
|     - Bizalmi jelzesek sor (opcio)             |
+-----------------------------------------------+
|  4. Scroll indikator (alul kozepen)            |
|     - Animalt lefele nyil / eger ikon          |
|     - Pulzalo arany animacio                   |
+-----------------------------------------------+
```

### Desktop Layout (1920x1080)
- Teljes kepernyo (100vh)
- Tartalom vertikalisan kozepre
- Max szelesseg: 800px
- Cim: 7-8rem meret
- Gombok egymas mellett (flex-row)
- Scroll indikator az also 60px-ben

### Tablet Layout (768-1024px)
- Teljes kepernyo (100vh)
- Cim: 5-6rem
- Alcim: max-w-lg
- Gombok egymas mellett

### Mobil Layout (< 768px)
- Min magassag: 100svh (safe viewport height)
- Cim: 3rem / 3.5rem
- Alcim: text-sm, max-w-xs
- Gombok egymas alatt (flex-col), teljes szelesseg
- Scroll indikator kisebb

---

## Technikai Megvalositás

### 1. Parallax Hatter (useScroll + useTransform)
- Framer Motion `useScroll()` es `useTransform()` hasznalata
- A hatterkep 0.5x sebesseggel mozog gorgeteskor
- `translateY` transzformacio a scroll pozicio alapjan
- GPU-gyorsitott (will-change: transform)

### 2. Tartalom Fade-Out Gorgeteskor
- A teljes tartalom (cim, alcim, gombok) opacity-je csokken
- 0% scroll = opacity 1.0
- 50% scroll = opacity 0.2
- Szinten `useTransform` a smooth atmenetre

### 3. Gradient Overlay (nem flat szin)
- Jelenlegi: `bg-black/60` (flat)
- Uj: Tobbretegu gradient
  - Alulrol: erős fekete gradient (szoveg olvashatosag)
  - Kozepen: enyhe sotetites
  - Felulrol: enyhe sotetites (header olvashatosag)
- Kod: `bg-gradient-to-t from-black/80 via-black/40 to-black/60`

### 4. Arany Glow Effekt
- Finom radial gradient a tartalom mogott
- Szin: `hsl(43 65% 52% / 0.08)`
- Lelegzo animacio (opacity 0.05-0.12 kozott, 6s ciklus)

### 5. Scroll Indikator
- Lucide `ChevronDown` vagy `Mouse` ikon
- Arany szin, pulzalo animacio (translateY bounce)
- Kattintasra smooth scroll a kovetkezo szekciohoz
- Eltűnik gorgeteskor (opacity fade)

### 6. Staggered Entrance Animaciok
- Badge: 0.2s delay
- Cim 1. sor: 0.4s delay
- Cim 2. sor: 0.6s delay
- Alcim: 0.8s delay
- Gombok: 1.0s delay
- Scroll indikator: 1.4s delay

---

## Modositando Fajlok

| Fajl | Valtozas |
|------|----------|
| `src/components/Hero.tsx` | Teljes ujrairás: parallax, fade-out, scroll indikator, gradient overlay, responsive meretek |

Egyetlen fajl modosul, a Hero.tsx komponens teljes ujraepitese az osszes fenti fejlesztessel.

---

## Responsiv Meretezés Osszefoglalo

| Elem | Mobil (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
|------|----------------|---------------------|---------------------|
| Cim 1. sor | text-3xl | text-5xl | text-7xl |
| Cim 2. sor | text-4xl | text-6xl | text-8xl |
| Alcim | text-sm, max-w-xs | text-base, max-w-md | text-base, max-w-md |
| Gombok | flex-col, w-full | flex-row | flex-row |
| Badge | text-[10px] | text-xs | text-xs |
| Scroll ikon | 20px | 24px | 28px |
| Container padding | px-6 | px-8 | default |

