import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-vault.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves at 0.5x speed
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Content fades out as user scrolls
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  // Scroll indicator fades out quickly
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const handleScrollDown = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  const stagger = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <img
          src={heroImage}
          alt="Luxus parfüm kollekció"
          className="w-full h-[120%] object-cover"
          style={{ objectPosition: "center 30%" }}
        />
      </motion.div>

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

      {/* Gold glow effect */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full animate-gold-pulse"
          style={{
            background: "radial-gradient(circle, hsl(43 65% 52% / 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 container px-6 md:px-8"
        style={{ opacity: contentOpacity }}
      >
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          {/* Badge */}
          <motion.div {...stagger(0.2)} className="flex items-center gap-2 mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10px] md:text-xs tracking-[0.25em] text-primary font-medium uppercase font-body">
              Prémium Parfüm Kollekció
            </span>
          </motion.div>

          {/* Headline line 1 */}
          <motion.span
            {...stagger(0.4)}
            className="block text-3xl md:text-5xl lg:text-7xl font-body font-bold uppercase tracking-wide text-foreground leading-tight"
          >
            Az Illat
          </motion.span>

          {/* Headline line 2 */}
          <motion.span
            {...stagger(0.6)}
            className="block text-4xl md:text-6xl lg:text-8xl font-display italic text-primary leading-tight mb-4 md:mb-6"
          >
            Művészete
          </motion.span>

          {/* Subheadline */}
          <motion.p
            {...stagger(0.8)}
            className="text-sm md:text-base text-foreground/70 mb-8 md:mb-10 leading-relaxed max-w-xs md:max-w-md font-body"
          >
            Válogatott luxusillatok a világ legjobb parfümházaiból — szakértők által hitelesítve, prémium csomagolásban, házhoz szállítva.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...stagger(1.0)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wider uppercase px-6 h-11 text-xs rounded-md transition-all duration-300 group"
              asChild
            >
              <Link to="/termekek">
                Vásárlás
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 font-semibold tracking-wider uppercase px-6 h-11 text-xs rounded-md transition-all duration-300"
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Tudj Meg Többet
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-primary cursor-pointer bg-transparent border-none"
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Görgess lejjebb"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </motion.div>
      </motion.button>
    </section>
  );
};
