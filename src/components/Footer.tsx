import { Link } from "react-router-dom";
import { ShieldCheck, Lock, RefreshCcw } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Összes Termék", href: "/termekek", isRoute: true },
    { label: "Kedvenceink", href: "#bestsellers", isRoute: false },
  ],
  bundle: [
    { label: "Doboz Összeállítása", href: "#bundle-builder", isRoute: false },
  ],
  company: [
    { label: "Eredetiség", href: "#authenticity", isRoute: false },
  ]
};

const trustItems = [
  { icon: ShieldCheck, text: "Eredetiségi Garancia" },
  { icon: Lock, text: "Biztonságos Fizetés" },
  { icon: RefreshCcw, text: "14 Napos Visszaküldés" },
];

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Trust Row */}
      <div className="border-b border-border">
        <div className="container py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-bold text-primary-foreground font-display">S</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground font-display">
                ScentBox
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Prémium designer parfümök, precízen dekantálva. 100% eredeti illatok, 
              luxus élményként a küszöbödre szállítva.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Termékek</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Összeállítás</h4>
            <ul className="space-y-3">
              {footerLinks.bundle.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Információ</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
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
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Adatvédelem
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              ÁSZF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
