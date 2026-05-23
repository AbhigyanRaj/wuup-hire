import React from "react";
import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { LogoTicker } from "../components/landing/LogoTicker";
import { Features } from "../components/landing/Features";
import { Architecture } from "../components/landing/Architecture";
import { FooterCTA } from "../components/landing/FooterCTA";
import { Footer } from "../components/landing/Footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-[#85d800] selection:text-white font-sans text-slate-900 overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <LogoTicker />
        <Features />
        <Architecture />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};
