import React from 'react';
import { PlusCircle } from 'lucide-react';

/**
 * Props interface for the AppointmentsHeader component
 */
interface AppointmentsHeaderProps {
  onNewAppointment: () => void;
}

/**
 * AppointmentsHeader: Header component for the appointments list
 * Displays the title and provides the "New Appointment" button
 * @param props Component input properties
 */
const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({ onNewAppointment }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestion des Rendez-vous</h1>
      <button
        onClick={onNewAppointment}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        aria-label="Créer un nouveau rendez-vous"
      >
        <PlusCircle size={18} className="mr-2" />
        Nouveau Rendez-vous
      </button>
    </div>
  );
};

export default AppointmentsHeader;