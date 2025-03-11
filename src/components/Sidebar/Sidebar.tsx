import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Calendar,
  Users,
  MapPin,
  Bell,
  PlusCircle,
  List,
  Menu,
  LogOut,
  Truck,
  UserCheck,
  Briefcase,
  BarChart,
  Settings,
  Shield,
  Command,
  Moon,
  Sun,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

/**
 * Structure de navigation de l'application
 */
const navigationSections = [
  {
    title: "Gestion de la régulation",
    items: [
      { icon: Home, label: "Tableau de bord", path: "/" },
      { icon: Command, label: "Régulation", path: "/regulation" },
      { icon: PlusCircle, label: "Rendez-vous", path: "/appointments" },
      { icon: Users, label: "Équipes", path: "/equipes" },
      { icon: MapPin, label: "Localisation", path: "/localisation" },
    ],
  },
  {
    title: "Gestion des Véhicules",
    items: [{ icon: Truck, label: "Ambulances", path: "/ambulances" }],
  },
  {
    title: "Gestion des Patients",
    items: [
      { icon: List, label: "Liste des patients", path: "/liste-patients" },
    ],
  },
  {
    title: "Gestion des Salariés",
    items: [
      { icon: Calendar, label: "Planning", path: "/planning" },
      { icon: UserCheck, label: "Gestion RH", path: "/rh" },
      { icon: Briefcase, label: "Recrutement", path: "/recrutement" },
    ],
  },
  {
    title: "Outils et Analyse",
    items: [
      { icon: BarChart, label: "Statistiques", path: "/statistiques" },
      { icon: Bell, label: "Notifications", path: "/notifications" },
    ],
  },
];

/**
 * Interface pour les props du composant StandaloneSidebar
 */
interface StandaloneSidebarProps {
  /** Callback appelé quand l'état d'ouverture change */
  onOpenChange?: (isOpen: boolean) => void;
  /** État initial d'ouverture */
  initialOpen?: boolean;
}

/**
 * Sidebar autonome qui gère son propre état et notifie le parent des changements
 */
