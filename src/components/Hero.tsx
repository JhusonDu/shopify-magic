import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Search, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-vault.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

interface HeroProps {
  onSearchOpen?: () => void;
  onFinderOpen?: () => void;
}

export const Hero = ({ onSearchOpen, onFinderOpen }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const handleScrollDown = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  const stagger = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/30 to-black/50" />

      {/* Text backdrop glow */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(0 0% 0% / 0.55) 0%, transparent 70%)",
        }}
      />

      {/* Gold glow */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none">
        <div
          className="w-[700px] h-[700px] rounded-full animate-gold-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(43 65% 52% / 0.12) 0%, hsl(43 65% 52% / 0.04) 40%, transparent 70%)",
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
          <motion.div
            {...stagger(0.2)}
            className="badge-gold flex items-center gap-2 mb-6 md:mb-8"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase font-body">
              100% Eredeti · Prémium Illatok
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...stagger(0.4)} className="mb-2 md:mb-3">
            <span
              className="block text-3xl md:text-5xl lg:text-7xl font-body font-bold uppercase tracking-wide text-foreground leading-tight"
              style={{ textShadow: "0 2px 20px hsl(0 0% 0% / 0.7), 0 0 40px hsl(0 0% 0% / 0.4)" }}
            >
              Találd Meg
            </span>
          </motion.h1>

          <motion.span
            {...stagger(0.6)}
            className="block text-4xl md:text-6xl lg:text-8xl font-display italic text-primary leading-tight mb-3 md:mb-5"
            style={{ textShadow: "0 2px 30px hsl(43 65% 52% / 0.3), 0 0 60px hsl(43 65% 52% / 0.15)" }}
          >
            A Te Illatod
          </motion.span>

          {/* Divider accent */}
          <motion.div
            {...stagger(0.7)}
            className="w-12 h-[2px] bg-primary/40 mb-5 md:mb-6"
          />

          {/* Subheadline */}
          <motion.p
            {...stagger(0.8)}
            className="text-sm md:text-base text-foreground/90 mb-8 md:mb-10 leading-relaxed max-w-xs md:max-w-lg font-body"
            style={{ textShadow: "0 1px 12px hsl(0 0% 0% / 0.6)" }}
          >
            Fedezd fel a legkeresettebb designer illatokat — eredeti, bontatlan parfümök közvetlenül a magyarországi hivatalos forgalmazóktól.
          </motion.p>

          {/* Search Bar */}
          <motion.div {...stagger(0.9)} className="w-full max-w-xs sm:max-w-md md:max-w-lg mb-3">
            <button
              onClick={onSearchOpen}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-md border border-primary/30 bg-background/20 backdrop-blur-md text-foreground/60 hover:border-primary/60 hover:bg-background/30 transition-all duration-300 cursor-pointer group"
              style={{
                boxShadow: "0 0 30px hsl(43 65% 52% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
              }}
            >
              <Search className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors shrink-0" />
              <span className="text-sm font-body tracking-wide text-left">
                Milyen illatot keresel?
              </span>
              <kbd className="hidden md:inline-flex ml-auto text-[10px] tracking-wider text-foreground/30 border border-foreground/10 rounded px-1.5 py-0.5 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Finder link */}
            <motion.button
              onClick={onFinderOpen}
              className="mt-2.5 flex items-center justify-center gap-1.5 mx-auto text-xs text-primary/70 hover:text-primary transition-colors cursor-pointer group"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-3 h-3" />
              <span className="font-body underline underline-offset-2 decoration-primary/30 group-hover:decoration-primary/60 transition-colors">
                Nem tudod, mit keresel? Segítünk megtalálni!
              </span>
            </motion.button>
          </motion.div>

          {/* CTA Button — single centered */}
          <motion.div
            {...stagger(1.0)}
            className="w-full max-w-xs sm:max-w-sm"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-bold tracking-wider uppercase px-7 h-12 text-xs rounded-md transition-all duration-300 group shadow-lg shadow-primary/20 hover:shadow-primary/30"
                asChild
              >
                <Link to="/termekek">
                  Böngészd az Illatokat
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust signals */}
          <motion.span
            {...stagger(1.1)}
            className="block mt-4 text-primary/80 text-xs md:text-sm font-medium font-body"
            style={{ textShadow: "0 1px 12px hsl(0 0% 0% / 0.6)" }}
          >
            100% Eredeti · Expressz Szállítás · Pénzvisszafizetési Garancia
          </motion.span>
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
        <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/40 font-body mb-1">
          Görgess
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};
