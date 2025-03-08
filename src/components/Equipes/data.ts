import { Ambulancier, Ambulance } from './types';
 
export interface Equipe {
  id: number;
  nom: string;
  ambulancierId1: number;
  ambulancierId2?: number;
  ambulanceId: number;
  secteur: string;
  enMission: boolean;
  pauseRepasPrise: boolean;
  heureDebutService: string;
  heureFinService: string;
  coordonnees: string;
}
 
export const ambulanciersData: Ambulancier[] = [
  { id: 1, nom: "Dubois", prenom: "Pierre", telephone: "06 12 34 56 78", qualification: "DEA", disponible: true, enService: true },
  { id: 2, nom: "Martin", prenom: "Sophie", telephone: "06 23 45 67 89", qualification: "Auxiliaire", disponible: true, enService: true },
  { id: 3, nom: "Leroy", prenom: "Thomas", telephone: "06 34 56 78 90", qualification: "DEA", disponible: true, enService: false },
  { id: 4, nom: "Richard", prenom: "Emma", telephone: "06 45 67 89 01", qualification: "Auxiliaire", disponible: false, enService: false },
  { id: 5, nom: "Petit", prenom: "Lucas", telephone: "06 56 78 90 12", qualification: "DEA", disponible: true, enService: true },
  { id: 6, nom: "Moreau", prenom: "Julie", telephone: "06 67 89 01 23", qualification: "DEA", disponible: true, enService: true },
];
 
export const ambulancesData: Ambulance[] = [
  { id: 1, immatriculation: "AB-123-CD", type: "ASSU", statut: "En service", kilometrage: 45678, equipements: ["Défibrillateur", "Oxygène", "Aspirateur"], derniereMaintenance: "2025-02-15" },
  { id: 2, immatriculation: "EF-456-GH", type: "VSL", statut: "En service", kilometrage: 23456, equipements: ["Oxygène"], derniereMaintenance: "2025-02-20" },
  { id: 3, immatriculation: "IJ-789-KL", type: "ASSU", statut: "En maintenance", kilometrage: 78901, equipements: ["Défibrillateur", "Oxygène", "Aspirateur"], derniereMaintenance: "2025-03-01" },
  { id: 4, immatriculation: "MN-012-OP", type: "ASSU", statut: "Disponible", kilometrage: 12345, equipements: ["Défibrillateur", "Oxygène", "Aspirateur", "Moniteur"], derniereMaintenance: "2025-02-28" },
  { id: 5, immatriculation: "QR-345-ST", type: "ASSU", statut: "En service", kilometrage: 34567, equipements: ["Défibrillateur", "Oxygène", "Aspirateur"], derniereMaintenance: "2025-03-05" },
  { id: 6, immatriculation: "UV-678-WX", type: "VSL", statut: "En service", kilometrage: 12345, equipements: ["Oxygène"], derniereMaintenance: "2025-03-02" },
  { id: 7, immatriculation: "YZ-901-AB", type: "VSL", statut: "Disponible", kilometrage: 8765, equipements: ["Oxygène"], derniereMaintenance: "2025-03-04" },
  { id: 8, immatriculation: "CD-234-EF", type: "VSL", statut: "En service", kilometrage: 21098, equipements: ["Oxygène"], derniereMaintenance: "2025-02-25" },
  { id: 9, immatriculation: "GH-567-IJ", type: "VSL", statut: "Disponible", kilometrage: 15432, equipements: ["Oxygène"], derniereMaintenance: "2025-03-06" },
];
 
export const equipesData: Equipe[] = [ 
  { 
    id: 1, 
    nom: "AMBULANCE", 
    ambulancierId1: 1, 
    ambulancierId2: 2, 
    ambulanceId: 1, 
    secteur: "Nord", 
    enMission: true, 
    pauseRepasPrise: true, 
    heureDebutService: "07:00", 
    heureFinService: "19:00", 
    coordonnees: "48.8566,2.3522" 
  },
  { 
    id: 2, 
    nom: "AMBULANCE", 
    ambulancierId1: 5, 
    ambulancierId2: 6, 
    ambulanceId: 2, 
    secteur: "Sud", 
    enMission: false, 
    pauseRepasPrise: false, 
    heureDebutService: "07:00", 
    heureFinService: "19:00", 
    coordonnees: "48.8567,2.3523" 
  },
  { 
    id: 3, 
    nom: "AMBULANCE", 
    ambulancierId1: 3, 
    ambulancierId2: 4, 
    ambulanceId: 3, 
    secteur: "Est", 
    enMission: true, 
    pauseRepasPrise: false, 
    heureDebutService: "08:00", 
    heureFinService: "20:00", 
    coordonnees: "48.8568,2.3524" 
  },
  { 
    id: 4, 
    nom: "AMBULANCE", 
    ambulancierId1: 1, 
    ambulancierId2: 6, 
    ambulanceId: 4, 
    secteur: "Ouest", 
    enMission: false, 
    pauseRepasPrise: true, 
    heureDebutService: "08:00", 
    heureFinService: "20:00", 
    coordonnees: "48.8569,2.3525" 
  },
  { 
    id: 5, 
    nom: "AMBULANCE", 
    ambulancierId1: 2, 
    ambulancierId2: 5, 
    ambulanceId: 5, 
    secteur: "Centre", 
    enMission: true, 
    pauseRepasPrise: false, 
    heureDebutService: "07:00", 
    heureFinService: "19:00", 
    coordonnees: "48.8570,2.3526" 
  },
  
  // VSL 
  { 
    id: 6, 
    nom: "VSL", 
    ambulancierId1: 3, 
    ambulanceId: 6, 
    secteur: "Nord-Est", 
    enMission: true, 
    pauseRepasPrise: false, 
    heureDebutService: "07:30", 
    heureFinService: "19:30", 
    coordonnees: "48.8571,2.3527" 
  },
  { 
    id: 7, 
    nom: "VSL", 
    ambulancierId1: 4, 
    ambulanceId: 7, 
    secteur: "Nord-Ouest", 
    enMission: false, 
    pauseRepasPrise: true, 
    heureDebutService: "07:30", 
    heureFinService: "19:30", 
    coordonnees: "48.8572,2.3528" 
  },
  { 
    id: 8, 
    nom: "VSL", 
    ambulancierId1: 5, 
    ambulanceId: 8, 
    secteur: "Sud-Est", 
    enMission: true, 
    pauseRepasPrise: true, 
    heureDebutService: "08:30", 
    heureFinService: "20:30", 
    coordonnees: "48.8573,2.3529" 
  },
  { 
    id: 9, 
    nom: "VSL", 
    ambulancierId1: 6, 
    ambulanceId: 9, 
    secteur: "Sud-Ouest", 
    enMission: false, 
    pauseRepasPrise: false, 
    heureDebutService: "08:30", 
    heureFinService: "20:30", 
    coordonnees: "48.8574,2.3530" 
  }
];

export const getAmbulancierById = (id: number) => ambulanciersData.find(a => a.id === id);
export const getAmbulanceById = (id: number) => ambulancesData.find(a => a.id === id);