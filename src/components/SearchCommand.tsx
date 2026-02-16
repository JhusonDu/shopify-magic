import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useProducts } from "@/hooks/useProducts";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchCommand = ({ open, onOpenChange }: SearchCommandProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setSearch("");
      setDebouncedSearch("");
    }
  }, [open]);

  const { data: products, isLoading } = useProducts(
    10,
    debouncedSearch || undefined
  );

  const handleSelect = useCallback(
    (handle: string) => {
      onOpenChange(false);
      navigate(`/product/${handle}`);
    },
    [navigate, onOpenChange]
  );

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Keresés az illatok között..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>
          {isLoading ? "Keresés..." : "Nincs találat."}
        </CommandEmpty>
        {products && products.length > 0 && (
          <CommandGroup heading="Illatok">
            {products.map((product) => {
              const p = product.node;
              const image = p.images.edges[0]?.node;
              const price = p.priceRange.minVariantPrice;
              return (
                <CommandItem
                  key={p.id}
                  value={p.title}
                  onSelect={() => handleSelect(p.handle)}
                  className="flex items-center gap-3 cursor-pointer py-3"
                >
                  {image && (
                    <img
                      src={image.url}
                      alt={image.altText || p.title}
                      className="h-10 w-10 rounded-md object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-medium truncate">
                      {p.title}
                    </span>
                    {p.vendor && (
                      <span className="text-xs text-muted-foreground">
                        {p.vendor}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-primary ml-auto flex-shrink-0">
                    {formatPrice(price.amount, price.currencyCode)}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};
