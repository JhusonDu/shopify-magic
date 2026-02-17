import { Link } from "react-router-dom";
import { Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { Button } from "./ui/button";
import logoIcon from "@/assets/logo-icon.png";

const productLinks = [
  { label: "Összes Termék", href: "/termekek", isRoute: true },
  { label: "Férfi Illatok", href: "/termekek?gender=Férfi", isRoute: true },
  { label: "Női Illatok", href: "/termekek?gender=Női", isRoute: true },
  { label: "Kedvenceink", href: "/#bestsellers", isRoute: false },
];

const helpLinks = [
  { label: "Hogyan Rendeljek?", href: "/tamogatas" },
  { label: "Szállítási Információk", href: "/tamogatas" },
  { label: "Fizetési Módok", href: "/tamogatas" },
  { label: "Visszaküldés", href: "/tamogatas" },
];

const companyLinks = [
  { label: "Rólunk", href: "/rolunk", isRoute: true },
  { label: "Eredetiség", href: "/#authenticity", isRoute: false },
  { label: "Kapcsolat", href: "/tamogatas", isRoute: true },
];

export const Footer = () => {
  return (
    <footer id="footer" className="bg-background">
      {/* CTA Banner */}
      <div className="border-y border-primary/20 bg-card">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl md:text-2xl font-display text-foreground">
              Kérdésed van? Segítünk választani!
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Vedd fel velünk a kapcsolatot és megtaláljuk a tökéletes illatot.
            </p>
          </div>
          <Button asChild className="rounded-full px-8">
            <Link to="/tamogatas">Kapcsolatfelvétel</Link>
          </Button>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoIcon} alt="ScentBox" className="h-10 w-10 object-contain" />
              <span className="text-xl font-semibold tracking-tight text-foreground font-display">
                ScentBox Hungary
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Prémium designer parfümök, precízen dekantálva. 100% eredeti illatok, luxus élményként a küszöbödre szállítva.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@scentbox.hu</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Budapest, Magyarország</span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z"/></svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">Termékek</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">Segítség</h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">Cég</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ScentBox Hungary. Minden jog fenntartva.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">Adatvédelem</a>
            <a href="/terms" className="hover:text-foreground transition-colors">ÁSZF</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
