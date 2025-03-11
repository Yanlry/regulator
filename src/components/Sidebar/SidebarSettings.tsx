import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Props pour le composant SidebarSettings
 */
interface SidebarSettingsProps {
  /** État d'ouverture du menu des paramètres */
  isOpen: boolean;
  /** Fonction pour fermer le menu des paramètres */
  onClose: () => void;
  /** État du mode survol */
  hoverMode: boolean;
  /** Fonction pour changer l'état du mode survol */
  onHoverModeChange: (enabled: boolean) => void;
}

/**
 * Composant pour les paramètres de la sidebar
 * Affiche les options de thème et autres paramétrages
 */
const SidebarSettings: React.FC<SidebarSettingsProps> = ({
  isOpen,
  onClose,
  hoverMode,
  onHoverModeChange,
}) => {
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  const handleClickOption = () => {
    // Fermer le menu après avoir changé d'option (optionnel)
    onClose();
  };

  return (
    <div
      className={`
        absolute right-0 mt-2 w-64 
        ${
          theme === 'dark'
            ? 'bg-gray-800 text-white border border-gray-700'
            : 'bg-white text-gray-800 border border-gray-200'
        }
        rounded-md shadow-lg z-50 text-sm
      `}
    >
      <div
        className={`p-3 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <h3 className="font-semibold">Options de la barre latérale</h3>
      </div>

      <div className="p-3 space-y-2">
        {/* Option de thème */}
        <div
          className={`
            p-2 flex justify-between items-center
            ${
              theme === 'dark'
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-100'
            }
            rounded cursor-pointer transition-colors
          `}
          onClick={() => {
            toggleTheme();
            handleClickOption();
          }}
          role="button"
          aria-label={`Activer le mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
        >
          <span>Mode {theme === 'dark' ? 'clair' : 'sombre'}</span>
          <div className="flex items-center">
            {theme === 'dark' ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-600" />
            )}
          </div>
        </div>

        {/* Option d'ouverture au survol */}
        <label
          className={`
            flex items-center gap-2 cursor-pointer
            ${
              theme === 'dark'
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-100'
            }
            p-2 rounded transition-colors
          `}
        >
          <input
            type="checkbox"
            checked={hoverMode}
            onChange={(e) => {
              onHoverModeChange(e.target.checked);
              handleClickOption();
            }}
            className={`
              rounded
              ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
              text-blue-500 focus:ring-blue-500
            `}
          />
          <span>Ouvrir au survol</span>
        </label>
      </div>
    </div>
  );
};

export default SidebarSettings;