import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { DecantingPopover } from "./bundle-builder/DecantingPopover";
import { StepProgress } from "./bundle-builder/StepProgress";
import { SizeStep } from "./bundle-builder/SizeStep";
import { PerfumeStep, getVariantForSize } from "./bundle-builder/PerfumeStep";
import { ReviewStep } from "./bundle-builder/ReviewStep";
import { SuccessStep } from "./bundle-builder/SuccessStep";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

export const BundleBuilder = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ShopifyProduct[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { data: products = [], isLoading } = useProducts(50);
  const addItem = useCartStore((s) => s.addItem);

  const goTo = useCallback((step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  }, [currentStep]);

  const goNext = () => goTo(currentStep + 1);
  const goBack = () => goTo(currentStep - 1);

  const toggleProduct = (product: ShopifyProduct) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.node.id === product.node.id);
      if (exists) return prev.filter((p) => p.node.id !== product.node.id);
      return [...prev, product];
    });
  };

  const handleAddToCart = async () => {
    if (!selectedSize) return;
    setIsAddingToCart(true);
    try {
      for (const product of selectedProducts) {
        const variant = getVariantForSize(product, selectedSize);
        if (!variant) continue;
        await addItem({
          product,
          variantId: variant.node.id,
          variantTitle: variant.node.title,
          price: variant.node.price,
          quantity: 1,
          selectedOptions: variant.node.selectedOptions,
        });
      }
      goTo(4);
    } catch (e) {
      console.error("Failed to add bundle to cart:", e);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedSize;
    if (currentStep === 2) return selectedProducts.length > 0;
    if (currentStep === 3) return true;
    return false;
  };

  const handleScrollUp = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    // Reset for a new bundle
    setCurrentStep(1);
    setSelectedSize(null);
    setSelectedProducts([]);
    setDirection(1);
  };

  return (
    <section ref={sectionRef} id="bundle-builder" className="py-20 md:py-28 bg-card">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in">
          <span className="badge-gold mb-4 inline-block">Egyedi Összeállítás</span>
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-h2 font-display font-bold text-foreground">
              Állítsd Össze a Saját Dobozkádat
            </h2>
            <DecantingPopover />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Válaszd ki a neked tetsző illatokat, mi összeállítjuk és postázzuk a prémium dekant dobozkádat.
          </p>
        </div>

        <StepProgress currentStep={currentStep} />

        {/* Step Content */}
        <div className="max-w-4xl mx-auto overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {currentStep === 1 && (
                <SizeStep
                  selectedSize={selectedSize}
                  onSelect={(size) => setSelectedSize(size)}
                  products={products}
                />
              )}

              {currentStep === 2 && selectedSize && (
                <PerfumeStep
                  selectedSize={selectedSize}
                  selectedProducts={selectedProducts}
                  onToggle={toggleProduct}
                  products={products}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 3 && selectedSize && (
                <ReviewStep
                  selectedSize={selectedSize}
                  selectedProducts={selectedProducts}
                  onEditStep={goTo}
                />
              )}

              {currentStep === 4 && (
                <SuccessStep
                  onOpenCart={() => {
                    // Trigger cart drawer open via clicking the cart button
                    const cartButton = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
                    cartButton?.click();
                  }}
                  onScrollUp={handleScrollUp}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                onClick={goBack}
                disabled={currentStep === 1}
                className="border-border hover:border-primary"
              >
                Vissza
              </Button>

              {currentStep === 3 ? (
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="bg-primary text-primary-foreground hover:bg-accent"
                >
                  {isAddingToCart ? "Hozzáadás..." : "Kosárba"}
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="bg-primary text-primary-foreground hover:bg-accent"
                >
                  Tovább
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
