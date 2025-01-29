import React from "react";
import HeroSection from "../components/HeroSection";
import SocialProofSection from "../components/SocialProofSection";
import Footer from "../components/Footer";
import BenefitsSection from "../components/BenefitsSection";
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
