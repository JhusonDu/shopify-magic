import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { motion } from "framer-motion";
import { Mail, Clock, ShoppingBag, Truck, CreditCard, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LucideIcon } from "lucide-react";

interface FaqCategory {
  category: string;
  icon: LucideIcon;
  questions: { question: string; answer: string }[];
}

const faqSections: FaqCategory[] = [
  {
    category: "Hogyan Rendeljek?",
    icon: ShoppingBag,
    questions: [
      {
        question: "Hogyan válasszam ki a megfelelő parfümöt?",
        answer:
          "Böngészd a kínálatunkat kategóriák (férfi, női, uniszex) vagy márkák szerint. Minden termékoldalon részletes illatleírást találsz az illatcsalád, a fő jegyek és a karakterisztika megjelölésével. Ha bizonytalan vagy, próbáld ki az 5ml-es dekant méretet – így kedvező áron tesztelheted az illatot, mielőtt nagyobb kiszerelést vásárolnál.",
      },
      {
        question: "Mi a dekant és hogyan működik?",
        answer:
          "A dekant az eredeti parfümből kis üvegbe (általában 5ml vagy 10ml) átöntött illat. Az átöntés steril környezetben, profi eszközökkel történik, így a parfüm minősége és összetétele változatlan marad. A dekant üvegek kompakt, zsebbarát méretűek, tökéletesek utazáshoz vagy egy új illat kipróbálásához.",
      },
      {
        question: "Milyen méretekben kaphatók a termékek?",
        answer:
          "Termékeink 5ml és 10ml dekant méretben kaphatók. Az 5ml-es kiszerelés kb. 50-70 fújásra elegendő (1-2 hét napi használat mellett), míg a 10ml-es kb. 100-140 fújásra (3-4 hét). Egyedi doboz (bundle) összeállítása esetén több illatot is választhatsz egyszerre.",
      },
      {
        question: "Hogyan tudom leadni a rendelésemet?",
        answer:
          "1. Válaszd ki a kívánt terméke(ke)t és add hozzá a kosaradhoz.\n2. Kattints a kosár ikonra és ellenőrizd a tételeket.\n3. Lépj tovább a fizetéshez, add meg a szállítási adataidat.\n4. Válaszd ki a fizetési módot és véglegesítsd a rendelést.\n5. E-mailben visszaigazolást és nyomkövetési számot küldünk.",
      },
      {
        question: "Módosíthatom vagy törölhetem a rendelésemet leadás után?",
        answer:
          "Igen, a rendelés leadása után legfeljebb 2 órán belül módosíthatod vagy törölheted azt, amennyiben a csomag még nem került feladásra. Írj nekünk az info@scentbox.hu címre a rendelési számoddal, és igyekszünk minél hamarabb intézni a kérésedet.",
      },
    ],
  },
  {
    category: "Szállítás",
    icon: Truck,
    questions: [
      {
        question: "Mennyi a szállítási idő Magyarországon belül?",
        answer:
          "A szállítási idő általában 1-3 munkanap a feladástól számítva. A rendelések feldolgozása 1 munkanapon belül megtörténik, így a legtöbb csomag 2-4 munkanapon belül megérkezik.",
      },
      {
        question: "Milyen szállítási módokat kínálnak?",
        answer:
          "Jelenleg GLS futárszolgálattal szállítunk egész Magyarország területén. A GLS megbízható, gyors kézbesítést biztosít, és minden csomag nyomon követhető.",
      },
      {
        question: "Mennyi a szállítási költség?",
        answer:
          "A szállítási költség 1 490 Ft. 10 000 Ft feletti rendelés esetén a szállítás teljesen ingyenes! Utánvétes fizetés esetén +500 Ft kezelési költséggel kell számolnod.",
      },
      {
        question: "Külföldre is szállítanak?",
        answer:
          "Jelenleg kizárólag Magyarországon belül szállítunk. Külföldi szállítási lehetőségek bevezetését tervezzük a jövőben – kövess minket az Instagramon, hogy elsőként értesülj a hírekről!",
      },
      {
        question: "Hogyan követhetem nyomon a csomagomat?",
        answer:
          "A csomag feladása után e-mailben küldünk egy GLS nyomkövetési linket, amellyel valós időben követheted a csomagod útját. Ha nem kaptad meg az e-mailt, ellenőrizd a spam mappádat, vagy írj nekünk az info@scentbox.hu címre.",
      },
      {
        question: "Mi történik, ha nem vagyok otthon a kézbesítéskor?",
        answer:
          "A GLS futár egy alkalommal megpróbálja kézbesíteni a csomagot. Ha nem vagy otthon, értesítést hagy, és a csomagot a legközelebbi GLS csomagponton veheted át, vagy egyeztethetsz újabb kézbesítési időpontot a GLS ügyfélszolgálatán keresztül.",
      },
    ],
  },
  {
    category: "Fizetési Módok",
    icon: CreditCard,
    questions: [
      {
        question: "Milyen fizetési módokat fogadnak el?",
        answer:
          "Az alábbi fizetési módokat fogadjuk el:\n• Bankkártyás fizetés (Visa, Mastercard)\n• Banki átutalás\n• Utánvét (+500 Ft kezelési költség)",
      },
      {
        question: "Biztonságos a bankkártyás fizetés?",
        answer:
          "Igen, teljes mértékben. A fizetés titkosított SSL kapcsolaton keresztül történik, és a kártyaadataidat mi semmilyen formában nem tároljuk. A tranzakciókat megbízható, PCI DSS szabványnak megfelelő fizetési szolgáltató kezeli.",
      },
      {
        question: "Fizetés utánvéttel lehetséges?",
        answer:
          "Igen, utánvétes fizetésnél a csomag átvételekor fizetsz a futárnak készpénzzel vagy kártyával. Ehhez +500 Ft kezelési költség kapcsolódik.",
      },
      {
        question: "Kaphatok számlát a vásárlásomról?",
        answer:
          "Igen, minden vásárlásról automatikusan elektronikus számlát állítunk ki, amelyet e-mailben küldünk el a megrendeléskor megadott címre. Ha céges számlára van szükséged, a megrendelés megjegyzés rovatában add meg a cégedatok.",
      },
      {
        question: "Elfogadnak kuponkódokat vagy kedvezményeket?",
        answer:
          "Igen! Időszakos akcióink és kuponkódjaink segítségével kedvezményesen vásárolhatsz. A kuponkódot a kosár oldalon tudod megadni a fizetés előtt. Kövess minket az Instagramon és iratkozz fel a hírlevélre, hogy ne maradj le egyetlen ajánlatról sem!",
      },
    ],
  },
  {
    category: "Visszaküldés & Garancia",
    icon: RotateCcw,
    questions: [
      {
        question: "Milyen a visszaküldési szabályzatuk?",
        answer:
          "A csomag átvételétől számított 14 napon belül elállási joggal rendelkezel. A terméknek bontatlannak és sértetlennek kell lennie. A visszaküldés költségét a vásárló viseli. A visszaküldés jóváhagyása után 5 munkanapon belül visszautaljuk a vételárat.",
      },
      {
        question: "Visszaküldhetem a terméket, ha nem tetszik az illat?",
        answer:
          "A dekant termékek jellegéből adódóan a bontott terméket nem áll módunkban visszavenni, hiszen higiéniai okokból újraértékesítésre nem alkalmas. Ezért javasoljuk az 5ml-es próbaméretet, hogy minimális kockázattal próbálhasd ki az illatot.",
      },
      {
        question: "Mi történik, ha sérült terméket kapok?",
        answer:
          "Ha sérült terméket kaptál, kérjük, készíts fényképeket a sérülésről (csomag + termék), és küld el nekünk az info@scentbox.hu címre 48 órán belül. Díjmentesen pótoljuk a sérült terméket, vagy visszautaljuk az árát – a te döntésed!",
      },
      {
        question: "Hogyan garantálják a termékek eredetiségét?",
        answer:
          "Kizárólag hivatalos parfüm disztribútoroktól és megbízható nagykereskedőktől szerezzük be az eredeti, teljes méretű parfümöket, amelyekből a dekantokat készítjük. Minden tétel ellenőrzött és igazolható eredetiségű.",
      },
      {
        question: "Van garancia a termékekre?",
        answer:
          "Igen, garantáljuk, hogy minden termékünk eredeti és a leírt minőségben érkezik meg hozzád. Ha bármilyen minőségi problémát tapasztalsz, vedd fel velünk a kapcsolatot, és megoldjuk a helyzetet.",
      },
      {
        question: "Hogyan ellenőrizhetem az eredetiséget?",
        answer:
          "Minden dekant üvegen feltüntetjük az eredeti parfüm nevét és márkáját. Kérésre az eredeti üveg batch-kódját is megosztjuk, amellyel független oldalakon (pl. checkfresh.com) ellenőrizheted az eredetiséget és a gyártási dátumot.",
      },
    ],
  },
  {
    category: "Kapcsolat & Ügyfélszolgálat",
    icon: Headphones,
    questions: [
      {
        question: "Hogyan tudok kapcsolatba lépni az ügyfélszolgálattal?",
        answer:
          "Írj nekünk e-mailben az info@scentbox.hu címre, vagy használd az oldalon található Kapcsolatfelvétel gombot. Instagram DM-ben is szívesen válaszolunk!",
      },
      {
        question: "Milyen a válaszidő?",
        answer:
          "Munkanapokon általában 24 órán belül válaszolunk az e-mailekre. Hétvégén és ünnepnapokon a válaszidő hosszabb lehet, de igyekszünk minél hamarabb reagálni.",
      },
      {
        question: "Van élő chat támogatás?",
        answer:
          "Jelenleg nincs élő chat funkciónk, de az e-mailes és Instagram DM-es ügyfélszolgálatunk gyorsan és hatékonyan kezeli a megkereséseket. Az élő chat bevezetését tervezzük a közeljövőben.",
      },
      {
        question: "Vannak üzleteik, ahol személyesen vásárolhatok?",
        answer:
          "Jelenleg kizárólag online értékesítünk a scentbox.hu webshopunkon keresztül. Fizikai üzlet nyitását fontolgatjuk a jövőben – kövess minket, hogy elsőként értesülj!",
      },
      {
        question: "Feliratkozhatok hírlevélre exkluzív ajánlatokért?",
        answer:
          "Igen! Az oldal alján található hírlevél szekcióban megadhatod az e-mail címedet, és elsőként értesülhetsz az új illatokról, akciókról és exkluzív kedvezményekről. A feliratkozás bármikor lemondható.",
      },
    ],
  },
];

