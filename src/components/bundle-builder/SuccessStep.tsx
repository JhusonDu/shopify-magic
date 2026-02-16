import { motion } from "framer-motion";
import { Check, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStepProps {
  onScrollUp: () => void;
}

export const SuccessStep = ({ onScrollUp }: SuccessStepProps) => (
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
      Köszönjük az érdeklődésedet!
    </h3>
    <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
      Amint elérhető lesz ez a szolgáltatás, értesítünk és automatikusan megkapod a 2 000 Ft kedvezményt.
    </p>

    <Button variant="ghost" onClick={onScrollUp} className="text-muted-foreground gap-2">
      <ArrowUp className="w-4 h-4" />
      Folytasd a böngészést
    </Button>
  </div>
);
