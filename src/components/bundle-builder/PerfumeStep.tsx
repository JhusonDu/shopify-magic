import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ShopifyProduct } from "@/lib/shopify";

const MAX_SELECTIONS: Record<string, number> = {
  "5ml": 5,
  "10ml": 3,
  "15ml": 3,
};

interface PerfumeStepProps {
  selectedSize: string;
  selectedProducts: ShopifyProduct[];
  onToggle: (product: ShopifyProduct) => void;
  products: ShopifyProduct[];
  isLoading: boolean;
}

function getVariantForSize(product: ShopifyProduct, size: string) {
  return product.node.variants.edges.find(v => {
    const sizeOpt = v.node.selectedOptions.find(o => o.name === "Méret" || o.name === "Meret");
    return sizeOpt?.value === size && v.node.availableForSale;
  });
}

function formatPrice(amount: string): string {
  return new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF", maximumFractionDigits: 0 }).format(parseFloat(amount));
}

export const PerfumeStep = ({ selectedSize, selectedProducts, onToggle, products, isLoading }: PerfumeStepProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const maxSelections = MAX_SELECTIONS[selectedSize] || 3;

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const hasVariant = getVariantForSize(p, selectedSize);
      if (!hasVariant) return false;
      if (!searchQuery) return true;
      return p.node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.node.vendor || "").toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [products, selectedSize, searchQuery]);

  const selectedIds = new Set(selectedProducts.map(p => p.node.id));

  const totalPrice = selectedProducts.reduce((sum, p) => {
    const v = getVariantForSize(p, selectedSize);
    return sum + (v ? parseFloat(v.node.price.amount) : 0);
  }, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-display font-semibold text-center mb-2">
        Válaszd ki az illatokat
      </h3>
      <p className="text-center text-muted-foreground text-sm mb-6">
        Válassz {maxSelections === 5 ? "1-5" : "1-3"} illatot a {selectedSize}-es dekantokhoz
      </p>

      {/* Search */}
      <div className="relative mb-6 max-w-sm mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Keresés név vagy márka alapján..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[480px] overflow-y-auto pr-1">
        {filteredProducts.map((product) => {
          const variant = getVariantForSize(product, selectedSize);
          if (!variant) return null;
          const isSelected = selectedIds.has(product.node.id);
          const isDisabled = !isSelected && selectedProducts.length >= maxSelections;
          const image = product.node.images.edges[0]?.node;

          return (
            <motion.button
              key={product.node.id}
              onClick={() => !isDisabled && onToggle(product)}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              disabled={isDisabled}
              className={`relative rounded-lg overflow-hidden text-left transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-2 border-primary shadow-lg shadow-primary/10"
                  : isDisabled
                  ? "border-2 border-transparent opacity-40 cursor-not-allowed"
                  : "border-2 border-transparent hover:border-primary/30"
              } bg-secondary`}
            >
              {/* Check badge */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </motion.div>
              )}

              {/* Image */}
              {image && (
                <div className="aspect-square bg-background/50 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.altText || product.node.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Info */}
              <div className="p-3">
                <p className="text-xs text-muted-foreground truncate">{product.node.vendor}</p>
                <p className="text-sm font-semibold text-foreground truncate">{product.node.title}</p>
                <p className="text-sm text-primary font-semibold mt-1">
                  {formatPrice(variant.node.price.amount)}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Sticky bottom bar */}
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky bottom-0 mt-6 p-4 rounded-lg bg-secondary/90 backdrop-blur border border-border flex items-center justify-between"
        >
          <span className="text-sm font-medium text-foreground">
            {selectedProducts.length} illat kiválasztva
          </span>
          <span className="text-sm font-bold text-primary">
            {formatPrice(totalPrice.toString())}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export { getVariantForSize, formatPrice };
