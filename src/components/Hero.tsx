import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Truck, RefreshCcw, ChevronDown, Sparkles, Gift } from "lucide-react";
import heroImage from "@/assets/hero-vault.jpg";

export const Hero = () => {
  const trustItems = [
    { icon: ShieldCheck, text: "100% Eredeti" },
    { icon: Lock, text: "Biztonságos Fizetés" },
    { icon: Truck, text: "Gyors Szállítás" },
    { icon: RefreshCcw, text: "Pénzvisszafizetési Garancia" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80 z-[1]" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-gold-pulse gold-glow z-0" />
      
      {/* Hero Image - Full background on right */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-[1]" />
        <img 
          src={heroImage} 
          alt="Luxus parfüm kollekció" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-2xl py-32">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 badge-gold mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Prémium Designer Parfümök
          </div>
          
          {/* Headline */}
          <h1 
            className="text-hero font-display font-bold leading-[1.1] mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Fedezd Fel a{" "}
            <span className="text-gradient-gold">Luxus Illatát.</span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            100% eredeti designer parfümök, prémium dekantálással. 
            Próbáld ki a világ legjobb illatait — anélkül, hogy egész üveget vennél.
          </p>
          
          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent font-semibold tracking-cta px-8 h-14 text-base rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 group"
              onClick={() => document.getElementById('bundle-builder')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Gift className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Állítsd Össze a Dobozkád
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary font-semibold tracking-cta px-8 h-14 text-base rounded-xl transition-all duration-300 backdrop-blur-sm"
              onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Felfedezés Indítása
            </Button>
          </div>
          
          {/* Trust Strip */}
          <div 
            className="flex flex-wrap gap-x-6 gap-y-3 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {trustItems.map((item) => (
              <div 
                key={item.text} 
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground/60 tracking-widest uppercase">Görgess</span>
          <ChevronDown className="w-5 h-5 text-primary/60" />
        </div>
      </div>
    </section>
  );
};
