import Notifications from "../components/Notifications";
import TransportVolume from "../components/TransportVolume";

import AmbulanceTracking from "../components/AmbulanceTracking";
import StatCards from "../components/StatCards";
import Header from "../components/Header";
import ReturnsList from "../components/ReturnsList";
import TransportTable from "../components/TransportTable";
import InterventionSummary from "../components/InterventionSummary";
import ProximityTransport from "../components/ProximityTransport";

interface DashboardProps {
  isOpen: boolean;
}

const Dashboard = ({ isOpen }: DashboardProps) => {
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
      location: "Centre d'imagerie médicale, Lyon",
      status: "Retour prévu à 14h00",
      badgeColor: "bg-orange-100 text-orange-800",
    },
    {
      name: "Robert Leroy",
      location: "Hôpital Central - Service neurologie, Marseille",
      status: "Retour prévu à 14h30",
      badgeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Émilie Fournier",
      location: "Clinique St. Michel - Consultation, Bordeaux",
      status: "Retour prévu à 15h15",
      badgeColor: "bg-blue-100 text-blue-800",
    },
  ];

  const transports = [
    {
      id: "1",
      ambulance: "AMB-101",
      equipe: "Martin D. / Sophie L.",
      lieuActuel: "Hôpital Central, Paris",
      destination: "Clinique St. Michel, Paris",
      rdv: "10:30",
      status: "En route",
      statusColor: "bg-blue-100 text-blue-800",
      distance: "2 km",
      heurePrevue: "10:30",
      patient: {
        nom: "Durand",
        prenom: "Paul",
        adresse: "5 Rue Lafayette, Paris",
        telephone: "06 12 34 56 78",
        heureDomicile: "10:00",
        heureHopital: "10:30",
      },
    },
    {
      id: "2",
      ambulance: "AMB-203",
      equipe: "Thomas B. / Julie R.",
      lieuActuel: "23 Rue du Commerce, Lyon",
      destination: "Hôpital Central, Lyon",
      rdv: "10:45",
      status: "Urgence",
      statusColor: "bg-red-100 text-red-800",
      distance: "1.5 km",
      heurePrevue: "10:45",
      patient: {
        nom: "Lemoine",
        prenom: "Sophie",
        adresse: "8 Avenue des Alpes, Lyon",
        telephone: "06 98 76 54 32",
        heureDomicile: "10:20",
        heureHopital: "10:45",
      },
    },
    {
      id: "3",
      ambulance: "AMB-156",
      equipe: "Pierre M. / Emma T.",
      lieuActuel: "Clinique St. Michel, Marseille",
      destination: "Centre de Rééducation, Marseille",
      rdv: "11:15",
      status: "Terminé",
      statusColor: "bg-green-100 text-green-800",
      distance: "3 km",
      heurePrevue: "11:15",
      patient: {
        nom: "Moreau",
        prenom: "Jean",
        adresse: "14 Rue de la République, Marseille",
        telephone: "07 45 67 89 01",
        heureDomicile: "10:50",
        heureHopital: "11:15",
      },
    },
    {
      id: "4",
      ambulance: "AMB-118",
      equipe: "Lucas V. / Marie D.",
      lieuActuel: "Base centrale, Lille",
      destination: "45 Avenue des Lilas, Lille",
      rdv: "11:30",
      status: "En attente",
      statusColor: "bg-yellow-100 text-yellow-800",
      distance: "1 km",
      heurePrevue: "11:30",
      patient: {
        nom: "Dubois",
        prenom: "Claire",
        adresse: "2 Rue Victor Hugo, Lille",
        telephone: "06 34 78 12 90",
        heureDomicile: "11:00",
        heureHopital: "11:30",
      },
    },
  ];

  const ambulanceStats = [
    { label: "Libre", count: 4, color: "bg-green-500" },
    { label: "Bientôt disponible", count: 5, color: "bg-blue-500" },
    { label: "Occupé", count: 3, color: "bg-red-500" },
    { label: "En pause", count: 2, color: "bg-gray-400" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 p-6 overflow-y-auto h-screen w-full ${
          isOpen ? "ml-64" : "ml-16"
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
          <TransportTable transports={transports} />
          <AmbulanceTracking stats={ambulanceStats} activities={[]} />
          <InterventionSummary />
          <TransportVolume />
          <ProximityTransport transports={transports} />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
