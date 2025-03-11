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

interface ProximityTransportProps {
  transports?: Transport[];
  theme: string;
}

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
  // Your existing demo transports data
];

const getStatusColor = (status: string, theme: string) => {
  if (theme === 'dark') {
    switch (status.toLowerCase()) {
      case "en cours":
      case "en route":
        return "bg-blue-900 text-blue-200";
      case "en attente":
        return "bg-yellow-900 text-yellow-200";
      case "terminé":
        return "bg-green-900 text-green-200";
      case "urgence":
        return "bg-red-900 text-red-200";
      case "proche":
        return "bg-purple-900 text-purple-200";
      default:
        return "bg-gray-700 text-gray-200";
    }
  } else {
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
  }
};

const getPriorityColor = (priorite: string | undefined, theme: string) => {
  if (!priorite) return theme === 'dark' 
    ? "bg-gray-700 text-gray-300 border-gray-600" 
    : "bg-gray-50 text-gray-700 border-gray-200";

  if (theme === 'dark') {
    switch (priorite.toLowerCase()) {
      case "haute":
        return "bg-red-900 text-red-200 border-red-800";
      case "moyenne":
        return "bg-orange-900 text-orange-200 border-orange-800";
      case "basse":
        return "bg-green-900 text-green-200 border-green-800";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  } else {
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
  }
};

const ProximityTransport: React.FC<ProximityTransportProps> = ({ transports = demoTransports, theme }) => {
  const [selectedAmbulance, setSelectedAmbulance] = useState<string>("Toutes");
  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(
    transports.length > 0 ? transports[0] : null
  );
  const [view, setView] = useState<"list" | "map">("list");
  const [displayMode, setDisplayMode] = useState<"compact" | "detailed">("detailed");

  // Theme-specific classes
  const containerClasses = `
    rounded-lg shadow-md p-6 flex flex-col h-full w-full
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
  `;

  const headerClasses = `
    flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 pb-4
    ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-100'}
  `;

  const headerTitleClasses = `
    text-xl font-bold flex items-center
    ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
  `;

  const selectorContainerClasses = `
    flex items-center p-2 rounded-md border
    ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}
  `;

  const selectorLabelClasses = `
    text-sm mr-2 font-medium
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  `;

  const selectorClasses = `
    text-sm rounded-md px-3 py-1.5 focus:ring-blue-500
    ${theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 text-gray-200 focus:border-blue-600' 
      : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'}
  `;

  const viewToggleContainerClasses = `
    flex p-1 rounded-md
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}
  `;

  const activeViewBtnClasses = `
    px-4 py-2 text-sm font-medium rounded shadow-sm
    ${theme === 'dark' ? 'bg-gray-800 text-blue-400' : 'bg-white text-blue-600'}
  `;

  const inactiveViewBtnClasses = `
    px-4 py-2 text-sm font-medium rounded transition-colors
    ${theme === 'dark' 
      ? 'text-gray-400 hover:bg-gray-600' 
      : 'text-gray-600 hover:bg-gray-50'}
  `;

  const transportCardClasses = (isSelected: boolean) => `
    rounded-lg border transition-all cursor-pointer
    ${isSelected
      ? theme === 'dark'
        ? 'border-blue-700 ring-2 ring-blue-900 shadow-md'
        : 'border-blue-300 ring-2 ring-blue-100 shadow-sm'
      : theme === 'dark'
        ? 'border-gray-700 hover:border-blue-700 hover:shadow-md'
        : 'border-gray-200 hover:border-blue-200 hover:shadow'}
  `;

  const cardHeaderClasses = `
    p-4 border-b rounded-t-lg flex justify-between items-center
    ${theme === 'dark' 
      ? 'border-gray-700 bg-gray-700' 
      : 'border-gray-100 bg-gray-50'}
  `;

  const cardTitleClasses = `
    font-medium text-lg
    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
  `;

  const subtextClasses = `
    text-sm
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const iconTextClasses = `
    inline-flex items-center mr-3
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const iconClasses = `
    mr-1
    ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
  `;

  const missionHeaderClasses = `
    font-medium mb-2 flex items-center pb-1
    ${theme === 'dark' 
      ? 'text-gray-200 border-b border-gray-700' 
      : 'text-gray-800 border-b border-gray-100'}
  `;

  const currentMissionClasses = `
    bg-blue-800 p-3 rounded-lg
    ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50'}
  `;

  const currentMissionTitleClasses = `
    font-medium
    ${theme === 'dark' ? 'text-blue-200' : 'text-blue-900'}
  `;

  const currentMissionTextClasses = `
    text-sm
    ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}
  `;

  const nextMissionClasses = `
    p-3 rounded-lg
    ${theme === 'dark' ? 'bg-orange-900' : 'bg-orange-50'}
  `;

  const nextMissionTitleClasses = `
    font-medium
    ${theme === 'dark' ? 'text-orange-200' : 'text-orange-900'}
  `;

  const nextMissionTextClasses = `
    text-sm
    ${theme === 'dark' ? 'text-orange-300' : 'text-orange-800'}
  `;

  const patientInfoContainerClasses = `
    p-3 rounded-lg mb-4
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}
  `;

  const patientInfoHeaderClasses = `
    font-medium mb-2 flex items-center
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  `;

  const patientInfoLabelClasses = `
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
  `;

  const patientInfoValueClasses = `
    font-medium
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const cardFooterClasses = `
    p-3 flex justify-between items-center rounded-b-lg border-t
    ${theme === 'dark' 
      ? 'bg-gray-700 border-gray-700' 
      : 'bg-gray-50 border-gray-200'}
  `;

  const contactButtonClasses = `
    text-sm font-medium flex items-center px-3 py-1.5 rounded border transition-colors
    ${theme === 'dark'
      ? 'bg-gray-800 text-gray-300 border-gray-600 hover:text-gray-100 hover:border-gray-500'
      : 'bg-white text-gray-700 border-gray-200 hover:text-gray-900 hover:border-gray-300'}
  `;

  const assignButtonClasses = `
    text-sm font-medium flex items-center px-3 py-1.5 rounded border transition-colors
    ${theme === 'dark'
      ? 'bg-blue-700 text-white border-blue-800 hover:bg-blue-600'
      : 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'}
  `;

  const routeButtonClasses = `
    text-sm font-medium flex items-center px-3 py-1.5 rounded border transition-colors
    ${theme === 'dark'
      ? 'bg-gray-800 text-gray-300 border-gray-600 hover:text-gray-100 hover:border-gray-500'
      : 'bg-white text-gray-700 border-gray-200 hover:text-gray-900 hover:border-gray-300'}
  `;

  const emptyStateContainerClasses = `
    flex-grow flex items-center justify-center p-10 border rounded-lg
    ${theme === 'dark' 
      ? 'bg-gray-700 border-gray-600' 
      : 'bg-gray-50 border-gray-200'}
  `;

  const emptyStateCardClasses = `
    text-center p-8 rounded-lg shadow-sm
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
  `;

  const emptyStateTitleClasses = `
    text-lg mb-2 font-medium
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const emptyStateTextClasses = `
    mb-4
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
  `;

  const emptyStateAlertClasses = `
    text-sm p-2 rounded border
    ${theme === 'dark' 
      ? 'bg-yellow-900 text-yellow-200 border-yellow-800' 
      : 'bg-yellow-50 text-gray-500 border-yellow-100'}
  `;

  const emptyStateIconClasses = `
    mx-auto mb-4
    ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}
  `;

  const actionButtonClasses = `
    mt-2 px-4 py-2 rounded-md transition-colors
    ${theme === 'dark' 
      ? 'bg-blue-700 text-white hover:bg-blue-600' 
      : 'bg-blue-600 text-white hover:bg-blue-700'}
  `;

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
      <div className={containerClasses}>
        <div className={headerClasses}>
          <h2 className={headerTitleClasses}>
            <span className="bg-blue-500 w-2 h-6 rounded mr-3"></span>
            Transports à Proximité
          </h2>
        </div>
        <div className={emptyStateContainerClasses}>
          <div className="text-center p-8">
            <MapPin size={60} className={emptyStateIconClasses} />
            <p className={emptyStateTitleClasses}>
              Aucun transport à proximité
            </p>
            <p className={emptyStateTextClasses}>
              Les transports proches des ambulances seront affichés ici
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* En-tête avec titre et filtres */}
      <div className={headerClasses}>
        <h2 className={headerTitleClasses}>
          <span className="bg-blue-500 w-2 h-6 rounded mr-3"></span>
          Transports à Proximité
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          {/* Sélecteur d'ambulance */}
          <div className={selectorContainerClasses}>
            <label
              htmlFor="ambulance-select"
              className={selectorLabelClasses}
            >
              Ambulance:
            </label>
            <select
              id="ambulance-select"
              value={selectedAmbulance}
              onChange={(e) => setSelectedAmbulance(e.target.value)}
              className={selectorClasses}
            >
              {availableAmbulances.map((amb) => (
                <option key={amb} value={amb}>
                  {amb}
                </option>
              ))}
            </select>
          </div>

          {/* Bascule vue liste/carte */}
          <div className={viewToggleContainerClasses}>
            <button
              className={view === "list" ? activeViewBtnClasses : inactiveViewBtnClasses}
              onClick={() => setView("list")}
            >
              Liste
            </button>
            <button
              className={view === "map" ? activeViewBtnClasses : inactiveViewBtnClasses}
              onClick={() => setView("map")}
            >
              Carte
            </button>
          </div>

          {/* Mode d'affichage */}
          <div className={viewToggleContainerClasses}>
            <button
              className={displayMode === "compact" ? activeViewBtnClasses : inactiveViewBtnClasses}
              onClick={() => setDisplayMode("compact")}
            >
              Compact
            </button>
            <button
              className={displayMode === "detailed" ? activeViewBtnClasses : inactiveViewBtnClasses}
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
                className={transportCardClasses(isSelected)}
                onClick={() => setSelectedTransport(transport)}
              >
                {/* En-tête de la carte */}
                <div className={cardHeaderClasses}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-blue-800' : 'bg-blue-100'}`}>
                      <Navigation className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className={cardTitleClasses}>
                        {transport.ambulance}
                        <p className={subtextClasses}>
                          <span className={iconTextClasses}>
                            <MapPin size={14} className={iconClasses} />
                            {transport.equipe}
                          </span>
                          <span className={iconTextClasses}>
                            <Ambulance size={14} className={iconClasses} />
                            {transport.type}
                          </span>
                        </p>
                      </h3>

                      <p className={subtextClasses}>
                        <span className={iconTextClasses}>
                          <MapPin size={14} className={iconClasses} />
                          {transport.distance}
                        </span>
                        <span className={iconTextClasses}>
                          <Clock size={14} className={iconClasses} />
                          {transport.tempsEstime}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      transport.statusColor || getStatusColor(transport.status, theme)
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
                        <h4 className={missionHeaderClasses}>
                          <Truck size={16} className="mr-2 text-blue-500" />
                          Mission Actuelle
                        </h4>
                        <div className={currentMissionClasses}>
                          <p className={currentMissionTitleClasses}>
                            {transport.missionActuelle?.description}
                          </p>
                          <div className="mt-2 grid grid-cols-1 gap-2">
                            <p className={currentMissionTextClasses}>
                              <span
                                className={`inline-flex items-center mr-2 px-2 py-0.5 rounded-full text-xs ${
                                  transport.missionActuelle?.enCharge
                                    ? theme === 'dark' ? "bg-green-800 text-green-200" : "bg-green-100 text-green-800"
                                    : theme === 'dark' ? "bg-yellow-800 text-yellow-200" : "bg-yellow-100 text-yellow-800"
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
                            <p className={currentMissionTextClasses}>
                              <MapPin size={14} className="mr-1 flex-shrink-0" />
                              <span>{transport.lieuActuel}</span>
                            </p>
                            <p className={currentMissionTextClasses}>
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
                        <h4 className={missionHeaderClasses}>
                          <ArrowRight size={16} className="mr-2 text-orange-500" />
                          Prochain transport planifié
                        </h4>
                        <div className={nextMissionClasses}>
                          <p className={nextMissionTitleClasses}>
                            {transport.prochaineMission?.patient}
                          </p>
                          <div className="mt-2 grid grid-cols-1 gap-2">
                            <div className="flex justify-between items-center text-sm">
                              <div className={nextMissionTextClasses}>
                                <MapPin size={14} className="mr-1 inline-block" />
                                <span>Départ: {transport.lieuActuel}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <div className={nextMissionTextClasses}>
                                <MapPin size={14} className="mr-1 inline-block" />
                                <span>Arrivée: {transport.destination}</span>
                              </div>
                              <span className={nextMissionTextClasses}>
                                {transport.prochaineMission?.heureArrivee}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Information patient - Déplacée en bas */}
                      <div className={patientInfoContainerClasses}>
                        <h4 className={patientInfoHeaderClasses}>
                          <User size={16} className="mr-2" />
                          Information Patient
                        </h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className={patientInfoLabelClasses}>Nom:</div>
                          <div className={patientInfoValueClasses}>
                            {transport.patient.prenom} {transport.patient.nom}
                          </div>

                          <div className={patientInfoLabelClasses}>Téléphone:</div>
                          <div className={patientInfoValueClasses}>
                            {transport.patient.telephone}
                          </div>

                          {transport.patient.mobilite && (
                            <>
                              <div className={patientInfoLabelClasses}>Mobilité:</div>
                              <div className={patientInfoValueClasses}>
                                {transport.patient.mobilite}
                              </div>
                            </>
                          )}

                          {transport.patient.informationsSpeciales && (
                            <>
                              <div className={patientInfoLabelClasses}>Notes:</div>
                              <div className={patientInfoValueClasses}>
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
                      <div className={theme === 'dark' ? 'bg-blue-900 rounded p-2' : 'bg-blue-50 rounded p-2'}>
                        <p className={theme === 'dark' ? 'text-sm text-blue-300 font-medium' : 'text-sm text-blue-800 font-medium'}>
                          {transport.missionActuelle?.enCharge
                            ? "✓ En charge: "
                            : "⌛ En attente: "}
                          {transport.missionActuelle?.description}
                        </p>
                      </div>

                      {/* Prochaine mission en mode compact */}
                      <div className={theme === 'dark' ? 'bg-orange-900 rounded p-2' : 'bg-orange-50 rounded p-2'}>
                        <p className={theme === 'dark' ? 'text-sm text-orange-300 font-medium' : 'text-sm text-orange-800 font-medium'}>
                          → Prochain: {transport.prochaineMission?.patient},{" "}
                          {transport.prochaineMission?.heureDepart}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className={`flex justify-between items-center pt-3 mt-1 ${theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-100'}`}>
                    <div className="flex items-center">
                      <div
                        className={`px-3 py-1 text-xs rounded-full border font-medium ${getPriorityColor(
                          transport.priorite, theme
                        )}`}
                      >
                        Priorité: {transport.priorite}
                      </div>
                    </div>
                    <div className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                      {transport.patient.heureDomicile} →{" "}
                      {transport.patient.heureHopital}
                    </div>
                  </div>
                </div>

                {/* Bas de la carte avec actions */}
                <div className={cardFooterClasses}>
                  <button className={contactButtonClasses}>
                    <Phone size={16} className="mr-2 text-blue-500" />
                    Contacter
                  </button>
                  <button className={assignButtonClasses}>
                    <Truck size={16} className="mr-2" />
                    Assigner
                  </button>
                  <button className={routeButtonClasses}>
                    <Navigation size={16} className="mr-2 text-blue-500" />
                    Itinéraire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={emptyStateContainerClasses}>
          {/* Vue carte */}
          <div className={emptyStateCardClasses}>
            <MapPin size={60} className="text-blue-300 mx-auto mb-4" />
            <h3 className={emptyStateTitleClasses}>
              Visualisation Cartographique
            </h3>
            <p className={emptyStateTextClasses}>
              Cette fonctionnalité permettra de visualiser tous les transports
              sur une carte interactive.
            </p>
            <p className={emptyStateAlertClasses}>
              La vue carte est actuellement en cours de développement
            </p>
          </div>
        </div>
      )}

      {/* Panneau "Aucun transport trouvé" si nécessaire */}
      {filteredTransports.length === 0 && (
        <div className={emptyStateContainerClasses}>
          <div className={emptyStateCardClasses}>
            <AlertCircle size={60} className={emptyStateIconClasses} />
            <p className={emptyStateTitleClasses}>
              Aucun transport à proximité{" "}
              {selectedAmbulance !== "Toutes" ? `de ${selectedAmbulance}` : ""}
            </p>
            <button
              className={actionButtonClasses}
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