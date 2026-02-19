import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProducts } from "@/hooks/useProducts";
import {
  Search, Sparkles, X, Sun, Moon, Briefcase, Star,
  TreePine, Droplets, Flower2, Flame, Snowflake, Calendar,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: "search" | "finder";
}

type Tab = "search" | "finder";

const OPTION_ICONS: Record<string, React.ReactNode> = {
  "Hétköznapi": <Sun className="h-4 w-4" />,
  "Esti / Randis": <Moon className="h-4 w-4" />,
  "Irodai": <Briefcase className="h-4 w-4" />,
  "Különleges alkalom": <Star className="h-4 w-4" />,
  "Fás / Woody": <TreePine className="h-4 w-4" />,
  "Friss / Citrusos": <Droplets className="h-4 w-4" />,
  "Virágos": <Flower2 className="h-4 w-4" />,
  "Orientális / Fűszeres": <Flame className="h-4 w-4" />,
  "Tavasz / Nyár": <Sun className="h-4 w-4" />,
  "Ősz / Tél": <Snowflake className="h-4 w-4" />,
  "Egész évben": <Calendar className="h-4 w-4" />,
};

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

export const SearchCommand = ({ open, onOpenChange, initialTab = "search" }: SearchCommandProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [finderStep, setFinderStep] = useState(0);
  const [finderAnswers, setFinderAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (open) setActiveTab(initialTab);
  }, [open, initialTab]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setDebouncedSearch("");
      setFinderStep(0);
      setFinderAnswers([]);
    }
  }, [open]);

  const finderQuery =
    finderAnswers.length === FINDER_QUESTIONS.length
      ? finderAnswers.join(" ")
      : undefined;

  const { data: products, isLoading } = useProducts(
    10,
    activeTab === "search" ? debouncedSearch || undefined : finderQuery
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

  const formatPrice = (amount: string, currencyCode: string) =>
    new Intl.NumberFormat("hu-HU", { style: "currency", currency: currencyCode }).format(parseFloat(amount));

  const finderComplete = finderAnswers.length === FINDER_QUESTIONS.length;
  const showSearchResults = activeTab === "search" && debouncedSearch.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 border-border/50 bg-card overflow-hidden backdrop-blur-xl">
        <VisuallyHidden>
          <DialogTitle>Keresés</DialogTitle>
        </VisuallyHidden>

        {/* Tabs */}
        <div className="flex p-2 gap-2 border-b border-border/50">
          <button
            onClick={() => setActiveTab("search")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "search"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Search className="h-4 w-4" />
            Keresés
          </button>
          <button
            onClick={() => setActiveTab("finder")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "finder"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Találd meg az illatodat
          </button>
        </div>

        {/* Search Tab */}
        {activeTab === "search" && (
          <div className="flex flex-col">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30">
              <Search className="h-5 w-5 text-primary shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Keresés az illatok között..."
                className="flex-1 bg-transparent text-foreground text-base outline-none placeholder:text-muted-foreground font-medium"
                autoFocus
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border/50 bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground font-mono">
                Ctrl+K
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto">
              {!showSearchResults && !isLoading && (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-7 w-7 text-primary/60" />
                  </div>
                  <p className="text-sm text-muted-foreground">Kezdj el gépelni a kereséshez...</p>
                </div>
              )}

              {isLoading && showSearchResults && (
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl">
                      <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>
              )}

              {showSearchResults && !isLoading && products && products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-7 w-7 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm text-muted-foreground">Nincs találat erre: „{debouncedSearch}"</p>
                </div>
              )}

              {showSearchResults && !isLoading && products && products.length > 0 && (
                <div className="p-2">
                  {products.map((product, idx) => {
                    const p = product.node;
                    const image = p.images.edges[0]?.node;
                    const price = p.priceRange.minVariantPrice;
                    return (
                      <motion.button
                        key={p.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleSelect(p.handle)}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-primary/8 transition-all duration-200 group text-left"
                      >
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || p.title}
                            className="h-14 w-14 rounded-xl object-cover shrink-0 ring-1 ring-border/30 group-hover:ring-primary/30 transition-all"
                          />
                        ) : (
                          <div className="h-14 w-14 rounded-xl bg-muted shrink-0 flex items-center justify-center">
                            <Droplets className="h-5 w-5 text-muted-foreground/40" />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {p.title}
                          </span>
                          {p.vendor && (
                            <span className="text-xs text-muted-foreground mt-0.5">{p.vendor}</span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-primary shrink-0">
                          {formatPrice(price.amount, price.currencyCode)}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors shrink-0" />
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Finder Tab */}
        {activeTab === "finder" && (
          <div className="p-5">
            {!finderComplete ? (
              <div className="space-y-5">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {finderStep + 1}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">/ {FINDER_QUESTIONS.length}</span>
                    </div>
                    {finderStep > 0 && (
                      <button
                        onClick={resetFinder}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        Újrakezdés
                      </button>
                    )}
                  </div>
                  <Progress
                    value={((finderStep) / FINDER_QUESTIONS.length) * 100}
                    className="h-1.5 bg-border/50"
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={finderStep}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-foreground font-serif">
                      {FINDER_QUESTIONS[finderStep].question}
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {FINDER_QUESTIONS[finderStep].options.map((option) => (
                        <motion.button
                          key={option}
                          onClick={() => handleFinderAnswer(option)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-xl border border-border/60 bg-secondary/50 hover:border-primary/40 hover:bg-primary/8 transition-all duration-200 text-foreground text-left group"
                        >
                          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                            {OPTION_ICONS[option] || <Sparkles className="h-4 w-4" />}
                          </span>
                          <span>{option}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground font-serif">Neked ajánljuk</h3>
                  <button
                    onClick={resetFinder}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
                  >
                    Újrakezdés
                  </button>
                </div>

                {isLoading && (
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="rounded-xl border border-border/30 p-3 space-y-2">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                )}

                {!isLoading && products && products.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Sparkles className="h-6 w-6 text-muted-foreground/40" />
                    </div>
                    <p className="text-sm text-muted-foreground">Nincs találat a megadott feltételekkel.</p>
                  </div>
                )}

                {!isLoading && products && products.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                    {products.map((product, idx) => {
                      const p = product.node;
                      const image = p.images.edges[0]?.node;
                      const price = p.priceRange.minVariantPrice;
                      return (
                        <motion.button
                          key={p.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.06 }}
                          onClick={() => handleSelect(p.handle)}
                          className="flex flex-col rounded-xl border border-border/40 bg-secondary/30 hover:border-primary/30 transition-all duration-200 overflow-hidden text-left group"
                        >
                          {image ? (
                            <img
                              src={image.url}
                              alt={image.altText || p.title}
                              className="aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="aspect-square w-full bg-muted flex items-center justify-center">
                              <Droplets className="h-8 w-8 text-muted-foreground/30" />
                            </div>
                          )}
                          <div className="p-3 space-y-1.5">
                            <p className="text-xs font-semibold text-foreground truncate leading-tight">{p.title}</p>
                            {p.vendor && (
                              <p className="text-[10px] text-muted-foreground">{p.vendor}</p>
                            )}
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-xs font-bold text-primary">
                                {formatPrice(price.amount, price.currencyCode)}
                              </span>
                              <span className="text-[10px] font-medium text-primary/70 group-hover:text-primary transition-colors flex items-center gap-0.5">
                                Megnézem <ArrowRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
