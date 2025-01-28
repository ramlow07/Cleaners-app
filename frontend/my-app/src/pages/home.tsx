import React from "react";
import HeroSection from "../components/HeroSection";
import SocialProofSection from "../components/SocialProofSection";
import Footer from "../components/Footer";
const HomePage = () => {
  return (
    <div className="homepage">
      <HeroSection />
      <SocialProofSection />
      <Footer />
    </div>
  );
};

export default HomePage;
