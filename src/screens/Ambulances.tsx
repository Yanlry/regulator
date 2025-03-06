import React, { useState } from "react";
import {
  Truck,
  Car,
  Search,
  MapPin,
  Wrench,
  CheckCircle,
  XCircle,
  PauseCircle,
  Users,
  Plus
} from "lucide-react";

interface Ambulance {
  id: string;
  type: string;
  equipe: string;
  status: string;
  localisation: string;
  maintenance: string;
  disponibilite: string;
}

interface AmbulancesProps {
  isOpen: boolean;
}

const ambulancesData: Ambulance[] = [
  {
    id: "AMB-101",
    type: "Ambulance",
    equipe: "Martin D. / Sophie L.",
    status: "En service",
    localisation: "Centre-ville",
    maintenance: "À jour",
    disponibilite: "Disponible",
  },
  {
    id: "AMB-203",
    type: "Ambulance",
    equipe: "Thomas B. / Julie R.",
    status: "En service",
    localisation: "Hôpital Saint-Pierre",
    maintenance: "À jour",
    disponibilite: "En intervention",
  },
  {
    id: "VSL-301",
    type: "VSL",
    equipe: "Paul G. / Léa M.",
    status: "En service",
    localisation: "Clinique des Lilas",
    maintenance: "À jour",
    disponibilite: "En pause",
  },
  {
    id: "AMB-417",
    type: "Ambulance",
    equipe: "Hugo T. / Camille R.",
    status: "Hors service",
    localisation: "Garage de maintenance",
    maintenance: "Réparation en cours",
    disponibilite: "Indisponible",
  },
  {
    id: "VSL-420",
    type: "VSL",
    equipe: "Emma V. / Nathan S.",
    status: "Hors service",
    localisation: "Station 2",
    maintenance: "Contrôle technique depassé",
    disponibilite: "Indisponible",
  },
  {
    id: "AMB-118",
    type: "Ambulance",
    equipe: "Lucas V. / Marie D.",
    status: "Hors service",
    localisation: "Station 1",
    maintenance: "Réparation en cours",
    disponibilite: "Indisponible",
  },
  {
    id: "VSL-555",
    type: "VSL",
    equipe: "Patrick M. / Laura T.",
    status: "En service",
    localisation: "Hôpital Necker",
    maintenance: "À jour",
    disponibilite: "En intervention",
  },
  {
    id: "AMB-777",
    type: "Ambulance",
    equipe: "Victor G. / Sarah B.",
    status: "En service",
    localisation: "Aéroport CDG",
    maintenance: "À jour",
    disponibilite: "En intervention",
  },
  {
    id: "AMB-505",
    type: "Ambulance",
    equipe: "Bastien C. / Zoé H.",
    status: "Hors service",
    localisation: "Caserne des pompiers",
    maintenance: "Contrôle nécessaire",
    disponibilite: "Indisponible",
  },
  {
    id: "AMB-606",
    type: "Ambulance",
    equipe: "Florian D. / Julie M.",
    status: "En service",
    localisation: "Champs-Élysées",
    maintenance: "À jour",
    disponibilite: "Disponible",
  },
];

const Ambulances: React.FC<AmbulancesProps> = ({ isOpen }) => {
  const [search, setSearch] = useState("");

  const filteredAmbulances = ambulancesData.filter(
    (ambulance) =>
      ambulance.id.toLowerCase().includes(search.toLowerCase()) ||
      ambulance.equipe.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen ${
        isOpen ? "ml-64" : "ml-16"
      }`}
    >
     <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold text-gray-800">
      🚑 Mes ambulances
    </h1>

    {/* Bouton + pour ajouter une ambulance */}
    <button
      onClick={() => console.log("Ajouter une ambulance")}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      <Plus size={20} />
      <span>Ajouter</span>
    </button>
  </div>

      {/* Barre de recherche */}
      <div className="mb-6 flex items-center bg-white p-3 rounded-lg shadow-md">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une ambulance ou un équipage..."
          className="ml-2 w-full bg-transparent focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Ambulances en service */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">
          🚑 Ambulances en service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAmbulances
            .filter((a) => a.status === "En service")
            .map((ambulance) => (
              <div
                key={ambulance.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col"
              >
                {/* Aligner l'icône et l'ID en ligne */}
                <div className="flex items-center space-x-3 mb-2">
                  {/* Choisir l'icône en fonction du type */}
                  {ambulance.type === "Ambulance" ? (
                    <Truck size={24} className="text-blue-600" />
                  ) : (
                    <Car size={24} className="text-green-600" />
                  )}

                  {/* Affichage de l'ID directement à droite */}
                  <h3 className="text-md font-semibold">{ambulance.id}</h3>
                </div>

                {/* Autres infos */}
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <Users size={16} className="mr-1 text-gray-500" />
                  Équipage: {ambulance.equipe}
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin size={16} className="mr-1 text-gray-500" />
                  Localisation: {ambulance.localisation}
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <Wrench size={16} className="mr-1 text-gray-500" />
                  Maintenance: {ambulance.maintenance}
                </p>
                <p
                  className={`text-sm font-semibold flex items-center mt-2 ${
                    ambulance.disponibilite === "Disponible"
                      ? "text-green-600"  
                      : ambulance.disponibilite === "En intervention"
                      ? "text-red-600" 
                      : "text-orange-600"  
                  }`}
                >
                  {/* Icône dynamique en fonction du statut */}
                  {ambulance.disponibilite === "Disponible" ? (
                    <CheckCircle size={16} className="mr-1" />
                  ) : ambulance.disponibilite === "En intervention" ? (
                    <XCircle size={16} className="mr-1" />
                  ) : (
                    <PauseCircle size={16} className="mr-1" />
                  )}

                  {ambulance.disponibilite}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Ambulances hors service */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-2">
          ⛔ Ambulances hors service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAmbulances
            .filter((a) => a.status === "Hors service")
            .map((ambulance) => (
              <div
                key={ambulance.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col"
              >
                {/* Alignement horizontal de l'icône et de l'ID */}
                <div className="flex items-center space-x-3 mb-2">
                  {/* Choix de l'icône en fonction du type */}
                  {ambulance.type === "Ambulance" ? (
                    <Truck size={24} className="text-red-400" />
                  ) : (
                    <Car size={24} className="text-red-400" />
                  )}

                  {/* ID à droite de l'icône */}
                  <h3 className="text-md font-semibold">{ambulance.id}</h3>
                </div>

                {/* Autres détails */}
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <Users size={16} className="mr-1 text-gray-500" />
                  Équipage: {ambulance.equipe}
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin size={16} className="mr-1 text-gray-500" />
                  Localisation: {ambulance.localisation}
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <Wrench size={16} className="mr-1 text-gray-500" />
                  Maintenance: {ambulance.maintenance}
                </p>
                <p className="text-sm font-semibold flex items-center mt-2 text-red-600">
                  <XCircle size={16} className="mr-1" />
                  {ambulance.disponibilite}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Ambulances;
