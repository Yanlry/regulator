import React from "react";
import { Bell, Filter } from "lucide-react";

interface HeaderProps {
  showWidgetFilter: boolean;
  setShowWidgetFilter: (value: boolean) => void;
  theme: string;
}

const Header: React.FC<HeaderProps> = ({
  showWidgetFilter,
  setShowWidgetFilter,
  theme
}) => {
  // Theme-specific classes
  const titleClasses = `
    text-2xl font-bold
    ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
  `;

  const subtitleClasses = `
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}
  `;

  const searchInputClasses = `
    px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 w-64
    ${theme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}
  `;

  const bellIconClasses = `
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
  `;

  const widgetFilterButtonClasses = `
    flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium
    ${theme === 'dark' 
      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
  `;

  return (
    <div className="mb-6">
      {/* Conteneur principal avec justification flex-end pour aligner à droite */}
      <div className="flex justify-between items-center">
        {/* Partie titre avec largeur définie */}
        <div className="flex-grow max-w-2xl">
          <h1 className={titleClasses}>
            {new Intl.DateTimeFormat("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })
              .format(new Date())
              .replace(/^./, (char) => char.toUpperCase())}
          </h1>
          <p className={subtitleClasses}>
            Supervision des transports des ambulances Covens-Daniel
          </p>
        </div>

        {/* Éléments alignés à droite */}
        <div className="flex items-center gap-4 justify-end">
          <input
            type="text"
            placeholder="Rechercher..."
            className={searchInputClasses}
          />
          <div className="relative">
            <Bell size={20} className={bellIconClasses} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
          <button
            onClick={() => setShowWidgetFilter(!showWidgetFilter)}
            className={widgetFilterButtonClasses}
          >
            <Filter size={18} />
            <span>Configurer widgets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;