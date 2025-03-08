import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Equipe, equipesData } from './data';
import EquipeList from './EquipeList';
import EquipeForm from './EquipeForm';
import EquipeMap from './EquipeMap';
import StatsDashboard from './StatsDashboard';

interface EquipesProps {
  isOpen: boolean;
}

const Equipes: React.FC<EquipesProps> = ({ isOpen }) => {
  const [equipes, setEquipes] = useState<Equipe[]>(equipesData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentEquipe, setCurrentEquipe] = useState<Equipe | null>(null);
  const [viewMode, setViewMode] = useState<'liste' | 'carte'>('liste');
  const [filtreStatus, setFiltreStatus] = useState<'tous' | 'disponible' | 'enMission'>('tous');

  const handleEditEquipe = (equipe: Equipe) => {
    setCurrentEquipe({...equipe});
    setShowModal(true);
  };

  const handleDeleteEquipe = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette équipe ?")) {
      setEquipes(equipes.filter(e => e.id !== id));
    }
  };

  const handleAddEquipe = () => {
    const newEquipe: Equipe = {
      id: 0, 
      nom: "",
      ambulancierId1: 0,
      ambulancierId2: undefined,
      ambulanceId: 0,
      secteur: "",
      enMission: false,
      pauseRepasPrise: false,
      heureDebutService: "07:00",
      heureFinService: "19:00",
      coordonnees: "48.8566,2.3522"
    };
    setCurrentEquipe(newEquipe);
    setShowModal(true);
  };

  const handleSaveEquipe = () => {
    if (currentEquipe) {
      if (currentEquipe.id === 0) {
        setEquipes([...equipes, {...currentEquipe, id: Math.max(...equipes.map(e => e.id), 0) + 1}]);
      } else {
        setEquipes(equipes.map(e => e.id === currentEquipe.id ? currentEquipe : e));
      }
      setShowModal(false);
      setCurrentEquipe(null);
    }
  };

  const toggleMissionStatus = (id: number) => {
    setEquipes(equipes.map(e => 
      e.id === id ? {...e, enMission: !e.enMission} : e
    ));
  };

  const toggleRepasStatus = (id: number) => {
    setEquipes(equipes.map(e => 
      e.id === id ? {...e, pauseRepasPrise: !e.pauseRepasPrise} : e
    ));
  };

  const equipesFiltered = equipes.filter(equipe => {
    if (filtreStatus === 'tous') return true;
    if (filtreStatus === 'disponible') return !equipe.enMission;
    if (filtreStatus === 'enMission') return equipe.enMission;
    return true;
  });

  return (
    <div
      className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen ${
        isOpen ? "ml-64" : "ml-16"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Équipes d'Ambulances</h1>
        <div className="flex space-x-3">
          <div className="flex border rounded overflow-hidden">
            <button 
              onClick={() => setViewMode('liste')}
              className={`px-3 py-1 text-sm ${viewMode === 'liste' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Vue Liste
            </button>
            <button 
              onClick={() => setViewMode('carte')}
              className={`px-3 py-1 text-sm ${viewMode === 'carte' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Vue Carte
            </button>
          </div>
        </div>
        <button 
          onClick={handleAddEquipe}
          className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
        >
          <FaPlus className="mr-1" /> Nouvelle Équipe
        </button>
      </div>

      <div className="flex rounded overflow-hidden mb-4">
        <button 
          onClick={() => setFiltreStatus('tous')}
          className={`px-3 py-1 text-sm ${filtreStatus === 'tous' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Toutes
        </button>
        <button 
          onClick={() => setFiltreStatus('disponible')}
          className={`px-3 py-1 text-sm ${filtreStatus === 'disponible' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Disponibles
        </button>
        <button 
          onClick={() => setFiltreStatus('enMission')}
          className={`px-3 py-1 text-sm ${filtreStatus === 'enMission' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          En mission
        </button>
      </div>

      {/* Statistiques */}
      <StatsDashboard equipes={equipes} />
      
      {/* Liste des équipes */}
      {viewMode === 'liste' ? (
        <EquipeList 
          equipes={equipesFiltered} 
          onEdit={handleEditEquipe}
          onDelete={handleDeleteEquipe}
          onToggleMission={toggleMissionStatus}
          onToggleRepas={toggleRepasStatus}
        />
      ) : (
        <EquipeMap equipes={equipesFiltered} />
      )}

      {/* Modal pour ajouter/éditer une équipe */}
      {showModal && currentEquipe && (
        <EquipeForm
          currentEquipe={currentEquipe}
          setCurrentEquipe={setCurrentEquipe}
          onClose={() => {
            setShowModal(false);
            setCurrentEquipe(null);
          }}
          onSave={handleSaveEquipe}
        />
      )}
    </div>
  );
};

export default Equipes;