const Support = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="badge-gold inline-block mb-6"
          >
            Támogatás
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-foreground"
          >
            Segítség
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground text-lg"
          >
            Válaszokat találsz a leggyakoribb kérdésekre, vagy lépj kapcsolatba velünk.
          </motion.p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-20">
        <div className="container max-w-2xl mx-auto space-y-10">
          {faqSections.map((section, sIdx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + sIdx * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl text-foreground">{section.category}</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {section.questions.map((q, qIdx) => (
                    <AccordionItem
                      key={qIdx}
                      value={`s${sIdx}-q${qIdx}`}
                      className="border border-border rounded-lg px-5 bg-card"
                    >
                      <AccordionTrigger className="text-foreground font-display text-sm hover:no-underline hover:text-primary transition-colors">
                        {q.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                        {q.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Card */}
      <section className="pb-20">
        <div className="container max-w-2xl mx-auto">
          <div className="card-luxury p-8 text-center">
            <h3 className="font-display text-xl text-foreground mb-4">Nem találtad a választ?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Írj nekünk és 24 órán belül válaszolunk.
            </p>
            <Button
              onClick={() => setContactOpen(true)}
              className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-accent"
            >
              Kapcsolatfelvétel
            </Button>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@scentbox.hu</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Válaszidő: ~24 óra</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Support;
