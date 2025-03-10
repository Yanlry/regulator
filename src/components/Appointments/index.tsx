import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentsHeader from './AppointmentsHeader';
import AppointmentsFilters from './AppointmentsFilters';
import AppointmentCard from './AppointmentCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import EmptyState from '../Common/EmptyState';
import { Appointment, FilterOptions } from './types';
import { fetchAppointments } from '../../services/appointmentService';
 
interface AppointmentsProps {
  isOpen: boolean;
}
 
const Appointments: React.FC<AppointmentsProps> = ({ isOpen }) => { 
  const navigate = useNavigate();
   
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    date: null,
    status: null,
    vehicleType: null,
    searchQuery: '',
  });
 
  const loadAppointments = useCallback(async (): Promise<void> => {
    try {
      if (!isInitialLoading) {
        setIsLoading(true);
      }
      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, [isInitialLoading]);
 
  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);
 
  const handleNewAppointment = useCallback((): void => {
    navigate('/appointments/new');
  }, [navigate]);
 
  const handleSearchChange = useCallback((query: string): void => {
    setFilterOptions(prev => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);
 
  const handleDateChange = useCallback((date: string | null): void => {
    setFilterOptions(prev => ({
      ...prev,
      date,
    }));
  }, []);
 
  const handleStatusChange = useCallback((status: string | null): void => {
    setFilterOptions(prev => ({
      ...prev,
      status,
    }));
  }, []);
 
  const handleVehicleTypeChange = useCallback((vehicleType: string | null): void => {
    setFilterOptions(prev => ({
      ...prev,
      vehicleType,
    }));
  }, []);
 
  const filteredAppointments = appointments.filter((appointment) => { 
    if (
      filterOptions.searchQuery &&
      !appointment.patientName.toLowerCase().includes(filterOptions.searchQuery.toLowerCase()) &&
      !appointment.pickupAddress.toLowerCase().includes(filterOptions.searchQuery.toLowerCase()) &&
      !appointment.destinationAddress.toLowerCase().includes(filterOptions.searchQuery.toLowerCase())
    ) {
      return false;
    }
 
    if (
      filterOptions.date &&
      appointment.pickupDate !== filterOptions.date
    ) {
      return false;
    }
  
    if (
      filterOptions.status &&
      appointment.status !== filterOptions.status
    ) {
      return false;
    }
 
    if (
      filterOptions.vehicleType &&
      appointment.vehicleType !== filterOptions.vehicleType
    ) {
      return false;
    }

    return true;
  });
 
  const handleViewDetails = useCallback((appointmentId: string): void => {
    navigate(`/appointments/${appointmentId}`);
  }, [navigate]);
 
  const handleEditAppointment = useCallback((appointmentId: string): void => {
    navigate(`/appointments/${appointmentId}/edit`);
  }, [navigate]);
 
  if (isInitialLoading) {
    return (
      <div className={`transition-all duration-300 bg-gray-100 min-h-screen ${isOpen ? "ml-64" : "ml-16"}`}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 bg-gray-100 min-h-screen p-4 ${isOpen ? "ml-64" : "ml-16"}`}>
      <div className="max-w-7xl mx-auto"> 
        <AppointmentsHeader onNewAppointment={handleNewAppointment} />
         
        <AppointmentsFilters 
          filterOptions={filterOptions}
          onSearchChange={handleSearchChange}
          onDateChange={handleDateChange}
          onStatusChange={handleStatusChange}
          onVehicleTypeChange={handleVehicleTypeChange}
        />
 
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

export default Appointments;