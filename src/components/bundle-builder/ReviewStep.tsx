import { motion } from "framer-motion";
import { Pencil, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShopifyProduct } from "@/lib/shopify";
import { DecantingPopover } from "./DecantingPopover";

interface ReviewStepProps {
  selectedSize: string;
  selectedProducts: ShopifyProduct[];
  onEditStep: (step: number) => void;
  name: string;
  email: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
}

const SIZE_LABELS: Record<string, string> = {
  "5ml": "5ml dekantok",
  "10ml": "10ml dekantok",
  "3x10ml": "3× 10ml csomag",
  "3x50ml": "3× 50ml csomag",
};

export const ReviewStep = ({ selectedSize, selectedProducts, onEditStep, name, email, onNameChange, onEmailChange }: ReviewStepProps) => {
  const isBundle = selectedSize.startsWith("3x");

  return (
    <div>
      <h3 className="text-xl font-display font-semibold text-center mb-8">
        Áttekintés & Érdeklődés
      </h3>

      <div className="bg-secondary rounded-lg p-6 max-w-lg mx-auto">
        {/* Size */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
          <div>
            <span className="text-muted-foreground text-sm">Méret</span>
            <p className="font-semibold text-foreground">{SIZE_LABELS[selectedSize] || selectedSize}</p>
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
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bundle discount note */}
        {isBundle && (
          <div className="mb-4 pb-4 border-b border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Csomag kedvezmény</span>
              <span className="text-sm font-semibold text-primary">-2 000 Ft</span>
            </div>
          </div>
        )}

        {/* Pricing note */}
        <div className="mb-4 pb-4 border-b border-border">
          <p className="text-xs text-muted-foreground italic">
            A végleges árak a szolgáltatás induláskor lesznek megerősítve. Az érdeklődéssel automatikusan 2 000 Ft kedvezményre jogosulsz.
          </p>
        </div>

        {/* Contact fields */}
        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Neved"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="pl-10"
              maxLength={100}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email címed"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="pl-10"
              maxLength={255}
            />
          </div>
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
