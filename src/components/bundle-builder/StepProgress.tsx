import { Check } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Méret" },
  { id: 2, title: "Illatok" },
  { id: 3, title: "Áttekintés" },
  { id: 4, title: "Kosárba" },
];

interface StepProgressProps {
  currentStep: number;
}

export const StepProgress = ({ currentStep }: StepProgressProps) => (
  <div className="flex justify-center mb-12">
    <div className="flex items-center gap-1 md:gap-3">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative">
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  currentStep > step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary text-muted-foreground"
                }`}
                animate={currentStep === step.id ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </motion.div>
            </div>
            <span className={`text-[10px] md:text-xs font-medium transition-colors whitespace-nowrap ${
              currentStep >= step.id ? "text-primary" : "text-muted-foreground"
            }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 mb-5 transition-colors duration-300 ${
              currentStep > step.id ? "bg-primary" : "bg-secondary"
            }`} />
          )}
        </div>
      ))}
    </div>
  </div>
);
