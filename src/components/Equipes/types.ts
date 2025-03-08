type Ambulancier = {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  qualification: string;
  disponible: boolean;
  enService: boolean;
};

type Ambulance = {
  id: number;
  immatriculation: string;
  type: string; 
  statut: string; 
  kilometrage: number;
  equipements: string[];
  derniereMaintenance: string;
};

export type { Ambulancier, Ambulance };
