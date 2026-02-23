import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { motion } from "framer-motion";
import { Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqSections = [
  {
    title: "Hogyan Rendeljek?",
    content: `1. Böngéssz a termékeink között és válaszd ki a kívánt illatot.\n2. Válaszd ki a méretet (5ml, 10ml vagy egyedi doboz).\n3. Add hozzá a kosaradhoz és lépj tovább a fizetéshez.\n4. Add meg a szállítási adataidat és válaszd ki a fizetési módot.\n5. A megrendelés után e-mailben küldünk visszaigazolást és nyomkövetési számot.`,
  },
  {
    title: "Szállítás",
    content: `GLS futárszolgálattal szállítunk egész Magyarország területén.\n\n• Szállítási idő: 1-3 munkanap\n• Szállítási költség: 1 490 Ft (10 000 Ft feletti rendelés esetén ingyenes)\n• Minden csomag biztonsági csomagolásban, buborékfóliával védve érkezik.\n• A feladás után e-mailben küldünk nyomkövetési linket.`,
  },
  {
    title: "Fizetési Módok",
    content: `Az alábbi fizetési módokat fogadjuk el:\n\n• Bankkártyás fizetés (Visa, Mastercard)\n• Banki átutalás\n• Utánvét (+ 500 Ft kezelési költség)\n\nMinden tranzakció biztonságos, titkosított kapcsolaton keresztül történik.`,
  },
  {
    title: "Visszaküldés",
    content: `14 napos elállási joggal rendelkezel a csomag átvételétől számítva.\n\n• A terméknek bontatlannak és sértetlennek kell lennie.\n• A visszaküldés költségét a vásárló viseli.\n• A visszaküldés jóváhagyása után 5 munkanapon belül visszautaljuk a vételárat.\n• Reklamáció esetén írj nekünk: info@scentbox.hu`,
  },
  {
    title: "Kapcsolat",
    content: `Kérdésed van? Írj nekünk bátran!\n\n📧 E-mail: info@scentbox.hu\n⏱ Válaszidő: általában 24 órán belül válaszolunk munkanapokon.\n\nKövetess minket az Instagramon a legfrissebb hírekért és akciókért!`,
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

      {/* FAQ */}
      <section className="pb-20">
        <div className="container max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqSections.map((faq, i) => (
              <motion.div
                key={faq.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border border-border rounded-lg px-5 bg-card"
                >
                  <AccordionTrigger className="text-foreground font-display text-base hover:no-underline hover:text-primary transition-colors">
                    {faq.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {faq.content}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
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
