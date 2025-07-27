import React, { useEffect, useRef, useState } from "react";

interface VerticalProgressBarProps {
  activeStep: number;
  selectedFormule?: string;
  selectedOptions?: string[];
}

const steps = ["Canapé", "Options", "Contact"];

const VerticalProgressBar: React.FC<VerticalProgressBarProps> = ({
  activeStep,
  selectedFormule,
  selectedOptions,
}) => {
  const [showBar, setShowBar] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBar(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getStepValue = (index: number) => {
    switch (index) {
      case 0:
        return selectedFormule || "";
      case 1:
        return selectedOptions?.length ? selectedOptions.join(", ") : "";
      default:
        return "";
    }
  };

  const getDotClass = (index: number) => {
    const isActive = index === activeStep;
    const isDone = index < activeStep;
    if (isActive) return "bg-blue-600 border-blue-600 scale-125";
    if (isDone) return "bg-blue-400 border-blue-400";
    return "bg-white border-gray-300";
  };

  const scrollToStep = (index: number) => {
    const section = document.querySelectorAll(".section")[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop (vertical) */}
      <div
        ref={barRef}
        className={`fixed left-6 top-0 bottom-0 z-40 hidden md:flex items-start transition-opacity duration-500 ${
          showBar ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative w-[6px] bg-blue-100 h-full ml-3 rounded-full overflow-hidden">
          <div
            className="absolute left-0 w-full bg-gradient-to-b from-blue-500 to-blue-700 transition-all duration-700"
            style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
          />

          {steps.map((step, index) => {
            const dotClass = getDotClass(index);
            const value = getStepValue(index);

            return (
              <div
                key={index}
                className="absolute -left-6 flex items-center space-x-4 cursor-pointer"
                style={{ top: `${(index / (steps.length - 1)) * 100}%` }}
                onClick={() => scrollToStep(index)}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 z-10 transition-all duration-300 ${dotClass}`}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      index === activeStep ? "text-blue-700" : "text-gray-500"
                    }`}
                    aria-current={index === activeStep ? "step" : undefined}
                  >
                    {step}
                  </span>
                  {value && (
                    <span className="text-xs text-gray-400 max-w-[120px] truncate">
                      {value}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile (horizontal interactif) */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex md:hidden bg-white border shadow-lg rounded-full px-4 py-2 transition-all duration-300 ${
          showBar ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {steps.map((step, index) => {
          const dotClass = getDotClass(index);
          return (
            <div
              key={index}
              className="flex flex-col items-center text-[10px] mx-2 cursor-pointer"
              onClick={() => scrollToStep(index)}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 mb-1 transition-all duration-300 ${dotClass}`}
                aria-hidden="true"
              />
              <span
                className={`whitespace-nowrap ${
                  index === activeStep
                    ? "text-blue-600 font-semibold"
                    : "text-gray-400"
                }`}
                aria-current={index === activeStep ? "step" : undefined}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VerticalProgressBar;
