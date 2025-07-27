import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// — Composants Globaux
import ScrollToTop from "./components/Accueil/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Accueil/Footer";

// — Composants Accueil
import HeroSection from "./components/Accueil/HeroSection";
import FeaturesSection from "./components/Accueil/FeaturesSection";
import SocialMediaSection from "./components/Accueil/SocialSection/SocialMediaSection";
import PricingSection from "./components/Accueil/ChoixSection";
import ContactSection from "./components/Accueil/ContactSection";
import TestimonialsSection from "./components/Accueil/TestimonialsSection";

// — Pages
import Voitures from "./components/voiture/page/Voitures";
import Canapes from "./components/canape/page/Canapes";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueCookies from "./pages/PolitiqueCookies";
import RgpdPage from "./pages/RgpdPage";

const App: React.FC = () => {
  // Scroll fluide vers une section
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className="min-h-screen bg-white">
                <HeroSection onCTAClick={() => scrollTo("choix-section")} />
                <FeaturesSection onNextClick={() => scrollTo("social-section")} />

                <section id="social-section">
                  <SocialMediaSection />
                </section>

                <section id="choix-section">
                  <PricingSection onContactClick={() => scrollTo("contact-section")} />
                </section>

                <section id="contact-section">
                  <ContactSection />
                </section>

                <TestimonialsSection />
                <Footer />
              </main>
            </>
          }
        />

        <Route path="/voitures" element={<Voitures />} />
        <Route path="/canapes" element={<Canapes />} />
        {/* Route produits supprimée */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-cookies" element={<PolitiqueCookies />} />
        <Route path="/rgpd" element={<RgpdPage />} />
      </Routes>
    </Router>
  );
};

export default App;
