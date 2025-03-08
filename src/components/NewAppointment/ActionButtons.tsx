import React from 'react';
import { ActionButtonsProps } from './types';

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSubmit }) => {
  return (
    <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
      <button 
        type="button" 
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
        Annuler
      </button>
      <button 
        type="submit" 
        onClick={onSubmit}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
        Créer Rendez-vous
      </button>
    </div>
  );
};

export default ActionButtons;