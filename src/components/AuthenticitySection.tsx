import { ShieldCheck, Eye, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustBlocks = [
  {
    icon: ShieldCheck,
    title: "100% Eredeti — Garantáltan",
    description: "Kizárólag hivatalos forgalmazóktól származó, ellenőrzött eredeti parfümöket értékesítünk. Soha nem áruljuk hamisítványokat."
  },
  {
    icon: Eye,
    title: "Átlátható Beszerzés",
    description: "Minden parfümünk eredete nyomon követhető. Büszkén mutatjuk meg, honnan származnak illataink."
  },
  {
    icon: Award,
    title: "Prémium Kezelés",
    description: "Gondos dekantálás, precíz címkézés és luxus csomagolás — az élmény a kicsomagolásnál kezdődik."
  }
];

export const AuthenticitySection = () => {
  return (
    <section id="authenticity" className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in">
          <span className="badge-gold mb-4 inline-block">Megbízhatóság</span>
          <h2 className="text-h2 font-display font-bold text-foreground mb-4">
            Eredetiség & Bizalom
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A ScentBox Hungary garantálja, hogy minden termékünk 100% eredeti. 
            Nincs utánzat. Nincs hamisítvány. Soha.
          </p>
        </div>

        {/* Trust Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {trustBlocks.map((block, index) => (
            <div 
              key={block.title}
              className="card-luxury p-8 text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <block.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                {block.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {block.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button 
            variant="outline"
            className="border-primary text-foreground hover:bg-primary/10"
          >
            Hogyan Ellenőrizzük az Eredetiséget
          </Button>
        </div>
      </div>
    </section>
  );
};
