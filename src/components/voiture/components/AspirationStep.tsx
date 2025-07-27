import React, { useState, useEffect } from "react";

interface AspirationStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number }) => void;
  selected?: string; // ✅ nouvelle prop contrôlée
}

const options = [
  {
    value: "Partielle (hors coffre)",
    title: "Aspiration partielle",
    desc: "Nettoyage rapide de l'habitacle (hors coffre)",
    price: 30,
    time: 30,
    img: "/voiture/aspiration/sanscoffre.svg",
  },
  {
    value: "Complète (avec coffre)",
    title: "Aspiration complète",
    desc: "Habitacle + coffre, pour un résultat optimal",
    price: 40,
    time: 45,
    img: "/voiture/aspiration/aveccoffre.svg",
  },
];

const AspirationStep: React.FC<AspirationStepProps> = ({ onSelect, selected: parentSelected }) => {
  const [selected, setSelected] = useState<string | null>(parentSelected ?? null);

  // ✅ Mise à jour automatique si le parent change la sélection
  useEffect(() => {
    setSelected(parentSelected ?? null);
  }, [parentSelected]);

  const handleClick = (opt: typeof options[0]) => {
    setSelected(opt.value);
    onSelect({ step: "Aspiration", value: opt.value, price: opt.price, time: opt.time });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-[Outfit]">
      {options.map((opt) => {
        const isActive = selected === opt.value;

        return (
          <div
            key={opt.value}
            onClick={() => handleClick(opt)}
            className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-transform duration-300 border-2 hover:scale-[1.015]
              ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/30"}`}
          >
            <img
              src={opt.img}
              alt={opt.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{opt.title}</h3>
                <span className="text-[#0049ac] text-base font-bold">{opt.price}€</span>
              </div>

              <p className="text-sm text-gray-600 mb-1">{opt.desc}</p>
              <p className="text-xs text-gray-400">Durée : {opt.time} min</p>

              <div className="mt-4">
                <span
                  className={`inline-block px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300
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
  );
};

export default AspirationStep;
