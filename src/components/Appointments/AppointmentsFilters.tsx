import React, { useCallback } from "react";
import { Search, Calendar } from "lucide-react";
import { FilterOptions } from "../Appointments/types";

interface AppointmentsFiltersProps {
  filterOptions: FilterOptions;
  onSearchChange: (query: string) => void;
  onDateChange: (date: string | null) => void;
  onStatusChange: (status: string | null) => void;
  onVehicleTypeChange: (vehicleType: string | null) => void;
  theme: string;
}

const AppointmentsFilters: React.FC<AppointmentsFiltersProps> = ({
  filterOptions,
  onSearchChange,
  onDateChange,
  onStatusChange,
  onVehicleTypeChange,
  theme
}) => {
  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const handleDateInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      onDateChange(e.target.value || null);
    },
    [onDateChange]
  );

  const handleStatusSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      onStatusChange(e.target.value || null);
    },
    [onStatusChange]
  );

  const handleVehicleTypeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      onVehicleTypeChange(e.target.value || null);
    },
    [onVehicleTypeChange]
  );

  // Dynamic classes based on theme
  const containerClasses = theme === 'dark'
    ? 'bg-gray-800 p-4 rounded-lg shadow-md mb-6 border border-gray-700'
    : 'bg-white p-4 rounded-lg shadow-sm mb-6';

  const inputClasses = theme === 'dark'
    ? 'w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-600'
    : 'w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500';

  const selectClasses = theme === 'dark'
    ? 'px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-100'
    : 'px-4 py-2 border rounded-md';

  const iconClasses = theme === 'dark'
    ? 'text-gray-500'
    : 'text-gray-400';

  return (
    <div className={containerClasses}>
      <div className="flex flex-wrap gap-4">
        {/* Search input */}
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un patient, une adresse..."
              className={inputClasses}
              value={filterOptions.searchQuery}
              onChange={handleSearchInput}
              aria-label="Rechercher des rendez-vous"
            />
            <Search
              size={18}
              className={`absolute left-3 top-2.5 ${iconClasses}`}
            />
          </div>
        </div>

        {/* Filter options */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Date filter */}
          <div className="relative flex items-center">
            <Calendar size={18} className={`absolute left-3 ${iconClasses}`} />
            <input
              type="date"
              className={inputClasses}
              onChange={handleDateInput}
              aria-label="Filtrer par date"
            />
          </div>

          {/* Status filter */}
          <select
            className={selectClasses}
            onChange={handleStatusSelect}
            aria-label="Filtrer par statut"
          >
            <option value="">Tous les statuts</option>
            <option value="confirmed">Confirmé</option>
            <option value="pending">En attente</option>
            <option value="in-progress">En cours</option>
            <option value="completed">Terminé</option>
            <option value="cancelled">Annulé</option>
          </select>

          {/* Vehicle type filter */}
          <select
            className={selectClasses}
            onChange={handleVehicleTypeSelect}
            aria-label="Filtrer par type de véhicule"
          >
            <option value="">Tous les véhicules</option>
            <option value="ambulance">Ambulance</option>
            <option value="vsl">VSL</option>
            <option value="taxi">Taxi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsFilters;