import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronDown, Phone, Mail } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUBMENU_ITEMS = [
  { label: "Férfi Illatok", path: "/termekek?gender=Férfi" },
  { label: "Női Illatok", path: "/termekek?gender=Női" },
  { label: "Unisex Illatok", path: "/termekek?gender=Uniszex" },
  { label: "Kedvenceink", scrollTo: "#bestsellers" },
];

const MENU_ITEMS = [
  { label: "Termékek", path: "/termekek", hasSubmenu: true },
  { label: "Rólunk", path: "/rolunk" },
  { label: "Kapcsolat", path: "/tamogatas" },
  { label: "Segítség", path: "/tamogatas" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "tween" as const, duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { x: "100%", transition: { type: "tween" as const, duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.05, duration: 0.3 },
  }),
};

export const MobileNav = ({ open, onOpenChange }: MobileNavProps) => {
  const navigate = useNavigate();
  const [productsOpen, setProductsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setProductsOpen(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  // Swipe to close
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) close();
  };

  const goTo = (path: string) => {
    navigate(path);
    close();
  };

  const scrollTo = (id: string) => {
    close();
    setTimeout(() => {
      const el = document.getElementById(id.replace("#", "")) ?? document.querySelector(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-black/60"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigációs menü"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="fixed top-0 right-0 z-[1001] h-full w-[85vw] max-w-[400px] max-[375px]:w-[90vw] bg-background rounded-l-xl flex flex-col overflow-hidden"
            style={{
              boxShadow: "0 0 40px rgba(0,0,0,0.3)",
              willChange: "transform",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <img src={logoIcon} alt="ScentBox" className="h-8 w-8 object-contain" />
                <span className="text-foreground text-lg font-bold tracking-tight">
                  ScentBox Hungary
                </span>
              </div>
              <button
                onClick={close}
                aria-label="Menü bezárása"
                className="z-[1002] p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>

            {/* CTA */}
            <div className="px-5 pt-4 pb-2 shrink-0">
              <button
                onClick={() => goTo("/termekek")}
                className="w-full py-2.5 px-5 rounded-full text-white text-sm font-medium transition-transform active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #f4e4c1)",
                  boxShadow: "0 2px 8px rgba(212,175,55,0.3)",
                }}
              >
                Böngészd az Illatokat
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
              <div className="space-y-0">
                {MENU_ITEMS.map((item, i) => (
                  <motion.div key={item.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    {item.hasSubmenu ? (
                      <>
                        <button
                          onClick={() => setProductsOpen(!productsOpen)}
                          className="flex items-center justify-between w-full py-4 text-left text-lg font-medium text-foreground/90 border-b border-white/10 transition-colors active:bg-primary/10 hover:text-primary"
                          style={{ letterSpacing: "0.02em" }}
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: productsOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 text-primary" />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {productsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pl-5 py-2 space-y-1">
                                {SUBMENU_ITEMS.map((sub) => (
                                  <button
                                    key={sub.label}
                                    onClick={() =>
                                      sub.scrollTo ? scrollTo(sub.scrollTo) : goTo(sub.path!)
                                    }
                                    className="block w-full text-left py-2.5 text-base text-foreground/60 hover:text-primary transition-colors active:bg-primary/10 rounded-md px-2"
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button
                        onClick={() => goTo(item.path)}
                        className="flex items-center justify-between w-full py-4 text-left text-lg font-medium text-foreground/90 border-b border-white/10 transition-colors active:bg-primary/10 hover:text-primary"
                        style={{ letterSpacing: "0.02em" }}
                      >
                        {item.label}
                        <ChevronRight className="h-5 w-5 text-primary" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <a
                  href="tel:+3612345678"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors py-2"
                >
                  <Phone className="h-[18px] w-[18px] text-primary" />
                  <span className="text-base">+36 1 234 5678</span>
                </a>
                <a
                  href="mailto:info@scentbox.hu"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors py-2"
                >
                  <Mail className="h-[18px] w-[18px] text-primary" />
                  <span className="text-base">info@scentbox.hu</span>
                </a>
              </div>
            </nav>

            {/* Promo Banner */}
            <div
              className="shrink-0 px-6 py-8 border-t border-primary/20"
              style={{
                background: "linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #0f1419 100%)",
              }}
            >
              <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Prémium Illatok, Különleges Áron
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Fedezd fel designer parfümjeinket
              </p>
              <button
                onClick={() => goTo("/termekek")}
                className="px-7 py-3 rounded-full text-sm font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
              >
                Mutasd meg
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
