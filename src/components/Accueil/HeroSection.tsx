import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onCTAClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCTAClick }) => {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 text-white text-center"
      style={{ backgroundImage: "url('accueil/bmw.jpg')" }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-8">
        <img
          src="/logo/logophrase.svg"
          alt="Logo Wash&GO"
          className="w-64 sm:w-72 md:w-80 lg:w-96"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl">
            La <span className="text-blue-500">Propreté</span> qui vient à vous !
          </h1>

          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto drop-shadow">
            Un nettoyage professionnel, rapide et efficace à Fuveau et ses alentours.
          </p>

          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center justify-center px-8 py-3 font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg group transition-all duration-300 hover:from-blue-600 hover:to-blue-800"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
            <span className="relative z-10 flex items-center space-x-2">
              <span>Découvrez nos Prestations</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
