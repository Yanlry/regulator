import React, { useState, useEffect, useRef } from "react";
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

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Navigation Section Configuration
const navigationSections = [
  {
    title: "Gestion de la régulation",
    items: [
      { icon: Home, label: "Tableau de bord", path: "/" },
      { icon: Command, label: "Régulation", path: "/regulation" },
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
      { icon: PlusCircle, label: "Rendez-vous", path: "/appointments" },
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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  // État pour le menu de paramètres
  const [settingsOpen, setSettingsOpen] = useState(false);
  // État pour l'option de fermeture automatique
  const [autoClose, setAutoClose] = useState(false);

  // Référence pour détecter les clics en dehors du menu de paramètres
  const settingsRef = useRef<HTMLDivElement>(null);

  // Gestionnaire pour les clics sur les éléments du menu
  const handleMenuClick = () => {
    if (isOpen && autoClose) {
      toggleSidebar();
    }
  };

  // Gestionnaire pour fermer le menu des paramètres lors de clics externes
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

  return (
    <div
      className={`
        bg-gradient-to-b from-gray-900 to-gray-800 
        text-white shadow-2xl 
        transition-all duration-300 
        fixed left-0 top-0 h-screen 
        flex flex-col 
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      {/* Fixed Header Section */}
      <div className={`${isOpen ? "p-4 pt-6 pb-2" : "p-2 pt-6 pb-2"}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-all"
              onClick={toggleSidebar}
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

          {/* Icône de paramètres (clé à molette) */}
          {/* Icône de paramètres (clé à molette) - visible uniquement quand la sidebar est ouverte */}
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

              {/* Menu déroulant des paramètres */}
              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-50 text-sm">
                  <div className="p-3 border-b border-gray-700">
                    <h3 className="font-semibold">
                      Options de la barre latérale
                    </h3>
                  </div>
                  <div className="p-3">
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={autoClose}
                        onChange={() => setAutoClose(!autoClose)}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span>Fermer après sélection d'un menu</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Bar */}
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

      {/* Scrollable Navigation Section */}
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
                    onClick={handleMenuClick}
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
              onClick={handleMenuClick}
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

      {/* Fixed Footer Section */}
      <div className={`${isOpen ? "p-4 pt-2" : "p-2 pt-2"}`}>
        <button
          onClick={() => {
            console.log("Déconnexion");
            if (isOpen && autoClose) {
              toggleSidebar();
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

export default Sidebar;
