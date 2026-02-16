import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageOpen, Sparkles, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { ProductFiltersState, applyFilters } from "./ProductFilters";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGridProps {
  filters?: ProductFiltersState;
  onClearFilters?: () => void;
}

export const ProductGrid = ({ filters, onClearFilters }: ProductGridProps) => {
  const { data: products, isLoading, error } = useProducts(50);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-5 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <Skeleton className="aspect-[4/5] rounded-2xl" />
            <div className="space-y-2 px-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <PackageOpen className="w-10 h-10 text-destructive" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">Something went wrong</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't load the products. Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-spice-100 to-spice-200 flex items-center justify-center mb-8">
          <Sparkles className="w-12 h-12 text-accent" />
        </div>
        <h3 className="text-3xl font-bold mb-4">Your store awaits</h3>
        <p className="text-muted-foreground max-w-md mb-8 text-lg leading-relaxed">
          Start building your collection. Add your first product to bring your vision to life.
        </p>
        <div className="px-8 py-5 rounded-2xl bg-gradient-to-br from-spice-50 to-spice-100 border border-spice-200">
          <p className="text-sm text-muted-foreground">
            <span className="text-2xl mr-2">💡</span>
            <span className="font-medium text-foreground">Pro tip:</span> Tell me what you'd like to sell!
            <br />
            <span className="text-muted-foreground/80 text-xs mt-1 block">
              Example: "Create a product called Artisan Honey for $24.99"
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Apply client-side filters
  const filtered = filters ? applyFilters(products, filters) : products;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <FilterX className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">Nincs találat</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          A kiválasztott szűrőkkel nem található termék. Próbálj más kombinációt!
        </p>
        {onClearFilters && (
          <Button variant="outline" onClick={onClearFilters} className="gap-2">
            <FilterX className="w-4 h-4" />
            Szűrők törlése
          </Button>
        )}
      </div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <AnimatePresence mode="popLayout">
        {filtered.map((product, index) => (
          <motion.div
            key={product.node.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
          >
            <ProductCard product={product} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
