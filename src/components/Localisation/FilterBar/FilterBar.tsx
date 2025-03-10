import React, { useState, useRef, useEffect } from "react";
import { 
  BarChart4, 
  X, 
  Filter, 
  Car, 
  Timer, 
  CircleCheck, 
  CircleX, 
  PauseCircle 
} from "lucide-react";

// Définir les types ici directement
interface FilterOptions {
  libre: boolean;
  occupe: boolean;
  pause: boolean;
  ambulance: boolean;
  vsl: boolean;
  showHopitaux: boolean;
}

interface Stats {
  vehiculesLibres?: number;
  vehiculesOccupes?: number;
  vehiculesEnPause?: number;
}

interface FilterBarProps {
  activeFilters: FilterOptions;
  toggleFilter: (filter: string) => void;
  stats?: Stats;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  selectedAmbulanceId: string | null;
  showDashboard: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilters,
  toggleFilter,
  stats = {}, 
  showDetails,
  setShowDetails,
  selectedAmbulanceId,
  showDashboard,
}) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const toggleFilterMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFilterMenuOpen(prev => !prev);
  };

  // Gestionnaire pour le bouton Tableau de Bord/Fermer
  const handleDashboardButton = () => {
    if (showDetails && selectedAmbulanceId) {
      // Si un véhicule est sélectionné, on ferme simplement le panel
      setShowDetails(false);
    } else if (showDetails) {
      // Si le tableau de bord est affiché, on ferme le panel
      setShowDetails(false);
    } else {
      // Si rien n'est affiché, on affiche le tableau de bord
      showDashboard();
    }
  };

  // Déterminer le texte et l'icône du bouton
  const getDashboardButtonContent = () => {
    if (showDetails) {
      return (
        <>
          <X className="mr-2 w-4 h-4" /> Fermer
        </>
      );
    } else {
      return (
        <>
          <BarChart4 className="mr-2 w-4 h-4" /> Tableau de Bord
        </>
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterMenuRef.current && 
        !filterMenuRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const StatBadge = ({ color, icon: Icon, label, value }: { 
    color: string, 
    icon: React.ComponentType<{className?: string}>, 
    label: string, 
    value?: number 
  }) => (
    value !== undefined ? (
      <div 
        className={`flex items-center px-3 py-1.5 rounded-full bg-${color}-50 border border-${color}-200 shadow-sm`}
      >
        <Icon className={`mr-2 w-4 h-4 text-${color}-600`} />
        <span className={`text-xs font-semibold text-${color}-800`}>
          {label}: {value}
        </span>
      </div>
    ) : null
  );

  const FilterToggle = ({ 
    filter, 
    label, 
    icon: Icon,
    color = 'blue' 
  }: { 
    filter: keyof FilterOptions, 
    label: string, 
    icon: React.ComponentType<{className?: string}>,
    color?: string 
  }) => (
    <button
      onClick={() => toggleFilter(filter)}
      className={`
        flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
        ${activeFilters[filter] 
          ? `bg-${color}-500 text-white hover:bg-${color}-600` 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
      `}
    >
      <Icon className="mr-2 w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div 
      className="
        bg-white border-b border-gray-200 shadow-sm py-3 px-4 
        relative z-[100] // Increased z-index to ensure it's always on top
      "
    >
      <div className="flex justify-between items-center">
        {/* Section Statistiques */}
        <div className="flex space-x-2">
          <StatBadge 
            color="green" 
            icon={CircleCheck} 
            label="Libres" 
            value={stats.vehiculesLibres} 
          />
          <StatBadge 
            color="red" 
            icon={CircleX} 
            label="Occupés" 
            value={stats.vehiculesOccupes} 
          />
          <StatBadge 
            color="yellow" 
            icon={PauseCircle} 
            label="Pause" 
            value={stats.vehiculesEnPause} 
          />
        </div>

        {/* Section Filtres et Tableau de Bord */}
        <div className="flex items-center space-x-3">
          {/* Bouton Tableau de Bord */}
          <button
            onClick={handleDashboardButton}
            className={`
              flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${showDetails 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'}
            `}
          >
            {getDashboardButtonContent()}
          </button>

          {/* Menu Filtres */}
          <div className="relative">
            <button
              ref={filterButtonRef}
              onClick={toggleFilterMenu}
              className="
                flex items-center px-3 py-2 rounded-full 
                bg-gray-100 text-gray-700 hover:bg-gray-200
                transition-all duration-300
              "
            >
              <Filter className="mr-2 w-4 h-4" /> Filtres
            </button>

            {isFilterMenuOpen && (
              <div 
                ref={filterMenuRef}
                className="
                  absolute right-0 mt-2 w-64 max-h-[calc(100vh-100px)] 
                  overflow-y-auto bg-white 
                  border border-gray-200 rounded-lg shadow-lg 
                  p-4 space-y-3 z-[110] // Ensure dropdown is above everything
                "
                style={{
                  top: '100%',
                }}
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-700 mb-2">
                    Status des Véhicules
                  </h3>
                  <div className="flex space-x-2 flex-wrap gap-2">
                    <FilterToggle 
                      filter="libre" 
                      label="Libres" 
                      icon={CircleCheck}
                      color="green" 
                    />
                     <FilterToggle 
                      filter="pause" 
                      label="Pause" 
                      icon={PauseCircle}
                      color="yellow" 
                    />
                    <FilterToggle 
                      filter="occupe" 
                      label="Occupés" 
                      icon={CircleX}
                      color="red" 
                    />
                   
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-2">
                    Type de Véhicules
                  </h3>
                  <div className="flex space-x-2 flex-wrap gap-2">
                    <FilterToggle 
                      filter="ambulance" 
                      label="Ambulances" 
                      icon={Car}
                      color="blue" 
                    />
                    <FilterToggle 
                      filter="vsl" 
                      label="VSL" 
                      icon={Timer}
                      color="purple" 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;