import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { SidebarProps } from "./types";
import { navigationSections } from "./constants";
import SidebarSettings from "./SidebarSettings";
import {
  Menu,
  ChevronLeft,
  Settings,
  Shield,
} from "lucide-react";

/**
 * Composant principal de la sidebar
 */
const Sidebar: React.FC<SidebarProps> = ({
  onOpenChange,
  initialOpen = false,
}) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // État local pour l'ouverture de la sidebar
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

  // États pour les paramètres
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [hoverMode, setHoverMode] = useState<boolean>(() => {
    const savedHoverMode = localStorage.getItem("hoverMode");
    return savedHoverMode ? JSON.parse(savedHoverMode) : true;
  });

  // Refs pour les interactions
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Notifier le parent quand l'état change
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  // Persister le mode hover dans localStorage
  useEffect(() => {
    localStorage.setItem("hoverMode", JSON.stringify(hoverMode));
  }, [hoverMode]);

  // Fonctions pour gérer l'état ouvert
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Gérer les interactions au survol
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
      timeoutRef.current = window.setTimeout(() => {
        closeSidebar();
      }, 300);
    }
  };

  // Détecter les clics en dehors de la sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen &&
        window.innerWidth < 1024 // Uniquement sur mobile/tablette
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Nettoyage du timeout lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Fonction pour obtenir la section active en fonction du chemin
  const getActiveSection = useCallback(() => {
    const currentPath = location.pathname;
    for (const section of navigationSections) {
      if (section.items.some((item) => item.path === currentPath)) {
        return section.title;
      }
    }
    return null;
  }, [location.pathname]);

  const activeSection = getActiveSection();

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed h-screen transition-all duration-300 ease-in-out
          ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
          ${isOpen ? "left-0 shadow-2xl w-[280px]" : "left-0 shadow-lg w-[80px]"}
          z-50
          ${theme === "dark" ? "border-r border-gray-800" : "border-r border-gray-200"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`${isOpen ? "px-5" : "px-3"} py-5 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              {isOpen ? (
                <div className={`relative flex items-center justify-center h-12 w-12 rounded-xl
                    ${theme === "dark" ? "bg-indigo-500/10" : "bg-indigo-100"}`}>
                  <Shield size={26} className="text-indigo-500" />
                </div>
              ) : (
                <button
                  onClick={toggleSidebar}
                  className={`relative flex items-center justify-center h-12 w-12 rounded-xl transition-all
                    ${theme === "dark" ? "bg-indigo-500/10 hover:bg-gray-800" : "bg-indigo-100 hover:bg-gray-100"}`}
                  title="Déployer le menu"
                >
                  <Menu size={26} className="text-indigo-500" />
                </button>
              )}

              {isOpen && (
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl tracking-wide">RÉGULATOR</h1>
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      En ligne
                    </span>
                  </div>
                </div>
              )}
            </div>

            {isOpen && (
              <button
                className={`p-2 rounded-xl transition-all
                  ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                onClick={toggleSidebar}
                title="Réduire le menu"
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>

          {/* Barre de recherche */}
          {isOpen && (
            <div className="px-5 mb-4">
              <div className={`flex items-center gap-2 p-3 rounded-xl
                ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-100"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className={`w-full bg-transparent border-none outline-none
                    text-sm placeholder-gray-500 dark:placeholder-gray-400`}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={`flex-1 overflow-y-auto ${isOpen ? "px-3" : "px-2"} hide-scrollbar pt-1`}>
            {navigationSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className={`mb-5 ${section.title === activeSection ? "animate-pulse-subtle" : ""}`}>
                {isOpen && (
                  <h2 className={`text-xs font-medium mb-3 px-3
                      ${theme === "dark"
                        ? section.title === activeSection ? "text-indigo-400" : "text-gray-500"
                        : section.title === activeSection ? "text-indigo-700" : "text-gray-500"}
                      ${section.title === activeSection ? "font-bold" : ""}`}>
                    {section.title}
                  </h2>
                )}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={itemIndex}
                        to={item.path}
                        className={`flex items-center gap-3
                          ${isOpen ? "px-3" : "justify-center px-0"}
                          py-3 rounded-xl transition-all
                          ${isActive
                            ? theme === "dark"
                              ? "bg-indigo-500/20 text-indigo-400"
                              : "bg-indigo-100 text-indigo-700"
                            : theme === "dark"
                            ? "hover:bg-gray-800"
                            : "hover:bg-gray-100"}`}
                      >
                        <div className={`flex items-center justify-center
                            ${isActive
                              ? "text-indigo-500"
                              : theme === "dark"
                              ? "text-gray-400"
                              : "text-gray-500"}
                            ${isOpen ? "w-6" : "w-12 h-12"}`}>
                          <item.icon size={22} />
                        </div>
                        {isOpen && (
                          <span className={`text-sm font-medium
                              ${isActive
                                ? theme === "dark"
                                  ? "text-white"
                                  : "text-indigo-700"
                                : ""}`}>
                            {item.label}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer avec paramètres */}
          <div className={`py-3 mt-auto
              ${isOpen ? "px-5" : "px-3"}
              ${theme === "dark" ? "border-t border-gray-800" : "border-t border-gray-200"}`}>
            <button
              onClick={() => setSettingsOpen(true)}
              className={`w-full flex items-center gap-3
                ${isOpen ? "" : "justify-center"}
                p-3 rounded-xl transition-all
                ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
              <Settings size={22} className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              {isOpen && (
                <span className="text-sm font-medium">Paramètres</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal des paramètres */}
      <SidebarSettings
        isOpen={settingsOpen}
        theme={theme}
        hoverMode={hoverMode}
        toggleTheme={toggleTheme}
        onHoverModeChange={setHoverMode}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Overlay pour mobile */}
      {isOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;