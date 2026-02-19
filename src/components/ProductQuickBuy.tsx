import { useState, useEffect, useMemo } from "react";
import { ShoppingBag, CreditCard, Minus, Plus, Loader2, ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";

const formatPrice = (amount: string, currency: string) => {
  const n = parseFloat(amount);
  if (currency === "HUF") return Math.round(n).toLocaleString("hu-HU") + " Ft";
  return `${currency} ${n.toFixed(2)}`;
};

interface Props {
  product: ShopifyProduct | null;
  onClose: () => void;
}

export const ProductQuickBuy = ({ product, onClose }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const isLoading = useCartStore((s) => s.isLoading);

  const variants = product?.node.variants?.edges ?? [];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const node = product?.node;
  const image = node?.images?.edges?.[0]?.node;
  const selectedVariant = variants[selectedIdx]?.node;
  const price = selectedVariant?.price ?? node?.priceRange?.minVariantPrice ?? { amount: "0", currencyCode: "HUF" };
  const isAvailable = selectedVariant?.availableForSale ?? false;

  const totalAmount = useMemo(() => {
    const unitPrice = parseFloat(price.amount);
    return (unitPrice * quantity).toString();
  }, [price.amount, quantity]);

  useEffect(() => {
    setSelectedIdx(0);
    setQuantity(1);
  }, [product?.node.id]);

  if (!product || !node) return null;

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Kosárba helyezve", { description: `${node.title} × ${quantity}` });
    onClose();
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
    onClose();
  };

  const variantLabel = (v: typeof variants[0]["node"]) => {
    const opt = v.selectedOptions?.find(
      (o) => o.name.toLowerCase() === "size" || o.name.toLowerCase() === "méret"
    );
    return opt?.value ?? v.title;
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-border max-w-md mx-4 sm:mx-auto rounded-2xl p-0 overflow-hidden gap-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header: Image + Info */}
          <div className="flex gap-4 p-5 pb-3">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0 border border-primary/15 shadow-[0_0_12px_hsl(43_65%_52%/0.1)]">
              {image ? (
                <img
                  src={image.url}
                  alt={image.altText || node.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
                </div>
              )}
            </div>
            <DialogHeader className="text-left flex-1 space-y-1">
              {node.vendor && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-semibold">
                  {node.vendor}
                </span>
              )}
              <DialogTitle className="text-base font-display font-semibold leading-snug text-foreground">
                {node.title}
              </DialogTitle>
              <DialogDescription asChild>
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={price.amount}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg font-bold text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.35)]"
                    >
                      {formatPrice(price.amount, price.currencyCode)}
                    </motion.span>
                  </AnimatePresence>
                  {isAvailable ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary/70">
                      <CheckCircle2 className="w-3 h-3" /> Készleten
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-destructive">
                      <XCircle className="w-3 h-3" /> Elfogyott
                    </span>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-5 pb-5 space-y-4">
            {/* Variant selector */}
            {variants.length > 1 && (
              <div>
                <p className="text-[11px] text-muted-foreground mb-2.5 uppercase tracking-[0.15em] font-medium">
                  Méret
                </p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <motion.button
                      key={v.node.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={() => setSelectedIdx(i)}
                      disabled={!v.node.availableForSale}
                      className={`text-sm px-4 py-2 rounded-full border transition-all duration-250 flex flex-col items-center leading-tight ${
                        selectedIdx === i
                          ? "border-primary bg-primary/15 text-primary shadow-[0_0_10px_hsl(var(--primary)/0.25)] font-semibold"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                      } disabled:opacity-30 disabled:cursor-not-allowed`}
                    >
                      <span>{variantLabel(v.node)}</span>
                      <span className={`text-[10px] ${selectedIdx === i ? "text-primary/70" : "text-muted-foreground/60"}`}>
                        {formatPrice(v.node.price.amount, v.node.price.currencyCode)}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div>
              <p className="text-[11px] text-muted-foreground mb-2.5 uppercase tracking-[0.15em] font-medium">
                Mennyiség
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_8px_hsl(var(--primary)/0.15)] transition-all duration-200 active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold w-8 text-center text-foreground tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_8px_hsl(var(--primary)/0.15)] transition-all duration-200 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total */}
            {quantity > 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-primary/5 border border-primary/10"
              >
                <span className="text-xs text-muted-foreground">Összesen</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={totalAmount}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-base font-bold text-primary"
                  >
                    {formatPrice(totalAmount, price.currencyCode)}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            )}

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex gap-2.5 pt-1"
            >
              <button
                onClick={handleAdd}
                disabled={isLoading || !isAvailable}
                className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-40 flex items-center justify-center gap-2 text-sm shadow-[0_4px_16px_hsl(var(--primary)/0.25)] active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Kosárba
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isLoading || !isAvailable}
                className="flex-1 bg-accent text-accent-foreground font-semibold py-3 rounded-xl hover:bg-accent/90 transition-all duration-200 disabled:opacity-40 flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Vásárlás
                  </>
                )}
              </button>
            </motion.div>

            {/* Details link */}
            <Link
              to={`/product/${node.handle}`}
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors pt-1"
            >
              Részletek megtekintése
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
