import React, { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";

interface Selection {
  step: string;
  value: string;
}

interface VerticalProgressBarProps {
  selections: Selection[];
  totalSteps: number;
}

const VerticalProgressBar: React.FC<VerticalProgressBarProps> = ({ selections, totalSteps }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const percent = Math.round((selections.length / totalSteps) * 100);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBar(window.scrollY > 20); // Apparition plus tôt
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Panel = () => (
    <div className="w-full max-w-xs px-4 py-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Votre progression</h3>
      <div className="mb-4">
        <div className="text-sm text-gray-500">Avancement</div>
        <div className="text-2xl font-extrabold text-[#0049ac]">{percent}%</div>
        <div className="h-2 bg-gray-200 rounded-full mt-2 relative overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[#0049ac] to-blue-400 transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{selections.length} / {totalSteps} étapes</p>
      </div>
      <ul className="space-y-4 mt-6 w-full">
        {selections.map((sel, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#0049ac] flex items-center justify-center shadow-md">
              <Check className="text-white w-3 h-3" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 leading-snug">{sel.step}</p>
              <p className="text-xs text-[#0049ac] bg-blue-50 rounded-full px-3 py-1 inline-block mt-1 shadow-sm whitespace-nowrap max-w-[160px] truncate">{sel.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className={`hidden md:flex fixed top-1/4 left-3 z-40 transition-opacity duration-500 ${showBar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Panel />
      </aside>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-5 left-5 z-50 bg-[#0049ac] text-white px-5 py-3 rounded-full shadow-lg font-semibold"
        >
          Voir les étapes
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end" onClick={() => setMobileOpen(false)}>
            <div
              className="bg-white w-full max-w-md rounded-t-3xl px-6 py-6 shadow-xl animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-[#0049ac] text-lg">Résumé</h4>
                <button onClick={() => setMobileOpen(false)}><X className="text-[#0049ac]" /></button>
              </div>
              <Panel />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out both;
        }
      `}</style>
    </>
  );
};

export default VerticalProgressBar;