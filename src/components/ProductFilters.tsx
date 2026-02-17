import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShopifyProduct } from "@/lib/shopify";

export interface ProductFiltersState {
  genders: string[];
  brands: string[];
  types: string[];
  sort: string;
}

// Gender mapping based on product handle/title keywords
const GENDER_KEYWORDS: Record<string, string[]> = {
  Férfi: ["sauvage", "bleu", "uomo", "homme", "code", "armani"],
  Női: ["n5", "libre", "la-vie", "donna", "interdit", "lancome"],
  Uniszex: ["oud-wood", "tom-ford"],
};

export function getProductGender(product: ShopifyProduct): string {
  const handle = product.node.handle.toLowerCase();
  const title = product.node.title.toLowerCase();
  for (const [gender, keywords] of Object.entries(GENDER_KEYWORDS)) {
    if (keywords.some((kw) => handle.includes(kw) || title.includes(kw))) {
      return gender;
    }
  }
  return "Uniszex";
}

export function extractFilterOptions(products: ShopifyProduct[]) {
  const brands = new Set<string>();
  const types = new Set<string>();
  for (const p of products) {
    if (p.node.vendor) brands.add(p.node.vendor);
    if (p.node.productType) types.add(p.node.productType);
  }
  return {
    genders: ["Férfi", "Női", "Uniszex"],
    brands: Array.from(brands).sort(),
    types: Array.from(types).sort(),
  };
}

function sortProducts(products: ShopifyProduct[], sort: string): ShopifyProduct[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
    case "price-desc":
      return sorted.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
    case "name-asc":
      return sorted.sort((a, b) => a.node.title.localeCompare(b.node.title, "hu"));
    case "name-desc":
      return sorted.sort((a, b) => b.node.title.localeCompare(a.node.title, "hu"));
    default:
      return sorted;
  }
}

export function applyFilters(
  products: ShopifyProduct[],
  filters: ProductFiltersState
): ShopifyProduct[] {
  let result = products.filter((p) => {
    if (filters.genders.length > 0) {
      const gender = getProductGender(p);
      if (!filters.genders.includes(gender)) return false;
    }
    if (filters.brands.length > 0) {
      if (!p.node.vendor || !filters.brands.includes(p.node.vendor)) return false;
    }
    if (filters.types.length > 0) {
      if (!p.node.productType || !filters.types.includes(p.node.productType)) return false;
    }
    return true;
  });
  if (filters.sort && filters.sort !== "default") {
    result = sortProducts(result, filters.sort);
  }
  return result;
}

/* ── Sub-components ── */

const FilterChip = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-3.5 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
      selected
        ? "border-primary bg-primary/15 text-primary shadow-[0_0_12px_hsl(43_65%_52%/0.15)]"
        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
    }`}
  >
    {label}
  </motion.button>
);

const FilterGroup = ({ title, options, selected, onToggle }: {
  title: string; options: string[]; selected: string[]; onToggle: (v: string) => void;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</span>
      {selected.length > 0 && (
        <Badge variant="default" className="h-5 min-w-5 px-1.5 text-[10px]">
          {selected.length}
        </Badge>
      )}
    </div>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <FilterChip key={opt} label={opt} selected={selected.includes(opt)} onClick={() => onToggle(opt)} />
      ))}
    </div>
  </div>
);

const SortSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="space-y-3">
    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Rendezés</span>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-secondary border-border text-foreground">
        <SelectValue placeholder="Alapértelmezett" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border z-50">
        <SelectItem value="default">Alapértelmezett</SelectItem>
        <SelectItem value="price-asc">Ár: alacsony → magas</SelectItem>
        <SelectItem value="price-desc">Ár: magas → alacsony</SelectItem>
        <SelectItem value="name-asc">Név: A → Z</SelectItem>
        <SelectItem value="name-desc">Név: Z → A</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

/* ── Main Component ── */

interface ProductFiltersProps {
  filters: ProductFiltersState;
  onFiltersChange: (filters: ProductFiltersState) => void;
  products: ShopifyProduct[];
}

export const ProductFilters = ({
  filters,
  onFiltersChange,
  products,
}: ProductFiltersProps) => {
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);
  const options = extractFilterOptions(products);

  const activeCount = filters.genders.length + filters.brands.length + filters.types.length;

  const toggle = (key: keyof Omit<ProductFiltersState, "sort">, value: string) => {
    const current = filters[key] as string[];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  const clearAll = () => onFiltersChange({ genders: [], brands: [], types: [], sort: filters.sort });

  const filterContent = (
    <div className="space-y-6">
      <SortSelect value={filters.sort} onChange={(v) => onFiltersChange({ ...filters, sort: v })} />
      <div className="border-t border-border" />
      <FilterGroup title="Nem" options={options.genders} selected={filters.genders} onToggle={(v) => toggle("genders", v)} />
      {options.brands.length > 0 && (
        <FilterGroup title="Márka" options={options.brands} selected={filters.brands} onToggle={(v) => toggle("brands", v)} />
      )}
      {options.types.length > 0 && (
        <FilterGroup title="Típus" options={options.types} selected={filters.types} onToggle={(v) => toggle("types", v)} />
      )}
    </div>
  );

  // Mobile: sticky bottom button + sheet
  if (isMobile) {
    return (
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <Button className="rounded-full px-6 h-12 shadow-xl gap-2" size="lg">
              <SlidersHorizontal className="w-4 h-4" />
              Szűrő
              {activeCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5 text-[10px]">
                  {activeCount}
                </Badge>
              )}
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl max-h-[80vh] overflow-y-auto">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-lg">Szűrők</SheetTitle>
          </SheetHeader>
          {filterContent}
          <div className="flex gap-3 mt-8 pb-4">
            {activeCount > 0 && (
              <Button variant="outline" onClick={clearAll} className="flex-1">
                Összes törlése
              </Button>
            )}
            <SheetClose asChild>
              <Button className="flex-1">Alkalmaz</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: vertical sidebar card
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 space-y-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          Szűrők
        </h3>
        <AnimatePresence>
          {activeCount > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground gap-1 h-7 px-2">
                <X className="w-3 h-3" />
                Törlés
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filterContent}
    </motion.div>
  );
};
