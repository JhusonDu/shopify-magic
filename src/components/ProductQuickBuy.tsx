import { useState, useEffect } from "react";
import { ShoppingBag, CreditCard, Minus, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
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
  if (currency === "HUF") return n.toLocaleString("hu-HU") + " Ft";
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

  // Reset state when product changes
  useEffect(() => {
    setSelectedIdx(0);
    setQuantity(1);
  }, [product?.node.id]);

  if (!product) return null;

  const { node } = product;
  const image = node.images?.edges?.[0]?.node;
  const selectedVariant = variants[selectedIdx]?.node;
  const price = selectedVariant?.price ?? node.priceRange.minVariantPrice;

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

  // Build label for variant chip
  const variantLabel = (v: typeof variants[0]["node"]) => {
    const opt = v.selectedOptions?.find(
      (o) => o.name.toLowerCase() === "size" || o.name.toLowerCase() === "méret"
    );
    return opt?.value ?? v.title;
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-border max-w-sm mx-4 sm:mx-auto rounded-2xl p-0 overflow-hidden">
        {/* Product image + info header */}
        <div className="flex gap-3 p-4 pb-2">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
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
          <DialogHeader className="text-left flex-1 space-y-0.5">
            {node.vendor && (
              <span className="text-[11px] uppercase tracking-widest text-primary font-medium">
                {node.vendor}
              </span>
            )}
            <DialogTitle className="text-base font-semibold leading-snug text-foreground">
              {node.title}
            </DialogTitle>
            <DialogDescription className="text-lg font-bold text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]">
              {formatPrice(price.amount, price.currencyCode)}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-4 pb-4 space-y-4">
          {/* Variant selector */}
          {variants.length > 1 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Méret
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v, i) => (
                  <button
                    key={v.node.id}
                    onClick={() => setSelectedIdx(i)}
                    disabled={!v.node.availableForSale}
                    className={`text-sm px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                      selectedIdx === i
                        ? "border-primary bg-primary/15 text-primary shadow-[0_0_8px_hsl(var(--primary)/0.2)]"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {variantLabel(v.node)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
              Mennyiség
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-semibold w-8 text-center text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleAdd}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
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
              disabled={isLoading || !selectedVariant?.availableForSale}
              className="flex-1 bg-accent text-accent-foreground font-semibold py-3 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
