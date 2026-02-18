import { ShieldCheck, Tag, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    icon: ShieldCheck,
    title: "100% Eredeti",
    description: "Minősített magyarországi hivatalos forgalmazótól származó, bontatlan parfümök.",
  },
  {
    icon: Tag,
    title: "Legjobb Árak",
    description: "20-40%-kal kedvezőbb árak, mert nem dolgozunk feleslegesen magas árrésekkel.",
  },
  {
    icon: Heart,
    title: "Vásárló az Első",
    description: "Kiváló ügyfélszolgálat, megbízható és gyors szállítás minden rendelésnél.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const BrandIntroSection = () => {
  return (
    <section className="noise-texture relative py-12 md:py-16 overflow-hidden">
      <div className="container px-6 md:px-8 relative z-10">
        {/* Text block */}
        <motion.div
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="badge-gold mb-5">Miért Minket?</span>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4 leading-tight">
            Prémium Parfümök,{" "}
            <span className="text-gradient-gold italic">Tisztességes Áron</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
            Célunk, hogy a legjobb designer illatokat a valódi értékükön kínáljuk — 100% eredeti termékekkel, kiváló kiszolgálással és olyan árakkal, amelyeket mindenki megengedhet magának.
          </p>
        </motion.div>

        {/* 3 highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-10">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="card-luxury flex flex-col items-center text-center p-6 md:p-7"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base md:text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Button variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary/10">
            <Link to="/rolunk">
              Ismerd Meg a Történetünket
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
