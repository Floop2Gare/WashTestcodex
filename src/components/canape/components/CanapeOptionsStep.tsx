import React from "react";
import { CheckCircle } from "lucide-react";

interface Option {
  id: string;
  label: string;
  description: string;
  price: string;
}

interface CanapeOptionsStepProps {
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
  onContinue: () => void;
  scrollToRecap: () => void;
}

const options: Option[] = [
  {
    id: "antiacariens",
    label: "Traitement anti-acariens",
    description: "Élimine les acariens et allergènes",
    price: "+10€",
  },
  {
    id: "detachant",
    label: "Détachant renforcé",
    description: "Enlève les taches profondes et incrustées",
    price: "+10€",
  },
  {
    id: "desodorisant",
    label: "Parfum & désodorisant",
    description: "Parfume durablement et neutralise les odeurs",
    price: "+10€",
  },
  {
    id: "aucune",
    label: "Aucune option",
    description: "Aucune option supplémentaire sélectionnée",
    price: "0€",
  },
];

const CanapeOptionsStep: React.FC<CanapeOptionsStepProps> = ({
  selectedOptions,
  onToggleOption,
  onContinue,
  scrollToRecap,
}) => {
  const handleOptionClick = (id: string) => {
    if (id === "aucune") {
      onToggleOption("aucune");
    } else {
      // Si une vraie option est sélectionnée, on enlève "aucune"
      onToggleOption(id);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10">
          Choisissez vos <span className="text-blue-600">options canapés</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            const isNoneOption = option.id === "aucune";

            return (
              <div
                key={option.id}
                role="checkbox"
                tabIndex={0}
                aria-checked={isSelected}
                onClick={() => handleOptionClick(option.id)}
                onKeyDown={(e) => e.key === "Enter" && handleOptionClick(option.id)}
                className={`relative cursor-pointer border rounded-xl p-6 transition-all duration-300 outline-none
                  ${isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md scale-[1.03]"
                    : "border-gray-200 hover:border-blue-300 hover:shadow focus-visible:ring-2 focus-visible:ring-blue-300"}
                  ${isNoneOption ? "sm:col-span-2 lg:col-span-3 justify-self-center" : ""}
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                  {isSelected && <CheckCircle className="text-blue-500" size={24} />}
                </div>
                <p className="mt-4 text-blue-600 font-bold text-right">{option.price}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            onContinue();
            scrollToRecap();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-200"
        >
          Continuer
        </button>
      </div>
    </section>
  );
};

export default CanapeOptionsStep;