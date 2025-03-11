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
  theme: string; // Changed from Theme to string
}

const EquipeList: React.FC<EquipeListProps> = ({ 
  equipes, 
  onEdit, 
  onDelete, 
  onToggleMission, 
  onToggleRepas,
  theme
}) => {
  // Theme-specific class definitions
  const containerClasses = `
    p-4 rounded-lg
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const tableClasses = `
    w-full border-collapse text-sm
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
  `;

  const tableHeaderClasses = `
    border-b p-3 text-left
    ${theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}
  `;

  const tableCellClasses = `p-3`;

  const tableRowClasses = `
    border-b 
    ${theme === 'dark' 
      ? 'border-gray-600 hover:bg-gray-600' 
      : 'border-gray-200 hover:bg-gray-100'}
  `;

  const teamNameClasses = `
    font-semibold mb-2
    ${theme === 'dark' ? 'text-white' : 'text-gray-700'}
  `;

  const textClasses = `
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  `;

  const emptyStateClasses = `
    text-center py-4
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  return (
    <div className={containerClasses}>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th className={tableHeaderClasses}>Équipe</th>
            <th className={tableHeaderClasses}>Ambulance</th>
            <th className={tableHeaderClasses}>Secteur</th>
            <th className={`${tableHeaderClasses} text-center`}>Statut</th>
            <th className={`${tableHeaderClasses} text-center`}>Repas</th>
            <th className={`${tableHeaderClasses} text-center`}>Horaires</th>
            <th className={`${tableHeaderClasses} text-center`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipes.map((equipe) => {
            const ambulancier1 = getAmbulancierById(equipe.ambulancierId1);
            const ambulancier2 = equipe.ambulancierId2 !== undefined ? getAmbulancierById(equipe.ambulancierId2) : undefined;
            const ambulance = getAmbulanceById(equipe.ambulanceId);
            
            return (
              <tr key={equipe.id} className={tableRowClasses}>
                <td className={tableCellClasses}>
                  <div className="flex flex-col">
                    <div className={teamNameClasses}>
                      {equipe.nom}
                    </div>
                    {ambulancier1 && (
                      <div className="flex items-center mb-1 text-xs">
                        <FaUserMd className="mr-1 text-blue-500" />
                        <span className={textClasses}>{ambulancier1.prenom} {ambulancier1.nom} ({ambulancier1.qualification})</span>
                      </div>
                    )}
                    {ambulancier2 && (
                      <div className="flex items-center text-xs">
                        <FaUserMd className="mr-1 text-blue-500" />
                        <span className={textClasses}>{ambulancier2.prenom} {ambulancier2.nom} ({ambulancier2.qualification})</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className={tableCellClasses}>
                  {ambulance && (
                    <div className="flex items-center">
                      <FaAmbulance className="mr-1 text-red-500" />
                      <span className={textClasses}>{ambulance.immatriculation} ({ambulance.type})</span>
                    </div>
                  )}
                </td>
                <td className={tableCellClasses}>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-green-500" />
                    <span className={textClasses}>{equipe.secteur}</span>
                  </div>
                </td>
                <td className={`${tableCellClasses} text-center`}>
                  <button 
                    onClick={() => onToggleMission(equipe.id)}
                    className={`px-2 py-1 rounded-full text-xs ${
                      equipe.enMission 
                        ? theme === 'dark' ? 'bg-orange-800 text-orange-100' : 'bg-orange-100 text-orange-800'
                        : theme === 'dark' ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800'
                    }`}
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
                <td className={`${tableCellClasses} text-center`}>
                  <button 
                    onClick={() => onToggleRepas(equipe.id)}
                    className={`px-2 py-1 rounded-full text-xs ${
                      equipe.pauseRepasPrise 
                        ? theme === 'dark' ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-800'
                        : theme === 'dark' ? 'bg-yellow-800 text-yellow-100' : 'bg-yellow-100 text-yellow-800'
                    }`}
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
                <td className={`${tableCellClasses} text-center ${textClasses}`}>
                  <span>{equipe.heureDebutService} - {equipe.heureFinService}</span>
                </td>
                <td className={`${tableCellClasses} text-center`}>
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
        <div className={emptyStateClasses}>
          Aucune équipe ne correspond aux critères de filtrage actuels.
        </div>
      )}
    </div>
  );
};

export default EquipeList;