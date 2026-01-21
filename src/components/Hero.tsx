import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Truck, RefreshCcw, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-vault.jpg";
import { motion } from "framer-motion";

export const Hero = () => {
  const trustItems = [
    { icon: ShieldCheck, text: "100% Eredeti" },
    { icon: Lock, text: "Biztonságos Fizetés" },
    { icon: Truck, text: "Gyors Szállítás" },
    { icon: RefreshCcw, text: "Pénzvisszafizetési Garancia" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxus parfüm kollekció" 
          className="w-full h-full object-cover object-center opacity-40"
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>
      
      {/* Central glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-gold-pulse z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/30 blur-[80px] z-0" />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-20">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 badge-gold mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Exkluzív Kurátori Válogatás
          </motion.div>
          
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-hero font-display font-bold leading-[1.1] mb-6"
          >
            <span className="text-foreground">Az Illat Művészete.</span>
            <br />
            <span className="text-gradient-gold">Neked Válogatva.</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl"
          >
            Fedezd fel prémium parfüm kollekciónkat. 
            100% eredeti illatok, szakértők által válogatva, a küszöbödre szállítva.
          </motion.p>
          
          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent font-semibold tracking-cta px-10 h-14 text-base rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 group"
              onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Kollekció Felfedezése
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 font-semibold tracking-cta px-10 h-14 text-base rounded-full transition-all duration-300 backdrop-blur-sm"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Hogyan Működik
            </Button>
          </motion.div>
          
          {/* Trust Strip - Card style like reference */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl"
          >
            {trustItems.map((item, index) => (
              <motion.div 
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 md:p-5 rounded-2xl bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/30 hover:bg-card/70 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs md:text-sm text-foreground/80 font-medium text-center leading-tight">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground/60 tracking-widest uppercase">Görgess</span>
          <ChevronDown className="w-5 h-5 text-primary/60" />
        </div>
      </motion.div>
    </section>
  );
};
