import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import libreIconUrl from "../assets/libre.png";
import occupeIconUrl from "../assets/occupe.png";
import pauseIconUrl from "../assets/pause.png";
import hopitalIconUrl from "../assets/hospital.png"; // Assurez-vous d'avoir cette image
import {
  FaMapMarkerAlt,
  FaUser,
  FaClock,
  FaRoute,
  FaRegHospital,
  FaPhoneAlt,
  FaCarAlt,
  FaExclamationTriangle,
  FaFilter,
  FaList,
  FaCalculator,
  FaLayerGroup,
  FaChartLine,
} from "react-icons/fa";
import LoadingSpinner from "../components/Common/LoadingSpinner";

const defaultCenter: [number, number] = [50.62925, 3.057256];

// Icônes pour les véhicules et points d'intérêt
const ambulanceIcons = {
  libre: new L.Icon({ iconUrl: libreIconUrl, iconSize: [32, 32] }),
  occupe: new L.Icon({ iconUrl: occupeIconUrl, iconSize: [32, 32] }),
  pause: new L.Icon({ iconUrl: pauseIconUrl, iconSize: [32, 32] }),
  hopital: new L.Icon({ iconUrl: hopitalIconUrl, iconSize: [38, 38] }),
};

// Données des hôpitaux
const hopitaux = [
  {
    id: "hop-1",
    nom: "Centre Hospitalier Universitaire de Lille",
    lat: 50.614,
    lng: 3.034,
    adresse: "2 Avenue Oscar Lambret, 59000 Lille",
    tel: "03 20 44 59 62",
    niveau: "Niveau 1 - Service complet",
    disponibilite: "Haute",
    occupation: 65,
  },
  {
    id: "hop-2",
    nom: "Hôpital Roger Salengro",
    lat: 50.6078,
    lng: 3.0349,
    adresse: "Rue Émile Laine, 59037 Lille",
    tel: "03 20 44 59 62",
    niveau: "Niveau 1 - Service complet",
    disponibilite: "Moyenne",
    occupation: 78,
  },
  {
    id: "hop-3",
    nom: "Centre Hospitalier de Roubaix",
    lat: 50.6912,
    lng: 3.1736,
    adresse: "11 Boulevard Lacordaire, 59100 Roubaix",
    tel: "03 20 99 31 31",
    niveau: "Niveau 2 - Service standard",
    disponibilite: "Basse",
    occupation: 92,
  },
  {
    id: "hop-4",
    nom: "Centre Hospitalier de Tourcoing",
    lat: 50.7235,
    lng: 3.1469,
    adresse: "135 Rue du Président Coty, 59200 Tourcoing",
    tel: "03 20 69 49 49",
    niveau: "Niveau 2 - Service standard",
    disponibilite: "Haute",
    occupation: 45,
  },
];

