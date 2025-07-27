import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { features } from "../../data/featuresdata";

interface FeaturesSectionProps {
  onNextClick: () => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNextClick }) => {
  return (
    <section
      id="features"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 via-white to-slate-300"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Pourquoi choisir <span className="text-blue-600">Wash&GO</span> ?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Pour les actifs, Wash&GO propose une expérience de nettoyage automobile haut de gamme,
          pensée pour vous faire gagner du temps sans sacrifier la qualité.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-14 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-1.5 text-center flex flex-col items-center h-full"
          >
            <div className={`h-14 w-14 ${item.bg} rounded-xl flex items-center justify-center mb-5 shadow-inner`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <motion.button
          onClick={onNextClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center px-8 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-xl hover:from-blue-600 hover:to-blue-800 transition duration-300"
        >
          <span>Nos Résultats</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </section>
  );
};

export default FeaturesSection;
