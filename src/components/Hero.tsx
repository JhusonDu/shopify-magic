import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-vault.jpg";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxus parfüm kollekció" 
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] z-0" />
      
      {/* Content */}
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Badge */}
          <motion.span 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs tracking-[0.25em] text-primary/90 font-medium uppercase mb-8"
          >
            Exkluzív Válogatás
          </motion.span>
          
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display italic leading-[1.1] mb-8"
          >
            <span className="text-foreground">Az Illat Művészete.</span>
            <br />
            <span className="text-primary">Neked Válogatva.</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-foreground/60 mb-12 leading-relaxed max-w-lg"
          >
            Prémium parfümök exkluzív kollekciója. 100% eredeti, luxus élmény.
          </motion.p>
          
          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide px-8 h-12 text-sm rounded-full transition-all duration-200 group"
              onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Felfedezés
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-foreground/20 text-foreground hover:bg-foreground/5 font-medium tracking-wide px-8 h-12 text-sm rounded-full transition-all duration-200"
              onClick={() => document.getElementById('bundle-builder')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Kollekciók
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-5 h-5 text-foreground/30 animate-bounce" />
      </motion.div>
    </section>
  );
};
