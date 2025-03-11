import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import AppointmentsHeader from "./AppointmentsHeader";
import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentCard from "./AppointmentCard";
import LoadingSpinner from "../../common/LoadingSpinner";
import EmptyState from "../../common/EmptyState";
import { Appointment, FilterOptions } from "./types";
import { fetchAppointments } from "../../services/appointmentService";

interface AppointmentsProps {
  isOpen: boolean;
}

const Appointments: React.FC<AppointmentsProps> = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    date: null,
    status: null,
    vehicleType: null,
    searchQuery: "",
  });

  const loadAppointments = useCallback(async (): Promise<void> => {
    try {
      if (!isInitialLoading) {
        setIsLoading(true);
      }
      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, [isInitialLoading]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleNewAppointment = useCallback((): void => {
    navigate("/appointments/new");
  }, [navigate]);

  const handleSearchChange = useCallback((query: string): void => {
    setFilterOptions((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const handleDateChange = useCallback((date: string | null): void => {
    setFilterOptions((prev) => ({
      ...prev,
      date,
    }));
  }, []);

  const handleStatusChange = useCallback((status: string | null): void => {
    setFilterOptions((prev) => ({
      ...prev,
      status,
    }));
  }, []);

  const handleVehicleTypeChange = useCallback(
    (vehicleType: string | null): void => {
      setFilterOptions((prev) => ({
        ...prev,
        vehicleType,
      }));
    },
    []
  );

  const filteredAppointments = appointments.filter((appointment) => {
    if (
      filterOptions.searchQuery &&
      !appointment.patientName
        .toLowerCase()
        .includes(filterOptions.searchQuery.toLowerCase()) &&
      !appointment.pickupAddress
        .toLowerCase()
        .includes(filterOptions.searchQuery.toLowerCase()) &&
      !appointment.destinationAddress
        .toLowerCase()
        .includes(filterOptions.searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (filterOptions.date && appointment.pickupDate !== filterOptions.date) {
      return false;
    }

    if (filterOptions.status && appointment.status !== filterOptions.status) {
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

  const handleViewDetails = useCallback(
    (appointmentId: string): void => {
      navigate(`/appointments/${appointmentId}`);
    },
    [navigate]
  );

  const handleEditAppointment = useCallback(
    (appointmentId: string): void => {
      navigate(`/appointments/${appointmentId}/edit`);
    },
    [navigate]
  );

  // Dynamic container classes based on theme
  const containerClasses = `
    transition-all duration-300 
    min-h-screen p-4
    ${theme === 'dark' 
      ? 'bg-gray-900 text-gray-100' 
      : 'bg-gray-100 text-gray-900'}
  `;

  const spinnerContainerClasses = `
    flex items-center justify-center 
    ${theme === 'dark' 
      ? 'bg-gray-900' 
      : 'bg-gray-100'}
    min-h-screen
  `;

  if (isInitialLoading) {
    return (
      <div className={spinnerContainerClasses}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="max-w-7xl mx-auto">
        <AppointmentsHeader onNewAppointment={handleNewAppointment} />

        <AppointmentsFilters
          filterOptions={filterOptions}
          onSearchChange={handleSearchChange}
          onDateChange={handleDateChange}
          onStatusChange={handleStatusChange}
          onVehicleTypeChange={handleVehicleTypeChange}
          theme={theme}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : filteredAppointments.length === 0 ? (
          <EmptyState 
            message="Aucun rendez-vous trouvé" 
            theme={theme} 
          />
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onViewDetails={handleViewDetails}
                onEdit={handleEditAppointment}
                theme={theme}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;