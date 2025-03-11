import { useMemo } from 'react';
import { Theme, MonthlyRecapStyles } from '../types';

/**
 * Hook personnalisé pour générer les styles du composant MonthlyRecap
 * en fonction du thème actuel
 * 
 * @param theme - Thème actuel ('light' ou 'dark')
 * @returns Ensemble de classes CSS pour chaque élément du composant
 */
export const useMonthlyRecapStyles = (theme: Theme): MonthlyRecapStyles => {
  return useMemo(() => {
    const isDark = theme === 'dark';
    
    return {
      // Styles d'en-tête
      headerTitle: `text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`,
      headerSubtitle: `${isDark ? 'text-gray-400' : 'text-gray-500'}`,
      
      // Styles de carte
      card: `${isDark ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-xl overflow-hidden ${
        isDark ? 'border border-gray-600' : 'border border-gray-100'
      }`,
      
      // Styles de tableau
      tableHeader: `${isDark ? 'bg-gray-800' : 'bg-gray-50'}`,
      tableHeaderCell: `px-6 py-4 text-left font-semibold ${
        isDark ? 'text-gray-200' : 'text-gray-700'
      }`,
      
      // Styles des lignes
      tableRowEven: `${isDark ? 'bg-gray-700' : 'bg-white'}`,
      tableRowOdd: `${isDark ? 'bg-gray-650' : 'bg-gray-50'}`,
      tableRowHover: `${isDark ? 'hover:bg-gray-600' : 'hover:bg-blue-50'}`,
      tableRowBorder: `border-t ${isDark ? 'border-gray-600' : 'border-gray-100'}`,
      
      // Styles des cellules
      tableCell: `px-6 py-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`,
      employeeActive: `w-4 h-4 rounded-full mr-3 bg-green-500`,
      employeeOnLeave: `w-4 h-4 rounded-full mr-3 bg-red-500`,
      employeeName: `font-medium ${isDark ? 'text-white' : 'text-gray-800'}`,
      
      // Heures et statuts
      hoursWorked: `font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`,
      overtimeHours: `font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`,
      
      // Badge de jour de repos
      restDayWeekend: `px-3 py-1 rounded-full text-sm ${
        isDark ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-800'
      }`,
      restDayWeekday: `px-3 py-1 rounded-full text-sm ${
        isDark ? 'bg-blue-700 text-blue-100' : 'bg-blue-100 text-blue-800'
      }`,
      
      // Légende
      legendContainer: `${isDark ? 'bg-gray-800' : 'bg-gray-50'} px-6 py-4 border-t ${
        isDark ? 'border-gray-600' : 'border-gray-100'
      }`,
    };
  }, [theme]);
};

export default useMonthlyRecapStyles;