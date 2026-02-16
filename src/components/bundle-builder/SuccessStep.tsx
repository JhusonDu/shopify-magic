import { motion } from "framer-motion";
import { Check, ShoppingBag, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStepProps {
  onOpenCart: () => void;
  onScrollUp: () => void;
}

export const SuccessStep = ({ onOpenCart, onScrollUp }: SuccessStepProps) => (
  <div className="text-center">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
      >
        <Check className="w-10 h-10 text-primary" />
      </motion.div>
    </motion.div>

    <h3 className="text-xl font-display font-semibold mb-2">
      Sikeresen hozzáadva!
    </h3>
    <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
      A kiválasztott dekantok a kosaradba kerültek. Folytasd a fizetéshez, vagy böngéssz tovább.
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <Button onClick={onOpenCart} className="bg-primary text-primary-foreground hover:bg-accent gap-2">
        <ShoppingBag className="w-4 h-4" />
        Tovább a fizetéshez
      </Button>
      <Button variant="ghost" onClick={onScrollUp} className="text-muted-foreground gap-2">
        <ArrowUp className="w-4 h-4" />
        Folytasd a böngészést
      </Button>
    </div>
  </div>
);
