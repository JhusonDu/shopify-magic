import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Droplets, Sparkles, Wind, Flame, Building, Moon } from "lucide-react";

const steps = [
  { id: 1, title: "Méret Kiválasztása" },
  { id: 2, title: "Hangulat Választása" },
  { id: 3, title: "Illatok Kiválasztása" },
  { id: 4, title: "Áttekintés" },
];

const sizes = [
  { id: "5ml", label: "5ml", description: "Tökéletes kipróbáláshoz", price: "2,990 Ft-tól" },
  { id: "10ml", label: "10ml", description: "Ideális mindennapi használatra", price: "4,990 Ft-tól" },
  { id: "discovery", label: "3×5ml Felfedező", description: "Próbálj ki többet, spórolj", price: "7,490 Ft-tól" },
];

const vibes = [
  { id: "fresh", label: "Friss", icon: Wind },
  { id: "sweet", label: "Édes", icon: Sparkles },
  { id: "woody", label: "Fás", icon: Droplets },
  { id: "spicy", label: "Fűszeres", icon: Flame },
  { id: "office", label: "Irodai", icon: Building },
  { id: "night", label: "Esti", icon: Moon },
];

export const BundleBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibeId) 
        ? prev.filter(v => v !== vibeId)
        : [...prev, vibeId]
    );
  };

  return (
    <section id="bundle-builder" className="py-20 md:py-28 bg-card">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in">
          <span className="badge-gold mb-4 inline-block">Egyedi Összeállítás</span>
          <h2 className="text-h2 font-display font-bold text-foreground mb-4">
            Állítsd Össze a Saját Dobozkádat
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Válassz a kedvenc illatjegyeid alapján, és mi összeállítjuk neked a tökéletes szett. 
            Fedezd fel a világmárkák legjobbjait prémium minőségben.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className={`hidden md:block ml-2 text-sm font-medium transition-colors ${
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-colors ${
                    currentStep > step.id ? "bg-primary" : "bg-secondary"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Size Selection */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-display font-semibold text-center mb-8">
                Válaszd ki a méretet
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-6 rounded-lg text-left transition-all duration-300 ${
                      selectedSize === size.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-secondary border-2 border-transparent hover:border-primary/30"
                    }`}
                  >
                    <div className="text-2xl font-display font-bold text-foreground mb-2">
                      {size.label}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{size.description}</p>
                    <p className="text-primary font-semibold">{size.price}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Vibe Selection */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-display font-semibold text-center mb-8">
                Milyen hangulatot keresel?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vibes.map((vibe) => (
                  <button
                    key={vibe.id}
                    onClick={() => toggleVibe(vibe.id)}
                    className={`flex items-center gap-3 p-4 rounded-md transition-all duration-300 ${
                      selectedVibes.includes(vibe.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <vibe.icon className="w-5 h-5" />
                    <span className="font-medium">{vibe.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-6">
                Több kategóriát is választhatsz
              </p>
            </div>
          )}

          {/* Step 3: Coming Soon */}
          {currentStep === 3 && (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4">
                Illat Választó Hamarosan
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                A prémium parfümkínálatunk összeállítása folyamatban. 
                Addig is böngészd kedvenceinket!
              </p>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4">
                Összefoglaló
              </h3>
              <div className="bg-secondary rounded-lg p-6 max-w-md mx-auto text-left">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                  <span className="text-muted-foreground">Méret:</span>
                  <span className="font-semibold">{selectedSize || "Nincs kiválasztva"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hangulatok:</span>
                  <span className="font-semibold">
                    {selectedVibes.length > 0 
                      ? vibes.filter(v => selectedVibes.includes(v.id)).map(v => v.label).join(", ")
                      : "Nincs kiválasztva"
                    }
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="border-border hover:border-primary"
            >
              Vissza
            </Button>
            <Button
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              disabled={currentStep === 1 && !selectedSize}
              className="bg-primary text-primary-foreground hover:bg-accent"
            >
              {currentStep === 4 ? "Befejezés" : "Tovább"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
