import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Package, Grid3X3, Info, Users, ShoppingBag, Star, BoxIcon,
  ChevronRight, Shield, HelpCircle, Truck, MessageCircle, Heart, X,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

interface ToolboxPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ToolboxLink = ({
  children,
  onClick,
  index = 0,
}: {
  children: React.ReactNode;
  onClick: () => void;
  index?: number;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.08 + index * 0.04, type: "spring", stiffness: 300, damping: 25 }}
    onClick={onClick}
    className="flex items-center justify-between w-full px-4 py-3.5 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 group"
  >
    <div className="flex items-center gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
      {children}
    </div>
    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
  </motion.button>
);

const SectionLabel = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-2 px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
    <Icon className="h-3.5 w-3.5" />
    {label}
  </div>
);

export const ToolboxPanel = ({ open, onOpenChange }: ToolboxPanelProps) => {
  const navigate = useNavigate();
  const close = () => onOpenChange(false);

  const goTo = (path: string) => {
    navigate(path);
    close();
  };

  const scrollTo = (id: string) => {
    close();
    setTimeout(() => {
      const el = document.getElementById(id) ?? document.querySelector(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Escape key + body scroll lock
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
            className="relative z-10 w-[85vw] max-w-[480px] max-h-[80vh] bg-[#0c0c0c] border border-primary/20 rounded-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: "0 0 80px rgba(212,175,55,0.06), 0 20px 60px rgba(0,0,0,0.4)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <img src={logoIcon} alt="ScentBox" className="h-9 w-9 object-contain" />
                <span className="text-lg font-display font-semibold text-foreground">
                  ScentBox Hungary
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={close}
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="products" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mx-4 mt-4 mb-2 bg-transparent border border-primary/10 h-auto p-1 grid grid-cols-4 rounded-xl">
                {[
                  { value: "products", icon: Package, label: "Termékek" },
                  { value: "categories", icon: Grid3X3, label: "Kategóriák" },
                  { value: "info", icon: Info, label: "Infó" },
                  { value: "about", icon: Users, label: "Rólunk" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs px-2 py-2.5 rounded-lg text-muted-foreground data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary/30 transition-all duration-200 hover:text-foreground"
                  >
                    <tab.icon className="h-3.5 w-3.5 mr-1.5" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex-1 overflow-y-auto px-2 pb-6">
                {/* Products Tab */}
                <TabsContent value="products" className="mt-0 space-y-1">
                  <SectionLabel icon={ShoppingBag} label="Böngészés" />
                  <ToolboxLink onClick={() => goTo("/termekek")} index={0}>
                    Összes Termék
                  </ToolboxLink>
                  <ToolboxLink onClick={() => scrollTo("#bestsellers")} index={1}>
                    <span className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-primary/60" />
                      Kedvenceink
                    </span>
                  </ToolboxLink>
                  <ToolboxLink onClick={() => scrollTo("#bundle-builder")} index={2}>
                    <span className="flex items-center gap-1.5">
                      <BoxIcon className="h-3.5 w-3.5 text-primary/60" />
                      Doboz Összeállítása
                    </span>
                  </ToolboxLink>
                </TabsContent>

                {/* Categories Tab */}
                <TabsContent value="categories" className="mt-0 space-y-1">
                  <SectionLabel icon={Users} label="Nem" />
                  <ToolboxLink onClick={() => goTo("/termekek?gender=Férfi")} index={0}>
                    Férfi
                  </ToolboxLink>
                  <ToolboxLink onClick={() => goTo("/termekek?gender=Női")} index={1}>
                    Női
                  </ToolboxLink>
                  <ToolboxLink onClick={() => goTo("/termekek?gender=Uniszex")} index={2}>
                    Uniszex
                  </ToolboxLink>

                  <SectionLabel icon={Heart} label="Márkák" />
                  <ToolboxLink onClick={() => goTo("/termekek?brand=Chanel")} index={3}>
                    Chanel
                  </ToolboxLink>
                  <ToolboxLink onClick={() => goTo("/termekek?brand=Dior")} index={4}>
                    Dior
                  </ToolboxLink>
                  <ToolboxLink onClick={() => goTo("/termekek?brand=Tom Ford")} index={5}>
                    Tom Ford
                  </ToolboxLink>
                  <ToolboxLink onClick={() => goTo("/termekek?brand=Valentino")} index={6}>
                    Valentino
                  </ToolboxLink>
                </TabsContent>

                {/* Info Tab */}
                <TabsContent value="info" className="mt-0 space-y-1">
                  <SectionLabel icon={Info} label="Információ" />
                  <ToolboxLink onClick={() => scrollTo("#authenticity")} index={0}>
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-primary/60" />
                      Eredetiség
                    </span>
                  </ToolboxLink>
                  <ToolboxLink onClick={() => scrollTo("#how-it-works")} index={1}>
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-primary/60" />
                      Hogyan Működik
                    </span>
                  </ToolboxLink>
                  <ToolboxLink onClick={() => goTo("/tamogatas")} index={2}>
                    <span className="flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5 text-primary/60" />
                      Szállítás és Visszaküldés
                    </span>
                  </ToolboxLink>
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about" className="mt-0 space-y-1">
                  <SectionLabel icon={Users} label="Rólunk" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 py-3 text-sm text-muted-foreground leading-relaxed"
                  >
                    A ScentBox Hungary prémium parfüm dekantokat kínál, hogy megtaláld a tökéletes illatod anélkül, hogy teljes árat fizetnél.
                  </motion.div>
                  <ToolboxLink onClick={() => goTo("/rolunk")} index={1}>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-primary/60" />
                      Rólunk Oldal
                    </span>
                  </ToolboxLink>
                  <ToolboxLink onClick={() => goTo("/tamogatas")} index={2}>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="h-3.5 w-3.5 text-primary/60" />
                      Kapcsolat & Támogatás
                    </span>
                  </ToolboxLink>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
