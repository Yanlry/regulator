import React, { useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Appointment, AppointmentStatus, UrgencyLevel } from '../Appointments/types';

/**
 * Props interface for the AppointmentCard component
 */
interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
}

/**
 * AppointmentCard: Displays a single appointment in the list
 * Contains patient details, pickup/destination info, and action buttons
 * @param props Component input properties
 */
const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onViewDetails,
  onEdit
}) => {
  /**
   * Get CSS classes for status badge based on status value
   */
  const statusBadgeClasses = useMemo((): string => {
    switch (appointment.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, [appointment.status]);

  /**
   * Get CSS classes for urgency badge based on urgency level
   */
  const urgencyBadgeClasses = useMemo((): string => {
    switch (appointment.urgencyLevel) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }, [appointment.urgencyLevel]);

  /**
   * Translate status to French
   */
  const translateStatus = (status: AppointmentStatus): string => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'in-progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
    }
  };

  /**
   * Translate urgency level to French
   */
  const translateUrgency = (level: UrgencyLevel): string => {
    switch (level) {
      case 'critical': return 'Critique';
      case 'high': return 'Urgente';
      case 'normal': return 'Normale';
      case 'low': return 'Faible';
    }
  };

  /**
   * Translate vehicle type to French
   */
  const translateVehicleType = useMemo((): string => {
    switch (appointment.vehicleType) {
      case 'ambulance': return 'Ambulance';
      case 'vsl': return 'VSL';
      case 'taxi': return 'Taxi';
      default: return appointment.vehicleType;
    }
  }, [appointment.vehicleType]);

  /**
   * Handle view details button click
   */
  const handleViewDetails = (): void => {
    onViewDetails(appointment.id);
  };

  /**
   * Handle edit button click
   */
  const handleEdit = (): void => {
    onEdit(appointment.id);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-wrap justify-between items-start gap-4">
        {/* Patient information */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex items-center">
            <span className="font-semibold text-lg">{appointment.patientName}</span>
            <span className={`ml-3 text-xs px-2 py-1 rounded-full ${statusBadgeClasses}`}>
              {translateStatus(appointment.status)}
            </span>
            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${urgencyBadgeClasses}`}>
              {translateUrgency(appointment.urgencyLevel)}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1">{appointment.patientPhone}</div>
          <div className="text-sm text-gray-600 mt-1">
            {translateVehicleType}
          </div>
        </div>
        
        {/* Pickup information */}
        <div className="flex-1 min-w-[250px]">
          <div className="text-sm font-medium">Départ</div>
          <div className="text-sm text-gray-800">{appointment.pickupAddress}</div>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <Calendar size={14} className="mr-1" />
            {appointment.pickupDate}
            <Clock size={14} className="ml-2 mr-1" />
            {appointment.pickupTime}
          </div>
        </div>
        
        {/* Destination information */}
        <div className="flex-1 min-w-[250px]">
          <div className="text-sm font-medium">Destination</div>
          <div className="text-sm text-gray-800">{appointment.destinationAddress}</div>
          <div className="text-sm text-gray-600 mt-1">
            {appointment.destinationService && `Service: ${appointment.destinationService}`} 
            {appointment.destinationRoom && ` - Salle ${appointment.destinationRoom}`}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleViewDetails}
            className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
            aria-label="Voir les détails"
          >
            Détails
          </button>
          <button 
            onClick={handleEdit}
            className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
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