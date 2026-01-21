import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Truck, RefreshCcw, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-vault.jpg";

export const Hero = () => {
  const trustItems = [
    { icon: ShieldCheck, text: "100% Eredeti" },
    { icon: Lock, text: "Biztonságos Fizetés" },
    { icon: Truck, text: "Gyors Szállítás" },
    { icon: RefreshCcw, text: "Garancia" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-transparent z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-gold-pulse gold-glow z-0" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-24">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-block badge-gold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Prémium Parfüm Dekantálás
            </div>
            
            <h1 className="text-hero font-display font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Luxus,{" "}<span className="text-gradient-gold">Cseppről Cseppre.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
              100% Eredeti Designer Parfümök — precízen dekantálva, ellenőrizve és prémium gondossággal szállítva.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent font-semibold tracking-cta px-8 h-14 text-base rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105" onClick={() => document.getElementById('bundle-builder')?.scrollIntoView({ behavior: 'smooth' })}>
                Doboz Összeállítása
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-foreground hover:bg-primary/10 hover:border-accent font-semibold tracking-cta px-8 h-14 text-base rounded-xl transition-all duration-300" onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}>
                Kedvenceink
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-3xl gold-glow-subtle animate-gold-pulse" />
              <img src={heroImage} alt="Luxus parfüm üveg fekete bársonyon" className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl" />
              <div className="absolute inset-0 rounded-3xl border border-primary/20 z-20" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="w-6 h-6 text-primary/60" />
      </div>
    </section>
  );
};
