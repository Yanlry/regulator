import React, { useCallback } from 'react';
import { Search, Calendar } from 'lucide-react';
import { FilterOptions } from '../Appointments/types';

interface AppointmentsFiltersProps {
  filterOptions: FilterOptions;
  onSearchChange: (query: string) => void;
  onDateChange: (date: string | null) => void;
  onStatusChange: (status: string | null) => void;
  onVehicleTypeChange: (vehicleType: string | null) => void;
}

const AppointmentsFilters: React.FC<AppointmentsFiltersProps> = ({
  filterOptions,
  onSearchChange,
  onDateChange,
  onStatusChange,
  onVehicleTypeChange
}) => {

  const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);


  const handleDateInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    onDateChange(e.target.value || null);
  }, [onDateChange]);

  const handleStatusSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    onStatusChange(e.target.value || null);
  }, [onStatusChange]);

  const handleVehicleTypeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    onVehicleTypeChange(e.target.value || null);
  }, [onVehicleTypeChange]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-4">
        {/* Search input */}
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un patient, une adresse..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={filterOptions.searchQuery}
              onChange={handleSearchInput}
              aria-label="Rechercher des rendez-vous"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        {/* Filter options */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Date filter */}
          <div className="relative flex items-center">
            <Calendar size={18} className="absolute left-3 text-gray-400" />
            <input
              type="date"
              className="pl-10 pr-4 py-2 border rounded-md"
              onChange={handleDateInput}
              aria-label="Filtrer par date"
            />
          </div>
          
          {/* Status filter */}
          <select
            className="px-4 py-2 border rounded-md"
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
            className="px-4 py-2 border rounded-md"
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