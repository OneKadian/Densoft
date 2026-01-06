import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-body-bg flex flex-col md:pt-16">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default Index;