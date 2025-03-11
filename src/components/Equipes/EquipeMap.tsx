import React from 'react';
import { Equipe } from './data';

interface EquipeMapProps {
  equipes: Equipe[];
  theme: string; // Changed from Theme to string
}

const EquipeMap: React.FC<EquipeMapProps> = ({ equipes, theme }) => {
  // Apply theme-specific styling
  const containerClasses = `
    p-4 rounded-lg shadow h-96 flex justify-center items-center
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const textClasses = `
    text-center
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}
  `;

  const smallTextClasses = `
    text-sm mt-2
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
  `;

  return (
    <div className={containerClasses}>
      <div className={textClasses}>
        <p>Ici s'afficherait une carte avec la position des équipes</p>
        <p className={smallTextClasses}>Intégration possible avec Google Maps, OpenStreetMap, etc.</p>
        <p className={smallTextClasses}>
          {equipes.length} équipes à afficher sur la carte
        </p>
      </div>
    </div>
  );
};

export default EquipeMap;