export default function RgpdPage() {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-[#0F52BA]">Respect du RGPD</h1>
  
        <p className="mb-4">
          Chez Wash&Go, nous nous engageons à respecter vos données personnelles conformément au
          Règlement Général sur la Protection des Données (RGPD).
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Finalités de la collecte</h2>
        <p className="mb-4">
          Nous collectons uniquement les données nécessaires à la gestion de notre activité :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Prise de rendez-vous</li>
          <li>Gestion des paiements</li>
          <li>Communication avec le client (email, SMS, téléphone)</li>
          <li>Facturation et comptabilité</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Données collectées</h2>
        <p className="mb-4">
          Les données personnelles collectées peuvent inclure : nom, prénom, numéro de téléphone, adresse
          email, plaque d’immatriculation, adresse postale et moyen de paiement.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Durée de conservation</h2>
        <p className="mb-4">
          Vos données sont conservées pendant une durée n’excédant pas celle nécessaire aux finalités pour
          lesquelles elles ont été collectées, soit 3 ans maximum après la dernière interaction.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Droits des utilisateurs</h2>
        <p className="mb-4">
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Droit d’accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l’effacement (droit à l’oubli)</li>
          <li>Droit à la portabilité</li>
          <li>Droit d’opposition ou de limitation</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sécurité des données</h2>
        <p className="mb-4">
          Vos données sont hébergées en France sur des serveurs sécurisés et ne sont jamais revendues ni
          partagées sans votre consentement explicite.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Paiement sécurisé</h2>
        <p className="mb-4">
          Les paiements sont réalisés en espèces ou par carte bancaire via des terminaux sécurisés. Une
          facture peut être émise sur demande.
        </p>
  
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
        <p>
          Pour exercer vos droits ou pour toute demande liée à la protection des données : <br />
          <strong>Email :</strong> wash.go13@gmail.com <br />
          <strong>Tél :</strong> 06 22 70 60 00
        </p>
        <a href="/" className="text-[#0F52BA] underline hover:text-[#093b85]">Retour à l’accueil</a>
        </div>
    );
  }
  