const StandaloneSidebar: React.FC<StandaloneSidebarProps> = ({
  onOpenChange,
  initialOpen = false,
}) => {
  // Utiliser le hook de thème
  const { theme, toggleTheme } = useTheme();
  
  // État local pour l'ouverture de la sidebar
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  
  // États pour les paramètres
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [hoverMode, setHoverMode] = useState<boolean>(() => {
    const savedHoverMode = localStorage.getItem('hoverMode');
    return savedHoverMode ? JSON.parse(savedHoverMode) : true;
  });
  
  // Refs pour les interactions
  const settingsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Notifier le parent quand l'état d'ouverture change
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  // Persister le mode survol dans localStorage
  useEffect(() => {
    localStorage.setItem('hoverMode', JSON.stringify(hoverMode));
  }, [hoverMode]);
  
  // Fonctions pour gérer l'état d'ouverture
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);
  
  // Gestion du survol
  const handleMouseEnter = () => {
    if (hoverMode && !isOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      openSidebar();
    }
  };
  
  const handleMouseLeave = () => {
    if (hoverMode && isOpen) {
      // Petit délai avant de fermer pour éviter les fermetures accidentelles
      timeoutRef.current = window.setTimeout(() => {
        closeSidebar();
      }, 300);
    }
  };
  
  // Détecte les clics en dehors du menu des paramètres
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsRef]);
  
  // Nettoie le timeout lorsque le composant est démonté
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`
        ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white'
            : 'bg-gradient-to-b from-blue-50 to-gray-100 text-gray-800'
        }
        shadow-2xl 
        transition-all duration-300 
        fixed left-0 top-0 h-screen 
        flex flex-col 
        z-50
        ${isOpen ? "w-64" : "w-16"}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${isOpen ? "p-4 pt-6 pb-2" : "p-2 pt-6 pb-2"}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              className={`
                p-2 rounded-md transition-all
                ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-200 hover:bg-gray-300'
                }
              `}
              onClick={toggleSidebar}
              title={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <Menu size={22} />
            </button>
            {isOpen && (
              <div className="flex items-center gap-2">
                <Shield size={22} className="text-blue-500" />
                <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  RÉGULATOR
                </h1>
              </div>
            )}
          </div>

          {isOpen && (
            <div className="relative ml-1" ref={settingsRef}>
              <button
                className={`
                  p-2 rounded-md transition-all
                  ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-300'
                  }
                `}
                onClick={() => setSettingsOpen(!settingsOpen)}
                title="Paramètres de la barre latérale"
              >
                <Settings
                  size={20}
                  className={
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }
                />
              </button>

              {/* Menu des paramètres */}
              {settingsOpen && (
                <div
                  className={`
                    absolute right-0 mt-2 w-64 
                    ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-white border border-gray-700'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }
                    rounded-md shadow-lg z-[100] text-sm
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
                        setSettingsOpen(false);
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
                          setHoverMode(e.target.checked);
                          setSettingsOpen(false);
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
              )}
            </div>
          )}
        </div>

        {isOpen && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher..."
              className={`
                w-full p-2 rounded-lg 
                ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white placeholder-gray-400'
                    : 'bg-white text-gray-800 placeholder-gray-500'
                }
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
                transition-all
              `}
            />
          </div>
        )}
      </div>

      <div
        className={`
          flex-1 overflow-y-auto custom-scrollbar
          ${isOpen ? "px-4 pr-5" : "px-2"}
        `}
      >
        <div>
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {isOpen && (
                <h2 
                  className={`
                    text-xs font-semibold
                    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                    mb-2 uppercase tracking-wider pl-2
                  `}
                >
                  {section.title}
                </h2>
              )}
              <nav className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <NavLink
                    key={itemIndex}
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center
                      p-2 rounded-lg 
                      transition-all 
                      group
                      ${isOpen ? "pl-3 gap-3" : "justify-center"}
                      ${
                        isActive
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : theme === 'dark'
                            ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                            : "hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                      }
                    `}
                  >
                    <div
                      className={`flex items-center justify-center ${
                        isOpen ? "w-8 h-8" : "w-10 h-10"
                      }`}
                    >
                      <item.icon
                        size={22}
                        className="
                          group-hover:scale-110 
                          transition-transform
                        "
                      />
                    </div>
                    {isOpen && <span className="text-sm">{item.label}</span>}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}

          {isOpen && (
            <h2 
              className={`
                text-xs font-semibold 
                ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                mb-2 uppercase tracking-wider pl-2
              `}
            >
              Système
            </h2>
          )}
          <nav className="space-y-2 mb-6">
            <Link
              to="/parametres"
              className={`
                flex items-center
                p-2 rounded-lg 
                transition-all 
                ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                }
                ${isOpen ? "pl-3 gap-3" : "justify-center"}
              `}
            >
              <div
                className={`flex items-center justify-center ${
                  isOpen ? "w-8 h-8" : "w-10 h-10"
                }`}
              >
                <Settings
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
              {isOpen && <span className="text-sm">Paramètres</span>}
            </Link>
          </nav>
        </div>
      </div>

      <div className={`${isOpen ? "p-4 pt-2" : "p-2 pt-2"}`}>
        <button
          onClick={() => {
            console.log("Déconnexion");
            if (isOpen) {
              closeSidebar();
            }
          }}
          className={`
            flex items-center
            w-full 
            bg-red-600 hover:bg-red-700 
            text-white font-semibold 
            rounded-lg 
            transition-all
            group
            ${isOpen ? "pl-3 gap-3 p-2 justify-start" : "justify-center p-3"}
          `}
        >
          <div
            className={`flex items-center justify-center ${
              isOpen ? "w-8 h-8" : "w-6 h-6"
            }`}
          >
            <LogOut
              size={22}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </div>
          {isOpen && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default StandaloneSidebar;