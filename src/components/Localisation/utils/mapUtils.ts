export const defaultCenter: [number, number] = [50.62925, 3.057256];

export const defaultZoom: number = 9;

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

export const calculateAutonomyRadius = (
  carburant: number,
  baseDistance: number = 100
): number => {
  return (carburant / 100) * baseDistance;
};