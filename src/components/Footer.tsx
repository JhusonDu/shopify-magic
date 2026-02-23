import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "./ui/button";
import { ContactModal } from "./ContactModal";
import logoIcon from "@/assets/logo-icon.png";

const productLinks = [
  { label: "Főoldal", href: "/", isRoute: true },
  { label: "Kollekciók", href: "/termekek", isRoute: true },
  { label: "Férfi Parfümök", href: "/termekek?gender=Férfi", isRoute: true },
  { label: "Női Parfümök", href: "/termekek?gender=Női", isRoute: true },
  { label: "Új Érkezések", href: "/termekek", isRoute: true },
  { label: "Akciók", href: "/termekek", isRoute: true },
];

const helpLinks = [
  { label: "GYIK", href: "/tamogatas" },
  { label: "Kapcsolat", href: "/tamogatas" },
  { label: "Szállítás & Visszaküldés", href: "/tamogatas" },
  { label: "Mérettábla", href: "/tamogatas" },
  { label: "Eredetiség Ellenőrzése", href: "/tamogatas" },
];

const companyLinks = [
  { label: "Rólunk", href: "/rolunk" },
  { label: "Adatvédelmi Irányelvek", href: "/privacy" },
  { label: "Felhasználási Feltételek", href: "/terms" },
  { label: "Cookie Szabályzat", href: "/privacy" },
];

const TikTokIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

