import { useState, useEffect, useCallback } from "react";
import FilterBar from "../components/Localisation/FilterBar/FilterBar";
import MapComponent from "../components/Localisation/Map/MapComponent";
import DetailPanel from "../components/Localisation/DetailPanel/DetailPanel";
import LoadingSpinner from "../common/LoadingSpinner";
import { calculerStatistiques } from "../components/Localisation/data/statistics";
import { ambulances } from "../components/Localisation/data/ambulances";
import { FilterOptions } from "../components/Localisation/data/types";
import { useSidebar } from "../contexts/useSidebar";

/**
 * Props du composant LocalisationScreen
 */
interface LocalisationScreenProps {
  isOpen?: boolean; // Optionnel car on peut utiliser useSidebar()
}

/**
 * Écran de localisation des ambulances
 * Affiche une carte interactive avec filtres et panel de détails
 */
const LocalisationScreen: React.FC<LocalisationScreenProps> = ({ isOpen: externalIsOpen }) => {
  // Utiliser le contexte de la sidebar si disponible, sinon la prop isOpen
  const sidebarContext = useSidebar();
  const isOpen = sidebarContext?.isOpen ?? externalIsOpen ?? false;
  
  // État local
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(true);
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

  /**
   * Bascule l'état d'un filtre
   */
  const toggleFilter = useCallback((filter: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter as keyof FilterOptions],
    }));
  }, []);

  /**
   * Gère le clic sur une ambulance
   */
  const handleAmbulanceClick = useCallback((id: string) => {
    setSelectedAmbulanceId(id);
    setShowDetails(true);
  }, []);

  /**
   * Affiche le tableau de bord
   */
  const showDashboard = useCallback(() => {
    setSelectedAmbulanceId(null);
    setShowDetails(true);
  }, []);

  // Filtre les ambulances selon les critères actifs
  const filteredAmbulances = ambulances.filter((ambulance) => {
    if (ambulance.type === "Ambulance" && !activeFilters.ambulance) return false;
    if (ambulance.type === "VSL" && !activeFilters.vsl) return false;
    if (ambulance.status === "libre" && !activeFilters.libre) return false;
    if (ambulance.status === "occupe" && !activeFilters.occupe) return false;
    if (ambulance.status === "pause" && !activeFilters.pause) return false;
    return true;
  });

  // Trouve l'ambulance sélectionnée
  const selectedAmbulance = selectedAmbulanceId
    ? ambulances.find((a) => a.id === selectedAmbulanceId)
    : null;

  // Chargement initial des données
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
      className="absolute top-0 right-0 bottom-0 flex flex-col bg-gray-100 overflow-hidden transition-all duration-300"
      style={{ 
        left: isOpen ? '16rem' : '4rem'
      }}
    >
      {isLoading ? (
        <div className="flex-grow flex justify-center items-center">
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
            selectedAmbulanceId={selectedAmbulanceId}
            showDashboard={showDashboard}
          />

          {/* Conteneur principal */}
          <div className="flex-grow flex overflow-hidden">
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

export default LocalisationScreen;