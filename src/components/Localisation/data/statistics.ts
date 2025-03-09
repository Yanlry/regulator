import { Ambulance, Stats } from "./types";

export const calculerStatistiques = (ambulances: Ambulance[]): Stats => {
  const vehiculesLibres = ambulances.filter((a) => a.status === "libre").length;
  const vehiculesOccupes = ambulances.filter(
    (a) => a.status === "occupe"
  ).length;
  const vehiculesEnPause = ambulances.filter(
    (a) => a.status === "pause"
  ).length;
  const ambulancesCount = ambulances.filter(
    (a) => a.type === "Ambulance"
  ).length;
  const vslCount = ambulances.filter((a) => a.type === "VSL").length;
  const vehiculesAvecMaintenance = ambulances.filter(
    (a) => a.maintenance !== "À jour"
  ).length;

  return {
    vehiculesLibres,
    vehiculesOccupes,
    vehiculesEnPause,
    ambulancesCount,
    vslCount,
    vehiculesAvecMaintenance,
    tauxDisponibilite: Math.round((vehiculesLibres / ambulances.length) * 100),
    tauxOccupation: Math.round((vehiculesOccupes / ambulances.length) * 100),
  };
};