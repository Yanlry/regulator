import Notifications from "./components/Notifications";
import TransportVolume from "./components/TransportVolume";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import AmbulanceTracking from "./components/AmbulanceTracking";
import StatCards from "./components/StatCards";
import Header from "./components/Header";
import ReturnsList from "./components/ReturnsList";
import TransportTable from "./components/TransportTable";
import InterventionSummary from "./components/InterventionSummary";

function App() {

  const [isOpen, setIsOpen] = useState(true);

  const pendingReturns = [
    {
      name: "Martin Dupont",
      location: "Hôpital de Roubaix - Salle d'attente B",
      status: "Attente depuis 45 min",
      badgeColor: "bg-red-100 text-red-800",
    },
    {
      name: "Sophie Laurent",
      location: "Clinique St. Michel - Accueil principal",
      status: "Attente depuis 30 min",
      badgeColor: "bg-orange-100 text-orange-800",
    },
    {
      name: "Jean Moreau",
      location: "Centre de radiologie - Étage 2",
      status: "Attente depuis 20 min",
      badgeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Marie Petit",
      location: "Hôpital Central - Service cardiologie",
      status: "Attente depuis 15 min",
      badgeColor: "bg-blue-100 text-blue-800",
    },
  ];

  const upcomingReturns = [
    {
      name: "Philippe Dubois",
      location: "Clinique Saint-Paul, Roubaix",
      status: "Retour prévu à 13h15",
      badgeColor: "bg-red-100 text-red-800",
    },
    {
      name: "Lucie Mercier",
      location: "Centre d'imagerie médicale",
      status: "Retour prévu à 14h00",
      badgeColor: "bg-orange-100 text-orange-800",
    },
    {
      name: "Robert Leroy",
      location: "Hôpital Central - Service neurologie",
      status: "Retour prévu à 14h30",
      badgeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Émilie Fournier",
      location: "Clinique St. Michel - Consultation",
      status: "Retour prévu à 15h15",
      badgeColor: "bg-blue-100 text-blue-800",
    },
  ];

  const transports = [
    { ambulance: "AMB-101", equipe: "Martin D. / Sophie L.", lieuActuel: "Hôpital Central, Paris", destination: "Clinique St. Michel, Paris", rdv: "10:30", status: "En route", statusColor: "bg-blue-100 text-blue-800" },
    { ambulance: "AMB-203", equipe: "Thomas B. / Julie R.", lieuActuel: "23 Rue du Commerce, Lyon", destination: "Hôpital Central, Lyon", rdv: "10:45", status: "Urgence", statusColor: "bg-red-100 text-red-800" },
    { ambulance: "AMB-156", equipe: "Pierre M. / Emma T.", lieuActuel: "Clinique St. Michel, Marseille", destination: "Centre de Rééducation, Marseille", rdv: "11:15", status: "Terminé", statusColor: "bg-green-100 text-green-800" },
    { ambulance: "AMB-118", equipe: "Lucas V. / Marie D.", lieuActuel: "Base centrale, Lille", destination: "45 Avenue des Lilas, Lille", rdv: "11:30", status: "En attente", statusColor: "bg-yellow-100 text-yellow-800" },
    { ambulance: "AMB-142", equipe: "Antoine F. / Clara M.", lieuActuel: "Hôpital Central, Bordeaux", destination: "12 Rue des Fleurs, Bordeaux", rdv: "12:15", status: "Retour prévu", statusColor: "bg-orange-100 text-orange-800" },
    { ambulance: "AMB-305", equipe: "David P. / Amélie K.", lieuActuel: "Centre Médical Jean Jaurès, Toulouse", destination: "Hôpital Nord, Toulouse", rdv: "13:00", status: "En route", statusColor: "bg-blue-100 text-blue-800" },
    { ambulance: "AMB-220", equipe: "Paul G. / Léa M.", lieuActuel: "Avenue du Général Leclerc, Nantes", destination: "Urgences CHU, Nantes", rdv: "13:30", status: "Urgence", statusColor: "bg-red-100 text-red-800" },
    { ambulance: "AMB-417", equipe: "Hugo T. / Camille R.", lieuActuel: "Hôpital Sud, Rennes", destination: "Maison de retraite Les Pins, Rennes", rdv: "14:00", status: "Terminé", statusColor: "bg-green-100 text-green-800" },
    { ambulance: "AMB-312", equipe: "Emma V. / Nathan S.", lieuActuel: "Station d'ambulances, Strasbourg", destination: "Clinique Pasteur, Strasbourg", rdv: "14:45", status: "En attente", statusColor: "bg-yellow-100 text-yellow-800" },
    { ambulance: "AMB-110", equipe: "Louis C. / Clara N.", lieuActuel: "Hôpital St Joseph, Montpellier", destination: "Domicile - 25 Rue des Fleurs, Montpellier", rdv: "15:15", status: "Retour prévu", statusColor: "bg-orange-100 text-orange-800" },
    { ambulance: "AMB-501", equipe: "Maxime L. / Sarah D.", lieuActuel: "Pôle Santé Ouest, Nice", destination: "Clinique du Parc, Nice", rdv: "15:45", status: "En route", statusColor: "bg-blue-100 text-blue-800" },
    { ambulance: "AMB-204", equipe: "Adrien B. / Sophie T.", lieuActuel: "Centre-ville, Lille", destination: "CHU - Urgences, Lille", rdv: "16:10", status: "Urgence", statusColor: "bg-red-100 text-red-800" },
    { ambulance: "AMB-358", equipe: "Julien M. / Anaïs P.", lieuActuel: "Hôpital Central, Toulouse", destination: "Clinique des Lilas, Toulouse", rdv: "16:50", status: "Terminé", statusColor: "bg-green-100 text-green-800" },
    { ambulance: "AMB-189", equipe: "Mickaël R. / Justine K.", lieuActuel: "Domicile - 12 Place du Marché, Lyon", destination: "Centre Hospitalier Sud, Lyon", rdv: "17:30", status: "En attente", statusColor: "bg-yellow-100 text-yellow-800" },
    { ambulance: "AMB-723", equipe: "Alexis J. / Marion C.", lieuActuel: "Hôpital Universitaire, Bordeaux", destination: "Domicile - 7 Rue Lafayette, Bordeaux", rdv: "18:00", status: "Retour prévu", statusColor: "bg-orange-100 text-orange-800" },
    { ambulance: "AMB-605", equipe: "Victor E. / Charlotte B.", lieuActuel: "Clinique St Jean, Nantes", destination: "Maison de repos, Nantes", rdv: "18:30", status: "En route", statusColor: "bg-blue-100 text-blue-800" },
    { ambulance: "AMB-402", equipe: "Mathieu D. / Elise M.", lieuActuel: "Boulevard Haussmann, Paris", destination: "CHU Nord, Paris", rdv: "19:15", status: "Urgence", statusColor: "bg-red-100 text-red-800" },
    { ambulance: "AMB-299", equipe: "Lucas S. / Zoé G.", lieuActuel: "Clinique Pasteur, Marseille", destination: "EHPAD Les Chênes, Marseille", rdv: "20:00", status: "Terminé", statusColor: "bg-green-100 text-green-800" },
    { ambulance: "AMB-140", equipe: "Théo L. / Maëlle P.", lieuActuel: "Station d'ambulances, Rennes", destination: "Centre Hospitalier Régional, Rennes", rdv: "20:30", status: "En attente", statusColor: "bg-yellow-100 text-yellow-800" },
    { ambulance: "AMB-765", equipe: "Florent B. / Eva T.", lieuActuel: "Hôpital St Vincent, Strasbourg", destination: "Domicile - 8 Rue des Ormes, Strasbourg", rdv: "21:00", status: "Retour prévu", statusColor: "bg-orange-100 text-orange-800" },
    { ambulance: "AMB-908", equipe: "Yannick P. / Margot F.", lieuActuel: "Centre Médical Lafayette, Paris", destination: "Hôpital Général, Paris", rdv: "21:45", status: "En route", statusColor: "bg-blue-100 text-blue-800" },
    { ambulance: "AMB-553", equipe: "Cédric L. / Chloé S.", lieuActuel: "Zone Industrielle, Lille", destination: "CHU Ouest, Lille", rdv: "22:30", status: "Urgence", statusColor: "bg-red-100 text-red-800" },
    { ambulance: "AMB-230", equipe: "Romain G. / Amandine J.", lieuActuel: "Hôpital St Paul, Nice", destination: "Résidence Les Marronniers, Nice", rdv: "23:00", status: "Terminé", statusColor: "bg-green-100 text-green-800" },
    { ambulance: "AMB-462", equipe: "Kevin B. / Manon R.", lieuActuel: "Domicile - 3 Avenue de la République, Bordeaux", destination: "Clinique Les Peupliers, Bordeaux", rdv: "23:30", status: "En attente", statusColor: "bg-yellow-100 text-yellow-800" },
  ];

  const ambulanceStats = [
    { label: "Disponible", count: 4, color: "bg-green-500" },
    { label: "En intervention", count: 5, color: "bg-blue-500" },
    { label: "Urgence", count: 3, color: "bg-red-500" },
    { label: "En pause", count: 2, color: "bg-gray-400" },
  ];

  const ambulanceActivities = [
    {
      ambulance: "AMB-101",
      equipe: "Martin D. / Sophie L.",
      status: "En route",
      location: "Hôpital Central",
      destination: "Clinique St. Michel",
      heure: "10:30",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      ambulance: "AMB-203",
      equipe: "Thomas B. / Julie R.",
      status: "Urgence",
      location: "23 Rue du Commerce",
      destination: "Hôpital Central",
      heure: "10:45",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      ambulance: "AMB-156",
      equipe: "Pierre M. / Emma T.",
      status: "Terminé",
      location: "Clinique St. Michel",
      destination: "Centre de Rééducation",
      heure: "11:15",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      ambulance: "AMB-118",
      equipe: "Lucas V. / Marie D.",
      status: "En attente",
      location: "Base centrale",
      destination: "45 Avenue des Lilas",
      heure: "11:30",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      ambulance: "AMB-142",
      equipe: "Antoine F. / Clara M.",
      status: "Retour prévu",
      location: "Hôpital Central",
      destination: "12 Rue des Fleurs",
      heure: "12:15",
      statusColor: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 p-6 ${
          isOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <StatCards />

        {/* Cartes détaillées pour les retours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ReturnsList
            title="Retours en attente"
            count={pendingReturns.length}
            description="Patients en attente"
            iconColor="text-red-600"
            bgColor="bg-red-100"
            patients={pendingReturns}
          />

          <ReturnsList
            title="Retours à prévoir"
            count={upcomingReturns.length}
            description="Retours programmés dans les 3h"
            iconColor="text-orange-600"
            bgColor="bg-orange-100"
            patients={upcomingReturns}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tableau des transports */}
          <TransportTable transports={transports} />

          {/* Suivi des ambulances en temps réel */}
          <AmbulanceTracking stats={ambulanceStats} activities={ambulanceActivities} />

          {/* Volume de transports */}
          <TransportVolume />

          {/* Notifications et alertes */}
          <Notifications />

          {/* Résumé des interventions */}
          <InterventionSummary />
        </div>
      </div>
    </div>
  );
}

export default App;
