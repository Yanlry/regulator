import React, { useState, useMemo } from "react";
import {
  Wrench,
  RefreshCw,
  Plus,
  Calendar,
  Search
} from "lucide-react";
import { Ambulance, AmbulancesProps, Stats } from "../../types";
import { ambulancesData } from "./data";
import AmbulanceCard from "./AmbulanceCard";
import RevisionDetails from "./RevisionDetails";
import SearchAndFilters from "./SearchAndFilters";
import StatsDashboard from "./StatsDashboard";

const Ambulances: React.FC<AmbulancesProps> = ({ isOpen }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [maintenanceFilter, setMaintenanceFilter] = useState("all");
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(
    null
  );
  const [showStats] = useState(true);

  const stats = useMemo(() => {
    const totalVehicles = ambulancesData.length;
    const inService = ambulancesData.filter(
      (a) => a.status === "En service"
    ).length;
    const outOfService = totalVehicles - inService;
    const maintenanceUpToDate = ambulancesData.filter(
      (a) => a.maintenanceStatus === "À jour"
    ).length;
    const maintenanceNeeded = ambulancesData.filter(
      (a) =>
        a.maintenanceStatus === "Contrôle nécessaire" ||
        a.maintenanceStatus === "Vérification nécessaire" ||
        a.maintenanceStatus === "Entretien imminent" ||
        a.maintenanceStatus === "Contrôle technique dépassé"
    ).length;
    const underRepair = ambulancesData.filter(
      (a) => a.maintenanceStatus === "Réparation en cours"
    ).length;

    const statsObject: Stats = {
      totalVehicles,
      inService,
      outOfService,
      maintenanceUpToDate,
      maintenanceNeeded,
      underRepair,
      operationalRate: Math.round((inService / totalVehicles) * 100),
      maintenanceRate: Math.round((maintenanceUpToDate / totalVehicles) * 100),
    };

    return statsObject;
  }, []);

  const filteredAmbulances = useMemo(() => {
    return ambulancesData.filter((ambulance) => {
      const matchesSearch =
        ambulance.id.toLowerCase().includes(search.toLowerCase()) ||
        ambulance.modele.toLowerCase().includes(search.toLowerCase()) ||
        ambulance.immatriculation
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        ambulance.localisation.toLowerCase().includes(search.toLowerCase());

      const matchesTypeFilter =
        filter === "all" ||
        (filter === "ambulance" && ambulance.type === "Ambulance") ||
        (filter === "vsl" && ambulance.type === "VSL");

      const matchesMaintenanceFilter =
        maintenanceFilter === "all" ||
        (maintenanceFilter === "a-jour" &&
          ambulance.maintenanceStatus === "À jour") ||
        (maintenanceFilter === "imminent" &&
          ambulance.maintenanceStatus === "Entretien imminent") ||
        (maintenanceFilter === "necessaire" &&
          (ambulance.maintenanceStatus === "Contrôle nécessaire" ||
            ambulance.maintenanceStatus === "Vérification nécessaire" ||
            ambulance.maintenanceStatus === "Contrôle technique dépassé")) ||
        (maintenanceFilter === "en-cours" &&
          ambulance.maintenanceStatus === "Réparation en cours");

      return matchesSearch && matchesTypeFilter && matchesMaintenanceFilter;
    });
  }, [search, filter, maintenanceFilter]);

  return (
    <div
      className={`transition-all duration-300 bg-gray-100 min-h-screen ${
        isOpen ? "ml-64" : "ml-16"
      }`}
    >
      {/* En-tête */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Wrench size={20} />
            Maintenance des Ambulances
            <span className="text-sm font-normal text-gray-500">
              ({stats.totalVehicles} véhicules)
            </span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => console.log("Rafraîchir les données")}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200"
            >
              <RefreshCw size={14} />
              <span className="hidden md:inline text-sm">Rafraîchir</span>
            </button>
            <button
              onClick={() => console.log("Planifier un entretien")}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
              <Calendar size={16} />
              <span className="text-sm">Planifier</span>
            </button>
            <button
              onClick={() => console.log("Ajouter un véhicule")}
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              <Plus size={16} />
              <span className="text-sm">Ajouter</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto p-4 space-y-6 max-w-7xl">
        {/* Statistiques */}
        {showStats && <StatsDashboard stats={stats} />}

        {/* Recherche et filtres */}
        <SearchAndFilters
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          maintenanceFilter={maintenanceFilter}
          setMaintenanceFilter={setMaintenanceFilter}
        />

        {/* Liste des ambulances ou détails */}
        {selectedAmbulance ? (
          <RevisionDetails
            ambulance={selectedAmbulance}
            onClose={() => setSelectedAmbulance(null)}
          />
        ) : filteredAmbulances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAmbulances.map((ambulance) => (
              <AmbulanceCard
                key={ambulance.id}
                ambulance={ambulance}
                onSelect={() => setSelectedAmbulance(ambulance)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <Search size={32} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-md font-medium text-gray-700">
              Aucun véhicule trouvé
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Modifiez vos critères de recherche ou de filtrage
            </p>
            <button
              className="mt-3 text-blue-600 hover:text-blue-800 text-sm"
              onClick={() => {
                setSearch("");
                setFilter("all");
                setMaintenanceFilter("all");
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Ambulances;