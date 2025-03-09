import { useState } from "react";
import { AlertTriangle, Bell, CheckCircle, Clock, Timer, ChevronDown, ChevronUp } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "Urgence",
    icon: <AlertTriangle size={18} className="text-red-600" />,
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
    title: "Urgence signalée",
    message: "Accident de la route sur A7, km 45. AMB-203 dépêchée sur place.",
    time: "Il y a 12 minutes",
    textColor: "text-red-700",
  },
  {
    id: 2,
    type: "Retard",
    icon: <Clock size={18} className="text-yellow-600" />,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-100",
    title: "Retard signalé",
    message: "AMB-101 signale un retard de 15 minutes en raison d'un embouteillage.",
    time: "Il y a 25 minutes",
    textColor: "text-yellow-700",
  },
  {
    id: 3,
    type: "Planification",
    icon: <Bell size={18} className="text-blue-600" />,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    title: "Nouveau transport planifié",
    message: "Transport planifié pour 14h30 de l'Hôpital Central vers la Résidence Les Pins.",
    time: "Il y a 42 minutes",
    textColor: "text-blue-700",
  },
  {
    id: 4,
    type: "Terminé",
    icon: <CheckCircle size={18} className="text-green-600" />,
    bgColor: "bg-green-50",
    borderColor: "border-green-100",
    title: "Transport terminé",
    message: "AMB-156 a terminé le transport du patient #4582 avec succès.",
    time: "Il y a 1 heure",
    textColor: "text-green-700",
  },
  {
    id: 5,
    type: "Retour",
    icon: <Timer size={18} className="text-orange-600" />,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    title: "Retour à prévoir",
    message: "Patient #3721 à récupérer à la Clinique St. Michel à 15h30.",
    time: "Il y a 35 minutes",
    textColor: "text-orange-700",
  },
  {
    id: 6,
    type: "Retour",
    icon: <Timer size={18} className="text-orange-600" />,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    title: "Retour à prévoir",
    message: "Patient #3721 à récupérer à la Clinique St. Michel à 15h30.",
    time: "Il y a 35 minutes",
    textColor: "text-orange-700",
  },
  {
    id: 7,
    type: "Retour",
    icon: <Timer size={18} className="text-orange-600" />,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    title: "Retour à prévoir",
    message: "Patient #3721 à récupérer à la Clinique St. Michel à 15h30.",
    time: "Il y a 35 minutes",
    textColor: "text-orange-700",
  },
  {
    id: 8,
    type: "Retour",
    icon: <Timer size={18} className="text-orange-600" />,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    title: "Retour à prévoir",
    message: "Patient #3721 à récupérer à la Clinique St. Michel à 15h30.",
    time: "Il y a 35 minutes",
    textColor: "text-orange-700",
  },
];

interface Notification {
  id: number;
  type: string;
  icon: JSX.Element;
  bgColor: string;
  borderColor: string;
  title: string;
  message: string;
  time: string;
  textColor: string;
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      key={notification.id} 
      className={`flex items-start p-2 rounded-lg ${notification.bgColor} border border-t-0 border-r-0 border-b-0 border-l-4 ${notification.borderColor} transition-all hover:shadow-sm`}
    >
      <div className={`flex-shrink-0 p-1.5 rounded-full bg-white`}>
        {notification.icon}
      </div>
      <div className="ml-2 flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <h3 className={`text-xs font-bold ${notification.textColor} leading-tight`}>
            {notification.title}
          </h3>
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
            {notification.time}
          </span>
        </div>
        <div className="relative">
          <p className={`text-xs mt-1 ${notification.textColor} ${expanded ? '' : 'line-clamp-2'} leading-snug`}>
            {notification.message}
          </p>
          {notification.message.length > 50 && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className={`text-xs ml-1 ${notification.textColor} font-medium hover:underline focus:outline-none inline-flex items-center`}
            >
              {expanded ? (
                <>
                  <span>Réduire</span>
                  <ChevronUp size={12} className="ml-1" />
                </>
              ) : (
                <>
                  <span>Lire plus</span>
                  <ChevronDown size={12} className="ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [filter, setFilter] = useState("Tous");
  const filterOptions = ["Tous", "Urgence", "Retard", "Planification", "Terminé", "Retour"];
  
  const filteredNotifications = filter === "Tous" 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  return (
    <div className="lg:col-span-3 bg-white rounded-xl p-2 overflow-hidden flex flex-col" style={{ maxHeight: "750px", height: "100%" }}>
      <div className="flex justify-between items-center mb-2 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-xs py-1 px-2 bg-gray-50 border border-gray-200 rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {filterOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
            Tout marquer
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto pr-1 flex-grow" style={{ maxHeight: "calc(750px - 40px)" }}>
        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <NotificationItem key={notif.id} notification={notif} />
            ))
          ) : (
            <div className="flex items-center justify-center p-4 text-gray-500 text-sm">
              Aucune notification de ce type
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;