import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

import diorSauvage from "@/assets/products/dior-sauvage.jpg";
import valentinoDonna from "@/assets/products/valentino-donna.jpg";
import yslLibre from "@/assets/products/ysl-libre.jpg";
import chanelBleu from "@/assets/products/chanel-bleu.jpg";
import armaniCode from "@/assets/products/armani-code.jpg";

interface Product {
  id: number;
  brand: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image?: string;
}

const products: Product[] = [
  {
    id: 1,
    brand: "Dior",
    title: "Dior Sauvage EDP",
    description: "Fűszeres-fás férfi illat, magnetikus kisugárzással",
    price: 24990,
    originalPrice: 32990,
    discount: "-24%",
    image: diorSauvage,
  },
  {
    id: 2,
    brand: "Valentino",
    title: "Valentino Donna Born in Roma",
    description: "Virágos-fás női illat, magabiztos elegancia",
    price: 18490,
    originalPrice: 24990,
    discount: "-26%",
    image: valentinoDonna,
  },
  {
    id: 3,
    brand: "Yves Saint Laurent",
    title: "YSL Libre Intense",
    description: "Merész levendulás-vaníliás illat, szabadság szimbóluma",
    price: 21990,
    image: yslLibre,
  },
  {
    id: 4,
    brand: "Chanel",
    title: "Chanel Bleu de Chanel",
    description: "Időtlen fás-aromás férfi klasszikus",
    price: 27990,
    image: chanelBleu,
  },
  {
    id: 5,
    brand: "Prada",
    title: "Prada Paradoxe",
    description: "Modern ambra-pézsma, rejtélyes nőiesség",
    price: 23490,
  },
  {
    id: 6,
    brand: "Giorgio Armani",
    title: "Armani Code",
    description: "Érzéki tonkababos-levendulás férfi illat",
    price: 19990,
    originalPrice: 26990,
    discount: "-26%",
    image: armaniCode,
  },
  {
    id: 7,
    brand: "Versace",
    title: "Versace Eros",
    description: "Dinamikus mentás-vaníliás férfi illat",
    price: 17990,
  },
  {
    id: 8,
    brand: "Gucci",
    title: "Gucci Bloom",
    description: "Gazdag fehérvirágos női illat, nőies eleganciával",
    price: 22490,
  },
];

const formatPrice = (price: number) =>
  price.toLocaleString("hu-HU") + " Ft";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Eltávolítva a kedvencekből");
      } else {
        next.add(id);
        toast.success("Hozzáadva a kedvencekhez");
      }
      return next;
    });
  };

  const handleAddToCart = (product: Product) => {
    toast.success("Kosárba helyezve", { description: product.title });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block text-xs tracking-badge uppercase text-primary font-semibold mb-3">
              Legnépszerűbb
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Kedvenceink
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A vásárlóink által leginkább kedvelt illatok – mindig 100% eredeti.
            </p>
          </div>
          <Link
            to="/termekek"
            className="hidden md:inline-flex items-center text-primary hover:underline font-medium mt-4 md:mt-0 shrink-0"
          >
            Összes Megtekintése →
          </Link>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group bg-card rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-square bg-background overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                )}

                {/* Discount badge */}
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold">
                    {product.discount}
                  </span>
                )}

                {/* Wishlist heart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  aria-label={
                    wishlist.has(product.id)
                      ? "Eltávolítás a kedvencekből"
                      : "Hozzáadás a kedvencekhez"
                  }
                  className="absolute top-3 right-3 bg-background/50 backdrop-blur-sm p-2 rounded-full hover:bg-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <motion.div whileTap={{ scale: 1.3 }}>
                    <Heart
                      className={`w-4 h-4 transition-colors duration-300 ${
                        wishlist.has(product.id)
                          ? "fill-primary text-primary"
                          : "text-foreground"
                      }`}
                    />
                  </motion.div>
                </button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="bg-primary text-primary-foreground px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base flex items-center gap-2 hover:bg-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`Gyors megtekintés: ${product.title}`}
                  >
                    <Eye className="w-4 h-4" />
                    Gyors Megtekintés
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 md:p-4 space-y-1 md:space-y-2">
                <span className="text-xs text-primary uppercase tracking-badge font-medium">
                  {product.brand}
                </span>
                <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-2">
                  {product.title}
                </h3>
                <p className="hidden md:block text-muted-foreground text-sm line-clamp-1">
                  {product.description}
                </p>

                {/* Price + CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-xs md:text-sm">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="bg-primary text-primary-foreground px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm hover:bg-accent transition-colors duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`${product.title} kosárba`}
                  >
                    + Kosárba
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile "view all" link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/termekek"
            className="text-primary hover:underline font-medium"
          >
            Összes Megtekintése →
          </Link>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      >
        <DialogContent className="bg-card border-border max-w-lg">
          {quickViewProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground font-display text-2xl">
                  {quickViewProduct.title}
                </DialogTitle>
                <DialogDescription className="text-primary text-sm uppercase tracking-badge">
                  {quickViewProduct.brand}
                </DialogDescription>
              </DialogHeader>

              {quickViewProduct.image ? (
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ) : (
                <div className="w-full aspect-square bg-background rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-20 h-20 text-muted-foreground/30" />
                </div>
              )}

              <p className="text-muted-foreground">
                {quickViewProduct.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-muted-foreground line-through text-sm">
                      {formatPrice(quickViewProduct.originalPrice)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  + Kosárba
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
