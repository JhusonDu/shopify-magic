import { Link, useNavigate } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Menu, X, User, ChevronDown, Star, BoxIcon, ShoppingBag, Users as UsersIcon, Droplets } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoIcon from "@/assets/logo-icon.png";
import { SearchCommand } from "./SearchCommand";
import { ToolboxPanel } from "./ToolboxPanel";
import { LoginDialog } from "./LoginDialog";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  isSearchOpen?: boolean;
  onSearchOpenChange?: (open: boolean) => void;
  searchInitialTab?: "search" | "finder";
}

export const Header = ({ isSearchOpen: externalOpen, onSearchOpenChange, searchInitialTab = "search" }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSearchOpen = externalOpen ?? internalOpen;
  const setIsSearchOpen = onSearchOpenChange ?? setInternalOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl+K / Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsProductsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 150);
  };

  const dropdownNavigate = (path: string) => {
    setIsProductsDropdownOpen(false);
    navigate(path);
  };

  const scrollToSection = (id: string) => {
    setIsProductsDropdownOpen(false);
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(id) ?? document.querySelector(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-black/10"
            : "bg-gradient-to-b from-background/90 md:from-background/80 to-transparent"
        }`}
      >
        <div className="container flex h-14 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={logoIcon}
                alt="ScentBox"
                className="h-10 w-10 md:h-11 md:w-11 object-contain relative z-10 drop-shadow-lg"
              />
            </motion.div>
            <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground font-display leading-tight">
              ScentBox<span className="hidden md:inline"> Hungary</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {/* Termékek with hover dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/termekek"
                className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 group/nav flex items-center gap-1"
              >
                Termékek
                <motion.span
                  animate={{ rotate: isProductsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover/nav:w-full" />
              </Link>

              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[380px] z-[60]"
                  >
                    <div
                      className="bg-[#0c0c0c] border border-primary/20 rounded-xl backdrop-blur-xl p-5 grid grid-cols-2 gap-6"
                      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(212,175,55,0.06)" }}
                    >
                      {/* Left column - Kategóriák */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <UsersIcon className="h-3.5 w-3.5 text-primary/60" />
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Kategóriák</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { label: "Férfi", path: "/termekek?gender=Férfi" },
                            { label: "Női", path: "/termekek?gender=Női" },
                            { label: "Uniszex", path: "/termekek?gender=Uniszex" },
                          ].map((item, i) => (
                            <motion.button
                              key={item.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => dropdownNavigate(item.path)}
                              className="block w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                            >
                              {item.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Right column - Népszerű */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="h-3.5 w-3.5 text-primary/60" />
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Népszerű</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { label: "Kedvenceink", icon: Star, action: () => scrollToSection("#bestsellers") },
                            { label: "Doboz Összeállítás", icon: BoxIcon, action: () => scrollToSection("#bundle-builder") },
                            { label: "Összes Termék", icon: ShoppingBag, action: () => dropdownNavigate("/termekek") },
                          ].map((item, i) => (
                            <motion.button
                              key={item.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 + i * 0.05 }}
                              onClick={item.action}
                              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                            >
                              <item.icon className="h-3.5 w-3.5 text-primary/40" />
                              {item.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Bottom divider + CTA */}
                      <div className="col-span-2 pt-3 border-t border-primary/10">
                        <button
                          onClick={() => dropdownNavigate("/termekek")}
                          className="w-full text-center text-xs font-medium text-primary/70 hover:text-primary transition-colors duration-200 py-1"
                        >
                          Minden termék megtekintése →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {[
              { to: "/rolunk", label: "Rólunk" },
              { to: "/tamogatas", label: "Kapcsolat" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 group/nav"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover/nav:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions: Login + Cart + Settings */}
          <div className="flex items-center gap-1 md:gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLoginOpen(true)}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
              >
                <User className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CartDrawer />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => isMobile ? setIsMobileMenuOpen(true) : setIsToolboxOpen(true)}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen && isMobile ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />
          )}
        </AnimatePresence>
      </motion.header>

      <SearchCommand open={isSearchOpen} onOpenChange={setIsSearchOpen} initialTab={searchInitialTab} />
      <ToolboxPanel open={isToolboxOpen} onOpenChange={setIsToolboxOpen} />
      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <MobileNav open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />
    </>
  );
};
