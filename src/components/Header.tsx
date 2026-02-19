import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoIcon from "@/assets/logo-icon.png";
import { SearchCommand } from "./SearchCommand";
import { ToolboxPanel } from "./ToolboxPanel";
import { LoginDialog } from "./LoginDialog";

interface HeaderProps {
  isSearchOpen?: boolean;
  onSearchOpenChange?: (open: boolean) => void;
  searchInitialTab?: "search" | "finder";
}

export const Header = ({ isSearchOpen: externalOpen, onSearchOpenChange, searchInitialTab = "search" }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

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
          <nav className="hidden md:flex items-center gap-8 ml-10">
            {[
              { to: "/termekek", label: "Termékek" },
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
                onClick={() => setIsToolboxOpen(true)}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
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
    </>
  );
};
