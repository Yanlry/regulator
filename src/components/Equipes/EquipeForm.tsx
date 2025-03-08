import React from 'react';
import { Equipe } from './data';
import { ambulanciersData, ambulancesData } from './data';

interface EquipeFormProps {
  currentEquipe: Equipe;
  setCurrentEquipe: React.Dispatch<React.SetStateAction<Equipe | null>>;
  onClose: () => void;
  onSave: () => void;
}

const EquipeForm: React.FC<EquipeFormProps> = ({ 
  currentEquipe, 
  setCurrentEquipe, 
  onClose, 
  onSave 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">{currentEquipe.id === 0 ? "Nouvelle Équipe" : "Modifier l'Équipe"}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'équipe</label>
            <input
              type="text"
              value={currentEquipe.nom}
              onChange={(e) => setCurrentEquipe({...currentEquipe, nom: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
            <input
              type="text"
              value={currentEquipe.secteur}
              onChange={(e) => setCurrentEquipe({...currentEquipe, secteur: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ambulancier 1</label>
            <select
              value={currentEquipe.ambulancierId1}
              onChange={(e) => setCurrentEquipe({...currentEquipe, ambulancierId1: parseInt(e.target.value)})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">Sélectionner un ambulancier</option>
              {ambulanciersData.filter(a => a.disponible).map(a => (
                <option key={a.id} value={a.id}>{a.prenom} {a.nom} ({a.qualification})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ambulancier 2</label>
            <select
              value={currentEquipe.ambulancierId2 || 0}
              onChange={(e) => setCurrentEquipe({...currentEquipe, ambulancierId2: parseInt(e.target.value) || undefined})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">Sélectionner un ambulancier</option>
              {ambulanciersData.filter(a => a.disponible).map(a => (
                <option key={a.id} value={a.id}>{a.prenom} {a.nom} ({a.qualification})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ambulance</label>
            <select
              value={currentEquipe.ambulanceId}
              onChange={(e) => setCurrentEquipe({...currentEquipe, ambulanceId: parseInt(e.target.value)})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">Sélectionner une ambulance</option>
              {ambulancesData.filter(a => a.statut !== "En maintenance").map(a => (
                <option key={a.id} value={a.id}>{a.immatriculation} ({a.type})</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={currentEquipe.enMission ? "mission" : "disponible"}
                onChange={(e) => setCurrentEquipe({...currentEquipe, enMission: e.target.value === "mission"})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="disponible">Disponible</option>
                <option value="mission">En mission</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pause repas</label>
              <select
                value={currentEquipe.pauseRepasPrise ? "prise" : "non_prise"}
                onChange={(e) => setCurrentEquipe({...currentEquipe, pauseRepasPrise: e.target.value === "prise"})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="non_prise">À prendre</option>
                <option value="prise">Prise</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heure de début</label>
            <input
              type="time"
              value={currentEquipe.heureDebutService}
              onChange={(e) => setCurrentEquipe({...currentEquipe, heureDebutService: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heure de fin</label>
            <input
              type="time"
              value={currentEquipe.heureFinService}
              onChange={(e) => setCurrentEquipe({...currentEquipe, heureFinService: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipeForm;