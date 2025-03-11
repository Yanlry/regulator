import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchAndFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  maintenanceFilter: string;
  setMaintenanceFilter: (value: string) => void;
  theme: string; 
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  search,
  setSearch,
  filter,
  setFilter,
  maintenanceFilter,
  setMaintenanceFilter,
  theme
}) => {
  // Theme-specific classes
  const searchContainerClasses = `
    flex items-center p-2 rounded-md shadow-md col-span-1 md:col-span-2
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const searchIconClasses = `
    ml-2
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}
  `;

  const inputClasses = `
    ml-2 w-full bg-transparent focus:outline-none
    ${theme === 'dark' ? 'text-gray-200 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'}
  `;

  const selectClasses = `
    w-full p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500
    ${theme === 'dark' 
      ? 'bg-gray-700 text-gray-200 border border-gray-600' 
      : 'bg-white text-gray-700 border border-gray-200'}
  `;

  const filterIconClasses = `
    absolute right-2 top-1/2 transform -translate-y-1/2 mr-3
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className={searchContainerClasses}>
        <Search size={16} className={searchIconClasses} />
        <input
          type="text"
          placeholder="Rechercher par ID, modèle, immatriculation ou localisation..."
          className={inputClasses}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <select
            className={selectClasses}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tous les véhicules</option>
            <option value="ambulance">Ambulances</option>
            <option value="vsl">VSL</option>
          </select>
          <Filter
            size={14}
            className={filterIconClasses}
          />
        </div>
        <div className="relative flex-1">
          <select
            className={selectClasses}
            value={maintenanceFilter}
            onChange={(e) => setMaintenanceFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="a-jour">À jour</option>
            <option value="imminent">Entretien imminent</option>
            <option value="necessaire">Contrôle nécessaire</option>
            <option value="en-cours">En réparation</option>
          </select>
          <Filter
            size={14}
            className={filterIconClasses}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;