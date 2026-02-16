import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters, ProductFiltersState } from "@/components/ProductFilters";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";

const emptyFilters: ProductFiltersState = { genders: [], brands: [], types: [] };

const Products = () => {
  const [filters, setFilters] = useState<ProductFiltersState>(emptyFilters);
  const { data: products } = useProducts(50);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-card to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="badge-gold mb-4 inline-block">Kollekció</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
              Összes Termék
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Fedezd fel prémium parfüm dekant kínálatunkat — mindig 100% eredeti, luxus minőségben.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar + Products Grid */}
      <section className="py-16">
        <div className="container space-y-8">
          {products && products.length > 0 && (
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              products={products}
            />
          )}
          <ProductGrid
            filters={filters}
            onClearFilters={() => setFilters(emptyFilters)}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
