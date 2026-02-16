import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export const BestsellersSection = () => {
  const { data: products, isLoading, error } = useProducts();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="bestsellers" className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="animate-fade-in">
            <span className="badge-gold mb-4 inline-block">Legnépszerűbb</span>
            <h2 className="text-h2 font-display font-bold text-foreground">
              Kedvenceink
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              A vásárlóink által leginkább kedvelt illatok — mindig 100% eredeti.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="rounded-full border-border hover:border-primary hover:bg-primary/10 disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="rounded-full border-border hover:border-primary hover:bg-primary/10 disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <Button 
              variant="outline"
              className="border-primary text-foreground hover:bg-primary/10"
              asChild
            >
              <Link to="/termekek">Összes Megtekintése</Link>
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        {isLoading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-[300px]">
                <Skeleton className="aspect-[4/5] rounded-lg bg-card" />
                <Skeleton className="h-6 mt-4 w-3/4 bg-card" />
                <Skeleton className="h-4 mt-2 w-1/2 bg-card" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nem sikerült betölteni a termékeket.</p>
          </div>
        ) : products && products.length > 0 ? (
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.slice(0, 8).map((product, index) => (
              <div key={product.node.id} className="flex-shrink-0 w-[280px] md:w-[300px] snap-start">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 card-luxury">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✨</span>
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Hamarosan Érkezik</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Prémium parfümkínálatunk összeállítása folyamatban. Iratkozz fel, hogy elsőként értesülj!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