// Données des ambulances enrichies pour la régulation
const ambulances = [
  {
    id: "AMB-101",
    equipe: "Martin D. / Sophie L.",
    lat: 50.62925,
    lng: 3.057256,
    status: "libre",
    localisation: "35 Rue Jean Sans Peur, Lille",
    destination: "12 Rue de la Justice, Lys-Lez-Lannoy",
    heureDepart: "10:00",
    heureArrivee: "10:16",
    type: "Ambulance",
    equipement: "Type A - Réanimation",
    carburant: 75,
    kilometrage: 45892,
    maintenance: "À jour",
    tempsDeService: "3h25",
    dernierArret: "09:45",
    prochaineIntervention: null,
    distanceParcouru: 78,
    tempsDisponible: "5h30",
  },
  {
    id: "AMB-203",
    equipe: "Thomas B. / Julie R.",
    lat: 50.690102,
    lng: 2.889883,
    status: "occupe",
    localisation: "187 Avenue de la République, Marcq-en-Baroeul",
    destination: "Hospital Claude Huriez, Centre Sud",
    heureDepart: "10:30",
    heureArrivee: "10:58",
    type: "Ambulance",
    equipement: "Type A - Réanimation",
    carburant: 45,
    kilometrage: 63214,
    maintenance: "Contrôle nécessaire",
    tempsDeService: "5h10",
    dernierArret: "09:15",
    prochaineIntervention: "12:30 - Transport médical",
    distanceParcouru: 125,
    tempsDisponible: "1h15",
    urgence: true,
  },
  {
    id: "VSL-301",
    equipe: "Paul G. / Léa M.",
    lat: 50.518,
    lng: 2.632,
    status: "pause",
    localisation: "12 Rue Jouffroy, Lys-Lez-Lannoy",
    destination: "Hôpital Victor Provo",
    heureDepart: "11:00",
    heureArrivee: "11:07",
    type: "VSL",
    equipement: "Type B - Standard",
    carburant: 60,
    kilometrage: 28563,
    maintenance: "À jour",
    tempsDeService: "4h00",
    dernierArret: "10:30",
    prochaineIntervention: "13:15 - Transport patient",
    distanceParcouru: 65,
    tempsDisponible: "0h30",
  },
  {
    id: "AMB-417",
    equipe: "Hugo T. / Camille R.",
    lat: 50.584,
    lng: 2.981,
    status: "libre",
    localisation: "CH. Roger Salengro",
    destination: "HPVA",
    heureDepart: "11:30",
    heureArrivee: "11:55",
    type: "Ambulance",
    equipement: "Type A - Réanimation",
    carburant: 87,
    kilometrage: 12547,
    maintenance: "À jour",
    tempsDeService: "1h50",
    dernierArret: "11:00",
    prochaineIntervention: null,
    distanceParcouru: 42,
    tempsDisponible: "6h10",
  },
  {
    id: "VSL-420",
    equipe: "Emma V. / Nathan S.",
    lat: 50.723,
    lng: 2.939,
    status: "occupe",
    localisation: "Centre E.L.A.N, Hôpital de Wattrelos",
    destination: "32 Rue Jean Mermoz, Wattrelos",
    heureDepart: "12:00",
    heureArrivee: "12:12",
    type: "VSL",
    equipement: "Type B - Standard",
    carburant: 32,
    kilometrage: 75412,
    maintenance: "Vérification nécessaire",
    tempsDeService: "6h25",
    dernierArret: "10:15",
    prochaineIntervention: "14:00 - Transport patient",
    distanceParcouru: 147,
    tempsDisponible: "1h35",
  },
  {
    id: "AMB-118",
    equipe: "Lucas V. / Marie D.",
    lat: 50.695,
    lng: 3.175,
    status: "pause",
    localisation: "Clinique Les Peupliers",
    destination: "22 Rue du Docteur Schweitzer, Roubaix",
    heureDepart: "12:30",
    heureArrivee: "12:54",
    type: "Ambulance",
    equipement: "Type C - SMUR",
    carburant: 54,
    kilometrage: 32698,
    maintenance: "À jour",
    tempsDeService: "3h55",
    dernierArret: "11:30",
    prochaineIntervention: "14:30 - Urgence médicale",
    distanceParcouru: 95,
    tempsDisponible: "0h45",
  },
];

// Calcul des statistiques pour le tableau de bord
const calculerStatistiques = () => {
  const vehiculesLibres = ambulances.filter((a) => a.status === "libre").length;
  const vehiculesOccupes = ambulances.filter(
    (a) => a.status === "occupe"
  ).length;
  const vehiculesEnPause = ambulances.filter(
    (a) => a.status === "pause"
  ).length;
  const ambulancesCount = ambulances.filter(
    (a) => a.type === "Ambulance"
  ).length;
  const vslCount = ambulances.filter((a) => a.type === "VSL").length;
  const vehiculesAvecMaintenance = ambulances.filter(
    (a) => a.maintenance !== "À jour"
  ).length;

  return {
    vehiculesLibres,
    vehiculesOccupes,
    vehiculesEnPause,
    ambulancesCount,
    vslCount,
    vehiculesAvecMaintenance,
    tauxDisponibilite: Math.round((vehiculesLibres / ambulances.length) * 100),
    tauxOccupation: Math.round((vehiculesOccupes / ambulances.length) * 100),
  };
};

