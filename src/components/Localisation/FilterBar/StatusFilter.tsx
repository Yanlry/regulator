import React from "react";
import { FilterOptions } from "../data/types";

interface StatusFilterProps {
  activeFilters: FilterOptions;
  toggleFilter: (filter: string) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ activeFilters, toggleFilter }) => {
  return (
    <>
      <button
        onClick={() => toggleFilter("libre")}
        className={`px-2 py-1 text-xs rounded-md ${
          activeFilters.libre
            ? "bg-green-500 text-white"
            : "bg-gray-200"
        }`}
      >
        Libres
      </button>
      <button
        onClick={() => toggleFilter("occupe")}
        className={`px-2 py-1 text-xs rounded-md ${
          activeFilters.occupe
            ? "bg-red-500 text-white"
            : "bg-gray-200"
        }`}
      >
        Occupés
      </button>
      <button
        onClick={() => toggleFilter("pause")}
        className={`px-2 py-1 text-xs rounded-md ${
          activeFilters.pause
            ? "bg-yellow-500 text-white"
            : "bg-gray-200"
        }`}
      >
        En pause
      </button>
    </>
  );
};

export default StatusFilter;