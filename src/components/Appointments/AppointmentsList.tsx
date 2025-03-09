import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentsHeader from '../Appointments/AppointmentsHeader';
import AppointmentsFilters from '../Appointments/AppointmentsFilters';
import AppointmentCard from '../Appointments/AppointmentCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import EmptyState from '../Common/EmptyState';
import { Appointment, FilterOptions } from '../Appointments/types';
import { fetchAppointments } from '../../services/appointmentService';

/**
 * Props interface for the AppointmentsList component
 */
interface AppointmentsListProps {
  isOpen: boolean;
}

/**
 * AppointmentsList: Main component for displaying and managing transport appointments
 * Orchestrates the appointments view with filtering and navigation capabilities
 * @param props Component input properties
 */
const AppointmentsList: React.FC<AppointmentsListProps> = ({ isOpen }) => {
  // Navigation hook for programmatic routing
  const navigate = useNavigate();
  
  // State management
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    date: null,
    status: null,
    vehicleType: null,
    searchQuery: '',
  });

  /**
   * Load appointments data from service
   */
  const loadAppointments = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load appointments on component mount
  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  /**
   * Handle navigation to new appointment creation screen
   */
  const handleNewAppointment = useCallback((): void => {
    navigate('/appointments/new');
  }, [navigate]);

  /**
   * Update filter options when search query changes
   */
  const handleSearchChange = useCallback((query: string): void => {
    setFilterOptions(prev => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  /**
   * Update filter options when date filter changes
   */
  const handleDateChange = useCallback((date: string | null): void => {
    setFilterOptions(prev => ({
      ...prev,
      date,
    }));
  }, []);

  /**
   * Update filter options when status filter changes
   */
  const handleStatusChange = useCallback((status: string | null): void => {
    setFilterOptions(prev => ({
      ...prev,
      status,
    }));
  }, []);

  /**
   * Update filter options when vehicle type filter changes
   */
  const handleVehicleTypeChange = useCallback((vehicleType: string | null): void => {
    setFilterOptions(prev => ({
      ...prev,
      vehicleType,
    }));
  }, []);

  /**
   * Filter appointments based on current filter options
   */
  const filteredAppointments = appointments.filter((appointment) => {
    // Search query filter
    if (
      filterOptions.searchQuery &&
      !appointment.patientName.toLowerCase().includes(filterOptions.searchQuery.toLowerCase()) &&
      !appointment.pickupAddress.toLowerCase().includes(filterOptions.searchQuery.toLowerCase()) &&
      !appointment.destinationAddress.toLowerCase().includes(filterOptions.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Date filter
    if (
      filterOptions.date &&
      appointment.pickupDate !== filterOptions.date
    ) {
      return false;
    }

    // Status filter
    if (
      filterOptions.status &&
      appointment.status !== filterOptions.status
    ) {
      return false;
    }

    // Vehicle type filter
    if (
      filterOptions.vehicleType &&
      appointment.vehicleType !== filterOptions.vehicleType
    ) {
      return false;
    }

    return true;
  });

  /**
   * Handle view details for an appointment
   */
  const handleViewDetails = useCallback((appointmentId: string): void => {
    navigate(`/appointments/${appointmentId}`);
  }, [navigate]);

  /**
   * Handle editing an appointment
   */
  const handleEditAppointment = useCallback((appointmentId: string): void => {
    navigate(`/appointments/${appointmentId}/edit`);
  }, [navigate]);

  return (
    <div className={`transition-all duration-300 bg-gray-100 min-h-screen p-4 ${isOpen ? "ml-64" : "ml-16"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header with title and new appointment button */}
        <AppointmentsHeader onNewAppointment={handleNewAppointment} />
        
        {/* Filters section */}
        <AppointmentsFilters 
          filterOptions={filterOptions}
          onSearchChange={handleSearchChange}
          onDateChange={handleDateChange}
          onStatusChange={handleStatusChange}
          onVehicleTypeChange={handleVehicleTypeChange}
        />

        {/* Appointments list with loading and empty states */}
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredAppointments.length === 0 ? (
          <EmptyState message="Aucun rendez-vous trouvé" />
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard 
                key={appointment.id}
                appointment={appointment}
                onViewDetails={handleViewDetails}
                onEdit={handleEditAppointment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;