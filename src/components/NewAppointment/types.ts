export interface Patient {
  id: string;
  name: string;
  phone: string;
  insuranceNumber: string;
  mobility: 'walking' | 'wheelchair' | 'stretcher' | 'assisted';
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
  service?: string;
  room?: string;
  contactPerson?: string;
  contactPhone?: string;
}

export interface Appointment {
  vehicleType: 'ambulance' | 'vsl';
  patient: Patient;
  pickup: PickupInfo;
  destination: DestinationInfo;
  returnTrip: boolean;
  returnTime: string;
  urgencyLevel: 'normal' | 'medecin' | 'urgence' | 'smur';
  transportFormStatus: 'ready' | 'collect' | 'pending' | 'samu';
  requiredEquipment: string[];
  additionalNotes: string;
  theme: string;
}

export interface NewAppointmentProps {
  isOpen: boolean;  
}

export interface VehicleTypeSelectorProps {
  vehicleType: 'ambulance' | 'vsl';
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  theme: string;
}

export interface PatientInfoProps {
  patient: Patient;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  theme: string;
}

export interface PickupDetailsProps {
  pickup: PickupInfo;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  theme: string;
}

export interface DestinationDetailsProps {
  destination: DestinationInfo;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  theme: string;
}

export interface TransportDetailsProps {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  theme: string;
}

export interface ActionButtonsProps {
  onSubmit: (e: React.FormEvent) => void;
}

export interface HeaderProps {
  title: string;
  description: string;
  theme: string
}