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
  theme: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilters,
  toggleFilter,
  stats = {}, 
  showDetails,
  setShowDetails,
  selectedAmbulanceId,
  showDashboard,
  theme,
}) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const toggleFilterMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFilterMenuOpen(prev => !prev);
  };

  const handleDashboardButton = () => {
    if (showDetails && selectedAmbulanceId) {
      setShowDetails(false);
    } else if (showDetails) {
      setShowDetails(false);
    } else {
      showDashboard();
    }
  };

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

  // Composant pour afficher les statistiques avec badge
  const StatBadge = ({ color, icon: Icon, label, value }: { 
    color: string, 
    icon: React.ComponentType<{ className?: string }>, 
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

  // Composant pour le bouton de filtre
  const FilterToggle = ({ 
    filter, 
    label, 
    icon: Icon,
    color = 'blue' 
  }: { 
    filter: keyof FilterOptions, 
    label: string, 
    icon: React.ComponentType<{ className?: string }>,
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

  // Définition des classes CSS conditionnelles pour le dark/light theme
// Container classes for the filter bar
const containerClasses = `
  ${theme === 'dark' 
    ? 'bg-gray-800 border-b border-gray-800 text-white' 
    : 'bg-white border-b border-gray-200 text-gray-800'}
  relative z-50 shadow-sm py-3 px-4 transition-colors duration-300
`;

// Filter button classes with improved contrast and interaction
const filterButtonClasses = `
  flex items-center px-3 py-2 rounded-full 
  ${theme === 'dark'
    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
  transition-colors duration-300 focus:outline-none focus:ring-2 
  ${theme === 'dark' 
    ? 'focus:ring-gray-600' 
    : 'focus:ring-gray-300'}
`;

// Filter menu dropdown classes
const filterMenuClasses = `
  absolute right-0 mt-2 w-64 max-h-[calc(100vh-100px)] 
  overflow-y-auto rounded-lg shadow-lg p-4 space-y-3 
  ${theme === 'dark'
    ? 'bg-gray-800 border border-gray-700 text-gray-100'
    : 'bg-white border border-gray-200 text-gray-800'}
  z-60 transition-colors duration-300
`;

// Title classes for filter menu sections
const titleClasses = `
  text-sm font-bold mb-2 
  ${theme === 'dark' 
    ? 'text-gray-300' 
    : 'text-gray-700'}
`;

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center">
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

        <div className="flex items-center space-x-3">
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

          <div className="relative">
            <button
              ref={filterButtonRef}
              onClick={toggleFilterMenu}
              className={filterButtonClasses}
            >
              <Filter className="mr-2 w-4 h-4" /> Filtres
            </button>

            {isFilterMenuOpen && (
              <div 
                ref={filterMenuRef}
                className={filterMenuClasses}
                style={{ top: '100%' }}
              >
                <div className="space-y-2">
                  <h3 className={titleClasses}>
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
                  <h3 className={titleClasses}>
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
