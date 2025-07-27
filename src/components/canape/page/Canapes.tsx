import { useEffect, useRef, useState } from "react";
import FormuleStep from "../components/CanapeTypeStep";
import OptionsStep from "../components/CanapeOptionsStep";
import ContactStep from "../components/ContactStep";
import VerticalProgressBar from "../components/VerticalProgressBar";
import Navbar from "../../../components/Navbar/Navbar";

export default function Canapes() {
  const [selectedFormule, setSelectedFormule] = useState<string | undefined>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [demandes, setDemandes] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToNextSection = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    if (!selectedFormule || selectedOptions.length === 0) {
      setFormError("Veuillez compléter chaque étape avant de poursuivre.");
      setShowErrorModal(true);
      return;
    }
    setFormError(null);
    setShowErrorModal(false);
    scrollToNextSection(2);
  };

  const handleAddCanape = () => {
    const currentDemande = {
      formule: selectedFormule,
      options: selectedOptions,
    };
    setDemandes((prev) => [...prev, currentDemande]);
    resetFilters();
  };

  const handleFinalSubmit = (contactData: any) => {
    const finalDemande = {
      formule: selectedFormule,
      options: selectedOptions,
    };
    const toutesDemandes = [...demandes, finalDemande];
    console.log("Demandes Canapé :", toutesDemandes);
    console.log("Contact :", contactData);
  };

  const resetFilters = () => {
    setSelectedFormule(undefined);
    setSelectedOptions([]);
    scrollToNextSection(0);
  };

  const handleDeleteCanape = (index: number) => {
    const updated = [...demandes];
    updated.splice(index, 1);
    setDemandes(updated);
  };

  const handleFullReset = () => {
    setDemandes([]);
    resetFilters();
  };

  const steps = ["Type de Canapé", "Options", "Contact"];

  // useEffect supprimé ici (il causait un freeze lors de la navigation)

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <VerticalProgressBar
          activeStep={activeSection}
          selectedFormule={selectedFormule}
          selectedOptions={selectedOptions}
        />

        {showErrorModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
              <h2 className="text-xl font-bold text-blue-600 mb-4">
                Vous avez oublié !
              </h2>
              <p className="text-gray-700 mb-6">{formError}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Hero */}
        <div
          className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 text-white text-center"
          style={{ backgroundImage: "url('/canapé/canape.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl font-extrabold mb-6">Pressing pour Canapés</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Offrez une nouvelle jeunesse à vos fauteuils, canapés et tissus d’ameublement
            </p>
            <button
              onClick={() => scrollToNextSection(0)}
              className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto"
            >
              Commencer ma demande
            </button>
          </div>
        </div>

        {/* Formulaires */}
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
          {[<FormuleStep
              key="type"
              selected={selectedFormule}
              onSelect={(formule) => {
                setSelectedFormule(formule);
                scrollToNextSection(1);
              }}
            />,
            <OptionsStep
              key="options"
              selectedOptions={selectedOptions}
              onToggleOption={(optionId) =>
                setSelectedOptions((prev) =>
                  prev.includes(optionId)
                    ? prev.filter((id) => id !== optionId)
                    : [...prev, optionId]
                )
              }
              onContinue={scrollToContact}
              scrollToRecap={scrollToContact}
              // formError supprimé car non supporté par CanapeOptionsStep
            />,
            <ContactStep
              key="contact"
              selectedFormule={selectedFormule || ""}
              selectedOptions={selectedOptions}
              onSubmit={handleFinalSubmit}
              allDemandes={demandes}
              onAddCanape={handleAddCanape}
              onDeleteCanape={handleDeleteCanape}
              onFullReset={handleFullReset}
            />
          ].map((Component, i) => (
            <section
              key={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              className="section scroll-mt-24 bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h2 className="text-3xl font-bold">{steps[i]}</h2>
              </div>
              {Component}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
