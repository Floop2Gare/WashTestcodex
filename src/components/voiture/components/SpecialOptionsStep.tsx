import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface SpecialOptionsStepProps {
  onSelect: (data: { step: string; value: string[]; price: number; time: number }) => void;
  nextSectionId?: string;
  selected?: string[]; // ✅ Ajout pour le contrôle externe
}

const options = [
  {
    value: "Plastiques intérieurs",
    label: "Plastiques intérieurs",
    price: 15,
    time: 20,
    img: "/voiture/extras/plastiques.jpg",
  },
  {
    value: "Vitres",
    label: "Vitres",
    price: 5,
    time: 5,
    img: "/voiture/extras/vitres.jpg",
  },
  {
    value: "Pare-brise",
    label: "Pare-brise",
    price: 5,
    time: 5,
    img: "/voiture/extras/parebrise.jpg",
  },
  {
    value: "Encadrements de porte",
    label: "Encadrements de porte",
    price: 15,
    time: 10,
    img: "/voiture/extras/portes.jpg",
  },
];

const SpecialOptionsStep: React.FC<SpecialOptionsStepProps> = ({ onSelect, nextSectionId, selected = [] }) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [loading, setLoading] = useState(false);

  // ✅ Synchronisation avec la prop externe (Voitures.tsx)
  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const handleToggle = (val: string) => {
    const newSelected = localSelected.includes(val)
      ? localSelected.filter((v) => v !== val)
      : [...localSelected, val];
    setLocalSelected(newSelected);
  };

  const handleContinue = () => {
    setLoading(true);
    const totalPrice = options
      .filter((o) => localSelected.includes(o.value))
      .reduce((sum, o) => sum + o.price, 0);
    const totalTime = options
      .filter((o) => localSelected.includes(o.value))
      .reduce((sum, o) => sum + o.time, 0);
    onSelect({ step: "Options spéciales", value: localSelected, price: totalPrice, time: totalTime });
    setTimeout(() => {
      setLoading(false);
      if (nextSectionId) {
        const next = document.getElementById(nextSectionId);
        if (next) next.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <section className="w-full flex flex-col gap-10 font-[Outfit]">
      <div className="grid md:grid-cols-2 gap-6">
        {options.map((opt) => {
          const isChecked = localSelected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleToggle(opt.value)}
              className={`rounded-2xl overflow-hidden border-2 transition-all shadow-sm group text-left
                ${isChecked
                  ? "border-[#0049ac] ring-2 ring-[#0049ac] bg-blue-50"
                  : "border-gray-200 hover:border-[#0049ac]/60 hover:ring-2 hover:ring-[#0049ac]/30"}`}
            >
              <img
                src={opt.img}
                alt={opt.label}
                className="w-full h-40 object-cover rounded-t-2xl group-hover:scale-[1.01] transition-transform duration-200"
              />
              <div className="p-5">
                <h3 className={`text-lg font-semibold mb-1 ${isChecked ? "text-[#0049ac]" : "text-gray-900"}`}>{opt.label}</h3>
                <p className="text-sm text-gray-500">Durée : {opt.time} min</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-semibold text-[#0049ac]">+{opt.price}€</span>
                  <span
                    className={`text-sm px-4 py-1 rounded-lg font-medium transition-colors duration-300
                      ${isChecked
                        ? "bg-[#0049ac] text-white"
                        : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"}`}
                  >
                    {isChecked ? "Sélectionné" : "Choisir"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-sm text-center text-gray-700">
        <b>Votre sélection :</b>{" "}
        {localSelected.length
          ? localSelected.join(", ")
          : <span className="text-gray-400 italic">Aucune option sélectionnée</span>}
      </div>

      {/* Boutons validation mobile */}
      <div className="grid grid-cols-2 gap-3 mt-6 md:hidden">
        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className={`w-full flex-1 rounded-xl py-3 font-bold text-white bg-[#0049ac] shadow-sm text-base flex items-center justify-center transition-all
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"}`}
        >
          Valider les options <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (loading) return;
            setLoading(true);
            onSelect({ step: "Options spéciales", value: [], price: 0, time: 0 });
            setTimeout(() => {
              setLoading(false);
              if (nextSectionId) {
                const next = document.getElementById(nextSectionId);
                if (next) next.scrollIntoView({ behavior: "smooth" });
              }
            }, 200);
          }}
          disabled={loading}
          className="w-full flex-1 rounded-xl py-3 font-bold text-[#0049ac] bg-gray-100 shadow-sm text-base flex items-center justify-center transition-all hover:bg-gray-200"
        >
          Valider sans options
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-[#0049ac] shadow-sm transition-all
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"}`}
        >
          Valider les options <ArrowRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (loading) return;
            setLoading(true);
            onSelect({ step: "Options spéciales", value: [], price: 0, time: 0 });
            setTimeout(() => {
              setLoading(false);
              if (nextSectionId) {
                const next = document.getElementById(nextSectionId);
                if (next) next.scrollIntoView({ behavior: "smooth" });
              }
            }, 200);
          }}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-[#0049ac] bg-gray-100 shadow-sm transition-all hover:bg-gray-200"
        >
          Valider sans options
        </button>
      </div>
    </section>
  );
};

export default SpecialOptionsStep;
