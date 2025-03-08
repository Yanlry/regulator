import React from 'react';
import { Equipe } from './data';

interface EquipeMapProps {
  equipes: Equipe[];
}

const EquipeMap: React.FC<EquipeMapProps> = ({ equipes }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-96 flex justify-center items-center">
      <div className="text-center text-gray-500">
        <p>Ici s'afficherait une carte avec la position des équipes</p>
        <p className="text-sm mt-2">Intégration possible avec Google Maps, OpenStreetMap, etc.</p>
        <p className="text-sm mt-2">
          {equipes.length} équipes à afficher sur la carte
        </p>
      </div>
    </div>
  );
};

export default EquipeMap;