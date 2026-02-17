import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, ProductFiltersState } from "@/components/ProductFilters";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const emptyFilters: ProductFiltersState = { genders: [], brands: [], types: [], sort: "default" };

const Products = () => {
  const [filters, setFilters] = useState<ProductFiltersState>(emptyFilters);
  const { data: products } = useProducts(50);
  const isMobile = useIsMobile();

  const productCount = products?.length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-card to-background border-b border-primary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="badge-gold mb-4 inline-block">Kollekció</span>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-display font-bold text-foreground mb-4 leading-tight">
              Összes Termék
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Fedezd fel prémium parfüm dekant kínálatunkat — mindig 100% eredeti, luxus minőségben.
            </p>
            {productCount > 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-muted-foreground font-medium tracking-wide"
              >
                {productCount} termék
              </motion.span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter Sidebar + Products Grid */}
      <section className="py-12">
        <div className="container">
          <div className={`flex gap-8 ${isMobile ? "flex-col" : ""}`}>
            {/* Desktop Sidebar */}
            {!isMobile && products && products.length > 0 && (
              <div className="w-[280px] flex-shrink-0">
                <div className="sticky top-28">
                  <ProductFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    products={products}
                  />
                </div>
              </div>
            )}

            {/* Mobile filter (bottom sheet trigger) */}
            {isMobile && products && products.length > 0 && (
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                products={products}
              />
            )}

            {/* Grid */}
            <div className="flex-1 min-w-0">
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
