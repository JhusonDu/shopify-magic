import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductQuickBuy } from "@/components/ProductQuickBuy";
import { ProductFilters, ProductFiltersState, applyFilters, extractFilterOptions } from "@/components/ProductFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
const FeaturedCard = ({ product, onQuickBuy }: { product: ShopifyProduct; onQuickBuy: (p: ShopifyProduct) => void }) => {
  const { node } = product;
  const image = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  return (
    <Link to={`/product/${node.handle}`} className="group block" onClick={(e) => {
      e.preventDefault();
      onQuickBuy(product);
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

          {firstVariant && !firstVariant.availableForSale && (
            <span className="absolute top-2 left-2 bg-foreground/80 text-background text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Elfogyott
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 p-2.5 hidden md:flex md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/50 to-transparent pt-8">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickBuy(product); }}
              className="flex-1 bg-primary/95 backdrop-blur-sm text-primary-foreground text-sm font-semibold py-2.5 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-1.5 active:scale-95"
              aria-label={`${node.title} gyors választás`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Gyors választás
            </button>
          </div>
        </div>

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

/* ── main section ── */
export const FeaturedProducts = () => {
  const isMobile = useIsMobile();
  const [quickBuyProduct, setQuickBuyProduct] = useState<ShopifyProduct | null>(null);
  const [desktopFilterOpen, setDesktopFilterOpen] = useState(false);

  const { data: products, isLoading } = useProducts(50);

  const defaultFilters = useMemo((): ProductFiltersState => {
    if (!products || products.length === 0) {
      return { genders: [], brands: [], types: [], sort: "recommended", priceRange: [0, 100000] };
    }
    const opts = extractFilterOptions(products);
    return { genders: [], brands: [], types: [], sort: "recommended", priceRange: opts.priceBounds };
  }, [products]);

  const [filters, setFilters] = useState<ProductFiltersState | null>(null);
  const activeFilters = filters ?? defaultFilters;

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return applyFilters(products, activeFilters).slice(0, 6);
  }, [products, activeFilters]);

  const totalFilteredCount = useMemo(() => {
    if (!products) return 0;
    return applyFilters(products, activeFilters).length;
  }, [products, activeFilters]);

  const isPriceActive = products && products.length > 0
    ? (() => {
        const opts = extractFilterOptions(products);
        return activeFilters.priceRange[0] !== opts.priceBounds[0] || activeFilters.priceRange[1] !== opts.priceBounds[1];
      })()
    : false;
  const activeCount = activeFilters.genders.length + activeFilters.brands.length + activeFilters.types.length + (isPriceActive ? 1 : 0);

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-background to-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link to="/termekek" className="flex items-center gap-3 group">
            <Sparkles className="w-5 h-5 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
            <h2 className="font-display text-2xl md:text-3xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.3)] group-hover:underline transition-all">
              Legnépszerűbb Termékek
            </h2>
          </Link>

          <div className="flex items-center gap-2">
            {/* Desktop filter button */}
            <button
              onClick={() => setDesktopFilterOpen(true)}
              className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary bg-card border border-border hover:border-primary/50 px-4 py-2 rounded-full transition-all duration-200 hover:shadow-[0_0_10px_hsl(var(--primary)/0.15)]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Szűrő
              {activeCount > 0 && (
                <Badge variant="default" className="h-5 min-w-5 px-1.5 text-[10px] ml-1">
                  {activeCount}
                </Badge>
              )}
            </button>

            {activeCount > 0 && (
              <button
                onClick={() => setFilters(null)}
                className="hidden md:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
                Törlés
              </button>
            )}

            <Link
              to="/termekek"
              className="text-sm text-primary hover:underline font-medium hidden md:inline-flex items-center gap-1 hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)] transition-all"
            >
              Összes Megtekintése →
            </Link>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : !products || filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">
              Nincs a szűrőknek megfelelő termék.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <FeaturedCard key={product.node.id} product={product} onQuickBuy={setQuickBuyProduct} />
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

      {/* Mobile: ProductFilters handles sticky button + sheet */}
      {isMobile && products && products.length > 0 && (
        <ProductFilters
          filters={activeFilters}
          onFiltersChange={setFilters}
          products={products}
          hideSort
          totalFilteredCount={totalFilteredCount}
        />
      )}

      {/* Desktop: Dialog with ProductFilters content */}
      {!isMobile && (
        <Dialog open={desktopFilterOpen} onOpenChange={setDesktopFilterOpen}>
          <DialogContent className="bg-card border-border max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-foreground font-display text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                Szűrők
                {totalFilteredCount !== undefined && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({totalFilteredCount} termék)
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>
            {products && products.length > 0 && (
              <ProductFilters
                filters={activeFilters}
                onFiltersChange={setFilters}
                products={products}
                hideSort
                totalFilteredCount={totalFilteredCount}
                bare
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <ProductQuickBuy product={quickBuyProduct} onClose={() => setQuickBuyProduct(null)} />
    </section>
  );
};
