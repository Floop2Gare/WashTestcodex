/* Fichier : src/pages/MentionsLegales.tsx */

export default function MentionsLegales() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#0F52BA]">Mentions légales</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#0F52BA] mb-2">Informations générales</h2>
        <p className="mb-2"><strong>Site :</strong> Washngo.fr</p>
        <p><strong>Responsables :</strong></p>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            <strong>ADRIEN ESTRUCH</strong><br />
            SIREN : 982 913 980<br />
            SIRET : 982 913 980 00016<br />
            Adresse : 182 CHE du Coulet, 13119 Saint-Savournin, FRANCE<br />
            Code APE : 96.09Z - Autres services personnels n.c.a.<br />
            Entrepreneur individuel
          </li>
          <li>
            <strong>RIHET Clément</strong><br />
            SIREN : 942 248 352<br />
            SIRET : 942 248 352 00018<br />
            Adresse : Rousset, France<br />
            Code APE : 45.20A - Entretien et réparation de véhicules automobiles légers<br />
            Entrepreneur individuel
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#0F52BA] mb-2">Activité</h2>
        <p>Wash&Go est un service de nettoyage automobile professionnel à domicile ou sur rendez-vous. Les prestations sont réalisées exclusivement dans le département des Bouches-du-Rhône (13).</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#0F52BA] mb-2">Paiement</h2>
        <p>Les prestations sont payables :</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>En espèces</li>
          <li>Par carte bancaire (via terminal de paiement)</li>
        </ul>
        <p className="mt-2">Une facture peut être émise sur simple demande.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#0F52BA] mb-2">Données personnelles / RGPD</h2>
        <p>Les informations collectées via les formulaires du site ne sont jamais revendues ni transmises à des tiers. Elles sont conservées uniquement dans le cadre de la relation client. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de modification et de suppression de vos données personnelles en nous contactant à l’adresse suivante : <a href="mailto:wash.go13@gmail.com" className="underline text-blue-600">wash.go13@gmail.com</a>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#0F52BA] mb-2">Hébergeur</h2>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.<br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">https://vercel.com</a>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#0F52BA] mb-2">Nom de domaine</h2>
        <p>
          Le nom de domaine <strong>washngo.fr</strong> est enregistré et géré via <strong>OVH SAS</strong> – 2 rue Kellermann, 59100 Roubaix, France.<br />
          <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">https://www.ovh.com</a>
        </p>
      </section>

      <a href="/" className="text-[#0F52BA] underline hover:text-[#093b85]">Retour à l’accueil</a>
    </main>
  );
}
