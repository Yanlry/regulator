export interface Ambulance {
    id: string;
    type: string;
    modele: string;
    immatriculation: string;
    status: string;
    localisation: string;
    maintenanceStatus: string;
    dateDernierEntretien: string;
    prochainEntretien: string;
    kilometrage: number;
    prochaineRevision: string;
    carburant: string;
    notes: string;
    ct: string;
    disponibilite: string;
    pneus: string;
    freins: string;
    derniereVidange: string;
    courroieDistribution: string;
  }
  
  export interface AmbulancesProps {
    isOpen: boolean;
  }
  
  export interface Stats {
    operationalRate: number;
    maintenanceUpToDate: number;
    maintenanceNeeded: number;
    underRepair: number;
    inService: number;
    outOfService: number;
    totalVehicles?: number;
    maintenanceRate?: number;
  }
  
  export interface Materiel {
    id: number;
    nom: string;
    datePeremption: string;
  }
  