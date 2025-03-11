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

// Add props interface for Notifications
interface NotificationsProps {
  theme: string;
}

// Update NotificationItem to accept theme
interface NotificationItemProps {
  notification: Notification;
  theme: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, theme }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Get theme-specific background color
  const getThemedBgColor = () => {
    if (theme === 'dark') {
      // Map light background colors to dark theme equivalents
      switch(notification.bgColor) {
        case 'bg-red-50': return 'bg-red-900';
        case 'bg-yellow-50': return 'bg-yellow-900';
        case 'bg-blue-50': return 'bg-blue-900';
        case 'bg-green-50': return 'bg-green-900';
        case 'bg-orange-50': return 'bg-orange-900';
        default: return 'bg-gray-800';
      }
    }
    return notification.bgColor;
  };

  // Get theme-specific border color
  const getThemedBorderColor = () => {
    if (theme === 'dark') {
      // Map light border colors to dark theme equivalents
      switch(notification.borderColor) {
        case 'border-red-100': return 'border-red-700';
        case 'border-yellow-100': return 'border-yellow-700';
        case 'border-blue-100': return 'border-blue-700';
        case 'border-green-100': return 'border-green-700';
        case 'border-orange-100': return 'border-orange-700';
        default: return 'border-gray-700';
      }
    }
    return notification.borderColor;
  };

  // Get theme-specific text color
  const getThemedTextColor = () => {
    if (theme === 'dark') {
      // Map light text colors to dark theme equivalents
      switch(notification.textColor) {
        case 'text-red-700': return 'text-red-300';
        case 'text-yellow-700': return 'text-yellow-300';
        case 'text-blue-700': return 'text-blue-300';
        case 'text-green-700': return 'text-green-300';
        case 'text-orange-700': return 'text-orange-300';
        default: return 'text-gray-300';
      }
    }
    return notification.textColor;
  };

  const iconBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  const timeTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div 
      key={notification.id} 
      className={`flex items-start p-2 rounded-lg ${getThemedBgColor()} border border-t-0 border-r-0 border-b-0 border-l-4 ${getThemedBorderColor()} transition-all hover:shadow-sm`}
    >
      <div className={`flex-shrink-0 p-1.5 rounded-full ${iconBgColor}`}>
        {notification.icon}
      </div>
      <div className="ml-2 flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <h3 className={`text-xs font-bold ${getThemedTextColor()} leading-tight`}>
            {notification.title}
          </h3>
          <span className={`text-xs ${timeTextColor} ml-2 whitespace-nowrap`}>
            {notification.time}
          </span>
        </div>
        <div className="relative">
          <p className={`text-xs mt-1 ${getThemedTextColor()} ${expanded ? '' : 'line-clamp-2'} leading-snug`}>
            {notification.message}
          </p>
          {notification.message.length > 50 && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className={`text-xs ml-1 ${getThemedTextColor()} font-medium hover:underline focus:outline-none inline-flex items-center`}
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

const Notifications: React.FC<NotificationsProps> = ({ theme }) => {
  const [filter, setFilter] = useState("Tous");
  const filterOptions = ["Tous", "Urgence", "Retard", "Planification", "Terminé", "Retour"];
  
  const filteredNotifications = filter === "Tous" 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  // Theme-specific classes
  const containerClasses = `
    lg:col-span-3 rounded-xl p-2 overflow-hidden flex flex-col
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const selectClasses = `
    text-xs py-1 px-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500
    ${theme === 'dark' 
      ? 'bg-gray-600 border-gray-500 text-gray-200' 
      : 'bg-gray-50 border-gray-200 text-gray-700'}
  `;

  const markAllClasses = `
    text-xs font-medium
    ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}
  `;

  const emptyMessageClasses = `
    flex items-center justify-center p-4 text-sm
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  return (
    <div className={containerClasses} style={{ maxHeight: "750px", height: "100%" }}>
      <div className="flex justify-between items-center mb-2 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={selectClasses}
          >
            {filterOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button className={markAllClasses}>
            Tout marquer
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto pr-1 flex-grow" style={{ maxHeight: "calc(750px - 40px)" }}>
        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <NotificationItem key={notif.id} notification={notif} theme={theme} />
            ))
          ) : (
            <div className={emptyMessageClasses}>
              Aucune notification de ce type
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;