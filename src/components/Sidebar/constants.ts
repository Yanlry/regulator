import {
    Home,
    Calendar,
    Users,
    MapPin,
    Bell,
    PlusCircle,
    List,
    Truck,
    UserCheck,
    Briefcase,
    BarChart,
    Command,
  } from "lucide-react";
  import { NavigationSection } from "./types";
  
  /**
   * Structure de navigation de l'application
   */
  export const navigationSections: NavigationSection[] = [
    {
      title: "Gestion de la régulation",
      items: [
        { icon: Home, label: "Tableau de bord", path: "/" },
        { icon: Command, label: "Régulation", path: "/regulation" },
        { icon: PlusCircle, label: "Rendez-vous", path: "/appointments" },
        { icon: Users, label: "Équipes", path: "/equipes" },
        { icon: MapPin, label: "Localisation", path: "/localisation" },
      ],
    },
    {
      title: "Gestion des Véhicules",
      items: [{ icon: Truck, label: "Ambulances", path: "/ambulances" }],
    },
    {
      title: "Gestion des Patients",
      items: [
        { icon: List, label: "Liste des patients", path: "/liste-patients" },
      ],
    },
    {
      title: "Gestion des Salariés",
      items: [
        { icon: Calendar, label: "Planning", path: "/planning" },
        { icon: UserCheck, label: "Gestion RH", path: "/rh" },
        { icon: Briefcase, label: "Recrutement", path: "/recrutement" },
      ],
    },
    {
      title: "Outils et Analyse",
      items: [
        { icon: BarChart, label: "Statistiques", path: "/statistiques" },
        { icon: Bell, label: "Notifications", path: "/notifications" },
      ],
    },
  ];