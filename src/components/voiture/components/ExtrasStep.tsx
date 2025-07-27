import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface ExtrasStepProps {
  onSelect: (data: { step: string; value: string[]; price: number; time: number }) => void;
  nextSectionId?: string;
  selected?: string[]; // ✅ Nouveau pour le contrôle externe
}

const options = [
  {
    value: "Poils animaux",
    label: "Poils animaux",
    price: 10,
    time: 15,
    img: "/voiture/specific/poils.jpg",
  },
  {
    value: "Véhicule très sale",
    label: "Véhicule très sale",
    price: 10,
    time: 15,
    img: "/voiture/specific/tressale.jpg",
  },
  {
    value: "Shampoing sol",
    label: "Shampoing sol",
    price: 15,
    time: 20,
    img: "/voiture/specific/moquettes.jpg",
  },
  {
    value: "Sous Coffre",
    label: "Sous Coffre",
    price: 10,
    time: 10,
    img: "/voiture/specific/souscoffre.jpg",
  },
];

const ExtrasStep: React.FC<ExtrasStepProps> = ({ onSelect, nextSectionId, selected = [] }) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [loading, setLoading] = useState(false);

  // ✅ Synchronisation avec la sélection du parent
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
    if (!localSelected.length) return;
    setLoading(true);
    const totalPrice = options
      .filter((o) => localSelected.includes(o.value))
      .reduce((sum, o) => sum + o.price, 0);
    const totalTime = options
      .filter((o) => localSelected.includes(o.value))
      .reduce((sum, o) => sum + o.time, 0);
    onSelect({ step: "Extras", value: localSelected, price: totalPrice, time: totalTime });
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
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {options.map((opt) => {
          const isActive = localSelected.includes(opt.value);
          return (
            <div
              key={opt.value}
              role="button"
              tabIndex={0}
              onClick={() => handleToggle(opt.value)}
              onKeyDown={(e) => e.key === "Enter" && handleToggle(opt.value)}
              aria-pressed={isActive}
              className={`rounded-2xl overflow-hidden border-2 cursor-pointer transition-transform duration-300 hover:scale-[1.015] shadow-md
                ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/40"}`}
            >
              <img
                src={opt.img}
                alt={opt.label}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{opt.label}</h3>
                  <span className="text-[#0049ac] font-bold text-base">+{opt.price}€</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">Durée : {opt.time} min</p>
                <div className="mt-4">
                  <span
                    className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
                      ${isActive
                        ? "bg-[#0049ac] text-white"
                        : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"}`}
                  >
                    {isActive ? "Sélectionné" : "Choisir"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-700">
        <b>Votre sélection :</b>{" "}
        {localSelected.length ? localSelected.join(", ") : <span className="text-gray-400 italic">Aucun extra sélectionné</span>}
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-2 gap-3 mt-6 md:hidden">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!localSelected.length || loading}
          className={`w-full flex-1 rounded-xl py-3 font-bold text-white bg-[#0049ac] shadow-sm text-base flex items-center justify-center transition-all
            ${!localSelected.length || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"}`}
        >
          Finaliser les extras <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (loading) return;
            setLoading(true);
            onSelect({ step: "Extras", value: [], price: 0, time: 0 });
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
          Finaliser sans extra
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!localSelected.length || loading}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-[#0049ac] shadow-sm transition-all
            ${!localSelected.length || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"}`}
        >
          Finaliser les extras <ArrowRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (loading) return;
            setLoading(true);
            onSelect({ step: "Extras", value: [], price: 0, time: 0 });
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
          Finaliser sans extra
        </button>
      </div>
    </section>
  );
};

export default ExtrasStep;
