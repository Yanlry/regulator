export interface DashboardProps {
  isOpen: boolean;
}

export interface Patient {
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  heureDomicile: string;
  heureHopital: string;
}

interface Transport {
  id: string;
  ambulance: string;
  equipe: string;
  lieuActuel: string;
  destination: string;
  rdv: string;
  status: string;
  statusColor: string;
  distance: string;
  heurePrevue: string;
  patient: {
    nom: string;
    prenom: string;
    adresse: string;
    telephone: string;
    heureDomicile: string;
    heureHopital: string;
    informationsSpeciales?: string;
    mobilite?: string;
  };
  priorite?: string;
  tempsEstime?: string;
  type?: string;
}

export interface Return {
  name: string;
  location: string;
  status: string;
  badgeColor: string;
}

export interface AmbulanceStats {
  label: string;
  count: number;
  color: string;
}

export interface Activity {
  id: string;
  timestamp: string;
  description: string;
  ambulanceId: string;
  type:
    | "pickup"
    | "dropoff"
    | "departure"
    | "arrival"
    | "maintenance"
    | "other";
  location?: string;
  status?: string;
  patientName?: string;
}

export interface ReturnsListProps {
  title: string;
  count: number;
  description: string;
  iconColor: string;
  bgColor: string;
  patients: Return[];
}

export interface TransportTableProps {
  transports: Transport[];
}

export interface AmbulanceTrackingProps {
  stats: AmbulanceStats[];
  activities: Activity[];
}

export interface ProximityTransportProps {
  transports: Transport[];
}
