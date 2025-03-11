import React from 'react';
import { LegendProps } from './types';

/**
 * Composant de légende pour afficher des indicateurs colorés avec leur signification
 * Prend en charge les thèmes clair et sombre et les classes Tailwind pour les couleurs
 */
const Legend: React.FC<LegendProps> = ({ items, theme = 'light' }) => {
  const isDark = theme === 'dark';
  
  // Classes adaptées au thème
  const textClass = isDark ? 'text-gray-300' : 'text-gray-600';
  
  return (
    <div className="flex flex-wrap gap-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {/* Utiliser la classe directement au lieu du style inline */}
          <span className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></span>
          <span className={`text-sm ${textClass}`}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;