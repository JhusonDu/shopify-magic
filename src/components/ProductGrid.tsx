import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageOpen, Sparkles, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
            <Skeleton className="aspect-[4/5] rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/4" />
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
        <h3 className="text-2xl font-semibold mb-3">Hiba történt</h3>
        <p className="text-muted-foreground max-w-md">
          Nem sikerült betölteni a termékeket. Frissítsd az oldalt, vagy próbáld újra később.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-3xl font-bold mb-4">A bolt hamarosan nyit</h3>
        <p className="text-muted-foreground max-w-md mb-8 text-lg leading-relaxed">
          Hamarosan megérkeznek a termékek. Gyere vissza később!
        </p>
      </div>
    );
  }

  // Apply client-side filters + sort
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
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
      <AnimatePresence mode="popLayout">
        {filtered.map((product, index) => (
          <motion.div
            key={product.node.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            className="sm:max-w-none max-w-sm mx-auto sm:mx-0 w-full"
          >
            <ProductCard product={product} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
