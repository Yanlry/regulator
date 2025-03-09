/**
 * Appointment status types
 */
export type AppointmentStatus = 'confirmed' | 'pending' | 'in-progress' | 'completed' | 'cancelled';

/**
 * Urgency level types
 */
export type UrgencyLevel = 'critical' | 'high' | 'normal' | 'low';

/**
 * Vehicle type options
 */
export type VehicleType = 'ambulance' | 'vsl' | 'taxi';

/**
 * Patient mobility status
 */
export type MobilityStatus = 'walking' | 'wheelchair' | 'stretcher' | 'other';

/**
 * Patient information interface
 */
export interface Patient {
  id: string;
  name: string;
  phone: string;
  insuranceNumber: string;
  mobility: MobilityStatus;
}

/**
 * Pickup location information
 */
export interface PickupInfo {
  address: string;
  date: string;
  time: string;
  notes: string;
}

/**
 * Destination information
 */
export interface DestinationInfo {
  address: string;
  notes: string;
  service: string;
  room: string;
  contactPerson: string;
  contactPhone: string;
}

/**
 * Complete appointment interface with all detail fields
 */
export interface DetailedAppointment {
  id?: string;
  vehicleType: VehicleType;
  patient: Patient;
  pickup: PickupInfo;
  destination: DestinationInfo;
  returnTrip: boolean;
  returnTime: string;
  urgencyLevel: UrgencyLevel;
  transportFormStatus: 'pending' | 'ready' | 'complete';
  requiredEquipment: string[];
  additionalNotes: string;
  status?: AppointmentStatus;
}

/**
 * Simplified appointment interface for list display
 */
export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  vehicleType: VehicleType;
  pickupAddress: string;
  pickupDate: string;
  pickupTime: string;
  destinationAddress: string;
  destinationService?: string;
  destinationRoom?: string;
  status: AppointmentStatus;
  urgencyLevel: UrgencyLevel;
}

/**
 * Filter options for appointments list
 */
export interface FilterOptions {
  date: string | null;
  status: string | null;
  vehicleType: string | null;
  searchQuery: string;
}