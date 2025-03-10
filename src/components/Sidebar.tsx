import React, { useState, useContext, createContext, useCallback, useEffect, useRef } from "react";
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
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

/**
 * Interface pour l'état de la sidebar et fonctions de contrôle
 */
interface SidebarContextType {
  /** État d'ouverture de la sidebar */
  isOpen: boolean;
  /** Fonction pour ouvrir la sidebar manuellement */
  openSidebar: () => void;
  /** Fonction pour fermer la sidebar manuellement */
  closeSidebar: () => void;
  /** Fonction pour basculer l'état de la sidebar */
  toggleSidebar: () => void;
}

/**
 * Contexte pour partager l'état de la sidebar dans l'application
 */
const SidebarContext = createContext<SidebarContextType | null>(null);

/**
 * Hook personnalisé pour accéder à l'état de la sidebar
 * @returns État et contrôles de la sidebar
 */
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar doit être utilisé dans un SidebarProvider");
  }
  return context;
};

/**
 * Props du composant SidebarProvider
 */
interface SidebarProviderProps {
  /** Composants enfants */
  children: React.ReactNode;
}

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
 * Fournisseur de contexte pour la sidebar
 * @param props Props du composant
 */
export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);
  
  const contextValue = {
    isOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar
  };
  
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

/**
 * Composant Sidebar avec ouverture au survol
 */
const Sidebar: React.FC = () => {
  const { isOpen, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
  
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [hoverMode, setHoverMode] = useState<boolean>(true);
  
  const settingsRef = useRef<HTMLDivElement>(null);
  // Utilisé number au lieu de NodeJS.Timeout pour éviter l'erreur d'espace de noms
  const timeoutRef = useRef<number | null>(null);

  
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
        bg-gradient-to-b from-gray-900 to-gray-800 
        text-white shadow-2xl 
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
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-all"
              onClick={toggleSidebar}
              title={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <Menu size={22} />
            </button>
            {isOpen && (
              <div className="flex items-center gap-2">
                <Shield size={22} className="text-blue-500" />
                <h1 className="text-xl font-bold text-white">RÉGULATOR</h1>
              </div>
            )}
          </div>

          {isOpen && (
            <div className="relative ml-1" ref={settingsRef}>
              <button
                className="p-2 hover:bg-gray-700 rounded-md transition-all"
                onClick={() => setSettingsOpen(!settingsOpen)}
                title="Paramètres de la barre latérale"
              >
                <Settings
                  size={20}
                  className="text-gray-300 hover:text-white"
                />
              </button>

              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-50 text-sm">
                  <div className="p-3 border-b border-gray-700">
                    <h3 className="font-semibold">
                      Options de la barre latérale
                    </h3>
                  </div>
                  <div className="p-3 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={hoverMode}
                        onChange={() => setHoverMode(!hoverMode)}
                        className="rounded text-blue-500 focus:ring-blue-500"
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
              className="
                w-full p-2 rounded-lg 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
                transition-all
              "
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
                <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider pl-2">
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
                          : "hover:bg-gray-800 text-gray-300 hover:text-white"
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
            <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider pl-2">
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
                text-gray-300 
                hover:text-white
                hover:bg-gray-800
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
            if (isOpen ) {
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

export { Sidebar };