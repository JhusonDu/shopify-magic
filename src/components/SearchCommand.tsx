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
import { Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: "search" | "finder";
}

type Tab = "search" | "finder";

const FINDER_QUESTIONS = [
  {
    question: "Milyen alkalomra keresed?",
    options: ["Hétköznapi", "Esti / Randis", "Irodai", "Különleges alkalom"],
  },
  {
    question: "Milyen illatcsaládot kedvelsz?",
    options: ["Fás / Woody", "Friss / Citrusos", "Virágos", "Orientális / Fűszeres"],
  },
  {
    question: "Melyik évszakban viselnéd leginkább?",
    options: ["Tavasz / Nyár", "Ősz / Tél", "Egész évben"],
  },
];

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
};

export const SearchCommand = ({ open, onOpenChange, initialTab = "search" }: SearchCommandProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [finderStep, setFinderStep] = useState(0);
  const [finderAnswers, setFinderAnswers] = useState<string[]>([]);

  // Sync initialTab when dialog opens
  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setSearch("");
      setDebouncedSearch("");
      setFinderStep(0);
      setFinderAnswers([]);
    }
  }, [open]);

  // Build finder query from answers
  const finderQuery =
    finderAnswers.length === FINDER_QUESTIONS.length
      ? finderAnswers.join(" ")
      : undefined;

  const { data: products, isLoading } = useProducts(
    10,
    activeTab === "search"
      ? debouncedSearch || undefined
      : finderQuery
  );

  const handleSelect = useCallback(
    (handle: string) => {
      onOpenChange(false);
      navigate(`/product/${handle}`);
    },
    [navigate, onOpenChange]
  );

  const handleFinderAnswer = (answer: string) => {
    const newAnswers = [...finderAnswers, answer];
    setFinderAnswers(newAnswers);
    if (finderStep < FINDER_QUESTIONS.length - 1) {
      setFinderStep(finderStep + 1);
    }
  };

  const resetFinder = () => {
    setFinderStep(0);
    setFinderAnswers([]);
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const finderComplete = finderAnswers.length === FINDER_QUESTIONS.length;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("search")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "search"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Search className="h-4 w-4" />
          Keresés
        </button>
        <button
          onClick={() => setActiveTab("finder")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "finder"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          Találd meg az illatodat
        </button>
      </div>

      {activeTab === "search" ? (
        <>
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
        </>
      ) : (
        <div className="p-4">
          {!finderComplete ? (
            <div className="space-y-4">
              {/* Progress */}
              <div className="flex gap-1.5">
                {FINDER_QUESTIONS.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 flex-1 rounded-full"
                    animate={{
                      backgroundColor: i <= finderStep
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted))",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={finderStep}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted-foreground">
                    {finderStep + 1}/{FINDER_QUESTIONS.length}. kérdés
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">
                    {FINDER_QUESTIONS[finderStep].question}
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    {FINDER_QUESTIONS[finderStep].options.map((option) => (
                      <motion.button
                        key={option}
                        onClick={() => handleFinderAnswer(option)}
                        whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary))" }}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-3 text-sm font-medium rounded-lg border border-border bg-card hover:bg-primary/10 transition-colors text-foreground text-left"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {finderStep > 0 && (
                <button
                  onClick={resetFinder}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Újrakezdés
                </button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Neked ajánljuk
                </h3>
                <button
                  onClick={resetFinder}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Újrakezdés
                </button>
              </div>

              <CommandList>
                <CommandEmpty>
                  {isLoading ? "Keresés..." : "Nincs találat a megadott feltételekkel."}
                </CommandEmpty>
                {products && products.length > 0 && (
                  <CommandGroup>
                    {products.map((product, idx) => {
                      const p = product.node;
                      const image = p.images.edges[0]?.node;
                      const price = p.priceRange.minVariantPrice;
                      const desc = p.description
                        ? p.description.length > 80
                          ? p.description.slice(0, 80) + "…"
                          : p.description
                        : null;
                      return (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                        >
                          <CommandItem
                            value={p.title}
                            onSelect={() => handleSelect(p.handle)}
                            className="flex items-center gap-3 cursor-pointer py-3"
                          >
                            {image && (
                              <img
                                src={image.url}
                                alt={image.altText || p.title}
                                className="h-12 w-12 rounded-md object-cover flex-shrink-0"
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
                              {desc && (
                                <span className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-1">
                                  {desc}
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-semibold text-primary ml-auto flex-shrink-0">
                              {formatPrice(price.amount, price.currencyCode)}
                            </span>
                          </CommandItem>
                        </motion.div>
                      );
                    })}
                  </CommandGroup>
                )}
              </CommandList>
            </motion.div>
          )}
        </div>
      )}
    </CommandDialog>
  );
};
