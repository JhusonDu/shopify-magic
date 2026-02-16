import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Loader2, Plus } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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
    
    toast.success("Added to cart", {
      description: node.title,
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`} 
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Edge-to-edge, large cards (Savor style) */}
      <div className="relative overflow-hidden rounded-lg bg-secondary aspect-[4/5] mb-5">
        {/* Loading shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted to-secondary animate-image-shimmer bg-[length:200%_100%]" />
        )}
        
        {primaryImage ? (
          <>
            {/* Primary image */}
            <img 
              src={primaryImage.url} 
              alt={primaryImage.altText || node.title}
              onLoad={() => setImageLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered && hoverImage !== primaryImage ? "opacity-0 scale-105" : "opacity-100 scale-100"
              } ${imageLoaded ? "" : "opacity-0"}`}
            />
            {/* Hover image (image rollover effect) */}
            {hoverImage && hoverImage !== primaryImage && (
              <img 
                src={hoverImage.url} 
                alt={hoverImage.altText || node.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
          </div>
        )}

        {/* Quick add button - appears on hover */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant?.availableForSale}
            className="w-full bg-primary/95 backdrop-blur-sm hover:bg-primary text-primary-foreground h-12 rounded-md shadow-lg"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Quick Add
              </>
            )}
          </Button>
        </div>

        {/* Stock badge */}
        {!firstVariant?.availableForSale && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-foreground/90 text-background text-xs font-medium rounded-full">
            Sold Out
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2 px-1">
        <h3 className="font-medium text-lg leading-tight group-hover:text-accent transition-colors duration-300">
          {node.title}
        </h3>
        {node.description && (
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {node.description}
          </p>
        )}
        <p className="text-lg font-semibold text-foreground">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};
