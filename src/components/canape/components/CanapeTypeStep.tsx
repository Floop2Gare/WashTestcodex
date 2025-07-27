import React from "react";
import { Check, ChevronRight, Star } from "lucide-react";

interface CanapeFormuleStepProps {
  selected: string | undefined;
  onSelect: (formule: string) => void;
}

const formules = [
  {
    id: "2 places",
    name: "2 places",
    price: "40€",
    description: "Traitement complet pour un petit canapé 2 places.",
    sizeLabel: "Petit format",
    priceValue: 40,
  },
  {
    id: "3 places",
    name: "3 places",
    price: "50€",
    description: "Traitement complet pour un canapé 3 places.",
    sizeLabel: "Format moyen",
    priceValue: 50,
  },
  {
    id: "4 places",
    name: "4 places",
    price: "60€",
    description: "Traitement complet pour un grand canapé 4 places.",
    sizeLabel: "Grand format",
    priceValue: 60,
  },
  {
    id: "5 et +",
    name: "5 places et +",
    price: "70€",
    description: "Traitement complet pour très grand canapé ou d’angle.",
    sizeLabel: "Très grand format",
    priceValue: 70,
  },
];

const sharedFeatures = [
  "Nettoyage vapeur en profondeur",
  "Désinfection antibactérienne",
  "Traitement anti-odeurs",
  "Brossage et soin du tissu",
];

const CanapeFormuleStep: React.FC<CanapeFormuleStepProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {formules.map((formule) => {
        const isSelected = selected === formule.id;

        return (
          <div
            key={formule.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(formule.id)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(formule.id)}
            aria-pressed={isSelected}
            className={`relative group cursor-pointer rounded-2xl border p-6 transition-all duration-300 focus:outline-none
              ${
                isSelected
                  ? "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-500 shadow-xl scale-[1.02]"
                  : "bg-white border-gray-200 hover:shadow-md hover:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300"
              }
            `}
          >
            {isSelected && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow">
                <Check size={16} />
              </div>
            )}

            {formule.id === "4 places" && (
              <div className="absolute top-4 right-14 bg-yellow-400 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-md animate-pulse">
                Populaire
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{formule.name}</h3>
              <p className="text-3xl font-extrabold text-blue-600">{formule.price}</p>
              <p className="text-sm text-gray-600 mt-2">{formule.description}</p>
            </div>

            <ul className="space-y-2 my-6">
              {sharedFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-800">
                  <Star size={16} className="text-blue-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(formule.id);
              }}
              className={`w-full flex items-center justify-center gap-2 rounded-lg py-2 font-semibold transition-colors duration-300
                ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }
              `}
            >
              {isSelected ? "Sélectionné" : "Choisir"}
              <ChevronRight size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CanapeFormuleStep;
