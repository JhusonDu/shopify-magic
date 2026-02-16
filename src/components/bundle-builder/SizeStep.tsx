import { motion } from "framer-motion";
import { ShopifyProduct } from "@/lib/shopify";
import { Badge } from "@/components/ui/badge";

const sizeOptions = [
  { id: "5ml", label: "5ml dekant", description: "Tökéletes kipróbáláshoz", bundle: false },
  { id: "10ml", label: "10ml dekant", description: "Ideális mindennapi használatra", bundle: false },
  { id: "3x10ml", label: "3× 10ml csomag", description: "3 db 10ml-es dekant kedvezményesen", bundle: true, discount: 2000 },
  { id: "3x50ml", label: "3× 50ml csomag", description: "3 db 50ml-es üveg kedvezményesen", bundle: true, discount: 2000 },
];

interface SizeStepProps {
  selectedSize: string | null;
  onSelect: (size: string) => void;
  products: ShopifyProduct[];
}

function getStartingPrice(products: ShopifyProduct[], sizeValue: string): string | null {
  // For bundle sizes, look up the base size
  const lookupSize = sizeValue === "3x10ml" ? "10ml" : sizeValue === "3x50ml" ? "50ml" : sizeValue;
  let min = Infinity;
  for (const p of products) {
    for (const v of p.node.variants.edges) {
      const sizeOpt = v.node.selectedOptions.find(o => o.name === "Méret" || o.name === "Meret");
      if (sizeOpt?.value === lookupSize && v.node.availableForSale) {
        const price = parseFloat(v.node.price.amount);
        if (price < min) min = price;
      }
    }
  }
  if (min === Infinity) return null;
  const multiplier = sizeValue.startsWith("3x") ? 3 : 1;
  const discount = sizeOptions.find(s => s.id === sizeValue)?.discount || 0;
  const total = min * multiplier - discount;
  return new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF", maximumFractionDigits: 0 }).format(total);
}

export const SizeStep = ({ selectedSize, onSelect, products }: SizeStepProps) => (
  <div>
    <h3 className="text-xl font-display font-semibold text-center mb-8">
      Válaszd ki a méretet
    </h3>
    <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
      {sizeOptions.map((size) => {
        const startingPrice = getStartingPrice(products, size.id);
        return (
          <motion.button
            key={size.id}
            onClick={() => onSelect(size.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-5 md:p-6 rounded-lg text-left transition-all duration-300 cursor-pointer ${
              selectedSize === size.id
                ? "bg-primary/10 border-2 border-primary shadow-lg shadow-primary/10"
                : "bg-secondary border-2 border-transparent hover:border-primary/30"
            }`}
          >
            {size.bundle && (
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px]">
                -2 000 Ft
              </Badge>
            )}
            <div className="text-lg md:text-2xl font-display font-bold text-foreground mb-1">
              {size.label}
            </div>
            <p className="text-muted-foreground text-xs md:text-sm mb-3">{size.description}</p>
            {startingPrice && (
              <p className="text-primary font-semibold text-sm">{startingPrice}-tól</p>
            )}
          </motion.button>
        );
      })}
    </div>
  </div>
);
