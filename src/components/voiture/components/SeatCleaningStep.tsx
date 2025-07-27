import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface SeatCleaningStepProps {
  onSelect: (data: {
    step: string;
    value: string[];
    price: number;
    time: number;
  }) => void;
  nextSectionId?: string;
  vehicleTypeId?: string;
  selected?: string[]; // ✅ Nouvelle prop
}

const options = [
  {
    value: "Avant",
    label: "Sièges avant",
    price: 10,
    time: 15,
    img: "/voiture/pressing/avant.jpg",
  },
  {
    value: "Arrière",
    label: "Sièges arrière",
    price: 15,
    time: 15,
    img: "/voiture/pressing/arriere.jpg",
  },
  {
    value: "Coffre",
    label: "Coffre",
    price: 10,
    time: 15,
    img: "/voiture/pressing/coffre.jpg",
  },
];

const SeatCleaningStep: React.FC<SeatCleaningStepProps> = ({
  onSelect,
  nextSectionId,
  vehicleTypeId,
  selected = [], // ✅ Valeur par défaut
}) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [loading, setLoading] = useState(false);

  // ✅ Synchronisation avec le parent
  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const isCoffreEnabled = vehicleTypeId === "7places";

  const handleToggle = (val: string) => {
    if (val === "Coffre" && !isCoffreEnabled) return;
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
    onSelect({
      step: "Pressing sièges",
      value: localSelected,
      price: totalPrice,
      time: totalTime,
    });
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {options.map((opt) => {
          const isActive = localSelected.includes(opt.value);
          const isCoffre = opt.value === "Coffre";
          const disabled = isCoffre && !isCoffreEnabled;
          return (
            <div
              key={opt.value}
              role="button"
              tabIndex={0}
              onClick={() => !disabled && handleToggle(opt.value)}
              onKeyDown={(e) => !disabled && e.key === "Enter" && handleToggle(opt.value)}
              aria-pressed={isActive}
              aria-disabled={disabled}
              className={`rounded-2xl overflow-hidden border-2 transition-transform duration-300 shadow-md
                ${isActive && !disabled ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/40"}
                ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "cursor-pointer hover:scale-[1.015]"}`}
            >
              <img
                src={opt.img}
                alt={opt.label}
                className="w-full h-48 object-cover"
                style={disabled ? { filter: 'grayscale(1)', opacity: 0.7 } : {}}
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
                      ${isActive && !disabled
                        ? "bg-[#0049ac] text-white"
                        : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"}`}
                  >
                    {isActive && !disabled ? "Sélectionné" : "Choisir"}
                  </span>
                </div>
                {disabled && (
                  <div className="mt-2 text-xs text-gray-500 italic">
                    Option disponible uniquement pour les véhicules 6 places et +
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-700">
        <b>Votre sélection :</b>{" "}
        {localSelected.length ? localSelected.join(", ") : <span className="text-gray-400 italic">Aucune zone sélectionnée</span>}
      </div>

      {/* Boutons mobiles */}
      <div className="grid grid-cols-2 gap-3 mt-6 md:hidden">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!localSelected.length || loading}
          className={`w-full flex-1 rounded-xl py-3 font-bold text-white bg-[#0049ac] shadow-sm text-base flex items-center justify-center transition-all
            ${!localSelected.length || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"}`}
        >
          Valider les sièges <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (loading) return;
            setLoading(true);
            onSelect({ step: "Pressing sièges", value: [], price: 0, time: 0 });
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
          Valider sans pressing
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
          Valider les sièges <ArrowRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (loading) return;
            setLoading(true);
            onSelect({ step: "Pressing sièges", value: [], price: 0, time: 0 });
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
          Valider sans pressing
        </button>
      </div>
    </section>
  );
};

export default SeatCleaningStep;
