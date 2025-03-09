import React from "react";
import { FilterOptions } from "../data/types";

interface TypeFilterProps {
  activeFilters: FilterOptions;
  toggleFilter: (filter: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ activeFilters, toggleFilter }) => {
  return (
    <>
      <button
        onClick={() => toggleFilter("ambulance")}
        className={`px-2 py-1 text-xs rounded-md ${
          activeFilters.ambulance
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        Ambulances
      </button>
      <button
        onClick={() => toggleFilter("vsl")}
        className={`px-2 py-1 text-xs rounded-md ${
          activeFilters.vsl
            ? "bg-purple-500 text-white"
            : "bg-gray-200"
        }`}
      >
        VSL
      </button>
      <button
        onClick={() => toggleFilter("showHopitaux")}
        className={`px-2 py-1 text-xs rounded-md ${
          activeFilters.showHopitaux
            ? "bg-indigo-500 text-white"
            : "bg-gray-200"
        }`}
      >
        Hôpitaux
      </button>
    </>
  );
};

export default TypeFilter;