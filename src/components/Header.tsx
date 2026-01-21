import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for sticky header effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-background/98 backdrop-blur-md shadow-sm border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="flex flex-col gap-6 mt-8">
              <Link to="/" className="text-lg font-medium hover:text-accent transition-colors">
                Shop All
              </Link>
              <Link to="/" className="text-lg font-medium hover:text-accent transition-colors">
                New Arrivals
              </Link>
              <Link to="/" className="text-lg font-medium hover:text-accent transition-colors">
                Collections
              </Link>
              <Link to="/" className="text-lg font-medium hover:text-accent transition-colors">
                Our Story
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent transition-transform duration-300 group-hover:scale-105">
            <span className="text-lg font-bold text-accent-foreground">S</span>
          </div>
          <span className="text-xl md:text-2xl font-semibold tracking-tight">Savor</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
            Shop All
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
            New Arrivals
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
            Collections
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
            Our Story
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
