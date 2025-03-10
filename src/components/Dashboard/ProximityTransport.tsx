import { useState } from "react";
import {
  MapPin,
  Clock,
  Navigation,
  User,
  AlertCircle,
  Truck,
  Phone,
  Check,
  ArrowRight,
  Ambulance,
} from "lucide-react";

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
    informationsSpeciales?: string;
    mobilite?: string;
  };
  priorite?: string;
  tempsEstime?: string;
  type?: string;
  missionActuelle?: {
    description: string;
    enCharge: boolean;
    adresse: string;
    heure: string;
  };
  prochaineMission?: {
    patient: string;
    adresseDepart: string;
    heureDepart: string;
    destination: string;
    heureArrivee: string;
  };
}

const demoTransports: Transport[] = [
  {
    id: "trans-001",
    ambulance: "AMB-101",
    equipe: "Martin D. / Sophie L.",
    lieuActuel: "43 Rue des Lilas, Paris",
    destination: "Hôpital Saint-Antoine, Paris",
    rdv: "10:30",
    status: "En route",
    statusColor: "bg-blue-100 text-blue-800",
    distance: "2 km",
    heurePrevue: "10:45",
    patient: {
      nom: "Durand",
      prenom: "Paul",
      adresse: "12 Avenue Victor Hugo, Paris",
      telephone: "06 12 34 56 78",
      heureDomicile: "10:00",
      heureHopital: "10:30",
      informationsSpeciales: "Patient sous oxygène",
      mobilite: "Autonome avec aide",
    },
    priorite: "Standard",
    tempsEstime: "15 min",
    type: "AMB",
    missionActuelle: {
      description: "Transport de Paul Durand vers Hôpital Saint-Antoine",
      enCharge: true,
      adresse: "En route vers Hôpital Saint-Antoine, service Cardiologie",
      heure: "Arrivée prévue à 10:30",
    },
    prochaineMission: {
      patient: "Robert Martin (62 ans, consultation)",
      adresseDepart: "78 Avenue Montaigne, Paris",
      heureDepart: "10:00",
      destination: "Centre Médical Pasteur, Paris",
      heureArrivee: "10:30",
    },
  },
  {
    id: "trans-002",
    ambulance: "AMB-203",
    equipe: "Thomas B. / Julie R.",
    lieuActuel: "22 Boulevard Haussmann, Paris",
    destination: "Clinique des Ormes, Paris",
    rdv: "11:15",
    status: "Urgence",
    statusColor: "bg-red-100 text-red-800",
    distance: "1.5 km",
    heurePrevue: "10:45",
    patient: {
      nom: "Lemoine",
      prenom: "Sophie",
      adresse: "56 Rue de Rivoli, Paris",
      telephone: "06 98 76 54 32",
      heureDomicile: "10:20",
      heureHopital: "10:45",
      informationsSpeciales: "Patiente sous oxygène",
      mobilite: "Fauteuil roulant",
    },
    priorite: "Standard",
    tempsEstime: "15 min",
    type: "AMB",
    missionActuelle: {
      description: "Transport urgent de Sophie Lemoine vers Clinique des Ormes",
      enCharge: true,
      adresse: "En route vers Clinique des Ormes, service Urgences",
      heure: "Arrivée prévue à 10:45",
    },
    prochaineMission: {
      patient: "Jacques Mercier (78 ans, dialyse)",
      adresseDepart: "12 Rue Saint-Michel, Paris",
      heureDepart: "10:20",
      destination: "Hôpital Bichat, service Néphrologie",
      heureArrivee: "10:45",
    },
  },
  {
    id: "trans-003",
    ambulance: "AMB-156",
    equipe: "Pierre M. / Emma T.",
    lieuActuel: "78 Rue de la Pompe, Paris",
    destination: "Centre Médical du Parc, Paris",
    rdv: "09:45",
    status: "Terminé",
    statusColor: "bg-green-100 text-green-800",
    distance: "3 km",
    heurePrevue: "10:50",
    patient: {
      nom: "Moreau",
      prenom: "Jean",
      adresse: "34 Avenue Foch, Paris",
      telephone: "07 45 67 89 01",
      heureDomicile: "10:50",
      heureHopital: "11:15",
      informationsSpeciales: "Patient diabétique",
      mobilite: "Autonome",
    },
    priorite: "Standard",
    tempsEstime: "15 min",
    type: "AMB",
    missionActuelle: {
      description: "Transport terminé de Jean Moreau à Clinique Saint-Louis",
      enCharge: false,
      adresse: "Stationnement à Clinique Saint-Louis",
      heure: "Terminé à 10:50, en attente nouvelle mission",
    },
    prochaineMission: {
      patient: "Marie Duval (55 ans, examen radiologique)",
      adresseDepart: "45 Boulevard Voltaire, Paris",
      heureDepart: "10:50",
      destination: "Centre d'Imagerie Médicale Saint-Denis",
      heureArrivee: "11:15",
    },
  },
  {
    id: "trans-004",
    ambulance: "AMB-118",
    equipe: "Lucas V. / Marie D.",
    lieuActuel: "15 Rue des Écoles, Paris",
    destination: "Hôpital Saint-Louis, Paris",
    rdv: "14:30",
    status: "En charge",
    statusColor: "bg-yellow-100 text-yellow-800",
    distance: "1 km",
    heurePrevue: "11:30",
    patient: {
      nom: "Petit",
      prenom: "Françoise",
      adresse: "8 Rue des Lilas, Paris",
      telephone: "06 34 56 78 90",
      heureDomicile: "11:00",
      heureHopital: "11:30",
      informationsSpeciales: "Patiente avec problèmes d'audition",
      mobilite: "Déambulateur",
    },
    priorite: "Standard",
    tempsEstime: "15 min",
    type: "AMB",
    missionActuelle: {
      description: "En attente au dépôt pour prochain transport",
      enCharge: false,
      adresse: "Dépôt central, 22 Avenue République",
      heure: "Départ prévu à 11:00",
    },
    prochaineMission: {
      patient: "Marie Duval (55 ans, examen radiologique)",
      adresseDepart: "45 Boulevard Voltaire, Paris",
      heureDepart: "10:50",
      destination: "Centre d'Imagerie Médicale Saint-Denis",
      heureArrivee: "11:15",
    },
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "en cours":
    case "en route":
      return "bg-blue-100 text-blue-800";
    case "en attente":
      return "bg-yellow-100 text-yellow-800";
    case "terminé":
      return "bg-green-100 text-green-800";
    case "urgence":
      return "bg-red-100 text-red-800";
    case "proche":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priorite: string | undefined) => {
  if (!priorite) return "bg-gray-50 text-gray-700 border-gray-200";

  switch (priorite.toLowerCase()) {
    case "haute":
      return "bg-red-50 text-red-700 border-red-200";
    case "moyenne":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "basse":
      return "bg-green-50 text-green-700 border-green-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const ProximityTransport = ({ transports = demoTransports }) => {
  const [selectedAmbulance, setSelectedAmbulance] = useState<string>("Toutes");

  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(
    transports.length > 0 ? transports[0] : null
  );

  const [view, setView] = useState<"list" | "map">("list");

  const [displayMode, setDisplayMode] = useState<"compact" | "detailed">(
    "detailed"
  );

  const enhancedTransports = transports.map((transport) => ({
    ...transport,
    priorite: transport.priorite || "Standard",
    type: transport.type || "AMB",
    tempsEstime: transport.tempsEstime || "15 min",
  }));

  const availableAmbulances = [
    "Toutes",
    ...Array.from(new Set(enhancedTransports.map((t) => t.ambulance))),
  ];

  const filteredTransports =
    selectedAmbulance === "Toutes"
      ? enhancedTransports
      : enhancedTransports.filter((t) => t.ambulance === selectedAmbulance);

  if (enhancedTransports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="bg-blue-500 w-2 h-6 rounded mr-3"></span>
            Transports à Proximité
          </h2>
        </div>
        <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-lg p-10">
          <div className="text-center p-8">
            <MapPin size={60} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700 text-lg mb-2">
              Aucun transport à proximité
            </p>
            <p className="text-gray-500">
              Les transports proches des ambulances seront affichés ici
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full w-full">
      {/* En-tête avec titre et filtres */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="bg-blue-500 w-2 h-6 rounded mr-3"></span>
          Transports à Proximité
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          {/* Sélecteur d'ambulance */}
          <div className="flex items-center bg-gray-50 p-2 rounded-md border border-gray-200">
            <label
              htmlFor="ambulance-select"
              className="text-sm text-gray-700 mr-2 font-medium"
            >
              Ambulance:
            </label>
            <select
              id="ambulance-select"
              value={selectedAmbulance}
              onChange={(e) => setSelectedAmbulance(e.target.value)}
              className="text-sm bg-white border border-gray-300 rounded-md px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
            >
              {availableAmbulances.map((amb) => (
                <option key={amb} value={amb}>
                  {amb}
                </option>
              ))}
            </select>
          </div>

          {/* Bascule vue liste/carte */}
          <div className="flex bg-gray-100 p-1 rounded-md">
            <button
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                view === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setView("list")}
            >
              Liste
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                view === "map"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setView("map")}
            >
              Carte
            </button>
          </div>

          {/* Mode d'affichage */}
          <div className="flex bg-gray-100 p-1 rounded-md">
            <button
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                displayMode === "compact"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setDisplayMode("compact")}
            >
              Compact
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                displayMode === "detailed"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setDisplayMode("detailed")}
            >
              Détaillé
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      {view === "list" ? (
        <div className="flex-grow grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 overflow-auto">
          {filteredTransports.map((transport) => {
            const isSelected = selectedTransport?.id === transport.id;

            return (
              <div
                key={transport.id}
                className={`rounded-lg border transition-all cursor-pointer shadow-sm ${
                  isSelected
                    ? "border-blue-300 ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-blue-200 hover:shadow"
                }`}
                onClick={() => setSelectedTransport(transport)}
              >
                {/* En-tête de la carte */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Navigation className="text-blue-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg">
                        {transport.ambulance}
                        <p className="text-sm text-gray-500">
                          <span className="inline-flex items-center mr-3">
                            <MapPin size={14} className="mr-1 text-gray-400" />
                            {transport.equipe}
                          </span>
                          <span className="inline-flex items-center">
                            <Ambulance
                              size={14}
                              className="mr-1 text-gray-400"
                            />
                            {transport.type}
                          </span>
                        </p>
                      </h3>

                      <p className="text-sm text-gray-500">
                        <span className="inline-flex items-center mr-3">
                          <MapPin size={14} className="mr-1 text-gray-400" />
                          {transport.distance}
                        </span>
                        <span className="inline-flex items-center">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {transport.tempsEstime}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      transport.statusColor || getStatusColor(transport.status)
                    }`}
                  >
                    {transport.status}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-4">
                  {displayMode === "detailed" ? (
                    <>
                      {/* Mission actuelle - Ajout d'une section dédiée */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center border-b pb-1 border-gray-100">
                          <Truck size={16} className="mr-2 text-blue-500" />
                          Mission Actuelle
                        </h4>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-blue-900 font-medium">
                            {transport.missionActuelle?.description}
                          </p>
                          <div className="mt-2 grid grid-cols-1 gap-2">
                            <p className="text-sm text-blue-800">
                              <span
                                className={`inline-flex items-center mr-2 px-2 py-0.5 rounded-full text-xs ${
                                  transport.missionActuelle?.enCharge
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {transport.missionActuelle?.enCharge ? (
                                  <>
                                    <Check size={12} className="mr-1" /> En
                                    charge
                                  </>
                                ) : (
                                  "En charge"
                                )}
                              </span>
                            </p>
                            <p className="text-sm text-blue-800 flex items-center">
                              <MapPin
                                size={14}
                                className="mr-1 flex-shrink-0"
                              />
                              <span>{transport.lieuActuel}</span>
                            </p>
                            <p className="text-sm text-blue-800 flex items-center">
                              <Clock size={14} className="mr-1 flex-shrink-0" />
                              <span>
                                Sera disponible à {transport.heurePrevue}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Prochaine mission - Nouvelle section */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center border-b pb-1 border-gray-100">
                          <ArrowRight
                            size={16}
                            className="mr-2 text-orange-500"
                          />
                          Prochain transport planifié
                        </h4>
                        <div className="bg-orange-50 rounded-lg p-3">
                          <p className="text-orange-900 font-medium">
                            {transport.prochaineMission?.patient}
                          </p>
                          <div className="mt-2 grid grid-cols-1 gap-2">
                            <div className="flex justify-between items-center text-sm text-orange-800">
                              <div className="flex items-center">
                                <MapPin
                                  size={14}
                                  className="mr-1 flex-shrink-0"
                                />
                                <span>Départ: {transport.lieuActuel}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-orange-800">
                              <div className="flex items-center">
                                <MapPin
                                  size={14}
                                  className="mr-1 flex-shrink-0"
                                />
                                <span>Arrivée: {transport.destination}</span>
                              </div>
                              <span>
                                {transport.prochaineMission?.heureArrivee}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Information patient - Déplacée en bas */}
                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                          <User size={16} className="mr-2" />
                          Information Patient
                        </h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="text-gray-600">Nom:</div>
                          <div className="text-gray-800 font-medium">
                            {transport.patient.prenom} {transport.patient.nom}
                          </div>

                          <div className="text-gray-600">Téléphone:</div>
                          <div className="text-gray-800 font-medium">
                            {transport.patient.telephone}
                          </div>

                          {transport.patient.mobilite && (
                            <>
                              <div className="text-gray-600">Mobilité:</div>
                              <div className="text-gray-800 font-medium">
                                {transport.patient.mobilite}
                              </div>
                            </>
                          )}

                          {transport.patient.informationsSpeciales && (
                            <>
                              <div className="text-gray-600">Notes:</div>
                              <div className="text-gray-800 font-medium">
                                {transport.patient.informationsSpeciales}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* Mission actuelle en mode compact */}
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-sm text-blue-800 font-medium">
                          {transport.missionActuelle?.enCharge
                            ? "✓ En charge: "
                            : "⌛ En attente: "}
                          {transport.missionActuelle?.description}
                        </p>
                      </div>

                      {/* Prochaine mission en mode compact */}
                      <div className="bg-orange-50 rounded p-2">
                        <p className="text-sm text-orange-800 font-medium">
                          → Prochain: {transport.prochaineMission?.patient},{" "}
                          {transport.prochaineMission?.heureDepart}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-1">
                    <div className="flex items-center">
                      <div
                        className={`px-3 py-1 text-xs rounded-full border font-medium ${getPriorityColor(
                          transport.priorite
                        )}`}
                      >
                        Priorité: {transport.priorite}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {transport.patient.heureDomicile} →{" "}
                      {transport.patient.heureHopital}
                    </div>
                  </div>
                </div>

                {/* Bas de la carte avec actions */}
                <div className="bg-gray-50 p-3 flex justify-between items-center rounded-b-lg border-t border-gray-200">
                  <button className="text-sm text-gray-700 font-medium hover:text-gray-900 flex items-center bg-white px-3 py-1.5 rounded border border-gray-200 hover:border-gray-300 transition-colors">
                    <Phone size={16} className="mr-2 text-blue-500" />
                    Contacter
                  </button>
                  <button className="text-sm text-white font-medium bg-blue-600 hover:bg-blue-700 flex items-center px-3 py-1.5 rounded border border-blue-700 transition-colors">
                    <Truck size={16} className="mr-2" />
                    Assigner
                  </button>
                  <button className="text-sm text-gray-700 font-medium hover:text-gray-900 flex items-center bg-white px-3 py-1.5 rounded border border-gray-200 hover:border-gray-300 transition-colors">
                    <Navigation size={16} className="mr-2 text-blue-500" />
                    Itinéraire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-grow bg-gray-100 rounded-lg flex items-center justify-center p-10 border border-gray-200">
          {/* Vue carte */}
          <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
            <MapPin size={60} className="text-blue-300 mx-auto mb-4" />
            <h3 className="text-gray-800 font-medium text-lg mb-2">
              Visualisation Cartographique
            </h3>
            <p className="text-gray-600 mb-4">
              Cette fonctionnalité permettra de visualiser tous les transports
              sur une carte interactive.
            </p>
            <p className="text-sm text-gray-500 p-2 bg-yellow-50 rounded border border-yellow-100">
              La vue carte est actuellement en cours de développement
            </p>
          </div>
        </div>
      )}

      {/* Panneau "Aucun transport trouvé" si nécessaire */}
      {filteredTransports.length === 0 && (
        <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-lg p-10 border border-gray-200">
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <AlertCircle size={60} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700 text-lg mb-3">
              Aucun transport à proximité{" "}
              {selectedAmbulance !== "Toutes" ? `de ${selectedAmbulance}` : ""}
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setSelectedAmbulance("Toutes")}
            >
              Voir tous les transports
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProximityTransport;
