export type AppointmentStatus = 'confirmed' | 'pending' | 'in-progress' | 'completed' | 'cancelled';

export type UrgencyLevel = 'critical' | 'high' | 'normal' | 'low';

export type VehicleType = 'ambulance' | 'vsl' | 'taxi';

export type MobilityStatus = 'walking' | 'wheelchair' | 'stretcher' | 'other';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  insuranceNumber: string;
  mobility: MobilityStatus;
}

export interface PickupInfo {
  address: string;
  date: string;
  time: string;
  notes: string;
}

export interface DestinationInfo {
  address: string;
  notes: string;
  service: string;
  room: string;
  contactPerson: string;
  contactPhone: string;
}

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

export interface FilterOptions {
  date: string | null;
  status: string | null;
  vehicleType: string | null;
  searchQuery: string;
}