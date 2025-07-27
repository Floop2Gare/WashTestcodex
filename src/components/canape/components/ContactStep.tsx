import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, Send, RotateCw, X } from "lucide-react";

interface ContactStepProps {
  selectedFormule: string;
  selectedOptions: string[];
  onSubmit: (data: FormData) => void;
  allDemandes?: { formule: string; options: string[] }[];
  onAddCanape?: () => void;
  onFullReset?: () => void;
  onDeleteCanape?: (index: number) => void;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
};

const schema = yup.object({
  name: yup.string().required("Le nom est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Numéro invalide (10 chiffres)")
    .required("Le téléphone est requis"),
  city: yup.string().required("La commune est requise"),
});

const ContactStep: React.FC<ContactStepProps> = ({
  selectedFormule,
  selectedOptions,
  onSubmit,
  allDemandes = [],
  onAddCanape,
  onDeleteCanape,
  onFullReset,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const fullDemandes = [...allDemandes, { formule: selectedFormule, options: selectedOptions }];

  const formulePrices: Record<string, number> = {
    "2 places": 40,
    "3 places": 50,
    "4 places": 60,
    "5 et +": 70,
  };

  const optionPrices: Record<string, number> = {
    antiacariens: 10,
    detachant: 10,
    desodorisant: 10,
  };

  const demandesWithTotal = fullDemandes.map((demande) => {
    const basePrice = formulePrices[demande.formule] || 0;
    const optionsTotal = demande.options.reduce((sum, opt) => sum + (optionPrices[opt] || 0), 0);
    return { ...demande, total: basePrice + optionsTotal };
  });

  const totalGlobal = demandesWithTotal.reduce((sum, d) => sum + d.total, 0);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 bg-white shadow rounded-xl p-6 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Finaliser ma demande</h2>

          {["name", "email", "phone", "city"].map((field) => {
            const fieldMap: Record<string, { label: string; type: string; placeholder?: string }> = {
              name: { label: "Nom", type: "text" },
              email: { label: "Email", type: "email" },
              phone: { label: "Téléphone", type: "tel", placeholder: "06XXXXXXXX" },
              city: { label: "Commune", type: "text", placeholder: "Ex : Fuveau, Aix-en-Provence..." },
            };

            return (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {fieldMap[field].label}
                </label>
                <input
                  id={field}
                  type={fieldMap[field].type}
                  placeholder={fieldMap[field].placeholder}
                  {...register(field as keyof FormData)}
                  className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 text-sm ${
                    errors[field as keyof FormData]
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
                />
                {errors[field as keyof FormData] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field as keyof FormData]?.message}</p>
                )}
              </div>
            );
          })}

          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              Envoyer ma demande <Send size={16} />
            </button>

            {onAddCanape && (
              <button
                type="button"
                onClick={onAddCanape}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2"
              >
                Ajouter un autre canapé <Plus size={16} />
              </button>
            )}

            {onFullReset && (
              <button
                type="button"
                onClick={onFullReset}
                className="w-full bg-red-50 border text-sm border-red-300 text-red-600 hover:bg-red-100 rounded-md py-2 px-4 flex items-center justify-center gap-2"
              >
                Supprimer tous les canapés <RotateCw size={16} />
              </button>
            )}
          </div>
        </form>

        <div className="bg-white border border-gray-100 rounded-xl shadow p-6 text-sm overflow-y-auto max-h-[600px]">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif de vos canapés</h3>
          <ul className="divide-y divide-gray-200 text-gray-700">
            {demandesWithTotal.map((demande, index) => (
              <li key={index} className="py-4 relative group">
                <p className="font-semibold text-blue-600">Canapé {index + 1}</p>
                <p>
                  <span className="font-medium text-gray-800">Formule :</span> {demande.formule}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Options :</span>{" "}
                  {demande.options.length ? demande.options.join(", ") : "Aucune"}
                </p>
                <p className="mt-2 text-sm font-bold text-gray-900">Total : {demande.total} €</p>

                {onDeleteCanape && (
                  <button
                    type="button"
                    onClick={() => onDeleteCanape(index)}
                    className="absolute top-2 right-2 text-red-500 text-xs opacity-0 group-hover:opacity-100 transition"
                    title="Supprimer ce canapé"
                  >
                    <X size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <p className="text-right font-bold text-blue-700 mt-6 text-lg">
            Total général : {totalGlobal} €
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactStep;
