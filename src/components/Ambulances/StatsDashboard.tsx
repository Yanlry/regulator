import React from 'react';
import { Stats } from '../../types';

interface StatsDashboardProps {
  stats: Stats;
  theme: string; 
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, theme }) => {
  // Theme-specific classes with transition effect
  const containerClasses = `
    mb-6 rounded-md shadow-md p-4 transition-colors duration-300
    ${theme === 'dark' ? 'bg-gray-700 shadow-gray-800' : 'bg-white shadow-gray-200'}
  `;

  const titleClasses = `
    font-semibold mb-2 transition-colors duration-300
    ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
  `;

  const descriptionClasses = `
    text-sm mb-4 transition-colors duration-300
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}
  `;

  // Enhanced stat card classes with optimized colors for both themes
  const statCards = {
    blue: {
      container: theme === 'dark' ? 'bg-blue-900/90 border border-blue-800' : 'bg-blue-100',
      text: theme === 'dark' ? 'text-blue-100' : 'text-blue-900',
    },
    green: {
      container: theme === 'dark' ? 'bg-green-900/90 border border-green-800' : 'bg-green-100',
      text: theme === 'dark' ? 'text-green-100' : 'text-green-900',
    },
    amber: {
      container: theme === 'dark' ? 'bg-amber-900/90 border border-amber-800' : 'bg-amber-100',
      text: theme === 'dark' ? 'text-amber-100' : 'text-amber-900',
    },
    red: {
      container: theme === 'dark' ? 'bg-red-900/90 border border-red-800' : 'bg-red-100',
      text: theme === 'dark' ? 'text-red-100' : 'text-red-900',
    },
    purple: {
      container: theme === 'dark' ? 'bg-purple-900/90 border border-purple-800' : 'bg-purple-100',
      text: theme === 'dark' ? 'text-purple-100' : 'text-purple-900',
    },
    gray: {
      container: theme === 'dark' ? 'bg-gray-800/90 border border-gray-700' : 'bg-gray-100',
      text: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    },
  };

  const cardBaseClasses = "p-3 rounded-md text-center transition-colors duration-300 shadow-sm";

  return (
    <div className={containerClasses}>
      <h2 className={titleClasses}>État de la flotte</h2>
      <p className={descriptionClasses}>
        Vue d'ensemble de la maintenance
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className={`${statCards.blue.container} ${cardBaseClasses}`}>
          <span className={`${statCards.blue.text} text-sm font-semibold`}>
            Taux opérationnel
          </span>
          <span className={`block ${statCards.blue.text} text-xl font-bold mt-1`}>
            {stats.operationalRate}%
          </span>
        </div>
        <div className={`${statCards.green.container} ${cardBaseClasses}`}>
          <span className={`${statCards.green.text} text-sm font-semibold`}>
            Maintenance à jour
          </span>
          <span className={`block ${statCards.green.text} text-xl font-bold mt-1`}>
            {stats.maintenanceUpToDate}
          </span>
        </div>
        <div className={`${statCards.amber.container} ${cardBaseClasses}`}>
          <span className={`${statCards.amber.text} text-sm font-semibold`}>
            Maintenance à prévoir
          </span>
          <span className={`block ${statCards.amber.text} text-xl font-bold mt-1`}>
            {stats.maintenanceNeeded}
          </span>
        </div>
        <div className={`${statCards.red.container} ${cardBaseClasses}`}>
          <span className={`${statCards.red.text} text-sm font-semibold`}>
            En réparation
          </span>
          <span className={`block ${statCards.red.text} text-xl font-bold mt-1`}>
            {stats.underRepair}
          </span>
        </div>
        <div className={`${statCards.purple.container} ${cardBaseClasses}`}>
          <span className={`${statCards.purple.text} text-sm font-semibold`}>
            En service
          </span>
          <span className={`block ${statCards.purple.text} text-xl font-bold mt-1`}>
            {stats.inService}
          </span>
        </div>
        <div className={`${statCards.gray.container} ${cardBaseClasses}`}>
          <span className={`${statCards.gray.text} text-sm font-semibold`}>
            Hors service
          </span>
          <span className={`block ${statCards.gray.text} text-xl font-bold mt-1`}>
            {stats.outOfService}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;