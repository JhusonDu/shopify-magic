import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Search, Menu, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import logoIcon from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Termékek", href: "/termekek", isRoute: true },
  { label: "Doboz Összeállítása", href: "#bundle-builder", isRoute: false },
  { label: "Kedvencek", href: "#bestsellers", isRoute: false },
  { label: "Eredetiség", href: "#authenticity", isRoute: false },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-black/10" 
          : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-card/95 backdrop-blur-xl border-border p-0">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src={logoIcon} alt="ScentBox" className="h-10 w-10 object-contain" />
                  <span className="text-xl font-semibold text-foreground font-display">ScentBox</span>
                </Link>
              </div>
              
              <nav className="flex-1 p-6">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    link.isRoute ? (
                      <motion.div 
                        key={link.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-3 transition-all duration-300" />
                          {link.label}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-3 transition-all duration-300" />
                        {link.label}
                      </motion.a>
                    )
                  ))}
                </div>
              </nav>
              
              {/* Mobile Footer */}
              <div className="p-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="rounded-full border-border hover:border-primary hover:bg-primary/10">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-border hover:border-primary hover:bg-primary/10">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
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
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground font-display leading-tight">
              ScentBox
            </span>
            <span className="text-[10px] text-primary/80 tracking-widest uppercase hidden sm:block">
              Hungary
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, index) => (
            link.isRoute ? (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link 
                  to={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground group block"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 group-hover:w-3/4" />
                </Link>
              </motion.div>
            ) : (
              <motion.a 
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 group-hover:w-3/4" />
              </motion.a>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center gap-1"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
            >
              <User className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CartDrawer />
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom line when scrolled */}
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
  );
};
