import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ActionButtonsProps } from './types';

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSubmit }) => {
  const { theme } = useTheme();

  // Dynamic classes for cancel button based on theme
  const cancelButtonClasses = theme === 'dark'
    ? "px-4 py-2 border border-gray-700 rounded-md shadow-sm text-gray-300 bg-gray-800 hover:bg-gray-700"
    : "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50";

  // Dynamic classes for submit button based on theme
  const submitButtonClasses = theme === 'dark'
    ? "px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700"
    : "px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700";

  return (
    <div className={`pt-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} flex justify-end space-x-3`}>
      <button 
        type="button" 
        className={cancelButtonClasses}
      >
        Annuler
      </button>
      <button 
        type="submit" 
        onClick={onSubmit}
        className={submitButtonClasses}
      >
        Créer Rendez-vous
      </button>
    </div>
  );
};

export default ActionButtons;