import { ReactElement } from 'react';
import { GraduationCap, Truck, ShieldCheck, Rocket } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: ReactElement;
  bgColor: string;
  highlight?: boolean;
}

export const features: Feature[] = [
  {
    title: "Une vision née d'un Projet étudiant",
    description:
      "Offrez à votre véhicule le confort qu’il mérite, sans compromis sur votre emploi du temps.",
    icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
    bgColor: "bg-blue-100",
  },
  {
    title: "Flexibilité intégrale",
    description:
      "Notre équipe vient à vous : domicile, bureau ou parking, selon vos disponibilités.",
    icon: <Truck className="h-8 w-8 text-green-600" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Excellence sans compromis",
    description:
      "Produits haut de gamme, méthode rigoureuse, résultat irréprochable.",
    icon: <ShieldCheck className="h-8 w-8 text-yellow-600" />,
    bgColor: "bg-yellow-100",
  },
  {
    title: "Confiance & évolution",
    description:
      "Notre croissance rapide reflète votre confiance. Merci pour votre fidélité.",
    icon: <Rocket className="h-8 w-8 text-purple-600" />,
    bgColor: "bg-purple-100",
  },
];
