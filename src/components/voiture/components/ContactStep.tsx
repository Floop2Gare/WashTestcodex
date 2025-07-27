import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, ImagePlus, Send, Plus } from "lucide-react";

interface ContactStepProps {
  selections: { step: string; value: string | string[] }[];
  totalPrice: number;
  totalTime: number;
  onReset?: () => void;
}

const initialForm = {
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  adresse: "",
  date: "",
  message: "",
  rappel: true,
};

function isValidDate(dateStr: string) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  return date.getDay() !== 0;
}

function isValidEmail(email: string) {
  // Email avec nom de domaine réel (simple mais efficace)
  return /^[^@\s]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email);
}

function isValidPhone(phone: string) {
  // 10 chiffres, pas de lettres
  return /^\d{10}$/.test(phone.replace(/\s/g, ""));
}

function isValidAdresse(adresse: string) {
  // Numéro, rue, code postal 5 chiffres, ville
  return /\d+\s+.+,?\s*\d{5}\s+.+/i.test(adresse);
}

const ContactStep: React.FC<ContactStepProps> = ({ selections, totalPrice, totalTime, onReset }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false); // Ajouté
  const [photos, setPhotos] = useState<File[]>([]);
  const [rgpd, setRgpd] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Ajout : états locaux pour garantir la synchro des props
  const [localSelections, setLocalSelections] = useState(selections);
  const [localTotalPrice, setLocalTotalPrice] = useState(totalPrice);
  const [localTotalTime, setLocalTotalTime] = useState(totalTime);

  useEffect(() => {
    setLocalSelections(selections);
    setLocalTotalPrice(totalPrice);
    setLocalTotalTime(totalTime);
  }, [selections, totalPrice, totalTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidDate(value)) {
      setForm({ ...form, date: value });
      setError("");
    } else {
      setForm({ ...form, date: "" });
      setError("Date non valide (dimanche non autorisé)");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 3);
    setPhotos(files);
  };

  const handlePhotoZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.prenom || !form.telephone || !form.email || !form.date) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Merci de saisir un email valide avec un nom de domaine réel.");
      return;
    }
    if (!isValidPhone(form.telephone)) {
      setError("Merci de saisir un numéro de téléphone valide (10 chiffres).");
      return;
    }
    // if (!isValidAdresse(form.adresse)) {
