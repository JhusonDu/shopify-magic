import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          data-cart-trigger
          className="relative text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
        >
          <ShoppingBag className="h-5 w-5" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1"
              >
                <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground border-2 border-background font-semibold">
                  {totalItems}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-card/95 backdrop-blur-xl border-l border-border">
        <SheetHeader className="flex-shrink-0 pb-6 border-b border-border">
          <SheetTitle className="text-xl font-display">Kosár</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {totalItems === 0 ? "A kosarad üres" : `${totalItems} termék a kosaradban`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium mb-2">A kosarad üres</p>
                <p className="text-sm text-muted-foreground">Fedezd fel prémium parfümjeinket</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6 min-h-0">
                <div className="space-y-5">
                  {items.map((item, index) => (
                    <motion.div 
                      key={item.variantId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-3 rounded-lg bg-secondary/50 border border-border/50"
                    >
                      <div className="w-20 h-24 bg-background rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img 
                            src={item.product.node.images.edges[0].node.url} 
                            alt={item.product.node.title} 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium leading-tight mb-1 text-foreground">{item.product.node.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.selectedOptions.map(option => option.value).join(' • ')}
                        </p>
                        <p className="font-semibold text-primary">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" 
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1 bg-background rounded-lg p-1 border border-border">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 hover:bg-primary/10 hover:text-primary rounded-md" 
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 hover:bg-primary/10 hover:text-primary rounded-md" 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Részösszeg</span>
                  <span className="text-2xl font-bold text-foreground font-display">
                    {items[0]?.price.currencyCode || 'Ft'} {totalPrice.toFixed(0)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">A szállítási díj a pénztárnál kerül kiszámításra</p>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full bg-primary hover:bg-accent text-primary-foreground h-14 text-base rounded-md font-semibold tracking-cta transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20" 
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Pénztár
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>100% Eredeti Parfümök</span>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
