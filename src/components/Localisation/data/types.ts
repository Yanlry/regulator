import { Icon } from "leaflet";

export interface Ambulance {
  id: string;
  equipe: string;
  lat: number;
  lng: number;
  status: "libre" | "occupe" | "pause";
  localisation: string;
  destination: string | null;
  heureDepart: string;
  heureArrivee: string;
  type: "Ambulance" | "VSL";
  equipement: string;
  carburant: number;
  kilometrage: number;
  maintenance: string;
  tempsDeService: string;
  dernierArret: string;
  prochaineIntervention: string | null;
  distanceParcouru: number;
  tempsDisponible: string;
  urgence?: boolean;
}

export interface Hopital {
  id: string;
  nom: string;
  lat: number;
  lng: number;
  adresse: string;
  tel: string;
  niveau: string;
  disponibilite: "Haute" | "Moyenne" | "Basse";
  occupation: number;
}

export interface FilterOptions {
  libre: boolean;
  occupe: boolean;
  pause: boolean;
  ambulance: boolean;
  vsl: boolean;
  showHopitaux: boolean;
}

export interface Stats {
  vehiculesLibres: number;
  vehiculesOccupes: number;
  vehiculesEnPause: number;
  ambulancesCount: number;
  vslCount: number;
  vehiculesAvecMaintenance: number;
  tauxDisponibilite: number;
  tauxOccupation: number;
}

export interface IconOptions {
  [key: string]: Icon;
}

export interface FilterBarProps {
  activeFilters: FilterOptions;
  toggleFilter: (filter: string) => void;
  stats: Stats;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
}

export interface MapComponentProps {
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  activeFilters: FilterOptions;
  filteredAmbulances: Ambulance[];
  handleAmbulanceClick: (id: string) => void;
}

export interface DetailPanelProps {
  selectedAmbulance: Ambulance | null | undefined;
  stats: Stats;
}

export interface AmbulanceMarkerProps {
  ambulance: Ambulance;
  handleAmbulanceClick: (id: string) => void;
}

export interface HopitalMarkerProps {
  hopital: Hopital;
}

export interface ControlButtonProps {
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AmbulanceDetailProps {
  ambulance: Ambulance;
}

export interface StatCardProps {
  title: string;
  value: number;
  color: string;
  label: string;
}

export interface ActionButtonsProps {
  onContact?: () => void;
  onAssign?: () => void;
}