import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Sikeresen feliratkoztál!", {
        description: "Hamarosan értesítünk az újdonságokról."
      });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-primary/5 border-y border-primary/10">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="animate-fade-in">
            <span className="badge-gold mb-4 inline-block">VIP Tagság</span>
            <h2 className="text-h2 font-display font-bold text-foreground mb-4">
              Legyél Te is VIP Tag
            </h2>
            <p className="text-muted-foreground mb-8">
              Iratkozz fel és elsőként értesülj az új illatokról, exkluzív ajánlatokról 
              és limitált kiadású szettekről.
            </p>
          </div>

          {/* Form */}
          {!isSubscribed ? (
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-4 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Input
                type="email"
                placeholder="Email címed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-14 bg-card border-border focus:border-primary rounded-xl text-foreground placeholder:text-muted-foreground"
              />
              <Button 
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-accent h-14 px-8 rounded-xl font-semibold tracking-cta"
              >
                Feliratkozás
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 text-primary animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium">Köszönjük a feliratkozást!</span>
            </div>
          )}

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A feliratkozással elfogadod az adatvédelmi irányelveinket. 
            Bármikor leiratkozhatsz.
          </p>
        </div>
      </div>
    </section>
  );
};
