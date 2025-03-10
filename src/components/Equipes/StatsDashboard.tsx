import React, {useState} from 'react';
import { FaUserMd, FaUtensils, FaAmbulance } from 'react-icons/fa';
import { Equipe } from './data';
import { ambulanciersData, ambulancesData } from './data';

interface StatsDashboardProps {
  equipes: Equipe[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ equipes }) => {
  const [showStats, setShowStats] = useState<boolean>(true);

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      {/* Bouton pour masquer/afficher les stats */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Tableau de bord des équipes</h2>
        <button
          onClick={() => setShowStats(!showStats)}
          className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
        >
          {showStats ? "Masquer les statistiques" : "Afficher les statistiques"}
        </button>
      </div>

      {/* Contenu des statistiques affiché uniquement si showStats est vrai */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Carte des équipes */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
              <FaUserMd className="mr-2 text-blue-500" /> Équipes
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{equipes.length}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{equipes.filter(e => e.enMission).length}</p>
                <p className="text-sm text-gray-500">En mission</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{equipes.filter(e => !e.enMission).length}</p>
                <p className="text-sm text-gray-500">Disponibles</p>
              </div>
            </div>
          </div>

          {/* Carte des pauses repas */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
              <FaUtensils className="mr-2 text-orange-500" /> Pauses Repas
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{equipes.filter(e => e.pauseRepasPrise).length}</p>
                <p className="text-sm text-gray-500">Prises</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{equipes.filter(e => !e.pauseRepasPrise).length}</p>
                <p className="text-sm text-gray-500">À prendre</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {((equipes.filter(e => e.pauseRepasPrise).length / equipes.length) * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-gray-500">Taux</p>
              </div>
            </div>
          </div>

          {/* Carte des ambulanciers */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
              <FaUserMd className="mr-2 text-green-500" /> Personnels
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{ambulanciersData.length}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{ambulanciersData.filter(a => a.enService).length}</p>
                <p className="text-sm text-gray-500">En service</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{ambulanciersData.filter(a => a.disponible).length}</p>
                <p className="text-sm text-gray-500">Disponibles</p>
              </div>
            </div>
          </div>

          {/* Carte des ambulances */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
              <FaAmbulance className="mr-2 text-red-500" /> Ambulances
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{ambulancesData.length}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{ambulancesData.filter(a => a.statut === "En service").length}</p>
                <p className="text-sm text-gray-500">En service</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{ambulancesData.filter(a => a.statut === "En maintenance").length}</p>
                <p className="text-sm text-gray-500">En maintenance</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default StatsDashboard;