import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BundleBuilder } from "@/components/BundleBuilder";
import { AuthenticitySection } from "@/components/AuthenticitySection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandIntroSection } from "@/components/BrandIntroSection";

type SearchTab = "search" | "finder";

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialTab, setSearchInitialTab] = useState<SearchTab>("search");

  const handleSearchOpen = () => {
    setSearchInitialTab("search");
    setIsSearchOpen(true);
  };

  const handleFinderOpen = () => {
    setSearchInitialTab("finder");
    setIsSearchOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isSearchOpen={isSearchOpen}
        onSearchOpenChange={setIsSearchOpen}
        searchInitialTab={searchInitialTab}
      />
      <Hero onSearchOpen={handleSearchOpen} onFinderOpen={handleFinderOpen} />
      <FeaturedProducts />
      <BrandIntroSection />
      <BundleBuilder />
      <AuthenticitySection />
      <HowItWorksSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
