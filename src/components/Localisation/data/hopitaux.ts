import { Hopital } from "./types";

export const hopitaux: Hopital[] = [
  {
    id: "hop-1",
    nom: "Centre Hospitalier Universitaire de Lille",
    lat: 50.614,
    lng: 3.034,
    adresse: "2 Avenue Oscar Lambret, 59000 Lille",
    tel: "03 20 44 59 62",
    niveau: "Niveau 1 - Service complet",
    disponibilite: "Haute",
    occupation: 65,
  },
  {
    id: "hop-2",
    nom: "Hôpital Roger Salengro",
    lat: 50.6078,
    lng: 3.0349,
    adresse: "Rue Émile Laine, 59037 Lille",
    tel: "03 20 44 59 62",
    niveau: "Niveau 1 - Service complet",
    disponibilite: "Moyenne",
    occupation: 78,
  },
  {
    id: "hop-3",
    nom: "Centre Hospitalier de Roubaix",
    lat: 50.6912,
    lng: 3.1736,
    adresse: "11 Boulevard Lacordaire, 59100 Roubaix",
    tel: "03 20 99 31 31",
    niveau: "Niveau 2 - Service standard",
    disponibilite: "Basse",
    occupation: 92,
  },
  {
    id: "hop-4",
    nom: "Centre Hospitalier de Tourcoing",
    lat: 50.7235,
    lng: 3.1469,
    adresse: "135 Rue du Président Coty, 59200 Tourcoing",
    tel: "03 20 69 49 49",
    niveau: "Niveau 2 - Service standard",
    disponibilite: "Haute",
    occupation: 45,
  },
];