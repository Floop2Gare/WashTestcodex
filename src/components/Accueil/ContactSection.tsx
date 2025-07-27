import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12.75 2c.473 0 .856.383.856.856a5.15 5.15 0 0 0 5.143 5.144.857.857 0 0 1 .856.857v2.174a.857.857 0 0 1-.857.857 7.5 7.5 0 0 1-3.145-.7v6.595a5.429 5.429 0 1 1-5.429-5.428c.169 0 .336.01.5.027v2.093a2.571 2.571 0 1 0 2.571 2.572v-13A.857.857 0 0 1 12.75 2Z" />
  </svg>
);

const ContactSection = () => {
  return (
    <section id="contact" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Contactez <span className="text-[#0049ac]">Wash&Go</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Une question, une demande&nbsp;? On est là pour vous aider à redonner vie à votre voiture.
          </p>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Infos dans un bloc cadré à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border shadow-xl rounded-2xl p-8 space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#0049ac]">Zone d’intervention</h3>
              <p className="text-gray-700">
                Fuveau et ses alentours
              </p>
            </div>

            <div className="text-gray-800 space-y-1 text-base">
              <p>📞 06 22 70 60 00</p>
              <p>📧 wash.go13@gmail.com</p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="tel:0622706000"
                className="py-2.5 px-5 bg-[#0049ac] text-white rounded-full text-sm text-center hover:bg-blue-800 transition"
              >
                📞 Nous appeler
              </a>
              <a
                href="mailto:wash.go13@gmail.com"
                className="py-2.5 px-5 border border-[#0049ac] text-[#0049ac] rounded-full text-sm text-center hover:bg-[#0049ac] hover:text-white transition"
              >
                ✉️ Nous écrire
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Retrouvez-nous sur :</p>
              <div className="flex gap-4 items-center flex-wrap">
                <a
                  href="https://www.facebook.com/profile.php?id=61571447229404"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0049ac] hover:text-blue-800 transition flex items-center gap-1"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/washandgo13/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-600 hover:text-pink-700 transition flex items-center gap-1"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@washandgo13"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black hover:text-gray-700 transition flex items-center gap-1"
                >
                  <TikTokIcon />
                  <span className="text-sm">TikTok</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Carte à droite */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl border bg-white"
          >
            <div className="w-full h-[400px] flex items-center justify-center text-gray-500 text-center p-6 text-sm">
              <p>
                Ici apparaîtra une carte interactive avec toutes les villes<br />
                réellement couvertes (zone d’intervention personnalisée)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
