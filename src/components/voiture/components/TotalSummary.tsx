import React, { useState } from "react";
import { Clock, Euro, X } from "lucide-react";

interface TotalSummaryProps {
  price: number;
  time: number;
  onReset?: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h${m.toString().padStart(2, "0")}`;
  if (h) return `${h}h`;
  return `${m} min`;
}

const TotalSummary: React.FC<TotalSummaryProps> = ({
  price,
  time,
  onReset,
  mobileOpen,
  setMobileOpen,
}) => {
  const formattedTime = formatTime(time);

  return (
    <>
      {/* Desktop : positionné à droite */}
      <div className="hidden md:block fixed bottom-4 right-4 z-50 animate-fade-in">
        <div className="bg-white/90 backdrop-blur-md border border-[#0049ac] shadow-lg rounded-xl px-4 py-3 w-60">
          <h4 className="text-[#0049ac] font-semibold text-sm mb-3">Résumé</h4>
          <div className="space-y-2 text-xs text-gray-700">
            <div className="flex items-center gap-2">
              <Euro size={16} className="text-[#0049ac]" />
              <span>
                Prix : <span className="font-bold text-[#0049ac]">{price} €</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#0049ac]" />
              <span>
                Durée :{" "}
                <span className="font-bold text-[#0049ac]">{formattedTime}</span>
              </span>
            </div>
            <div
              className="mt-2 text-sm text-gray-500 hover:text-blue-600 cursor-pointer transition select-none"
              onClick={() => {
                if (typeof onReset === "function") onReset();
              }}
              tabIndex={0}
              role="button"
              aria-label="Réinitialiser ma demande"
            >
              ↺ Réinitialiser ma demande
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && setMobileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
          <div className="bg-white rounded-2xl shadow-2xl px-6 py-8 max-w-xs w-full text-center relative animate-slide-up">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
            <h4 className="text-[#0049ac] font-semibold text-lg mb-3">Résumé</h4>
            <div className="space-y-2 text-xs text-gray-700 mb-4">
              <div className="flex items-center gap-2 justify-center">
                <Euro size={16} className="text-[#0049ac]" />
                <span>
                  Prix : <span className="font-bold text-[#0049ac]">{price} €</span>
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Clock size={16} className="text-[#0049ac]" />
                <span>
                  Durée :{" "}
                  <span className="font-bold text-[#0049ac]">{formattedTime}</span>
                </span>
              </div>
              <div
                className="mt-2 text-sm text-gray-500 hover:text-blue-600 cursor-pointer transition select-none"
                onClick={() => {
                  if (typeof onReset === "function") onReset();
                }}
                tabIndex={0}
                role="button"
                aria-label="Réinitialiser ma demande"
              >
                ↺ Réinitialiser ma demande
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out both;
        }
      `}</style>
    </>
  );
};

export default TotalSummary;
