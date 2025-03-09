import { Ambulance, FilterOptions } from "../data/types";

export const filterAmbulances = (
  ambulances: Ambulance[],
  filters: FilterOptions
): Ambulance[] => {
  return ambulances.filter((ambulance) => {
    if (ambulance.type === "Ambulance" && !filters.ambulance) return false;
    if (ambulance.type === "VSL" && !filters.vsl) return false;
    
    // Filtre par statut
    if (ambulance.status === "libre" && !filters.libre) return false;
    if (ambulance.status === "occupe" && !filters.occupe) return false;
    if (ambulance.status === "pause" && !filters.pause) return false;
    
    return true;
  });
};

export const searchAmbulances = (
  ambulances: Ambulance[],
  searchText: string
): Ambulance[] => {
  if (!searchText || searchText.trim() === "") {
    return ambulances;
  }
  
  const query = searchText.toLowerCase().trim();
  
  return ambulances.filter((ambulance) => {
    return (
      ambulance.id.toLowerCase().includes(query) ||
      ambulance.equipe.toLowerCase().includes(query) ||
      ambulance.localisation.toLowerCase().includes(query) ||
      (ambulance.destination && ambulance.destination.toLowerCase().includes(query))
    );
  });
};