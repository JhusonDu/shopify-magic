import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Star, Check, ChevronRight } from "lucide-react";
import heroVault from "@/assets/hero-vault.jpg";

const values = [
  {
    icon: ShieldCheck,
    title: "Eredetiség Mindenekelőtt",
    description:
      "Kizárólag hivatalos forgalmazóktól származó, ellenőrzött eredeti parfümöket kínálunk. Soha nem árusítunk hamisítványokat.",
  },
  {
    icon: Heart,
    title: "Szenvedély az Illatokért",
    description:
      "Csapatunk minden tagja illatrajongó. A parfümök iránti szenvedélyünk minden döntésünkben tükröződik.",
  },
  {
    icon: Star,
    title: "Kiváló Minőség",
    description:
      "A dekantálástól a csomagolásig minden lépésnél a legmagasabb minőségi sztenderdeket követjük.",
  },
];

const milestones = [
  {
    year: "2020",
    title: "Az Indulás",
    description:
      "Egy budapesti lakásból indultunk el azzal az ötlettel, hogy a luxus parfümöket mindenki számára elérhetővé tegyük dekantálás segítségével.",
  },
  {
    year: "2021",
    title: "Növekedés",
    description:
      "Kínálatunkat 50-ről több mint 200 illatra bővítettük, és kialakítottuk professzionális dekantáló műhelyünket.",
  },
  {
    year: "2022",
    title: "Expanzió",
    description:
      "Elindítottuk webáruházunkat és országos szállítást vezettünk be GLS futárszolgálattal.",
  },
  {
    year: "2023",
    title: "Elismerés",
    description:
      "Több mint 5000 elégedett vásárlóval a hátunk mögött, Magyarország egyik vezető dekant szolgáltatójává váltunk.",
  },
  {
    year: "2024",
    title: "A Jövő",
    description:
      "Folyamatosan bővülő kínálat, exkluzív kollekciók és új szolgáltatások — a legjobb még hátravan.",
  },
];

const qualityPoints = [
  "Kizárólag hivatalos forgalmazóktól",
  "Minden termék eredetiség-ellenőrzött",
  "Precíz dekantálás steril környezetben",
  "Luxus üvegek és címkézés",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 1. Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Gold radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>

        <div className="container relative z-10 text-center max-w-3xl mx-auto py-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge-gold inline-block mb-6"
          >
            RÓLUNK
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-5xl md:text-6xl font-display text-foreground leading-tight"
          >
            A ScentBox Hungary Története
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[700px] mx-auto"
          >
            Prémium parfümök, autentikus élmények — 100% eredetiség garantálva.
          </motion.p>
        </div>
      </section>

      {/* 2. Történet */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center"
          >
            {/* Image first on mobile */}
            <motion.div variants={fadeUp} className="md:col-span-2 order-first md:order-last">
              <div className="rounded-lg overflow-hidden border border-primary/20">
                <img
                  src={heroVault}
                  alt="ScentBox Hungary parfüm kollekció"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-3 space-y-6">
              <span className="badge-gold inline-block">Történetünk</span>
              <h2 className="text-3xl md:text-4xl font-display text-foreground">
                Hogyan Kezdődött Minden
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A ScentBox Hungary 2020-ban indult azzal a céllal, hogy a luxus parfümök
                  világát mindenki számára elérhetővé tegye. Hisszük, hogy egy kiváló illat
                  nem luxus — hanem önkifejezés.
                </p>
                <p>
                  Dekant szolgáltatásunk lehetővé teszi, hogy megismerd a világ legjobb
                  parfümházainak alkotásait anélkül, hogy teljes árat kellene fizetned egy
                  üvegért. Minden dekantálás professzionális eszközökkel, steril környezetben
                  történik.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Küldetés és Értékek */}
      <section className="py-16 md:py-24 noise-texture">
        <div className="container max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="badge-gold inline-block mb-4">Értékeink</span>
            <h2 className="text-3xl md:text-4xl font-display text-foreground">
              Amiben Hiszünk
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white/[0.03] border border-primary/[0.15] rounded-lg p-8 text-center transition-all duration-300 hover:border-primary hover:-translate-y-2"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Idővonal */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="badge-gold inline-block mb-4">Mérföldkövek</span>
            <h2 className="text-3xl md:text-4xl font-display text-foreground">
              Utazásunk
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/30 md:-translate-x-px" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative pl-12 md:pl-0"
                  >
                    {/* Dot */}
                    <div className="absolute left-2.5 md:left-1/2 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background md:-translate-x-1.5" />

                    {/* Content */}
                    <div
                      className={`md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:mr-auto md:text-right md:pr-8" : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <span className="text-primary font-display text-2xl font-bold">
                        {m.year}
                      </span>
                      <h3 className="font-display text-lg text-foreground mt-1 mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Minőségi Elkötelezettség */}
      <section className="py-16 md:py-24 noise-texture">
        <div className="container max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="rounded-lg overflow-hidden border border-primary/20">
              <img
                src={heroVault}
                alt="Prémium parfüm minőség"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <span className="badge-gold inline-block">Garancia</span>
              <h2 className="text-3xl md:text-4xl font-display text-foreground">
                100% Eredeti Garantált
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A ScentBox Hungary garantálja, hogy minden termékünk eredeti. Nincs
                utánzat, nincs hamisítvány — soha.
              </p>
              <ul className="space-y-3">
                {qualityPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary to-background">
        <div className="container text-center max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-display text-foreground mb-4"
            >
              Fedezd Fel Kínálatunkat
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-8">
              Több mint 500 prémium parfüm várja felfedezésedet.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-10">
                <Link to="/termekek">
                  Böngészd a Kollekciót
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 border-primary/30 hover:bg-primary/10">
                <Link to="/tamogatas">Lépj Velünk Kapcsolatba</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
