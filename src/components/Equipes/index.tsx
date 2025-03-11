import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Equipe, equipesData } from './data';
import EquipeList from './EquipeList';
import EquipeForm from './EquipeForm';
import EquipeMap from './EquipeMap';
import StatsDashboard from './StatsDashboard';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useTheme } from '../../contexts/ThemeContext';

interface EquipesProps {
  isOpen: boolean;
}

const Equipes: React.FC<EquipesProps> = () => {
  // Récupérer le thème du contexte
  const { theme } = useTheme();
  
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentEquipe, setCurrentEquipe] = useState<Equipe | null>(null);
  const [viewMode, setViewMode] = useState<'liste' | 'carte'>('liste');
  const [filtreStatus, setFiltreStatus] = useState<'tous' | 'disponible' | 'enMission'>('tous');
  const [isLoading, setIsLoading] = useState<boolean>(true);
 
  useEffect(() => {
    const loadEquipesData = async () => {
      try { 
        await new Promise(resolve => setTimeout(resolve, 1200));
         
        setEquipes(equipesData);
         
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des équipes:", error);
        setIsLoading(false);
      }
    };

    loadEquipesData();
  }, []);

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

  // Classes CSS adaptatives selon le thème
  const containerClasses = `
    transition-all duration-300 
    ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}
    min-h-screen p-4
  `;

  const headerClasses = `text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`;
  
  const contentClasses = `
    p-6 
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const cardClasses = `
    p-4 rounded-lg shadow 
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const buttonPrimaryClasses = `
    px-3 py-2 rounded text-white text-sm
    ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'}
    transition-colors
  `;

  return (
    <div className={containerClasses}>
      {isLoading ? (
        <div className="relative w-full h-full min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className={contentClasses}>
          <div className="flex justify-between items-center mb-6">
            <h1 className={headerClasses}>Gestion des Équipes d'Ambulances</h1>
            <div className="flex space-x-3">
              <div className={`flex border rounded overflow-hidden ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                <button 
                  onClick={() => setViewMode('liste')}
                  className={`px-3 py-1 text-sm ${viewMode === 'liste' 
                    ? 'bg-blue-500 text-white' 
                    : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  Vue Liste
                </button>
                <button 
                  onClick={() => setViewMode('carte')}
                  className={`px-3 py-1 text-sm ${viewMode === 'carte' 
                    ? 'bg-blue-500 text-white' 
                    : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  Vue Carte
                </button>
              </div>
            </div>
            <button 
              onClick={handleAddEquipe}
              className={buttonPrimaryClasses}
            >
              <FaPlus className="mr-1 inline" /> Nouvelle Équipe
            </button>
          </div>

          <div className={`flex rounded overflow-hidden mb-4 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
            <button 
              onClick={() => setFiltreStatus('tous')}
              className={`px-3 py-1 text-sm ${filtreStatus === 'tous' 
                ? 'bg-blue-500 text-white' 
                : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
            >
              Toutes
            </button>
            <button 
              onClick={() => setFiltreStatus('disponible')}
              className={`px-3 py-1 text-sm ${filtreStatus === 'disponible' 
                ? 'bg-green-500 text-white' 
                : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
            >
              Disponibles
            </button>
            <button 
              onClick={() => setFiltreStatus('enMission')}
              className={`px-3 py-1 text-sm ${filtreStatus === 'enMission' 
                ? 'bg-orange-500 text-white' 
                : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
            >
              En mission
            </button>
          </div>

          {/* Statistiques */}
          <div className={cardClasses + " mb-6"}>
            <StatsDashboard equipes={equipes} theme={theme} />
          </div>
          
          {/* Liste des équipes */}
          <div className={cardClasses}>
            {viewMode === 'liste' ? (
              <EquipeList 
                equipes={equipesFiltered} 
                onEdit={handleEditEquipe}
                onDelete={handleDeleteEquipe}
                onToggleMission={toggleMissionStatus}
                onToggleRepas={toggleRepasStatus}
                theme={theme}
              />
            ) : (
              <EquipeMap equipes={equipesFiltered} theme={theme} />
            )}
          </div>

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
              theme={theme}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Equipes;