import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Search, Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Termékek", href: "/shop" },
    { label: "Doboz Összeállítása", href: "#bundle-builder" },
    { label: "Kedvencek", href: "#bestsellers" },
    { label: "Eredetiség", href: "#authenticity" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-primary/20" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-card border-border">
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
            <span className="text-lg font-bold text-primary-foreground font-display">S</span>
          </div>
          <span className="text-xl md:text-2xl font-semibold tracking-tight text-foreground font-display">
            ScentBox
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-primary relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-primary">
            <User className="h-5 w-5" />
          </Button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
