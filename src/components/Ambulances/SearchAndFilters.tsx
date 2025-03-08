import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchAndFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  maintenanceFilter: string;
  setMaintenanceFilter: (value: string) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  search,
  setSearch,
  filter,
  setFilter,
  maintenanceFilter,
  setMaintenanceFilter,
}) => (
  <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="flex items-center bg-white p-2 rounded-md shadow-md col-span-1 md:col-span-2">
      <Search size={16} className="text-gray-400 ml-2" />
      <input
        type="text"
        placeholder="Rechercher par ID, modèle, immatriculation ou localisation..."
        className="ml-2 w-full bg-transparent focus:outline-none text-gray-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="flex gap-2">
      <div className="relative flex-1">
        <select
          className="w-full bg-white p-2 rounded-md shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tous les véhicules</option>
          <option value="ambulance">Ambulances</option>
          <option value="vsl">VSL</option>
        </select>
        <Filter
          size={14}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 mr-3"
        />
      </div>
      <div className="relative flex-1 ">
        <select
          className="w-full bg-white p-2 rounded-md shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 mr-3"
        />
      </div>
    </div>
  </div>
);

export default SearchAndFilters;