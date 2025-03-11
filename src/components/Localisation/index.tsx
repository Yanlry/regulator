import React, { useState, useEffect, useCallback } from "react";
import FilterBar from "./FilterBar/FilterBar";
import MapComponent from "./Map/MapComponent";
import DetailPanel from "./DetailPanel/DetailPanel";
import LoadingSpinner from "../../common/LoadingSpinner";
import { calculerStatistiques } from "./data/statistics";
import { ambulances } from "./data/ambulances";
import { FilterOptions } from "./data/types";
import { useTheme } from '../../contexts/ThemeContext';

interface LocalisationProps {
  isOpen: boolean;
}

const Localisation: React.FC<LocalisationProps> = ({ isOpen }) => {
  // Récupération du thème courant
  const { theme } = useTheme();
  
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

  // Classes CSS adaptatives selon le thème
  const containerClasses = `
    absolute top-0 right-0 bottom-0 
    flex flex-col 
    ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} 
    overflow-hidden 
    transition-all duration-300
  `;

  const loadingContainerClasses = `
    flex-grow flex justify-center items-center
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
  `;

  const contentContainerClasses = `
    flex-grow flex overflow-hidden
    ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
  `;

  return (
    <div 
      className={containerClasses}
      style={{ 
        left: isOpen ? '280px' : '80px',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0
      }}
    >
      {isLoading ? (
        <div className={loadingContainerClasses}>
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
            theme={theme}
          />

          {/* Conteneur principal */}
          <div className={contentContainerClasses}>
            {/* Carte */}
            <MapComponent
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              activeFilters={activeFilters}
              filteredAmbulances={filteredAmbulances}
              handleAmbulanceClick={handleAmbulanceClick}
              theme={theme}
            />

            {/* Panneau de détails */}
            {showDetails && (
              <DetailPanel
                selectedAmbulance={selectedAmbulance}
                stats={stats}
                theme={theme}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Localisation;