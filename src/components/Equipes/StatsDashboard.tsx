import React, {useState} from 'react';
import { FaUserMd, FaUtensils, FaAmbulance } from 'react-icons/fa';
import { Equipe } from './data';
import { ambulanciersData, ambulancesData } from './data';

interface StatsDashboardProps {
  equipes: Equipe[];
  theme: string; 
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ equipes, theme }) => {
  const [showStats, setShowStats] = useState<boolean>(true);

  // Theme-specific classes
  const containerClasses = `
    mt-6 p-4 rounded-lg shadow-md
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const headerClasses = `
    text-xl font-bold mb-4
    ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
  `;

  const toggleButtonClasses = `
    px-3 py-2 rounded text-white text-sm
    ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-500 hover:bg-gray-600'}
  `;

  const cardClasses = `
    p-4 rounded-lg shadow-md
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
  `;

  const cardTitleClasses = `
    text-lg font-semibold mb-3 flex items-center
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
  `;

  const statValueClasses = `
    text-2xl font-bold
    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
  `;

  const statLabelClasses = `
    text-sm
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  return (
    <div className={containerClasses}>
      {/* Bouton pour masquer/afficher les stats */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={headerClasses}>Tableau de bord des équipes</h2>
        <button
          onClick={() => setShowStats(!showStats)}
          className={toggleButtonClasses}
        >
          {showStats ? "Masquer les statistiques" : "Afficher les statistiques"}
        </button>
      </div>

      {/* Contenu des statistiques affiché uniquement si showStats est vrai */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Carte des équipes */}
          <div className={cardClasses}>
            <h3 className={cardTitleClasses}>
              <FaUserMd className="mr-2 text-blue-500" /> Équipes
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className={statValueClasses}>{equipes.length}</p>
                <p className={statLabelClasses}>Total</p>
              </div>
              <div>
                <p className={statValueClasses}>{equipes.filter(e => e.enMission).length}</p>
                <p className={statLabelClasses}>En mission</p>
              </div>
              <div>
                <p className={statValueClasses}>{equipes.filter(e => !e.enMission).length}</p>
                <p className={statLabelClasses}>Disponibles</p>
              </div>
            </div>
          </div>

          {/* Carte des pauses repas */}
          <div className={cardClasses}>
            <h3 className={cardTitleClasses}>
              <FaUtensils className="mr-2 text-orange-500" /> Pauses Repas
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className={statValueClasses}>{equipes.filter(e => e.pauseRepasPrise).length}</p>
                <p className={statLabelClasses}>Prises</p>
              </div>
              <div>
                <p className={statValueClasses}>{equipes.filter(e => !e.pauseRepasPrise).length}</p>
                <p className={statLabelClasses}>À prendre</p>
              </div>
              <div>
                <p className={statValueClasses}>
                  {((equipes.filter(e => e.pauseRepasPrise).length / equipes.length) * 100).toFixed(0)}%
                </p>
                <p className={statLabelClasses}>Taux</p>
              </div>
            </div>
          </div>

          {/* Carte des ambulanciers */}
          <div className={cardClasses}>
            <h3 className={cardTitleClasses}>
              <FaUserMd className="mr-2 text-green-500" /> Personnels
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className={statValueClasses}>{ambulanciersData.length}</p>
                <p className={statLabelClasses}>Total</p>
              </div>
              <div>
                <p className={statValueClasses}>{ambulanciersData.filter(a => a.enService).length}</p>
                <p className={statLabelClasses}>En service</p>
              </div>
              <div>
                <p className={statValueClasses}>{ambulanciersData.filter(a => a.disponible).length}</p>
                <p className={statLabelClasses}>Disponibles</p>
              </div>
            </div>
          </div>

          {/* Carte des ambulances */}
          <div className={cardClasses}>
            <h3 className={cardTitleClasses}>
              <FaAmbulance className="mr-2 text-red-500" /> Ambulances
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className={statValueClasses}>{ambulancesData.length}</p>
                <p className={statLabelClasses}>Total</p>
              </div>
              <div>
                <p className={statValueClasses}>{ambulancesData.filter(a => a.statut === "En service").length}</p>
                <p className={statLabelClasses}>En service</p>
              </div>
              <div>
                <p className={statValueClasses}>{ambulancesData.filter(a => a.statut === "En maintenance").length}</p>
                <p className={statLabelClasses}>En maintenance</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;