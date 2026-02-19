import { Droplets, Package, Sparkles, Truck } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    step: "01",
    title: "Illatok Kiválasztása",
    description: "Böngéssz prémium parfümjeink között és válaszd ki kedvenceidet."
  },
  {
    icon: Droplets,
    step: "02",
    title: "Precíz Dekantálás",
    description: "Gondosan, steril környezetben töltjük ki az általad választott méretet."
  },
  {
    icon: Package,
    step: "03",
    title: "Prémium Csomagolás",
    description: "Luxus dobozba csomagoljuk, készen az ajándékozásra vagy élvezésre."
  },
  {
    icon: Truck,
    step: "04",
    title: "Gyors Kiszállítás",
    description: "Biztonságosan és gyorsan kézbesítjük a küszöbödig."
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in">
          <span className="badge-gold mb-4 inline-block">Folyamat</span>
          <h2 className="text-h2 font-display font-bold text-foreground mb-4">
            Hogyan Működik?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Egyszerű, átlátható folyamat — a kiválasztástól a kézbesítésig.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div 
              key={item.step}
              className="relative text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-border">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent w-0 group-hover:w-full transition-all duration-500" />
                </div>
              )}
              
              {/* Icon */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-secondary border-2 border-border flex items-center justify-center mx-auto mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              
              {/* Step Number */}
              <span className="text-xs font-semibold text-primary tracking-badge mb-2 block">
                {item.step}. LÉPÉS
              </span>
              
              {/* Title */}
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
