import React, { useState, useEffect } from "react";
import { Moon, Sun, LogOut, X } from "lucide-react";
import { SidebarSettingsProps } from "./types";

/**
 * Composant pour les paramètres de la sidebar
 */
const SidebarSettings: React.FC<SidebarSettingsProps> = ({
  isOpen,
  theme,
  hoverMode,
  toggleTheme,
  onHoverModeChange,
  onClose,
}) => {
  const [soundNotifications, setSoundNotifications] = useState<boolean>(() => {
    return localStorage.getItem("soundNotifications") !== "false";
  });

  const [autoLock, setAutoLock] = useState<boolean>(() => {
    return localStorage.getItem("autoLock") !== "false";
  });

  // Fonction de déconnexion
  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      console.log("Déconnexion en cours...");
      // Logique de déconnexion à implémenter
    }
  };

  useEffect(() => {
    localStorage.setItem("soundNotifications", soundNotifications.toString());
  }, [soundNotifications]);

  useEffect(() => {
    localStorage.setItem("autoLock", autoLock.toString());
  }, [autoLock]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl transform
          ${theme === "dark" ? "bg-gray-900" : "bg-white"}
          transition-all duration-300 animate-scaleIn`}>
          
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors
            ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold mb-6">Paramètres</h3>

        <div className="space-y-6">
          {/* Section Apparence */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Apparence
            </h3>

            <div
              className={`p-4 flex justify-between items-center
                ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}
                rounded-xl cursor-pointer transition-colors`}
              onClick={toggleTheme}
              role="button"
              aria-label={`Activer le mode ${theme === "dark" ? "clair" : "sombre"}`}>
              <div className="flex flex-col">
                <span className="font-medium">Mode {theme === "dark" ? "clair" : "sombre"}</span>
                <span className="text-sm opacity-70">Changer l'apparence de l'interface</span>
              </div>
              <div className={`p-3 rounded-full
                  ${theme === "dark"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-600"}`}>
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </div>
            </div>
          </div>

          {/* Section Navigation */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Navigation
            </h3>

            <div className={`p-4 rounded-xl
                ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col">
                  <span className="font-medium">Ouvrir au survol</span>
                  <span className="text-sm opacity-70">Déploie le menu automatiquement</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hoverMode}
                    onChange={(e) => onHoverModeChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer 
                      peer-focus:outline-none peer-focus:ring-2 
                      peer-focus:ring-indigo-300
                      after:content-[''] after:absolute after:top-[2px] 
                      after:left-[2px] after:bg-white after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      ${hoverMode
                        ? "bg-indigo-600 after:translate-x-full"
                        : theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-300"}`}>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Section Notifications */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Notifications
            </h3>

            <div className={`p-4 rounded-xl
                ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col">
                  <span className="font-medium">Notifications sonores</span>
                  <span className="text-sm opacity-70">Sons pour les alertes importantes</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundNotifications}
                    onChange={(e) => setSoundNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer 
                      peer-focus:outline-none peer-focus:ring-2 
                      peer-focus:ring-indigo-300
                      after:content-[''] after:absolute after:top-[2px] 
                      after:left-[2px] after:bg-white after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      ${soundNotifications
                        ? "bg-indigo-600 after:translate-x-full"
                        : theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-300"}`}>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Section Sécurité */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Sécurité
            </h3>

            <div className={`p-4 rounded-xl
                ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col">
                  <span className="font-medium">Verrouillage automatique</span>
                  <span className="text-sm opacity-70">Après 30 minutes d'inactivité</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoLock}
                    onChange={(e) => setAutoLock(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer 
                      peer-focus:outline-none peer-focus:ring-2 
                      peer-focus:ring-indigo-300
                      after:content-[''] after:absolute after:top-[2px] 
                      after:left-[2px] after:bg-white after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      ${autoLock
                        ? "bg-indigo-600 after:translate-x-full"
                        : theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-300"}`}>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Déconnexion */}
          <button onClick={handleLogout}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2
              ${theme === "dark"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-red-600 hover:bg-red-700"} 
              text-white font-medium transition-colors`}>
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Bouton fermer */}
        <button onClick={onClose}
          className={`w-full mt-6 py-3 px-4 rounded-xl font-medium
            ${theme === "dark"
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-500 hover:bg-indigo-600"}
            text-white transition-colors`}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default SidebarSettings;