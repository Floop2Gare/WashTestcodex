import React from "react";

interface CanapeTissuStepProps {
  selected: string | undefined;
  onSelect: (tissu: string) => void;
}

const tissus = [
  {
    id: "tissu",
    name: "Tissu classique",
    description: "Revêtement textile standard",
  },
  {
    id: "velours",
    name: "Velours",
    description: "Tissu doux type velours",
  },
  {
    id: "cuir",
    name: "Cuir / simili",
    description: "Revêtement cuir ou simili",
  },
];

const CanapeTissuStep: React.FC<CanapeTissuStepProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 font-[Outfit]">
      {tissus.map((t) => {
        const isSelected = selected === t.id;
        return (
          <div
            key={t.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(t.id)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(t.id)}
            aria-pressed={isSelected}
            className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.015] ${
              isSelected ? "border-blue-600" : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{t.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{t.description}</p>
              <span
                className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-700 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {isSelected ? "Sélectionné" : "Choisir"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CanapeTissuStep;
