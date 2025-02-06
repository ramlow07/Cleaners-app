import React from "react";
import HeroSection from "../components/homepage/HeroSection";
import SocialProofSection from "../components/homepage/SocialProofSection";
import Footer from "../components/homepage/Footer";
import BenefitsSection from "../components/homepage/BenefitsSection";
const HomePage = () => {
  return (
    <div className="homepage">
      <HeroSection />
      <SocialProofSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
