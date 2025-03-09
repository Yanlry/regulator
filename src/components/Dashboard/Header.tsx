import React from "react";
import { Bell, Filter } from "lucide-react";

interface HeaderProps {
  showWidgetFilter: boolean;
  setShowWidgetFilter: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  showWidgetFilter,
  setShowWidgetFilter,
}) => {
  return (
    <div className="mb-6">
      {/* Conteneur principal avec justification flex-end pour aligner à droite */}
      <div className="flex justify-between items-center">
        {/* Partie titre avec largeur définie */}
        <div className="flex-grow max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-800">
            {new Intl.DateTimeFormat("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })
              .format(new Date())
              .replace(/^./, (char) => char.toUpperCase())}
          </h1>
          <p className="text-gray-500">
            Supervision des transports des ambulances Covens-Daniel
          </p>
        </div>

        {/* Éléments alignés à droite */}
        <div className="flex items-center gap-4 justify-end">
          <input
            type="text"
            placeholder="Rechercher..."
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
          <div className="relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
          <button
            onClick={() => setShowWidgetFilter(!showWidgetFilter)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter size={18} />
            <span className="text-sm font-medium">Configurer widgets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
