import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
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
  priceRange: [number, number];
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
  let minPrice = Infinity;
  let maxPrice = 0;
  for (const p of products) {
    if (p.node.vendor) brands.add(p.node.vendor);
    if (p.node.productType) types.add(p.node.productType);
    const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
    if (price < minPrice) minPrice = price;
    if (price > maxPrice) maxPrice = price;
  }
  return {
    genders: ["Férfi", "Női", "Uniszex"],
    brands: Array.from(brands).sort(),
    types: Array.from(types).sort(),
    priceBounds: [
      minPrice === Infinity ? 0 : Math.floor(minPrice),
      maxPrice === 0 ? 100000 : Math.ceil(maxPrice),
    ] as [number, number],
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
    // Price range filter
    if (filters.priceRange) {
      const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
    }
    return true;
  });
  if (filters.sort && filters.sort !== "default" && filters.sort !== "recommended") {
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
        <SelectValue placeholder="Ajánlott" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border z-50">
        <SelectItem value="recommended">Ajánlott</SelectItem>
        <SelectItem value="price-asc">Ár: alacsony → magas</SelectItem>
        <SelectItem value="price-desc">Ár: magas → alacsony</SelectItem>
        <SelectItem value="name-asc">Név: A → Z</SelectItem>
        <SelectItem value="name-desc">Név: Z → A</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

/* ── Budget presets ── */
const BUDGET_PRESETS: { label: string; range: [number, number] | null }[] = [
  { label: "Összes ár", range: null },
  { label: "< 5 000 Ft", range: [0, 5000] },
  { label: "5 000 - 10 000 Ft", range: [5000, 10000] },
  { label: "10 000 - 20 000 Ft", range: [10000, 20000] },
  { label: "20 000+ Ft", range: [20000, 100000] },
];

function formatHuf(n: number): string {
  return n.toLocaleString("hu-HU");
}

function parseHuf(s: string): number {
  return parseInt(s.replace(/\s/g, "").replace(/[^0-9]/g, ""), 10) || 0;
}

const PriceRangeFilter = ({
  priceRange,
  priceBounds,
  onChange,
}: {
  priceRange: [number, number];
  priceBounds: [number, number];
  onChange: (range: [number, number]) => void;
}) => {
  const isPresetActive = (preset: { range: [number, number] | null }) => {
    if (!preset.range) {
      return priceRange[0] === priceBounds[0] && priceRange[1] === priceBounds[1];
    }
    return priceRange[0] === preset.range[0] &&
      priceRange[1] === Math.min(preset.range[1], priceBounds[1]);
  };

  const handlePreset = (preset: { range: [number, number] | null }) => {
    if (!preset.range) {
      onChange([priceBounds[0], priceBounds[1]]);
    } else {
      onChange([
        Math.max(preset.range[0], priceBounds[0]),
        Math.min(preset.range[1], priceBounds[1]),
      ]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Ár tartomány
        </span>
        {(priceRange[0] !== priceBounds[0] || priceRange[1] !== priceBounds[1]) && (
          <Badge variant="default" className="h-5 min-w-5 px-1.5 text-[10px]">1</Badge>
        )}
      </div>

      {/* Slider */}
      <div className="px-1">
        <Slider
          value={priceRange}
          onValueChange={(v) => onChange(v as [number, number])}
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={500}
          className="w-full"
        />
      </div>

      {/* Min / Max inputs */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            value={formatHuf(priceRange[0])}
            onChange={(e) => {
              const v = parseHuf(e.target.value);
              if (v <= priceRange[1]) onChange([v, priceRange[1]]);
            }}
            className="h-8 text-xs text-right pr-8 bg-secondary border-border"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">Ft</span>
        </div>
        <span className="text-muted-foreground text-xs">–</span>
        <div className="flex-1 relative">
          <Input
            type="text"
            value={formatHuf(priceRange[1])}
            onChange={(e) => {
              const v = parseHuf(e.target.value);
              if (v >= priceRange[0]) onChange([priceRange[0], v]);
            }}
            className="h-8 text-xs text-right pr-8 bg-secondary border-border"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">Ft</span>
        </div>
      </div>

      {/* Budget presets */}
      <div className="flex flex-wrap gap-1.5">
        {BUDGET_PRESETS.map((preset) => (
          <FilterChip
            key={preset.label}
            label={preset.label}
            selected={isPresetActive(preset)}
            onClick={() => handlePreset(preset)}
          />
        ))}
      </div>
    </div>
  );
};

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
  const options = useMemo(() => extractFilterOptions(products), [products]);

  const isPriceActive = filters.priceRange[0] !== options.priceBounds[0] || filters.priceRange[1] !== options.priceBounds[1];
  const activeCount = filters.genders.length + filters.brands.length + filters.types.length + (isPriceActive ? 1 : 0);

  const toggle = (key: keyof Omit<ProductFiltersState, "sort" | "priceRange">, value: string) => {
    const current = filters[key] as string[];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  const clearAll = () => onFiltersChange({
    genders: [], brands: [], types: [], sort: filters.sort,
    priceRange: [options.priceBounds[0], options.priceBounds[1]],
  });

  const filterContent = (
    <div className="space-y-6">
      <SortSelect value={filters.sort} onChange={(v) => onFiltersChange({ ...filters, sort: v })} />
      <div className="border-t border-border" />
      <PriceRangeFilter
        priceRange={filters.priceRange}
        priceBounds={options.priceBounds}
        onChange={(range) => onFiltersChange({ ...filters, priceRange: range })}
      />
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
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none"
          >
            <Button className="rounded-full px-8 h-12 shadow-2xl gap-2 pointer-events-auto" size="lg">
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
