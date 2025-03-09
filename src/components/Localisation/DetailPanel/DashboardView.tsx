import React from "react";
import { Stats } from "../data/types";
import StatCard from "./StatCard";
import { FaLayerGroup, FaChartLine, FaFilter } from "react-icons/fa";

interface DashboardViewProps {
  stats: Stats;
}

const DashboardView: React.FC<DashboardViewProps> = ({ stats }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Tableau de bord</h2>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard
          title="Véhicules libres"
          value={stats.vehiculesLibres}
          color="blue"
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
          title="Maintenance requise"
          value={stats.vehiculesAvecMaintenance}
          color="purple"
          label="Maintenance requise"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-3 mb-4">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
          <FaLayerGroup className="mr-2 text-blue-500" /> Composition de la flotte
        </h3>
        <div className="flex items-center mb-2">
          <div className="w-20 text-xs">Ambulances</div>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
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
            <div className="w-full bg-gray-200 rounded-full h-2">
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

      <div className="bg-white rounded-lg shadow p-3 mb-4">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" /> Performance de la flotte
        </h3>
        <div className="flex items-center mb-2">
          <div className="w-24 text-xs">Disponibilité</div>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  stats.tauxDisponibilite < 30
                    ? "bg-red-500"
                    : stats.tauxDisponibilite < 50
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
            <div className="w-full bg-gray-200 rounded-full h-2">
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

      <div className="bg-white rounded-lg shadow p-3">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
          <FaFilter className="mr-2 text-blue-500" /> Actions rapides
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-blue-100 text-blue-700 rounded p-2 text-xs hover:bg-blue-200">
            Programmer transport
          </button>
          <button className="bg-green-100 text-green-700 rounded p-2 text-xs hover:bg-green-200">
            Véhicule disponible
          </button>
          <button className="bg-yellow-100 text-yellow-700 rounded p-2 text-xs hover:bg-yellow-200">
            Déclarer pause
          </button>
          <button className="bg-red-100 text-red-700 rounded p-2 text-xs hover:bg-red-200">
            Signaler incident
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;