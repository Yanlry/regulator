import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface AppointmentsHeaderProps {
  onNewAppointment: () => void;
}

const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({ onNewAppointment }) => {
  const { theme } = useTheme();

  // Dynamic classes for title based on theme
  const titleClasses = theme === 'dark'
    ? 'text-2xl font-bold text-gray-100'
    : 'text-2xl font-bold text-gray-800';

  // Dynamic classes for button based on theme
  const buttonClasses = theme === 'dark'
    ? 'flex items-center px-4 py-2 bg-blue-800 text-gray-100 rounded-md hover:bg-blue-700 transition-colors'
    : 'flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors';

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className={titleClasses}>Gestion des Rendez-vous</h1>
      <button
        onClick={onNewAppointment}
        className={buttonClasses}
        aria-label="Créer un nouveau rendez-vous"
      >
        <PlusCircle size={18} className="mr-2" />
        Nouveau Rendez-vous
      </button>
    </div>
  );
};

export default AppointmentsHeader;