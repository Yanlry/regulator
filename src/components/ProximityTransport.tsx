import React from "react";

interface Transport {
  id: string;
  ambulance: string;
  equipe: string;
  lieuActuel: string;
  destination: string;
  rdv: string;
  status: string;
  statusColor: string;
  distance: string;
  heurePrevue: string;
  patient: {
    nom: string;
    prenom: string;
    adresse: string;
    telephone: string;
    heureDomicile: string;
    heureHopital: string;
  };
}

interface ProximityTransportProps {
  transports: Transport[];
}

const ProximityTransport: React.FC<ProximityTransportProps> = ({ transports }) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 h-[500px] w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🚑 Courses à Proximité
      </h3>

      {transports.length === 0 ? (
        <p className="text-gray-500">Aucun transport à proximité pour le moment.</p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
          {transports.map((transport) => (
            <div key={transport.id} className="p-4 bg-gray-50 rounded-lg border shadow-sm">
              {/* 🚑 Informations Ambulance */}
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold text-gray-800">{transport.ambulance}</h4>
                <span className={`px-3 py-1 text-sm rounded-md ${transport.statusColor}`}>
                  {transport.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Équipage : {transport.equipe}</p>

              {/* 📍 Détails du transport */}
              <div className="mt-3 text-sm text-gray-700">
                <p>📍 Lieu actuel : <span className="font-semibold">{transport.lieuActuel}</span></p>
                <p>🏥 Destination : <span className="font-semibold">{transport.destination}</span></p>
              </div>

              {/* 👤 Détails du Patient */}
              <div className="mt-3 text-sm text-gray-700 border-t pt-3">
                {/* 📝 Titre en gris clair */}
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  Prochain transport le plus proche dans l'heure
                </p>

                <p>📏 Distance : <span className="font-semibold text-blue-600">{transport.distance}</span></p>
                <p>👤 Patient : <span className="font-semibold">{transport.patient.prenom} {transport.patient.nom}</span></p>
                <p>🏠 Adresse : <span className="font-semibold">{transport.patient.adresse}</span></p>
                <p>📞 Téléphone : <span className="font-semibold">{transport.patient.telephone}</span></p>
                <p>🏡 Heure domicile : <span className="font-semibold">{transport.patient.heureDomicile}</span></p>
                <p>🏥 Heure hôpital : <span className="font-semibold">{transport.patient.heureHopital}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProximityTransport;