import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Loader2, Plus } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

function formatHUF(amount: string): string {
  const num = Math.round(parseFloat(amount));
  return num.toLocaleString("hu-HU").replace(/,/g, " ") + " Ft";
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  const { node } = product;
  const images = node.images?.edges || [];
  const primaryImage = images[0]?.node;
  const hoverImage = images[1]?.node || primaryImage;
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
      selectedOptions: firstVariant.selectedOptions || []
    });
    
    toast.success("Kosárba rakva", {
      description: node.title,
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`} 
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="relative overflow-hidden rounded-lg bg-secondary aspect-[3/4] md:aspect-[4/5] mb-2 md:mb-4 transition-all duration-500"
        style={{
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 20px 40px -10px hsl(43 65% 52% / 0.2)"
            : "0 4px 12px -4px hsl(0 0% 0% / 0.3)",
        }}
      >
        {/* Loading shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted to-secondary animate-image-shimmer bg-[length:200%_100%]" />
        )}
        
        {primaryImage ? (
          <>
            <img 
              src={primaryImage.url} 
              alt={primaryImage.altText || node.title}
              onLoad={() => setImageLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered && hoverImage !== primaryImage ? "opacity-0" : "opacity-100"
              } ${imageLoaded ? "" : "opacity-0"}`}
              style={{
                transform: isHovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.7s ease, opacity 0.7s ease",
              }}
            />
            {hoverImage && hoverImage !== primaryImage && (
              <img 
                src={hoverImage.url} 
                alt={hoverImage.altText || node.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.7s ease, opacity 0.7s ease",
                }}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
          </div>
        )}

        {/* Quick add overlay */}
        <div
          className="absolute inset-x-0 bottom-0 p-2 md:p-4 bg-gradient-to-t from-background/80 to-transparent transition-all duration-300"
          style={{
            opacity: isMobile || isHovered ? 1 : 0,
            transform: isMobile || isHovered ? "translateY(0)" : "translateY(100%)",
          }}
        >
          {isMobile ? (
            <Button 
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
              size="icon"
              className="ml-auto block bg-primary hover:bg-accent text-primary-foreground h-9 w-9 rounded-full"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            </Button>
          ) : (
            <Button 
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
              className="w-full bg-primary hover:bg-accent text-primary-foreground h-11 rounded-md font-semibold tracking-wide text-sm"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Kosárba
                </>
              )}
            </Button>
          )}
        </div>

        {/* Stock badge */}
        {!firstVariant?.availableForSale && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-foreground/90 text-background text-xs font-medium rounded-full">
            Elfogyott
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1.5 px-0.5">
        {/* Brand */}
        {node.vendor && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {node.vendor}
          </p>
        )}
        {/* Title */}
        <h3 className="font-display text-sm md:text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {node.title}
        </h3>
        {/* Price */}
        <p className="text-base md:text-lg font-bold text-primary">
          {formatHUF(price.amount)}
        </p>
      </div>
    </Link>
  );
};
