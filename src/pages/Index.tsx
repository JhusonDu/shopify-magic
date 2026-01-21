import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Products Section */}
      <main className="container py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="animate-fade-in">
            <span className="text-sm font-medium text-accent uppercase tracking-wider mb-3 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Products
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Handpicked ingredients, artisan recipes, and flavors that transport you. 
            Every product tells a story.
          </p>
        </div>
        
        <ProductGrid />
      </main>
      
      {/* Feature Section - Savor-style storytelling */}
      <section className="bg-gradient-to-br from-spice-100 via-background to-spice-50 py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-herb/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainably Sourced</h3>
              <p className="text-muted-foreground leading-relaxed">
                We work directly with farmers and producers who share our commitment to quality and the environment.
              </p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Artisan Crafted</h3>
              <p className="text-muted-foreground leading-relaxed">
                Small-batch production ensures every product meets our exacting standards for taste and quality.
              </p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🍯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pure Ingredients</h3>
              <p className="text-muted-foreground leading-relaxed">
                No artificial additives. Just real ingredients that you can taste in every bite.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <span className="text-lg font-bold text-accent-foreground">S</span>
                </div>
                <span className="text-xl font-semibold">Savor</span>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Bringing you the finest artisan products, crafted with care and delivered to your door.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="/" className="hover:text-foreground transition-colors">All Products</a></li>
                <li><a href="/" className="hover:text-foreground transition-colors">New Arrivals</a></li>
                <li><a href="/" className="hover:text-foreground transition-colors">Best Sellers</a></li>
                <li><a href="/" className="hover:text-foreground transition-colors">Gift Sets</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="/" className="hover:text-foreground transition-colors">Our Story</a></li>
                <li><a href="/" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="/" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="/" className="hover:text-foreground transition-colors">Shipping</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Savor. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
