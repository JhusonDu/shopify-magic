import { Link } from "react-router-dom";
import { ShoppingBag, Plus } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { extractConcentration } from "@/lib/perfumeUtils";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
  onQuickBuy?: (product: ShopifyProduct) => void;
}

function formatHUF(amount: string): string {
  const num = Math.round(parseFloat(amount));
  return num.toLocaleString("hu-HU").replace(/,/g, " ") + " Ft";
}

export const ProductCard = ({ product, index = 0, onQuickBuy }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  const { node } = product;
  const images = node.images?.edges || [];
  const primaryImage = images[0]?.node;
  const hoverImage = images[1]?.node || primaryImage;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickBuy?.(product);
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
        className="relative overflow-hidden rounded-lg bg-secondary aspect-[3/4] mb-2 md:mb-3 transition-all duration-500"
        style={{
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 20px 40px -10px hsl(43 65% 52% / 0.2), 0 0 0 1px hsl(43 65% 52% / 0.15)"
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

        {/* Quick buy overlay */}
        <div
          className="absolute inset-x-0 bottom-0 p-2 md:p-4 transition-all duration-400"
          style={{
            opacity: isMobile || isHovered ? 1 : 0,
            transform: isMobile || isHovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {isMobile ? (
            <button 
              onClick={handleQuickBuy}
              disabled={!firstVariant?.availableForSale}
              className="ml-auto block h-10 w-10 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground flex items-center justify-center shadow-[0_4px_16px_hsl(43_65%_52%/0.35)] active:scale-95 transition-all duration-200 disabled:opacity-40"
            >
              <Plus className="w-4.5 h-4.5" />
            </button>
          ) : (
            <button 
              onClick={handleQuickBuy}
              disabled={!firstVariant?.availableForSale}
              className="w-full backdrop-blur-xl bg-background/70 border border-primary/20 text-foreground h-11 rounded-lg font-semibold tracking-wide text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_hsl(43_65%_52%/0.15)] hover:bg-background/85 hover:border-primary/40 hover:shadow-[0_4px_24px_hsl(43_65%_52%/0.3)] active:scale-[0.98] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
            >
              <Plus className="w-4 h-4 text-primary" />
              <span>Gyors Választás</span>
            </button>
          )}
        </div>

        {/* Concentration badge */}
        {(() => {
          const { concentration } = extractConcentration(node.title);
          return concentration ? (
            <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-background/80 backdrop-blur-sm text-[10px] font-semibold text-primary border border-primary/20 rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.15)]">
              {concentration}
            </div>
          ) : null;
        })()}

        {/* Stock badge */}
        {!firstVariant?.availableForSale && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-foreground/90 text-background text-xs font-medium rounded-full">
            Elfogyott
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1.5 md:space-y-2 px-0.5">
        {node.vendor && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {node.vendor}
          </p>
        )}
        <h3 className="font-display text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {node.title}
        </h3>
        <p className="text-base font-bold text-primary">
          {(node.variants?.edges?.length ?? 0) > 1 && <span className="text-xs font-normal text-muted-foreground mr-1">tól</span>}
          {formatHUF(price.amount)}
        </p>
      </div>
    </Link>
  );
};
