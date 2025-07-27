import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mathys Le Can",
    text: "Nettoyage irréprochable ! Même sous une chaleur intense, le travail reste de qualité. Je recommande vivement.",
    date: "Juin 2025",
  },
  {
    name: "Lilie Rose",
    text: "Enfin un service de nettoyage de voiture impeccable et accessible en prix. Clément a effectué un travail parfait. Je recommande ++",
    date: "Mai 2025",
  },
  {
    name: "Valentin Rossignol",
    text: "Adrien a fait preuve de beaucoup de professionnalisme. Ma voiture était dans un état lamentable, et avec la formule à 70 €, elle est revenue comme neuve !",
    date: "Mars 2025",
  },
  {
    name: "Adam",
    text: "Merci Clément pour ta disponibilité et ton travail ! Ma voiture, un SUV, a été nettoyée à la perfection !",
    date: "Avril 2025",
  },
  {
    name: "Ema Le Maout Lloret",
    text: "2 super étudiants, canapé et tapis impeccables. Cliente très satisfaite.",
    date: "Avril 2025",
  },
  {
    name: "Nadia Carletti",
    text: "Adrien a fait un très bon travail. Voiture impeccable, merci pour ta gentillesse. Je recommande au top !",
    date: "Mai 2025",
  },
  {
    name: "Ismael Belmehadji",
    text: "Service professionnel et de qualité ! Très sérieux, je recommande à 100%. Merci Adrien.",
    date: "Mai 2025",
  },
  {
    name: "Naim Di Lauro",
    text: "Nettoyage au top.",
    date: "Juin 2025",
  },
];

const googleLink = "https://g.co/kgs/ishaLNQ";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#f9fafb] py-20 px-4">
      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <h3 className="text-3xl md:text-5xl font-extrabold text-[#0F52BA] tracking-tight">
            Ce qu'ils pensent de nous
          </h3>
          <img
            src="/logo/google.png"
            alt="Logo Google"
            className="h-16 md:h-20 w-auto cursor-pointer"
            onClick={() => window.open(googleLink, "_blank")}
          />
        </div>
        <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
          Découvrez les retours de nos clients satisfaits ✨
        </p>
      </motion.div>

      {/* Carrousel défilant */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-x-auto scrollbar-hide px-2"
      >
        <div className="flex gap-6 w-max animate-[slide_40s_linear_infinite]">
          {testimonials.map((review, index) => (
            <a
              key={index}
              href={googleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[280px] max-w-[320px] bg-white rounded-2xl shadow-md p-6 transition hover:scale-[1.02] cursor-pointer"
            >
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-sm text-gray-500">Visité en {review.date}</p>
              </div>
              <p className="text-gray-700 text-sm">{review.text}</p>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Boutons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10 px-4">
        <a
          href="https://www.google.com/search?q=Wash%26GO"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0F52BA] text-white font-bold px-6 py-3 rounded-full shadow hover:opacity-90 transition"
        >
          Voir tous les avis
        </a>
        <a
          href="https://www.google.com/search?q=Wash%26GO+Avis"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-[#0F52BA] text-[#0F52BA] font-bold px-6 py-3 rounded-full shadow hover:bg-[#0F52BA] hover:text-white transition"
        >
          Laisser un avis
        </a>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