export const Footer = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <footer id="footer" className="bg-background">
        {/* Pre-Footer CTA Banner */}
        <div
          className="border-y border-primary/20"
          style={{
            background: "linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 4%))",
          }}
        >
          <div className="container py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-[32px] font-display text-foreground leading-tight">
                Kérdésed van? Segítünk választani!
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mt-2">
                Vedd fel velünk a kapcsolatot és megtaláljuk a tökéletes
                illatot.
              </p>
            </div>
            <Button
              onClick={() => setContactOpen(true)}
              className="rounded px-10 py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-accent transition-all hover:-translate-y-0.5 shrink-0"
            >
              Kapcsolatfelvétel
            </Button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1: Brand */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-5">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={logoIcon}
                  alt="ScentBox"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-lg font-semibold tracking-tight text-foreground font-display">
                  ScentBox Hungary
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Prémium parfümök, autentikus élmények — 100% eredetiség
                garantálva.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {[
                  {
                    href: "https://instagram.com",
                    label: "Instagram",
                    icon: <Instagram className="h-4 w-4" />,
                  },
                  {
                    href: "https://facebook.com",
                    label: "Facebook",
                    icon: <Facebook className="h-4 w-4" />,
                  },
                  {
                    href: "https://tiktok.com",
                    label: "TikTok",
                    icon: <TikTokIcon />,
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Termékek */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[2px] text-primary mb-5">
                Termékek
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Segítség */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[2px] text-primary mb-5">
                Segítség
              </h4>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Cég */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[2px] text-primary mb-5">
                Cég
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2.5">
                <a
                  href="mailto:info@scentbox.hu"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  info@scentbox.hu
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  Válaszidő: ~24 óra
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border bg-black/30">
          <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ScentBox Hungary. Minden jog
              fenntartva.
            </p>
            {/* Payment icons */}
            <div className="flex items-center gap-3 opacity-50 grayscale">
              {/* Visa */}
              <svg className="h-6" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="white" />
                <path
                  d="M20.3 21.3l2.2-13.6h3.5l-2.2 13.6h-3.5zm14.1-13.3c-.7-.3-1.8-.5-3.1-.5-3.4 0-5.8 1.8-5.8 4.4-.1 1.9 1.7 3 3 3.6 1.3.7 1.8 1.1 1.8 1.7 0 .9-1.1 1.3-2.1 1.3-1.4 0-2.1-.2-3.3-.7l-.4-.2-.5 2.9c.8.4 2.3.7 3.9.7 3.6 0 6-1.8 6-4.5 0-1.5-.9-2.7-2.9-3.6-1.2-.6-1.9-1-1.9-1.7 0-.6.6-1.2 2-1.2 1.1 0 1.9.2 2.6.5l.3.1.4-2.8zm8.8-.3h-2.7c-.8 0-1.4.2-1.8 1.1l-5.1 12.5h3.6s.6-1.6.7-2h4.4c.1.5.4 2 .4 2h3.2l-2.7-13.6zm-4.2 8.8c.3-.8 1.4-3.7 1.4-3.7s.3-.8.5-1.3l.2 1.2s.7 3.3.8 4h-2.9v-.2zM18.3 7.7l-3.4 9.3-.4-1.8c-.6-2.1-2.6-4.4-4.8-5.5l3.1 11.6h3.6l5.4-13.6h-3.5z"
                  fill="#1A1F71"
                />
                <path
                  d="M12.4 7.7H7.1l-.1.3c4.3 1.1 7.2 3.8 8.4 7l-1.2-6.2c-.2-.8-.8-1.1-1.8-1.1z"
                  fill="#F9A533"
                />
              </svg>
              {/* Mastercard */}
              <svg className="h-6" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="white" />
                <circle cx="19" cy="16" r="9" fill="#EB001B" />
                <circle cx="29" cy="16" r="9" fill="#F79E1B" />
                <path
                  d="M24 9.3a9 9 0 013.5 7 9 9 0 01-3.5 7 9 9 0 01-3.5-7 9 9 0 013.5-7z"
                  fill="#FF5F00"
                />
              </svg>
              {/* PayPal */}
              <svg className="h-6" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="white" />
                <path
                  d="M18.5 24.2h-2.8c-.2 0-.3-.1-.3-.3l2.3-14.5c0-.1.2-.3.3-.3h4.8c1.6 0 2.7.3 3.4 1 .7.6 1 1.5.8 2.8-.3 2.1-1.5 3.4-3.6 3.7h-2.3c-.2 0-.3.2-.3.3l-.8 5.1c0 .1-.2.3-.3.3h-1.2z"
                  fill="#003087"
                />
                <path
                  d="M31.5 9.9c-.3 2.1-1.5 3.4-3.6 3.7h-2.3c-.2 0-.3.2-.3.3l-1.1 7c0 .1.1.3.3.3h2.4c.2 0 .3-.1.3-.3l.6-3.6c0-.1.2-.3.3-.3h.8c2.8 0 4.5-1.4 4.9-3.9.3-1.6-.1-2.6-.8-3.2h-1.5z"
                  fill="#0070E0"
                />
              </svg>
              {/* Apple Pay */}
              <svg className="h-6" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="white" />
                <path
                  d="M15.5 11.8c.4-.5.7-1.2.6-1.8-.6 0-1.3.4-1.7.9-.4.4-.7 1.1-.6 1.8.7 0 1.3-.4 1.7-.9zm.6 1c-.9-.1-1.7.5-2.2.5-.4 0-1.1-.5-1.8-.5-1 0-1.8.5-2.3 1.4-1 1.7-.3 4.2.7 5.6.5.7 1 1.4 1.8 1.4.7 0 1-.5 1.8-.5s1.1.5 1.8.5c.8 0 1.2-.7 1.7-1.4.5-.8.7-1.5.7-1.6-1-.3-1.1-1.7-.2-2.6-.6-.7-1.4-1-2-1.3z"
                  fill="black"
                />
                <path
                  d="M23 12.3v8.1h1.3v-2.8h1.8c1.6 0 2.8-1.1 2.8-2.7 0-1.6-1.1-2.7-2.7-2.7H23zm1.3 1.1h1.5c1.1 0 1.7.6 1.7 1.6s-.6 1.6-1.7 1.6h-1.5v-3.2zm7.2 7.1c.8 0 1.6-.4 2-.1.1v.1h1.2v-4.1c0-1.3-1-2.1-2.5-2.1-1.4 0-2.4.8-2.5 1.9h1.2c.1-.6.7-1 1.3-1 .9 0 1.3.4 1.3 1.2v.5l-1.8.1c-1.6.1-2.5.8-2.5 2 0 1.2.9 2 2.3 2zm.3-1c-.8 0-1.2-.4-1.2-.9 0-.6.5-.9 1.3-1l1.6-.1v.5c0 .9-.7 1.5-1.7 1.5zm4.8 3.3c1.2 0 1.8-.5 2.3-1.8l2.2-6.2H39.8l-1.5 4.8h-.1l-1.5-4.8h-1.3l2.1 6-.1.4c-.2.6-.5.8-1.1.8h-.4v1h.5z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};
