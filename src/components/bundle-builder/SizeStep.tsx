import { motion } from "framer-motion";
import { ShopifyProduct } from "@/lib/shopify";

const sizeOptions = [
  { id: "5ml", label: "5ml", description: "Tökéletes kipróbáláshoz" },
  { id: "10ml", label: "10ml", description: "Ideális mindennapi használatra" },
  { id: "15ml", label: "15ml", description: "Prémium méretű dekant" },
];

interface SizeStepProps {
  selectedSize: string | null;
  onSelect: (size: string) => void;
  products: ShopifyProduct[];
}

function getStartingPrice(products: ShopifyProduct[], sizeValue: string): string | null {
  let min = Infinity;
  for (const p of products) {
    for (const v of p.node.variants.edges) {
      const sizeOpt = v.node.selectedOptions.find(o => o.name === "Méret" || o.name === "Meret");
      if (sizeOpt?.value === sizeValue && v.node.availableForSale) {
        const price = parseFloat(v.node.price.amount);
        if (price < min) min = price;
      }
    }
  }
  if (min === Infinity) return null;
  return new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF", maximumFractionDigits: 0 }).format(min);
}

export const SizeStep = ({ selectedSize, onSelect, products }: SizeStepProps) => (
  <div>
    <h3 className="text-xl font-display font-semibold text-center mb-8">
      Válaszd ki a méretet
    </h3>
    <div className="grid md:grid-cols-3 gap-6">
      {sizeOptions.map((size) => {
        const startingPrice = getStartingPrice(products, size.id);
        return (
          <motion.button
            key={size.id}
            onClick={() => onSelect(size.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-lg text-left transition-all duration-300 cursor-pointer ${
              selectedSize === size.id
                ? "bg-primary/10 border-2 border-primary shadow-lg shadow-primary/10"
                : "bg-secondary border-2 border-transparent hover:border-primary/30"
            }`}
          >
            <div className="text-2xl font-display font-bold text-foreground mb-2">
              {size.label}
            </div>
            <p className="text-muted-foreground text-sm mb-3">{size.description}</p>
            {startingPrice && (
              <p className="text-primary font-semibold">{startingPrice}-tól</p>
            )}
          </motion.button>
        );
      })}
    </div>
  </div>
);
