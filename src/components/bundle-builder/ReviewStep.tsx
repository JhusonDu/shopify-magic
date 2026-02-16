import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { getVariantForSize, formatPrice } from "./PerfumeStep";
import { DecantingPopover } from "./DecantingPopover";

interface ReviewStepProps {
  selectedSize: string;
  selectedProducts: ShopifyProduct[];
  onEditStep: (step: number) => void;
}

export const ReviewStep = ({ selectedSize, selectedProducts, onEditStep }: ReviewStepProps) => {
  const totalPrice = selectedProducts.reduce((sum, p) => {
    const v = getVariantForSize(p, selectedSize);
    return sum + (v ? parseFloat(v.node.price.amount) : 0);
  }, 0);

  return (
    <div>
      <h3 className="text-xl font-display font-semibold text-center mb-8">
        Áttekintés
      </h3>

      <div className="bg-secondary rounded-lg p-6 max-w-lg mx-auto">
        {/* Size */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
          <div>
            <span className="text-muted-foreground text-sm">Méret</span>
            <p className="font-semibold text-foreground">{selectedSize} dekantok</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onEditStep(1)} className="text-muted-foreground hover:text-primary">
            <Pencil className="w-4 h-4" />
          </Button>
        </div>

        {/* Selected perfumes */}
        <div className="mb-4 pb-4 border-b border-border">
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted-foreground text-sm">Kiválasztott illatok</span>
            <Button variant="ghost" size="icon" onClick={() => onEditStep(2)} className="text-muted-foreground hover:text-primary">
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {selectedProducts.map((product) => {
              const variant = getVariantForSize(product, selectedSize);
              const image = product.node.images.edges[0]?.node;
              return (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  {image && (
                    <img src={image.url} alt={product.node.title} className="w-10 h-10 rounded object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.node.title}</p>
                    <p className="text-xs text-muted-foreground">{product.node.vendor}</p>
                  </div>
                  {variant && (
                    <span className="text-sm font-semibold text-foreground shrink-0">
                      {formatPrice(variant.node.price.amount)}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-foreground">Összesen</span>
          <span className="text-lg font-bold text-primary">
            {formatPrice(totalPrice.toString())}
          </span>
        </div>
      </div>

      {/* Decanting info */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>Hogyan készülnek a dekantjaink?</span>
        <DecantingPopover />
      </div>
    </div>
  );
};
