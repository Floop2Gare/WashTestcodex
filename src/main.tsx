// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Point d’entrée principal de l’application
const container = document.getElementById('root');

if (!container) {
  throw new Error(
    "Élément #root introuvable dans le DOM. Vérifiez votre fichier index.html."
  );
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// (optionnel) Log mode dev
if (import.meta.env.DEV) {
  console.log("✅ Application lancée en mode développement");
}
