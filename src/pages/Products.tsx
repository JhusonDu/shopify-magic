import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, ProductFiltersState, extractFilterOptions, applyFilters } from "@/components/ProductFilters";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight, Shield, Truck, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const emptyFilters: ProductFiltersState = { genders: [], brands: [], types: [], sort: "default", priceRange: [0, 100000] };

const Products = () => {
  const [filters, setFilters] = useState<ProductFiltersState>(emptyFilters);
  const { data: products } = useProducts(50);
  const isMobile = useIsMobile();

  const productCount = products?.length ?? 0;
  const filteredCount = useMemo(() => {
    if (!products) return 0;
    return applyFilters(products, filters).length;
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative pt-24 pb-6 md:pt-32 md:pb-10 border-b border-primary/20 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 50%, hsl(43 65% 52% / 0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 70% 30%, hsl(45 87% 62% / 0.04) 0%, transparent 60%),
            linear-gradient(to bottom, hsl(0 0% 8%), hsl(0 0% 4%))
          `,
        }}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-30" />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-3 md:mb-6"
          >
            <Link to="/" className="hover:text-primary transition-colors duration-200">
              Főoldal
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Termékek</span>
          </motion.nav>

          {/* Content - left aligned */}
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="badge-gold mb-5 hidden md:inline-block"
            >
              Kollekció
            </motion.span>

            <div className="flex items-stretch gap-3 md:gap-5">
              {/* Gold accent bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="w-0.5 md:w-1 rounded-full origin-top"
                style={{ background: "linear-gradient(to bottom, hsl(43 65% 52%), hsl(43 65% 52% / 0.2))" }}
              />

              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-2xl md:text-5xl lg:text-[56px] font-display font-bold text-foreground mb-1 md:mb-4 leading-tight"
                >
                  Összes Termék
                  {isMobile && productCount > 0 && (
                    <span className="text-muted-foreground text-base font-medium ml-2">({productCount})</span>
                  )}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="text-muted-foreground text-lg leading-relaxed hidden md:block"
                >
                  Fedezd fel prémium parfüm dekant kínálatunkat — mindig 100% eredeti, luxus minőségben.
                </motion.p>
              </div>
            </div>

            {/* Trust badges - desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="hidden md:flex items-center gap-6 mt-6"
            >
              {[
                { icon: Shield, label: "100% Eredeti" },
                { icon: Truck, label: "Gyors Szállítás" },
                { icon: RotateCcw, label: "14 Nap Visszaküldés" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary/70" />
                  <span className="text-xs font-medium tracking-wide uppercase">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gold gradient separator */}
      <div className="h-px w-full hidden md:block" style={{ background: "linear-gradient(to right, transparent, hsl(43 65% 52% / 0.3), transparent)" }} />

      {/* Filter Sidebar + Products Grid */}
      <section className="py-6 md:py-10 noise-texture">
        <div className="container">
          <div className={`flex gap-8 ${isMobile ? "flex-col" : ""}`}>
            {!isMobile && products && products.length > 0 && (
              <div className="w-[280px] flex-shrink-0">
                <div className="sticky top-28">
                  <ProductFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    products={products}
                    hideSort
                    totalFilteredCount={filteredCount}
                  />
                </div>
              </div>
            )}

            {isMobile && products && products.length > 0 && (
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                products={products}
                totalFilteredCount={filteredCount}
              />
            )}

            <div className="flex-1 min-w-0">
              {/* Desktop sort bar */}
              {!isMobile && productCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between mb-6 pb-4 border-b border-border"
                >
                  <span className="text-sm text-muted-foreground font-medium tracking-wide">
                    {productCount} termék
                  </span>
                  <Select value={filters.sort} onValueChange={(v) => setFilters({ ...filters, sort: v })}>
                    <SelectTrigger className="w-[200px] bg-secondary border-border text-foreground h-9 text-sm">
                      <SelectValue placeholder="Ajánlott" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border z-50">
                      <SelectItem value="recommended">Ajánlott</SelectItem>
                      <SelectItem value="price-asc">Ár: alacsony → magas</SelectItem>
                      <SelectItem value="price-desc">Ár: magas → alacsony</SelectItem>
                      <SelectItem value="name-asc">Név: A → Z</SelectItem>
                      <SelectItem value="name-desc">Név: Z → A</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              <ProductGrid
                filters={filters}
                onClearFilters={() => setFilters(emptyFilters)}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
