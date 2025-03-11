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
import LoadingSpinner from "../../common/LoadingSpinner";
import { useTheme } from "../../contexts/ThemeContext";

const Ambulances: React.FC<AmbulancesProps> = ({ isOpen }) => {
  // Get current theme from context
  const { theme } = useTheme();
  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [maintenanceFilter, setMaintenanceFilter] = useState("all");
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null);
  const [showStats, setShowStats] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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

  const handleRefresh = useCallback(() => {
    console.log("Rafraîchir les données");
  }, []);

  const handleScheduleMaintenance = useCallback(() => {
    console.log("Planifier un entretien");
  }, []);

  const handleAddVehicle = useCallback(() => {
    console.log("Ajouter un véhicule");
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setFilter("all");
    setMaintenanceFilter("all");
  }, []);

  // Theme-specific classes
  const containerClasses = `
    transition-all duration-300 
    ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}
    min-h-screen 
  `;

  const headerClasses = `
    shadow-md p-4 sticky top-0 z-10
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const titleClasses = `
    text-xl font-bold flex items-center gap-2
    ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
  `;

  const subTextClasses = `
    text-sm font-normal
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const statsToggleClasses = `
    flex items-center gap-2 px-3 py-1 rounded-md 
    transition-all duration-300
    ${showStats 
      ? theme === 'dark' 
        ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' 
        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      : theme === 'dark'
        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }
  `;

  const refreshButtonClasses = `
    flex items-center gap-1 px-3 py-1 rounded-md
    ${theme === 'dark' 
      ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
  `;

  const planButtonClasses = `
    flex items-center gap-2 px-3 py-1 rounded-md
    ${theme === 'dark' 
      ? 'bg-blue-700 text-white hover:bg-blue-600' 
      : 'bg-blue-600 text-white hover:bg-blue-700'}
  `;

  const addButtonClasses = `
    flex items-center gap-2 px-3 py-1 rounded-md
    ${theme === 'dark' 
      ? 'bg-green-700 text-white hover:bg-green-600' 
      : 'bg-green-600 text-white hover:bg-green-700'}
  `;

  const noResultsCardClasses = `
    p-6 rounded-md shadow-md text-center
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const noResultsTitleClasses = `
    text-md font-medium
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
  `;

  const noResultsTextClasses = `
    text-sm mt-1
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const resetButtonClasses = `
    mt-3 text-sm
    ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}
  `;

  return (
    <div className={containerClasses}>
      {isLoading ? (
        <LoadingSpinner isOpen={isOpen} />
      ) : (
        <>
          <header className={headerClasses}>
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className={titleClasses}>
                  <Wrench size={20} />
                  Maintenance des Ambulances
                  <span className={subTextClasses}>
                    ({stats.totalVehicles} véhicules)
                  </span>
                </h1>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className={statsToggleClasses}
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
                  className={refreshButtonClasses}
                >
                  <RefreshCw size={14} />
                  <span className="hidden md:inline text-sm">Rafraîchir</span>
                </button>
                <button
                  onClick={handleScheduleMaintenance}
                  className={planButtonClasses}
                >
                  <Calendar size={16} />
                  <span className="text-sm">Planifier</span>
                </button>
                <button
                  onClick={handleAddVehicle}
                  className={addButtonClasses}
                >
                  <Plus size={16} />
                  <span className="text-sm">Ajouter</span>
                </button>
              </div>
            </div>
          </header>
          
          <main className="container mx-auto p-4 space-y-6 max-w-7xl">
            {showStats && <StatsDashboard stats={stats} theme={theme} />}

            <SearchAndFilters
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              maintenanceFilter={maintenanceFilter}
              setMaintenanceFilter={setMaintenanceFilter}
              theme={theme}
            />

            {selectedAmbulance ? (
              <RevisionDetails
                ambulance={selectedAmbulance}
                onClose={() => setSelectedAmbulance(null)}
                theme={theme}
              />
            ) : filteredAmbulances.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAmbulances.map((ambulance) => (
                  <AmbulanceCard
                    key={ambulance.id}
                    ambulance={ambulance}
                    onSelect={() => setSelectedAmbulance(ambulance)}
                    theme={theme}
                  />
                ))}
              </div>
            ) : (
              <div className={noResultsCardClasses}>
                <Search size={32} className={`mx-auto ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`} />
                <h3 className={noResultsTitleClasses}>
                  Aucun véhicule trouvé
                </h3>
                <p className={noResultsTextClasses}>
                  Modifiez vos critères de recherche ou de filtrage
                </p>
                <button
                  className={resetButtonClasses}
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