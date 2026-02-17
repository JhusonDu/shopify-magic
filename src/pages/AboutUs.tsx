import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Pipette, Truck, ThumbsUp } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Eredetiség",
    description: "Minden parfümünk 100% eredeti, hivatalos forgalmazóktól származik. Garantáljuk a minőséget.",
  },
  {
    icon: Pipette,
    title: "Precíz Dekantálás",
    description: "Professzionális eszközökkel, steril környezetben végezzük a dekantálást a tökéletes minőségért.",
  },
  {
    icon: Truck,
    title: "Gyors Szállítás",
    description: "GLS futárszolgálattal 1-3 munkanapon belül kézbesítjük rendelésedet, biztonságosan csomagolva.",
  },
  {
    icon: ThumbsUp,
    title: "Elégedettségi Garancia",
    description: "14 napos visszaküldési lehetőség, ha nem vagy elégedett. Nálunk a vásárlód az első.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="badge-gold inline-block mb-6"
          >
            Rólunk
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground leading-tight"
          >
            A Történetünk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed"
          >
            A ScentBox Hungary-t azért hoztuk létre, hogy a világ legjobb illatait
            mindenki számára elérhetővé tegyük — anélkül, hogy teljes árat kellene
            fizetni egy üvegért.
          </motion.p>
        </div>
      </section>

      {/* Kik Vagyunk */}
      <section className="py-16 bg-card">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display text-foreground mb-6">Kik Vagyunk?</h2>
          <p className="text-muted-foreground leading-relaxed text-base">
            Egy fiatal, illatrajongó csapat Budapestről. Célunk, hogy prémium designer
            parfümöket kínáljunk mini kiszerelésben, professzionálisan dekantálva. Hisszünk
            abban, hogy a luxus illatok mindenkinek járnak — és hogy az első benyomáshoz
            nem kell egy teljes üveget megvenni.
          </p>
        </div>
      </section>

      {/* Miért ScentBox? */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-display text-foreground text-center mb-12">
            Miért ScentBox?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="card-luxury p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container text-center">
          <h2 className="text-2xl font-display text-foreground mb-4">
            Fedezd fel a kínálatunkat
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Böngéssz prémium parfümjeink között és találd meg a tökéletes illatod.
          </p>
          <Button asChild size="lg" className="rounded-full px-10">
            <Link to="/termekek">Termékek Megtekintése</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
