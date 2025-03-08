import React from 'react';
import { FaUserMd, FaAmbulance, FaMapMarkerAlt, FaCheckCircle, FaUtensils, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { Equipe } from './data';
import { getAmbulancierById, getAmbulanceById } from './data';

interface EquipeListProps {
  equipes: Equipe[];
  onEdit: (equipe: Equipe) => void;
  onDelete: (id: number) => void;
  onToggleMission: (id: number) => void;
  onToggleRepas: (id: number) => void;
}

const EquipeList: React.FC<EquipeListProps> = ({ 
  equipes, 
  onEdit, 
  onDelete, 
  onToggleMission, 
  onToggleRepas 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-gray-200 text-gray-700">
            <th className="p-3 text-left">Équipe</th>
            <th className="p-3 text-left">Ambulance</th>
            <th className="p-3 text-left">Secteur</th>
            <th className="p-3 text-center">Statut</th>
            <th className="p-3 text-center">Repas</th>
            <th className="p-3 text-center">Horaires</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipes.map((equipe) => {
            const ambulancier1 = getAmbulancierById(equipe.ambulancierId1);
            const ambulancier2 = equipe.ambulancierId2 !== undefined ? getAmbulancierById(equipe.ambulancierId2) : undefined;
            const ambulance = getAmbulanceById(equipe.ambulanceId);
            
            return (
              <tr key={equipe.id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  <div className="flex flex-col">
                    <div className="font-semibold text-gray-700 mb-2">
                      {equipe.nom}
                    </div>
                    {ambulancier1 && (
                      <div className="flex items-center mb-1 text-xs">
                        <FaUserMd className="mr-1 text-blue-500" />
                        <span>{ambulancier1.prenom} {ambulancier1.nom} ({ambulancier1.qualification})</span>
                      </div>
                    )}
                    {ambulancier2 && (
                      <div className="flex items-center text-xs">
                        <FaUserMd className="mr-1 text-blue-500" />
                        <span>{ambulancier2.prenom} {ambulancier2.nom} ({ambulancier2.qualification})</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  {ambulance && (
                    <div className="flex items-center">
                      <FaAmbulance className="mr-1 text-red-500" />
                      <span>{ambulance.immatriculation} ({ambulance.type})</span>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-green-500" />
                    <span>{equipe.secteur}</span>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => onToggleMission(equipe.id)}
                    className={`px-2 py-1 rounded-full text-xs ${equipe.enMission ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}
                  >
                    {equipe.enMission ? (
                      <span className="flex items-center">
                        <FaAmbulance className="mr-1" /> En mission
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaCheckCircle className="mr-1" /> Disponible
                      </span>
                    )}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => onToggleRepas(equipe.id)}
                    className={`px-2 py-1 rounded-full text-xs ${equipe.pauseRepasPrise ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {equipe.pauseRepasPrise ? (
                      <span className="flex items-center">
                        <FaUtensils className="mr-1" /> Prise
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaClock className="mr-1" /> À prendre
                      </span>
                    )}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <span>{equipe.heureDebutService} - {equipe.heureFinService}</span>
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => onEdit(equipe)}
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      title="Modifier"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => onDelete(equipe.id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      title="Supprimer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {equipes.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          Aucune équipe ne correspond aux critères de filtrage actuels.
        </div>
      )}
    </div>
  );
};

export default EquipeList;