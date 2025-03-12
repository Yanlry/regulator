import React, { useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Appointment, AppointmentStatus, UrgencyLevel } from '../Appointments/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  theme: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onViewDetails,
  onEdit,
  theme
}) => {
  const cardClasses = useMemo(() => 
    theme === 'dark' 
      ? 'bg-gray-700 text-gray-100 hover:bg-gray-700 border border-gray-700' 
      : 'bg-white text-gray-900 hover:shadow-md',
    [theme]
  );

  const statusBadgeClasses = useMemo((): string => {
    const darkModeMap = {
      'confirmed': 'bg-green-900 text-green-300',
      'pending': 'bg-yellow-900 text-yellow-300',
      'in-progress': 'bg-blue-900 text-blue-300',
      'completed': 'bg-gray-900 text-gray-300',
      'cancelled': 'bg-red-900 text-red-300'
    };

    const lightModeMap = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };

    return theme === 'dark' 
      ? darkModeMap[appointment.status] || darkModeMap['completed']
      : lightModeMap[appointment.status] || lightModeMap['completed'];
  }, [appointment.status, theme]);

  const urgencyBadgeClasses = useMemo((): string => {
    const darkModeMap = {
      'critical': 'bg-red-900 text-red-300',
      'high': 'bg-orange-900 text-orange-300',
      'normal': 'bg-blue-900 text-blue-300',
      'low': 'bg-green-900 text-green-300'
    };

    const lightModeMap = {
      'critical': 'bg-red-100 text-red-800',
      'high': 'bg-orange-100 text-orange-800',
      'normal': 'bg-blue-100 text-blue-800',
      'low': 'bg-green-100 text-green-800'
    };

    return theme === 'dark'
      ? darkModeMap[appointment.urgencyLevel] || darkModeMap['normal']
      : lightModeMap[appointment.urgencyLevel] || lightModeMap['normal'];
  }, [appointment.urgencyLevel, theme]);

  const translateStatus = (status: AppointmentStatus): string => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'in-progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
    }
  };

  const translateUrgency = (level: UrgencyLevel): string => {
    switch (level) {
      case 'critical': return 'Critique';
      case 'high': return 'Urgente';
      case 'normal': return 'Normale';
      case 'low': return 'Faible';
    }
  };

  const translateVehicleType = useMemo((): string => {
    switch (appointment.vehicleType) {
      case 'ambulance': return 'Ambulance';
      case 'vsl': return 'VSL';
      case 'taxi': return 'Taxi';
      default: return appointment.vehicleType;
    }
  }, [appointment.vehicleType]);

  const handleViewDetails = (): void => {
    onViewDetails(appointment.id);
  };

  const handleEdit = (): void => {
    onEdit(appointment.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).replace(/^./, char => char.toUpperCase());
  };

  const buttonClasses = theme === 'dark'
    ? 'border border-gray-700 text-gray-300 hover:bg-gray-700'
    : 'border border-gray-300 text-gray-700 hover:bg-gray-50';

  return (
    <div className={`p-4 rounded-lg shadow-sm transition-all ${cardClasses}`}>
      <div className="flex flex-wrap justify-between items-start gap-4">
        {/* Patient information */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex items-center">
            <span className={`font-semibold text-lg ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              {appointment.patientName}
            </span>
            <span className={`ml-3 text-xs px-2 py-1 rounded-full ${statusBadgeClasses}`}>
              {translateStatus(appointment.status)}
            </span>
            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${urgencyBadgeClasses}`}>
              {translateUrgency(appointment.urgencyLevel)}
            </span>
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            {appointment.patientPhone}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            {translateVehicleType}
          </div>
        </div>
        
        {/* Pickup information */}
        <div className="flex-1 min-w-[250px]">
          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>Départ</div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            {appointment.pickupAddress}
          </div>
          <div className={`flex flex-col mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="flex items-center">
              <Calendar size={14} className="mr-2" />
              {formatDate(appointment.pickupDate)}
            </div>
            <div className="flex items-center mt-1">
              <Clock size={14} className="mr-2" />
              Heure du RDV : {appointment.pickupTime}
            </div>
          </div>
        </div>
        
        {/* Destination information */}
        <div className="flex-1 min-w-[250px]">
          <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>Destination</div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            {appointment.destinationAddress}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            {appointment.destinationService && `Service: ${appointment.destinationService}`} 
            {appointment.destinationRoom && ` - Salle ${appointment.destinationRoom}`}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleViewDetails}
            className={`px-3 py-1 text-sm rounded ${buttonClasses}`}
            aria-label="Voir les détails"
          >
            Détails
          </button>
          <button 
            onClick={handleEdit}
            className={`px-3 py-1 text-sm rounded ${buttonClasses}`}
            aria-label="Modifier le rendez-vous"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;