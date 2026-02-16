import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Search, X, Loader2, CreditCard, SlidersHorizontal, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductQuickBuy } from "@/components/ProductQuickBuy";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

/* ── animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ── helpers ── */
const formatPrice = (amount: string, currency: string) => {
  const n = parseFloat(amount);
  if (currency === "HUF") return n.toLocaleString("hu-HU") + " Ft";
  return `${currency} ${n.toFixed(2)}`;
};

/* ── product card ── */
const FeaturedCard = ({ product, onMobileTap }: { product: ShopifyProduct; onMobileTap: (p: ShopifyProduct) => void }) => {
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const isLoading = useCartStore((s) => s.isLoading);

  const { node } = product;
  const image = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success("Kosárba helyezve", { description: node.title });
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block" onClick={(e) => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        onMobileTap(product);
      }
    }}>
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4 }}
        className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.25)] transition-shadow duration-300 border border-border/50"
      >
        {/* Image */}
        <div className="relative aspect-square md:aspect-[3/4] bg-secondary overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}

          {/* Sold-out badge */}
          {firstVariant && !firstVariant.availableForSale && (
            <span className="absolute top-2 left-2 bg-foreground/80 text-background text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Elfogyott
            </span>
          )}

          {/* Quick actions – always visible on mobile, hover on desktop */}
          <div className="absolute inset-x-0 bottom-0 p-2.5 hidden md:flex gap-2 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/50 to-transparent pt-8">
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
              className="flex-1 bg-primary/95 backdrop-blur-sm text-primary-foreground text-sm font-semibold py-2.5 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95"
              aria-label={`${node.title} kosárba`}
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>+ Kosár</>
              )}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isLoading || !firstVariant?.availableForSale}
              className="flex-1 bg-accent/95 backdrop-blur-sm text-accent-foreground text-sm font-semibold py-2.5 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-95"
              aria-label={`${node.title} vásárlás`}
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-3.5 h-3.5" />
                  Vásárlás
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 md:p-4 space-y-1">
          {node.vendor && (
            <span className="text-[11px] uppercase tracking-widest text-primary font-medium">
              {node.vendor}
            </span>
          )}
          <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-2 leading-snug">
            {node.title}
          </h3>
          <p className="text-lg font-bold text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

/* ── skeleton loader ── */
const CardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-card border border-border/50">
    <Skeleton className="aspect-square md:aspect-[3/4] w-full" />
    <div className="p-3 md:p-4 space-y-2">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-5 w-24" />
    </div>
  </div>
);

/* ── filter catalog dialog ── */
const FilterCatalog = ({
  open,
  onOpenChange,
  searchQuery,
  setSearchQuery,
  vendors,
  activeVendor,
  setActiveVendor,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  vendors: string[];
  activeVendor: string | null;
  setActiveVendor: (v: string | null) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-card border-border max-w-md mx-4 sm:mx-auto">
      <DialogHeader>
        <DialogTitle className="text-foreground font-display text-xl flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          Termék szűrő
        </DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          Keress név alapján vagy válassz márkát
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 pt-2">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveVendor(null);
            }}
            placeholder="Keresés termékek között..."
            className="pl-9 pr-9 h-11 text-sm bg-secondary border-border"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveVendor(null);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Vendor chips */}
        {vendors.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Márkák</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setActiveVendor(null);
                  setSearchQuery("");
                }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  !activeVendor
                    ? "border-primary bg-primary/15 text-primary shadow-[0_0_8px_hsl(var(--primary)/0.2)]"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                Összes
              </button>
              {vendors.map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setActiveVendor(v);
                    setSearchQuery(v);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    activeVendor === v
                      ? "border-primary bg-primary/15 text-primary shadow-[0_0_8px_hsl(var(--primary)/0.2)]"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => onOpenChange(false)}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
        >
          Alkalmaz
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

/* ── main section ── */
export const FeaturedProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeVendor, setActiveVendor] = useState<string | null>(null);
  const [quickBuyProduct, setQuickBuyProduct] = useState<ShopifyProduct | null>(null);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data: products, isLoading } = useProducts(
    6,
    debouncedQuery || undefined
  );

  // extract unique vendors for filter chips
  const vendors = useCallback(() => {
    if (!products) return [];
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.node.vendor) set.add(p.node.vendor);
    });
    return Array.from(set);
  }, [products])();

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-background to-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
            <h2 className="font-display text-2xl md:text-3xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.3)]">
              Legnépszerűbb Termékek
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter button */}
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary bg-card border border-border hover:border-primary/50 px-4 py-2 rounded-full transition-all duration-200 hover:shadow-[0_0_10px_hsl(var(--primary)/0.15)]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Szűrő
            </button>

            <Link
              to="/termekek"
              className="text-sm text-primary hover:underline font-medium hidden md:inline-flex items-center gap-1 hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)] transition-all"
            >
              Összes Megtekintése →
            </Link>
          </div>
        </div>

        {/* Active filter indicator */}
        {debouncedQuery && (
          <div className="mb-5 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Aktív szűrő:</span>
            <span className="text-xs bg-primary/15 text-primary px-3 py-1 rounded-full flex items-center gap-1.5 border border-primary/20 shadow-[0_0_8px_hsl(var(--primary)/0.15)]">
              {debouncedQuery}
              <button onClick={() => { setSearchQuery(""); setActiveVendor(null); }}>
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">
              Nincs termék{debouncedQuery ? ` "${debouncedQuery}" keresésre` : ""}.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {products.map((product) => (
              <FeaturedCard key={product.node.id} product={product} onMobileTap={setQuickBuyProduct} />
            ))}
          </motion.div>
        )}

        {/* Mobile "view all" */}
        <div className="mt-6 text-center md:hidden">
          <Link
            to="/termekek"
            className="text-sm text-primary hover:underline font-medium hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)] transition-all"
          >
            Összes Megtekintése →
          </Link>
        </div>
      </div>

      {/* Filter catalog dialog */}
      <FilterCatalog
        open={filterOpen}
        onOpenChange={setFilterOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        vendors={vendors}
        activeVendor={activeVendor}
        setActiveVendor={setActiveVendor}
      />
      {/* Quick buy dialog (mobile) */}
      <ProductQuickBuy product={quickBuyProduct} onClose={() => setQuickBuyProduct(null)} />
    </section>
  );
};
