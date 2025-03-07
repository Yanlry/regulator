import { AlertTriangle, Bell, CheckCircle, Clock, Timer } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "Urgence",
    icon: <AlertTriangle size={20} className="text-red-600" />,
    bgColor: "bg-red-50",
    borderColor: "bg-red-100",
    title: "Urgence signalée",
    message: "Accident de la route sur A7, km 45. AMB-203 dépêchée sur place.",
    time: "Il y a 12 minutes",
    textColor: "text-red-700",
  },
  {
    id: 2,
    type: "Retard",
    icon: <Clock size={20} className="text-yellow-600" />,
    bgColor: "bg-yellow-50",
    borderColor: "bg-yellow-100",
    title: "Retard signalé",
    message: "AMB-101 signale un retard de 15 minutes en raison d'un embouteillage.",
    time: "Il y a 25 minutes",
    textColor: "text-yellow-700",
  },
  {
    id: 3,
    type: "Planification",
    icon: <Bell size={20} className="text-blue-600" />,
    bgColor: "bg-blue-50",
    borderColor: "bg-blue-100",
    title: "Nouveau transport planifié",
    message: "Transport planifié pour 14h30 de l'Hôpital Central vers la Résidence Les Pins.",
    time: "Il y a 42 minutes",
    textColor: "text-blue-700",
  },
  {
    id: 4,
    type: "Terminé",
    icon: <CheckCircle size={20} className="text-green-600" />,
    bgColor: "bg-green-50",
    borderColor: "bg-green-100",
    title: "Transport terminé",
    message: "AMB-156 a terminé le transport du patient #4582 avec succès.",
    time: "Il y a 1 heure",
    textColor: "text-green-700",
  },
  {
    id: 5,
    type: "Retour",
    icon: <Timer size={20} className="text-orange-600" />,
    bgColor: "bg-orange-50",
    borderColor: "bg-orange-100",
    title: "Retour à prévoir",
    message: "Patient #3721 à récupérer à la Clinique St. Michel à 15h30.",
    time: "Il y a 35 minutes",
    textColor: "text-orange-700",
  },
];

const Notifications = () => {
  return (
    <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Notifications et alertes</h2>
        <button className="text-blue-500 hover:text-blue-700">Tout marquer comme lu</button>
      </div>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`flex items-start p-3 rounded-lg ${notif.bgColor}`}>
            <div className={`flex-shrink-0 p-2 rounded-full ${notif.borderColor}`}>
              {notif.icon}
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${notif.textColor}`}>{notif.title}</h3>
              <p className={`text-sm mt-1 ${notif.textColor}`}>{notif.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;