interface LocalisationProps {
  isOpen: boolean;
}

const Localisation: React.FC<LocalisationProps> = ({ isOpen }) => {
  // Ajoutez ceci en haut avec vos autres déclarations d'état
  const mapRef = useRef<L.Map | null>(null);
  const [mapCenter] = useState(defaultCenter);
  const [zoom] = useState(9);
  const [activeFilters, setActiveFilters] = useState({
    libre: true,
    occupe: true,
    pause: true,
    ambulance: true,
    vsl: true,
    showHopitaux: true,
  });
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [stats] = useState(calculerStatistiques());

  // Simulation du chargement des données
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simuler une requête réseau pour charger les données
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Une fois les données chargées, désactiver l'état de chargement
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter as keyof typeof prev],
    }));
  };

  const handleAmbulanceClick = (id: string) => {
    setSelectedAmbulanceId(id);
    setShowDetails(true);
  };

  const filteredAmbulances = ambulances.filter((ambulance) => {
    if (ambulance.type === "Ambulance" && !activeFilters.ambulance)
      return false;
    if (ambulance.type === "VSL" && !activeFilters.vsl) return false;
    if (ambulance.status === "libre" && !activeFilters.libre) return false;
    if (ambulance.status === "occupe" && !activeFilters.occupe) return false;
    if (ambulance.status === "pause" && !activeFilters.pause) return false;
    return true;
  });

  const selectedAmbulance = selectedAmbulanceId
    ? ambulances.find((a) => a.id === selectedAmbulanceId)
    : null;

  return (
    <div
      className={`transition-all duration-300 flex flex-col ${
        isOpen ? "ml-64" : "ml-16"
      }`}
      style={{
        height: "calc(100vh)",
        width: "calc(100vw - (isOpen ? 16rem : 4rem))",
      }}
    >
      {isLoading ? (
        <div className="flex-grow flex justify-center items-center bg-gray-100">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Panneau supérieur - Stats et filtres */}
          <div className="bg-white shadow-md p-3 z-10">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex space-x-1 md:space-x-4">
                <div className="px-3 py-1 bg-green-100 rounded-md flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium">
                    Libres: {stats.vehiculesLibres}
                  </span>
                </div>
                <div className="px-3 py-1 bg-red-100 rounded-md flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm font-medium">
                    Occupés: {stats.vehiculesOccupes}
                  </span>
                </div>
                <div className="px-3 py-1 bg-yellow-100 rounded-md flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm font-medium">
                    En pause: {stats.vehiculesEnPause}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium hidden md:inline">
                  Filtres:
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => toggleFilter("libre")}
                    className={`px-2 py-1 text-xs rounded-md ${
                      activeFilters.libre
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Libres
                  </button>
                  <button
                    onClick={() => toggleFilter("occupe")}
                    className={`px-2 py-1 text-xs rounded-md ${
                      activeFilters.occupe
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Occupés
                  </button>
                  <button
                    onClick={() => toggleFilter("pause")}
                    className={`px-2 py-1 text-xs rounded-md ${
                      activeFilters.pause
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    En pause
                  </button>
                  <button
                    onClick={() => toggleFilter("ambulance")}
                    className={`px-2 py-1 text-xs rounded-md ${
                      activeFilters.ambulance
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Ambulances
                  </button>
                  <button
                    onClick={() => toggleFilter("vsl")}
                    className={`px-2 py-1 text-xs rounded-md ${
                      activeFilters.vsl
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    VSL
                  </button>
                  <button
                    onClick={() => toggleFilter("showHopitaux")}
                    className={`px-2 py-1 text-xs rounded-md ${
                      activeFilters.showHopitaux
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Hôpitaux
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Conteneur de la carte et du panneau de détails */}
          <div className="flex-grow flex overflow-hidden bg-gray-100">
            {/* Carte principale */}
            <div
              className={`${
                showDetails ? "w-3/4" : "w-full"
              } transition-all duration-300`}
              style={{ height: "100%" }}
            >
              <MapContainer
                center={mapCenter}
                zoom={zoom}
                className="w-full h-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marqueurs des hôpitaux */}
                {activeFilters.showHopitaux &&
                  hopitaux.map((hopital) => (
                    <Marker
                      key={hopital.id}
                      position={[hopital.lat, hopital.lng]}
                      icon={ambulanceIcons.hopital}
                    >
                      <Popup>
                        <div className="text-sm">
                          <h3 className="text-lg font-semibold">
                            🏥 {hopital.nom}
                          </h3>
                          <p className="flex items-center text-gray-700">
                            <FaMapMarkerAlt className="mr-2 text-red-500" />
                            {hopital.adresse}
                          </p>
                          <p className="flex items-center text-gray-700">
                            <FaPhoneAlt className="mr-2 text-blue-500" />
                            {hopital.tel}
                          </p>
                          <p className="flex items-center text-gray-700">
                            <FaRegHospital className="mr-2 text-green-500" />
                            {hopital.niveau}
                          </p>
                          <div className="mt-2">
                            <div className="text-sm font-medium mb-1">
                              Taux d'occupation: {hopital.occupation}%
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  hopital.occupation > 85
                                    ? "bg-red-500"
                                    : hopital.occupation > 65
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                                style={{ width: `${hopital.occupation}%` }}
                              ></div>
                            </div>
                            <p
                              className={`text-sm font-semibold mt-1 ${
                                hopital.occupation > 85
                                  ? "text-red-500"
                                  : hopital.occupation > 65
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                            >
                              Disponibilité: {hopital.disponibilite}
                            </p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                {/* Marqueurs des ambulances */}
                {filteredAmbulances.map((ambulance) => (
                  <React.Fragment key={ambulance.id}>
                    <Marker
                      position={[ambulance.lat, ambulance.lng]}
                      icon={
                        ambulanceIcons[
                          ambulance.status as keyof typeof ambulanceIcons
                        ]
                      }
                      eventHandlers={{
                        click: () => handleAmbulanceClick(ambulance.id),
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <h3 className="text-lg font-semibold flex items-center">
                            🚑 {ambulance.id}
                            {ambulance.urgence && (
                              <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full animate-pulse">
                                URGENCE
                              </span>
                            )}
                          </h3>
                          <p className="flex items-center text-gray-700">
                            <FaUser className="mr-2 text-blue-500" />
                            Équipage: {ambulance.equipe}
                          </p>
                          <p className="flex items-center text-gray-700">
                            <FaMapMarkerAlt className="mr-2 text-red-500" />
                            Localisation: {ambulance.localisation}
                          </p>
                          {ambulance.destination && (
                            <p className="flex items-center text-gray-700">
                              <FaRegHospital className="mr-2 text-green-500" />
                              Destination: {ambulance.destination}
                            </p>
                          )}
                          <p className="flex items-center text-gray-700">
                            <FaClock className="mr-2 text-gray-500" />
                            Départ: {ambulance.heureDepart} - Arrivée:{" "}
                            {ambulance.heureArrivee}
                          </p>
                          <p
                            className={`text-sm font-semibold flex items-center mt-2 ${
                              ambulance.status === "libre"
                                ? "text-green-600"
                                : ambulance.status === "occupe"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            <FaRoute className="mr-2" />
                            Statut:{" "}
                            {ambulance.status.charAt(0).toUpperCase() +
                              ambulance.status.slice(1)}
                          </p>
                          <button
                            onClick={() => handleAmbulanceClick(ambulance.id)}
                            className="mt-2 w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600"
                          >
                            Détails complets
                          </button>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Zone d'autonomie (en fonction du carburant et de la distance disponible) */}
                    {ambulance.status === "libre" && (
                      <Circle
                        center={[ambulance.lat, ambulance.lng]}
                        radius={ambulance.carburant * 100} // Rayon proportionnel au niveau de carburant
                        pathOptions={{
                          fillColor: "green",
                          fillOpacity: 0.05,
                          color: "green",
                          weight: 1,
                          opacity: 0.3,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </MapContainer>

              {/* Bouton pour afficher/masquer les détails */}
              <button
                className="absolute bottom-4 right-4 z-50 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600"
                onClick={() => {
                  setShowDetails(!showDetails);
                  // Redimensionner la carte après le changement d'état
                  setTimeout(() => {
                    if (mapRef.current) {
                      mapRef.current.invalidateSize();
                    }
                  }, 300);
                }}
              >
                <FaList size={20} />
              </button>
            </div>

            {/* Panneau de détails */}
            {showDetails && (
              <div className="w-1/4 bg-white shadow-md overflow-y-auto">
                {selectedAmbulance ? (
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-bold">
                        {selectedAmbulance.id}
                      </h2>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          selectedAmbulance.status === "libre"
                            ? "bg-green-100 text-green-800"
                            : selectedAmbulance.status === "occupe"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedAmbulance.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <FaUser className="text-blue-500 mr-2" />
                        <span className="font-medium">Équipage:</span>
                      </div>
                      <p className="pl-6 text-gray-700">
                        {selectedAmbulance.equipe}
                      </p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <FaCarAlt className="text-blue-500 mr-2" />
                        <span className="font-medium">Véhicule:</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        <p className="text-gray-700">
                          <span className="font-medium">Type:</span>{" "}
                          {selectedAmbulance.type}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Équipement:</span>{" "}
                          {selectedAmbulance.equipement}
                        </p>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Carburant:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                selectedAmbulance.carburant < 20
                                  ? "bg-red-500"
                                  : selectedAmbulance.carburant < 40
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${selectedAmbulance.carburant}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm">
                            {selectedAmbulance.carburant}%
                          </span>
                        </div>
                        <p className="text-gray-700">
                          <span className="font-medium">Kilométrage:</span>{" "}
                          {selectedAmbulance.kilometrage} km
                        </p>
                        <p
                          className={`font-medium ${
                            selectedAmbulance.maintenance === "À jour"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <FaExclamationTriangle
                            className={`inline-block mr-1 ${
                              selectedAmbulance.maintenance === "À jour"
                                ? "hidden"
                                : ""
                            }`}
                          />
                          Maintenance: {selectedAmbulance.maintenance}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <FaClock className="text-blue-500 mr-2" />
                        <span className="font-medium">Temps et activité:</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        <p className="text-gray-700">
                          <span className="font-medium">Temps de service:</span>{" "}
                          {selectedAmbulance.tempsDeService}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Dernier arrêt:</span>{" "}
                          {selectedAmbulance.dernierArret}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">
                            Dist. parcourue aujourd'hui:
                          </span>{" "}
                          {selectedAmbulance.distanceParcouru} km
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Temps disponible:</span>{" "}
                          {selectedAmbulance.tempsDisponible}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <FaMapMarkerAlt className="text-blue-500 mr-2" />
                        <span className="font-medium">
                          Localisation actuelle:
                        </span>
                      </div>
                      <p className="pl-6 text-gray-700">
                        {selectedAmbulance.localisation}
                      </p>
                    </div>

                    {selectedAmbulance.destination && (
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <FaRegHospital className="text-blue-500 mr-2" />
                          <span className="font-medium">Destination:</span>
                        </div>
                        <p className="pl-6 text-gray-700">
                          {selectedAmbulance.destination}
                        </p>
                        <p className="pl-6 text-gray-700 text-sm">
                          Départ: {selectedAmbulance.heureDepart} - Arrivée:{" "}
                          {selectedAmbulance.heureArrivee}
                        </p>
                      </div>
                    )}

                    {selectedAmbulance.prochaineIntervention && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                        <div className="flex items-center mb-2">
                          <FaCalculator className="text-blue-500 mr-2" />
                          <span className="font-medium">
                            Prochaine intervention:
                          </span>
                        </div>
                        <p className="pl-6 text-gray-700">
                          {selectedAmbulance.prochaineIntervention}
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-2 mt-5">
                      <button className="flex-1 bg-blue-500 text-white rounded py-2 px-3 hover:bg-blue-600 flex items-center justify-center">
                        <FaPhoneAlt className="mr-2" /> Contacter
                      </button>
                      <button className="flex-1 bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600 flex items-center justify-center">
                        <FaRoute className="mr-2" /> Assigner
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-3">Tableau de bord</h2>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-100 rounded-md p-3">
                        <div className="text-sm text-center">
                          <span className="block text-2xl font-bold">
                            {stats.vehiculesLibres}
                          </span>
                          <span className="text-blue-700">
                            Véhicules libres
                          </span>
                        </div>
                      </div>
                      <div className="bg-red-100 rounded-md p-3">
                        <div className="text-sm text-center">
                          <span className="block text-2xl font-bold">
                            {stats.vehiculesOccupes}
                          </span>
                          <span className="text-red-700">
                            Véhicules occupés
                          </span>
                        </div>
                      </div>
                      <div className="bg-yellow-100 rounded-md p-3">
                        <div className="text-sm text-center">
                          <span className="block text-2xl font-bold">
                            {stats.vehiculesEnPause}
                          </span>
                          <span className="text-yellow-700">En pause</span>
                        </div>
                      </div>
                      <div className="bg-purple-100 rounded-md p-3">
                        <div className="text-sm text-center">
                          <span className="block text-2xl font-bold">
                            {stats.vehiculesAvecMaintenance}
                          </span>
                          <span className="text-purple-700">
                            Maintenance requise
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-3 mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <FaLayerGroup className="mr-2 text-blue-500" />{" "}
                        Composition de la flotte
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="w-20 text-xs">Ambulances</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{
                                width: `${
                                  (stats.ambulancesCount / ambulances.length) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-8 text-right text-xs ml-2">
                          {stats.ambulancesCount}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-20 text-xs">VSL</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-purple-500"
                              style={{
                                width: `${
                                  (stats.vslCount / ambulances.length) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-8 text-right text-xs ml-2">
                          {stats.vslCount}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-3 mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <FaChartLine className="mr-2 text-blue-500" />{" "}
                        Performance de la flotte
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="w-24 text-xs">Disponibilité</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                stats.tauxDisponibilite < 30
                                  ? "bg-red-500"
                                  : stats.tauxDisponibilite < 50
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${stats.tauxDisponibilite}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-12 text-right text-xs ml-2">
                          {stats.tauxDisponibilite}%
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 text-xs">Occupation</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${stats.tauxOccupation}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-12 text-right text-xs ml-2">
                          {stats.tauxOccupation}%
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-3">
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <FaFilter className="mr-2 text-blue-500" /> Actions
                        rapides
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="bg-blue-100 text-blue-700 rounded p-2 text-xs hover:bg-blue-200">
                          Programmer transport
                        </button>
                        <button className="bg-green-100 text-green-700 rounded p-2 text-xs hover:bg-green-200">
                          Véhicule disponible
                        </button>
                        <button className="bg-yellow-100 text-yellow-700 rounded p-2 text-xs hover:bg-yellow-200">
                          Déclarer pause
                        </button>
                        <button className="bg-red-100 text-red-700 rounded p-2 text-xs hover:bg-red-200">
                          Signaler incident
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Localisation;
