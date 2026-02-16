import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BestsellersSection } from "@/components/BestsellersSection";
import { BundleBuilder } from "@/components/BundleBuilder";
import { AuthenticitySection } from "@/components/AuthenticitySection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header isSearchOpen={isSearchOpen} onSearchOpenChange={setIsSearchOpen} />
      <Hero onSearchOpen={() => setIsSearchOpen(true)} />
      <BestsellersSection />
      <BundleBuilder />
      <AuthenticitySection />
      <HowItWorksSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
