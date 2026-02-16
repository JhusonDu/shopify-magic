import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Search, X, Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
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
const FeaturedCard = ({ product }: { product: ShopifyProduct }) => {
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
    <Link to={`/product/${node.handle}`} className="group block">
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4 }}
        className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
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
          <div className="absolute inset-x-0 bottom-0 p-2.5 flex gap-2 opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/40 to-transparent pt-8">
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
          <p className="text-lg font-bold text-primary">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

/* ── skeleton loader ── */
const CardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-card">
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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data: products, isLoading } = useProducts(
    12,
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
    <section className="py-10 md:py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header – compact */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl md:text-2xl text-foreground">
              Nagyvárad legnépszerűbb termékei
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter popover */}
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground bg-card border border-border px-3 py-1.5 rounded-full transition-colors"
                  aria-label="Szűrés"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keresés</span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-72 md:w-80 p-3 space-y-3"
              >
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Keresés termékek között..."
                    className="pl-8 pr-8 h-9 text-sm"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {vendors.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {vendors.map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          setSearchQuery(v);
                          setFilterOpen(false);
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>

            <Link
              to="/termekek"
              className="text-sm text-primary hover:underline font-medium hidden md:inline-flex"
            >
              Összes →
            </Link>
          </div>
        </div>

        {/* Active filter indicator */}
        {debouncedQuery && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Szűrő:</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
              {debouncedQuery}
              <button onClick={() => setSearchQuery("")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {products.map((product) => (
              <FeaturedCard key={product.node.id} product={product} />
            ))}
          </motion.div>
        )}

        {/* Mobile "view all" */}
        <div className="mt-6 text-center md:hidden">
          <Link
            to="/termekek"
            className="text-sm text-primary hover:underline font-medium"
          >
            Összes Megtekintése →
          </Link>
        </div>
      </div>
    </section>
  );
};
