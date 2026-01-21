import { Button } from "@/components/ui/button";
import { ShieldCheck, Award, Lock, ChevronDown, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-vault.jpg";
import { motion } from "framer-motion";

export const Hero = () => {
  const trustItems = [
    { 
      icon: ShieldCheck, 
      title: "Eredetiség Garantálva", 
      desc: "100% eredeti parfümök közvetlenül." 
    },
    { 
      icon: Award, 
      title: "Szakértői Válogatás", 
      desc: "Világszínvonalú szakértők által." 
    },
    { 
      icon: Lock, 
      title: "Biztonságos Fizetés", 
      desc: "Iparági szintű titkosítás." 
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxus parfüm kollekció" 
          className="w-full h-full object-cover object-center opacity-50"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>
      
      {/* Central glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[100px] z-0" />
      
      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="container">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto pt-32 pb-16">
            {/* Badge */}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs tracking-[0.3em] text-primary font-medium uppercase mb-6"
            >
              Exkluzív Kurátori Válogatás
            </motion.span>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display italic leading-[1.1] mb-6"
            >
              <span className="text-foreground">Az Illat Művészete.</span>
              <br />
              <span className="text-primary">Neked Válogatva.</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-foreground/70 mb-10 leading-relaxed max-w-xl font-body"
            >
              Fedezd fel egyedi illatodat exkluzív prémium parfüm kollekciónkból. 
              100% eredeti, luxus élmény — egyenesen a küszöbödre.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide px-8 h-12 text-sm rounded-full transition-all duration-300 hover:scale-105 group"
                onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Felfedezés
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 font-semibold tracking-wide px-8 h-12 text-sm rounded-full transition-all duration-300"
                onClick={() => document.getElementById('bundle-builder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Kollekciók Böngészése
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Trust Strip - Bottom cards */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative z-10 pb-8"
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {trustItems.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card/60 backdrop-blur-md border border-border/30 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="text-xs text-foreground/60 leading-relaxed">{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-float z-10"
      >
        <ChevronDown className="w-5 h-5 text-foreground/40" />
      </motion.div>
    </section>
  );
};
