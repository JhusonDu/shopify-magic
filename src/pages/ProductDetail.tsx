import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Minus, Plus, ShoppingBag, Loader2, PackageOpen, Check } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useProductByHandle(handle || "");
  const addItem = useCartStore(state => state.addItem);
  const isAddingToCart = useCartStore(state => state.isLoading);
  
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <Skeleton className="h-6 w-32 mb-10" />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-4">
              <Skeleton className="aspect-[4/5] rounded-2xl" />
              <div className="flex gap-3">
                {[1,2,3].map(i => <Skeleton key={i} className="w-20 h-20 rounded-xl" />)}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-24">
          <div className="flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-8">
              <PackageOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Product not found</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              The product you're looking for doesn't exist or may have been removed.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Shop</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const selectedVariant = variants.find(v => v.node.id === selectedVariantId)?.node || variants[0]?.node;
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success("Added to cart", {
      description: `${quantity}x ${product.title}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10 md:py-16">
        {/* Breadcrumb */}
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
              {images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-20 h-20 text-muted-foreground/30" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === selectedImage 
                        ? "border-accent ring-2 ring-accent/20" 
                        : "border-transparent hover:border-muted"
                    }`}
                  >
                    <img
                      src={img.node.url}
                      alt={img.node.altText || `${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col animate-slide-in-right">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-3xl font-semibold text-accent mb-8">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            {/* Variants */}
            {product.options && product.options.length > 0 && product.options[0].name !== "Title" && (
              <div className="space-y-6 mb-10">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="text-sm font-medium mb-4 block uppercase tracking-wider text-muted-foreground">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {option.values.map((value) => {
                        const matchingVariant = variants.find(v => 
                          v.node.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                        );
                        const isSelected = selectedVariant?.selectedOptions.some(
                          opt => opt.name === option.name && opt.value === value
                        );
                        const isAvailable = matchingVariant?.node.availableForSale;
                        
                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            onClick={() => matchingVariant && setSelectedVariantId(matchingVariant.node.id)}
                            disabled={!isAvailable}
                            className={`h-12 px-6 rounded-xl transition-all ${
                              isSelected 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:border-accent hover:text-accent"
                            } ${!isAvailable ? "opacity-50 line-through" : ""}`}
                          >
                            {value}
                            {isSelected && <Check className="ml-2 h-4 w-4" />}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
              <label className="text-sm font-medium mb-4 block uppercase tracking-wider text-muted-foreground">
                Quantity
              </label>
              <div className="inline-flex items-center gap-1 bg-secondary rounded-xl p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-14 text-center font-semibold text-lg">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !selectedVariant?.availableForSale}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-16 text-lg rounded-xl shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:shadow-accent/30"
            >
              {isAddingToCart ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="mr-3 h-6 w-6" />
                  Add to Cart — {price.currencyCode} {(parseFloat(price.amount) * quantity).toFixed(2)}
                </>
              )}
            </Button>

            {!selectedVariant?.availableForSale && (
              <p className="text-sm text-destructive mt-4 text-center font-medium">
                This variant is currently out of stock
              </p>
            )}

            {/* Trust badges */}
            <div className="mt-10 pt-10 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-2xl mb-2 block">🚚</span>
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div>
                  <span className="text-2xl mb-2 block">↩️</span>
                  <span className="text-xs text-muted-foreground">Easy Returns</span>
                </div>
                <div>
                  <span className="text-2xl mb-2 block">💳</span>
                  <span className="text-xs text-muted-foreground">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