//   setError("Merci de saisir une adresse complète (numéro, rue, code postal, ville).");
//   return;
// }
    if (!rgpd) {
      setError("Merci d'accepter l'utilisation de vos données (RGPD).");
      return;
    }
    setError("");
    setLoading(true);

    // Utilisation des valeurs locales pour garantir la fraîcheur
    const getValue = (stepLabel: string) => {
      const found = localSelections.find(sel => sel.step === stepLabel);
      if (!found) return "-";
      if (Array.isArray(found.value)) return found.value.length ? found.value.join(", ") : "-";
      return found.value || "-";
    };
    const formatTime = (min: number) => {
      const h = Math.floor(min / 60);
      const m = min % 60;
      if (h && m) return `± ${h}h${m.toString().padStart(2, "0")}`;
      if (h) return `± ${h}h`;
      return `± ${m} min`;
    };
    const message = `🚗 Nouvelle demande Wash&GO\n\n` +
      `Aspiration : ${getValue("Aspiration")}\n` +
      `Type de véhicule : ${getValue("Véhicule")}\n` +
      `Sièges à nettoyer : ${getValue("Pressing sièges")}\n` +
      `Options choisies : ${getValue("Options spéciales")}\n` +
      `Spécificités : ${getValue("Extras")}\n` +
      `Prix total : ${localTotalPrice} €\n` +
      `Temps estimé : ${formatTime(localTotalTime)}\n\n` +
      `📩 Contact client :\n` +
      `Nom : ${form.nom} ${form.prenom}\n` +
      `Téléphone : ${form.telephone}\n` +
      `Email : ${form.email}\n` +
      `Adresse : ${form.adresse}\n` +
      `Date souhaitée : ${form.date}\n` +
      `Message perso : ${form.message || "-"}\n\n` +
      `🔐 Code parrainage : Washgo`;

    const formData = new FormData();
    formData.append('access_key', 'b1c483a3-32a0-4ab0-8382-f7b50840048f');
    formData.append('name', `${form.nom} ${form.prenom}`);
    formData.append('email', form.email);
    formData.append('message', message);
    photos.forEach((file, idx) => {
      formData.append('photos[]', file);
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setSuccess(true);
        setShowSuccessOverlay(true); // Affiche l'overlay
        setForm(initialForm);
        setPhotos([]);
        setRgpd(false);
        if (typeof onReset === 'function') onReset();
      } else {
        setError("Erreur, merci de réessayer.");
      }
    } catch (err) {
      setError("Erreur, merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Fermer l'overlay automatiquement après 3,5s
  useEffect(() => {
    if (showSuccessOverlay) {
      const timer = setTimeout(() => setShowSuccessOverlay(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessOverlay]);

  // Affichage téléphone masqué (optionnel)
  const displayPhone = form.telephone.replace(/\D/g, "").replace(/(\d{2})(?=\d)/g, "$1 ").trim();

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white">
      {/* Overlay de succès */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 max-w-md w-full text-center relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setShowSuccessOverlay(false)}
              aria-label="Fermer"
            >
              ×
            </button>
            <svg className="mx-auto mb-4" width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#e0f7fa"/><path d="M7 13l3 3 7-7" stroke="#009688" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h2 className="text-2xl font-bold text-[#0049ac] mb-2">Message envoyé !</h2>
            <p className="text-gray-700 mb-2">Nous vous recontacterons sous peu.</p>
          </div>
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: scale(0.98); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
              animation: fade-in 0.3s ease;
            }
          `}</style>
        </div>
      )}
      {/* Fin overlay */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Finalisez votre <span className="text-[#0049ac]">demande de lavage</span>
        </h2>

        <div className="bg-blue-50 border-l-4 border-[#0049ac] rounded-xl p-6 mb-10 shadow-sm">
          <h3 className="font-semibold text-[#0049ac] mb-4 text-lg">Récapitulatif de votre sélection</h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            {selections.map((sel, idx) => (
              <li key={idx}>
                <span className="font-medium">{sel.step} :</span>{" "}
                {Array.isArray(sel.value) ? sel.value.join(", ") : sel.value}
              </li>
            ))}
          </ul>
          <div className="mt-4 text-sm">
            <p><strong>Prix total :</strong> <span className="text-[#0049ac] font-bold">{totalPrice} €</span></p>
            <p><strong>Durée estimée :</strong> <span className="text-[#0049ac] font-bold">{totalTime} min</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:outline-none" name="nom" placeholder="Nom *" value={form.nom} onChange={handleChange} />
            <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:outline-none" name="prenom" placeholder="Prénom *" value={form.prenom} onChange={handleChange} />
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:outline-none"
              name="telephone"
              placeholder="Téléphone *"
              value={displayPhone}
              onChange={handleChange}
              maxLength={14}
              inputMode="numeric"
              pattern="[0-9 ]*"
            />
            <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:outline-none" type="email" name="email" placeholder="Email *" value={form.email} onChange={handleChange} />
            <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:outline-none sm:col-span-2" name="adresse" placeholder="Adresse / Ville *" value={form.adresse} onChange={handleChange} />
            <div className="relative sm:col-span-2">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleDateChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:outline-none pl-10"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Photos (max 3)</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              onClick={handlePhotoZoneClick}
              style={{ minHeight: 120 }}
            >
              <ImagePlus className="w-8 h-8 text-[#0049ac] mb-2" />
              <span className="text-xs text-gray-500 mb-1">Cliquez ici pour ajouter jusqu'à 3 photos</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="w-full hidden"
              />
            </div>
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {photos.map((file, idx) => (
                  <img key={idx} src={URL.createObjectURL(file)} alt={`photo-${idx}`} className="w-20 h-20 object-cover rounded shadow border" />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={rgpd} onChange={() => setRgpd(v => !v)} className="accent-[#0049ac] w-5 h-5" required />
            <span>J'accepte l'utilisation de mes données (RGPD)</span>
          </div>

          <textarea className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:outline-none" rows={3} name="message" placeholder="Message" value={form.message} onChange={handleChange} />

          {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
          {success && <div className="text-green-600 text-sm font-semibold">Votre demande a bien été envoyée !</div>}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* Bouton Réinitialiser à gauche */}
            <button
              type="button"
              onClick={() => {
                setForm(initialForm);
                setPhotos([]);
                setRgpd(false);
                setError("");
                setSuccess(false);
                if (typeof onReset === 'function') onReset();
              }}
              className="flex items-center gap-2 bg-gray-100 text-gray-800 font-semibold rounded-lg px-4 py-2 shadow-sm hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.293 6.293a1 1 0 011.414 0L8 8.586V7a1 1 0 112 0v4a1 1 0 01-1 1H5a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 010-1.414zM10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" /></svg>
              Réinitialiser le formulaire
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0049ac] text-white font-bold rounded-2xl px-6 py-3 flex items-center justify-center gap-2 shadow hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" /> Envoyer ma demande
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactStep;
