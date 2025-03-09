import React, { 
  useState, 
  useMemo, 
  useEffect, 
  useCallback 
} from "react";
import {
  Wrench,
  RefreshCw,
  Plus,
  Calendar,
  Search,
  Eye,
  EyeOff
} from "lucide-react";
import { Ambulance, AmbulancesProps } from "../../types";
import { ambulancesData } from "./data";
import AmbulanceCard from "./AmbulanceCard";
import RevisionDetails from "./RevisionDetails";
import SearchAndFilters from "./SearchAndFilters";
import StatsDashboard from "./StatsDashboard";
import LoadingSpinner from "../Common/LoadingSpinner";

const Ambulances: React.FC<AmbulancesProps> = ({ isOpen }) => {
  // State Management
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [maintenanceFilter, setMaintenanceFilter] = useState("all");
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null);
  const [showStats, setShowStats] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Data Loading Effect
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate data loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Memoized Stats Calculation
  const stats = useMemo(() => {
    const totalVehicles = ambulancesData.length;
    const inService = ambulancesData.filter(a => a.status === "En service").length;
    const outOfService = totalVehicles - inService;
    const maintenanceUpToDate = ambulancesData.filter(a => a.maintenanceStatus === "À jour").length;
    const maintenanceNeeded = ambulancesData.filter(a => 
      ["Contrôle nécessaire", "Vérification nécessaire", 
       "Entretien imminent", "Contrôle technique dépassé"].includes(a.maintenanceStatus)
    ).length;
    const underRepair = ambulancesData.filter(a => a.maintenanceStatus === "Réparation en cours").length;

    return {
      totalVehicles,
      inService,
      outOfService,
      maintenanceUpToDate,
      maintenanceNeeded,
      underRepair,
      operationalRate: Math.round((inService / totalVehicles) * 100),
      maintenanceRate: Math.round((maintenanceUpToDate / totalVehicles) * 100),
    };
  }, []);

  // Memoized Filtered Ambulances
  const filteredAmbulances = useMemo(() => {
    return ambulancesData.filter((ambulance) => {
      const matchesSearch = [
        'id', 'modele', 'immatriculation', 'localisation'
      ].some(field => 
        (ambulance[field as keyof Ambulance] as string).toLowerCase().includes(search.toLowerCase())
      );

      const matchesTypeFilter =
        filter === "all" ||
        (filter === "ambulance" && ambulance.type === "Ambulance") ||
        (filter === "vsl" && ambulance.type === "VSL");

      const matchesMaintenanceFilter = 
        maintenanceFilter === "all" ||
        (maintenanceFilter === "a-jour" && ambulance.maintenanceStatus === "À jour") ||
        (maintenanceFilter === "imminent" && ambulance.maintenanceStatus === "Entretien imminent") ||
        (maintenanceFilter === "necessaire" && [
          "Contrôle nécessaire", 
          "Vérification nécessaire", 
          "Contrôle technique dépassé"
        ].includes(ambulance.maintenanceStatus)) ||
        (maintenanceFilter === "en-cours" && ambulance.maintenanceStatus === "Réparation en cours");

      return matchesSearch && matchesTypeFilter && matchesMaintenanceFilter;
    });
  }, [search, filter, maintenanceFilter]);

  // Action Handlers
  const handleRefresh = useCallback(() => {
    // Implement actual data refresh logic
    console.log("Rafraîchir les données");
  }, []);

  const handleScheduleMaintenance = useCallback(() => {
    // Implement maintenance scheduling logic
    console.log("Planifier un entretien");
  }, []);

  const handleAddVehicle = useCallback(() => {
    // Implement vehicle addition logic
    console.log("Ajouter un véhicule");
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setFilter("all");
    setMaintenanceFilter("all");
  }, []);

  return (
    <div
      className={`
        transition-all duration-300 
        bg-gray-100 min-h-screen 
        ${isOpen ? "ml-64" : "ml-16"}
      `}
    >
      {isLoading ? (
        <LoadingSpinner isOpen={isOpen} />
      ) : (
        <>
          {/* Header */}
          <header className="bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Wrench size={20} />
                  Maintenance des Ambulances
                  <span className="text-sm font-normal text-gray-500">
                    ({stats.totalVehicles} véhicules)
                  </span>
                </h1>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className={`
                    flex items-center gap-2 px-3 py-1 rounded-md 
                    transition-all duration-300
                    ${showStats 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                >
                  {showStats ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="text-sm">
                    {showStats ? 'Masquer' : 'Afficher'} Stats
                  </span>
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200"
                >
                  <RefreshCw size={14} />
                  <span className="hidden md:inline text-sm">Rafraîchir</span>
                </button>
                <button
                  onClick={handleScheduleMaintenance}
                  className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  <Calendar size={16} />
                  <span className="text-sm">Planifier</span>
                </button>
                <button
                  onClick={handleAddVehicle}
                  className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                >
                  <Plus size={16} />
                  <span className="text-sm">Ajouter</span>
                </button>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="container mx-auto p-4 space-y-6 max-w-7xl">
            {/* Conditionally render stats */}
            {showStats && <StatsDashboard stats={stats} />}

            {/* Search and Filters */}
            <SearchAndFilters
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              maintenanceFilter={maintenanceFilter}
              setMaintenanceFilter={setMaintenanceFilter}
            />

            {/* Vehicle List or Details */}
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
                  onClick={handleResetFilters}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default Ambulances;