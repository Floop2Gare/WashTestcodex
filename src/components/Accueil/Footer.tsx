import { Facebook, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F52BA] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Réseaux sociaux */}
        <div>
          <h4 className="text-lg font-bold mb-3">Suivez-nous</h4>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <a
              href="https://www.facebook.com/profile.php?id=61571447229404"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wash&GO sur Facebook"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/washandgo13/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wash&GO sur Instagram"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@washandgo13"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wash&GO sur TikTok"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <SiTiktok className="h-5 w-5" />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Liens légaux */}
        <div>
          <h4 className="text-lg font-bold mb-3">Informations</h4>
          <ul className="text-sm space-y-2">
            <li>
              <a
                href="/mentions-legales"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300 transition"
              >
                Mentions légales
              </a>
            </li>
            <li>
              <a
                href="/politique-cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300 transition"
              >
                Politique de cookies
              </a>
            </li>
            <li>
              <a
                href="/rgpd"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300 transition"
              >
                Respect du RGPD
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
