import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background with warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-spice-100 via-background to-spice-50" />
      
      {/* Decorative elements - Savor-style organic shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-terracotta/10 blur-3xl animate-fade-in" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-gold/10 blur-3xl animate-fade-in" style={{ animationDelay: "0.2s" }} />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-herb/10 blur-3xl animate-fade-in" style={{ animationDelay: "0.4s" }} />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Fresh flavors, crafted with care
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
            Taste the
            <span className="block text-accent mt-2">Difference</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
            Discover artisan products crafted with passion. Every ingredient tells a story of quality, sustainability, and unforgettable flavor.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 h-14 text-base rounded-full shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 h-14 text-base rounded-full border-2 hover:bg-secondary"
            >
              Explore Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};
