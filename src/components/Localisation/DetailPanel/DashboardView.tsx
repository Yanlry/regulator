import React from "react";
import { Stats } from "../data/types";
import StatCard from "./StatCard";
import { FaLayerGroup, FaChartLine, FaFilter } from "react-icons/fa";

interface DashboardViewProps {
  stats: Stats;
  theme: string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ stats, theme }) => {
  // Classe globale du conteneur
  const containerClass = theme === 'dark'
    ? "p-4 text-white"
    : "p-4 text-gray-900";

  // Classe pour les blocs (carte) avec ombre et arrondi
  const cardContainer = theme === 'dark'
    ? "bg-gray-800 rounded-lg shadow p-3 mb-4 text-white"
    : "bg-white rounded-lg shadow p-3 mb-4 text-gray-700";

  // Classe pour la barre de progression (arrière-plan)
  const progressBarBackground = theme === 'dark'
    ? "bg-gray-600"
    : "bg-gray-200";

  // Classe pour les titres des sections
  const sectionTitleClass = theme === 'dark'
    ? "font-semibold text-gray-300 mb-2 flex items-center"
    : "font-semibold text-gray-700 mb-2 flex items-center";

  return (
    <div className={containerClass}>
      <h2 className="text-xl font-bold mb-3">Tableau de bord</h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard
          title="Véhicules libres"
          value={stats.vehiculesLibres}
          color="green"
          label="Véhicules libres"
        />
        <StatCard
          title="Véhicules occupés"
          value={stats.vehiculesOccupes}
          color="red"
          label="Véhicules occupés"
        />
        <StatCard
          title="En pause"
          value={stats.vehiculesEnPause}
          color="yellow"
          label="En pause"
        />
        <StatCard
          title="Maintenance"
          value={stats.vehiculesAvecMaintenance}
          color="blue"
          label="Maintenance"
        />
      </div>

      {/* Section Composition de la flotte */}
      <div className={cardContainer}>
        <h3 className={sectionTitleClass}>
          <FaLayerGroup className="mr-2 text-blue-500" /> Composition de la flotte
        </h3>
        <div className="flex items-center mb-2">
          <div className="w-20 text-xs">Ambulances</div>
          <div className="flex-1">
            <div className={`w-full ${progressBarBackground} rounded-full h-2`}>
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{
                  width: `${(stats.ambulancesCount / (stats.ambulancesCount + stats.vslCount)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="w-8 text-right text-xs ml-2">
            {stats.ambulancesCount}
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-20 text-xs">VSL</div>
          <div className="flex-1">
            <div className={`w-full ${progressBarBackground} rounded-full h-2`}>
              <div
                className="h-2 rounded-full bg-purple-500"
                style={{
                  width: `${(stats.vslCount / (stats.ambulancesCount + stats.vslCount)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="w-8 text-right text-xs ml-2">
            {stats.vslCount}
          </div>
        </div>
      </div>

      {/* Section Performance de la flotte */}
      <div className={cardContainer}>
        <h3 className={sectionTitleClass}>
          <FaChartLine className="mr-2 text-blue-500" /> Performance de la flotte
        </h3>
        <div className="flex items-center mb-2">
          <div className="w-24 text-xs">Disponibilité</div>
          <div className="flex-1">
            <div className={`w-full ${progressBarBackground} rounded-full h-2`}>
              <div
                className={`h-2 rounded-full ${
                  stats.tauxDisponibilite !== undefined && stats.tauxDisponibilite < 30
                    ? "bg-red-500"
                    : stats.tauxDisponibilite !== undefined && stats.tauxDisponibilite < 50
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${stats.tauxDisponibilite}%` }}
              ></div>
            </div>
          </div>
          <div className="w-12 text-right text-xs ml-2">
            {stats.tauxDisponibilite}%
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-24 text-xs">Occupation</div>
          <div className="flex-1">
            <div className={`w-full ${progressBarBackground} rounded-full h-2`}>
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${stats.tauxOccupation}%` }}
              ></div>
            </div>
          </div>
          <div className="w-12 text-right text-xs ml-2">
            {stats.tauxOccupation}%
          </div>
        </div>
      </div>

      {/* Section Actions rapides */}
      <div className={cardContainer.replace("mb-4", "")}>
        <h3 className={sectionTitleClass}>
          <FaFilter className="mr-2 text-blue-500" /> Actions rapides
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button className={`${theme === 'dark' ? 'bg-blue-500 text-blue-200 hover:bg-blue-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} rounded p-2 text-xs`}>
            Programmer transport
          </button>
          <button className={`${theme === 'dark' ? 'bg-green-500 text-green-200 hover:bg-green-700' : 'bg-green-100 text-green-700 hover:bg-green-200'} rounded p-2 text-xs`}>
            Véhicule disponible
          </button>
          <button className={`${theme === 'dark' ? 'bg-yellow-500 text-yellow-200 hover:bg-yellow-700' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'} rounded p-2 text-xs`}>
            Déclarer pause
          </button>
          <button className={`${theme === 'dark' ? 'bg-red-500 text-red-200 hover:bg-red-700' : 'bg-red-100 text-red-700 hover:bg-red-200'} rounded p-2 text-xs`}>
            Signaler incident
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
