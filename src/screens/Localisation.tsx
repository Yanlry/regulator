import { useState, useEffect } from "react";
import FilterBar from "../components/Localisation/FilterBar/FilterBar";
import MapComponent from "../components/Localisation/Map/MapComponent";
import DetailPanel from "../components/Localisation/DetailPanel/DetailPanel";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { calculerStatistiques } from "../components/Localisation/data/statistics";
import { ambulances } from "../components/Localisation/data/ambulances";
import { FilterOptions } from "../components/Localisation/data/types";
interface LocalisationProps {
  isOpen: boolean;
}

const Localisation: React.FC<LocalisationProps> = ({ isOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    libre: true,
    occupe: true,
    pause: true,
    ambulance: true,
    vsl: true,
    showHopitaux: true,
  });
  const [stats] = useState(calculerStatistiques(ambulances));

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter as keyof FilterOptions],
    }));
  };

  const handleAmbulanceClick = (id: string) => {
    setSelectedAmbulanceId(id);
    setShowDetails(true);
  };

  const filteredAmbulances = ambulances.filter((ambulance) => {
    if (ambulance.type === "Ambulance" && !activeFilters.ambulance) return false;
    if (ambulance.type === "VSL" && !activeFilters.vsl) return false;
    if (ambulance.status === "libre" && !activeFilters.libre) return false;
    if (ambulance.status === "occupe" && !activeFilters.occupe) return false;
    if (ambulance.status === "pause" && !activeFilters.pause) return false;
    return true;
  });

  const selectedAmbulance = selectedAmbulanceId
    ? ambulances.find((a) => a.id === selectedAmbulanceId)
    : null;

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
          {/* Barre de filtres */}
          <FilterBar 
            activeFilters={activeFilters} 
            toggleFilter={toggleFilter} 
            stats={stats}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />

          {/* Conteneur principal */}
          <div className="flex-grow flex overflow-hidden bg-gray-100">
            {/* Carte */}
            <MapComponent
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              activeFilters={activeFilters}
              filteredAmbulances={filteredAmbulances}
              handleAmbulanceClick={handleAmbulanceClick}
            />

            {/* Panneau de détails */}
            {showDetails && (
              <DetailPanel
                selectedAmbulance={selectedAmbulance}
                stats={stats}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Localisation;
