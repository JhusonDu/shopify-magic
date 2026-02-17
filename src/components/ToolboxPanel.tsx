import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Grid3X3, Info, Users, ShoppingBag, Star, BoxIcon, ChevronRight, Shield, HelpCircle, Truck, MessageCircle, Heart } from "lucide-react";
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
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.05 + index * 0.05 }}
    onClick={onClick}
    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 group"
  >
    <div className="flex items-center gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
      {children}
    </div>
    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
  </motion.button>
);

const SectionLabel = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-2 px-4 pt-3 pb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[400px] bg-card/95 backdrop-blur-xl border-border p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="ScentBox" className="h-9 w-9 object-contain" />
            <SheetTitle className="text-lg font-display text-foreground">
              Menü
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Tabs */}
        <Tabs defaultValue="products" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-4 mt-4 mb-2 bg-secondary/80 border border-border h-auto p-1 grid grid-cols-4">
            <TabsTrigger
              value="products"
              className="text-xs px-2 py-2 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:border rounded-md"
            >
              <Package className="h-3.5 w-3.5 mr-1" />
              Termékek
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="text-xs px-2 py-2 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:border rounded-md"
            >
              <Grid3X3 className="h-3.5 w-3.5 mr-1" />
              Kategóriák
            </TabsTrigger>
            <TabsTrigger
              value="info"
              className="text-xs px-2 py-2 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:border rounded-md"
            >
              <Info className="h-3.5 w-3.5 mr-1" />
              Infó
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="text-xs px-2 py-2 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 data-[state=active]:border rounded-md"
            >
              <Users className="h-3.5 w-3.5 mr-1" />
              Rólunk
            </TabsTrigger>
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
      </SheetContent>
    </Sheet>
  );
};
