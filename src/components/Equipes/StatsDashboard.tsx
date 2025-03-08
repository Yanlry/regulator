import React from 'react';
import { FaUserMd, FaUtensils, FaMapMarkerAlt, FaAmbulance, FaClock } from 'react-icons/fa';
import { Equipe } from './data';
import { ambulanciersData, ambulancesData } from './data';

interface StatsDashboardProps {
  equipes: Equipe[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ equipes }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tableau de bord</h2>
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
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(equipes.filter(e => e.enMission).length / equipes.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {((equipes.filter(e => e.enMission).length / equipes.length) * 100).toFixed(0)}% des équipes sont en mission
            </p>
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
              <p className="text-2xl font-bold">{((equipes.filter(e => e.pauseRepasPrise).length / equipes.length) * 100).toFixed(0)}%</p>
              <p className="text-sm text-gray-500">Taux</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-orange-500 h-2.5 rounded-full" 
                style={{ width: `${(equipes.filter(e => e.pauseRepasPrise).length / equipes.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {equipes.filter(e => !e.pauseRepasPrise).length} équipes doivent encore prendre leur pause
            </p>
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
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Qualifications :</span>
              <span>{ambulanciersData.filter(a => a.qualification === "DEA").length} DEA, {ambulanciersData.filter(a => a.qualification === "Auxiliaire").length} Auxiliaires</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${(ambulanciersData.filter(a => a.enService).length / ambulanciersData.length) * 100}%` }}
              ></div>
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
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>Types : </span>
            <span>
              {ambulancesData.filter(a => a.type === "ASSU").length} ASSU, 
              {ambulancesData.filter(a => a.type === "VSL").length} VSL
            </span>
          </div>
          <div className="mt-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-red-500 h-2.5 rounded-full" 
                style={{ width: `${(ambulancesData.filter(a => a.statut === "En service").length / ambulancesData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Seconde rangée avec des statistiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Statistiques par secteur */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-purple-500" /> Répartition par secteur
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Array.from(new Set(equipes.map(e => e.secteur))).map(secteur => (
              <div key={secteur} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{secteur}</span>
                <span className="font-semibold">{equipes.filter(e => e.secteur === secteur).length}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques de temps de service */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
            <FaClock className="mr-2 text-blue-500" /> Horaires de service
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Heures de service totales aujourd'hui :</span>
              <span className="font-semibold">
                {equipes.reduce((total, equipe) => {
                  const debut = new Date(`2025-03-08T${equipe.heureDebutService}:00`);
                  const fin = new Date(`2025-03-08T${equipe.heureFinService}:00`);
                  return total + (fin.getTime() - debut.getTime()) / 1000 / 60 / 60;
                }, 0).toFixed(0)} h
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Équipes de jour :</span>
              <span className="font-semibold">{equipes.filter(e => e.heureDebutService < "12:00").length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Équipes de soir :</span>
              <span className="font-semibold">{equipes.filter(e => e.heureDebutService >= "12:00").length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Troisième rangée avec encore plus de données */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Types d'équipes */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Types d'équipes</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>AMBULANCE:</span>
              <span className="font-semibold">{equipes.filter(e => e.nom === "AMBULANCE").length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>VSL:</span>
              <span className="font-semibold">{equipes.filter(e => e.nom === "VSL").length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-indigo-500 h-2.5 rounded-full" 
                style={{ width: `${(equipes.filter(e => e.nom === "AMBULANCE").length / equipes.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {((equipes.filter(e => e.nom === "AMBULANCE").length / equipes.length) * 100).toFixed(0)}% AMBULANCE / 
              {((equipes.filter(e => e.nom === "VSL").length / equipes.length) * 100).toFixed(0)}% VSL
            </p>
          </div>
        </div>

        {/* Taux d'utilisation journalier */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Taux d'utilisation</h3>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{((equipes.filter(e => e.enMission).length / equipes.length) * 100).toFixed(0)}%</span>
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle r="40" cx="50" cy="50" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
                <circle 
                  r="40" 
                  cx="50" 
                  cy="50" 
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray={`${(equipes.filter(e => e.enMission).length / equipes.length) * 251.2} 251.2`}
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 mt-2">Taux d'occupation des équipes</p>
          </div>
        </div>

        {/* État du personnel */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">État du personnel</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Ratio ambulanciers/équipes:</span>
              <span className="font-semibold">{(ambulanciersData.filter(a => a.enService).length / equipes.length).toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>DEA en service:</span>
              <span className="font-semibold">{ambulanciersData.filter(a => a.qualification === "DEA" && a.enService).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Auxiliaires en service:</span>
              <span className="font-semibold">{ambulanciersData.filter(a => a.qualification === "Auxiliaire" && a.enService).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Taux de personnel disponible:</span>
              <span className="font-semibold">{((ambulanciersData.filter(a => a.disponible).length / ambulanciersData.length) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;