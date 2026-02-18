import { motion } from "framer-motion";

export const BrandIntroSection = () => {
  return (
    <section className="noise-texture relative py-6 md:py-10 overflow-hidden">
      <div className="container px-6 md:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="badge-gold mb-4">Miért Minket?</span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            Prémium Parfümök,{" "}
            <span className="text-gradient-gold italic">Tisztességes Áron</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
};
