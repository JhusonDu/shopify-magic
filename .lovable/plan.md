
# Rólunk Oldal Hero Szekció Kompaktálása

## Mi Változik

Kizárólag a Rólunk oldal hero szekciója lesz kisebb és tömörebb, hogy az oldal betöltésekor a következő szekció teteje is látható legyen görgetés nélkül.

## Változások Részletesen

### Fájl: `src/pages/AboutUs.tsx` (75-107. sorok)

**1. Szekció magasság csökkentése**
- `min-h-[50vh] md:min-h-[60vh]` --> `min-h-[35vh] md:min-h-[40vh]`

**2. Belső padding csökkentése**
- `py-20` --> `py-[30px] md:py-10`

**3. Badge margin**
- `mb-6` --> `mb-4`

**4. Cím font-size**
- `text-5xl md:text-6xl` --> `text-[32px] md:text-[44px]`

**5. Alcím**
- `mt-6 text-lg md:text-xl ... max-w-[700px]` --> `mt-4 text-base md:text-lg ... max-w-[600px] leading-relaxed`

### Ami NEM változik:
- Animációk, arany glow, gradient, badge stílus, szövegek tartalma
- Az oldal többi szekciója érintetlen marad
