import { Ambulance, Timer, Calendar, CheckCircle } from 'lucide-react';

// Define the props interface to include theme
interface StatCardsProps {
  theme: string;
}

const StatCards: React.FC<StatCardsProps> = ({ theme }) => {
  const stats = [
    { title: "Retour en attente", count: 4, note: "Attend depuis 1 h 26 min", icon: Timer, color: "red" },
    { title: "Ambulances en service", count: 5, note: "3 en charges", icon: Ambulance, color: "blue" },
    { title: "Transports planifiés", count: 28, note: "8 prévus dans l'heure", icon: Calendar, color: "blue" },
    { title: "Transports terminés", count: 12, note: "4 en attente", icon: CheckCircle, color: "green" },
  ];

  // Function to get appropriate color classes based on theme
  const getColorClasses = (color: string, element: 'text' | 'bg' | 'icon') => {
    if (theme === 'dark') {
      // Dark theme colors
      switch (color) {
        case 'red':
          return element === 'text' ? 'text-red-300' : 
                 element === 'bg' ? 'bg-red-900' : 'text-red-400';
        case 'blue':
          return element === 'text' ? 'text-blue-300' : 
                 element === 'bg' ? 'bg-blue-900' : 'text-blue-400';
        case 'green':
          return element === 'text' ? 'text-green-300' : 
                 element === 'bg' ? 'bg-green-900' : 'text-green-400';
        default:
          return element === 'text' ? 'text-gray-300' : 
                 element === 'bg' ? 'bg-gray-800' : 'text-gray-400';
      }
    }
    
    // Light theme (original) colors
    if (element === 'icon') {
      return `text-${color}-600`;
    }
    return `${element}-${color}-${element === 'text' ? '500' : '100'}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-md p-6 flex items-start justify-between`}
        >
          <div>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} text-sm`}>
              {stat.title}
            </p>
            <h3 className={`text-3xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {stat.count}
            </h3>
            <p className={`${getColorClasses(stat.color, 'text')} text-sm mt-1`}>
              {stat.note}
            </p>
          </div>
          <div className={`${getColorClasses(stat.color, 'bg')} p-3 rounded-lg`}>
            <stat.icon size={24} className={getColorClasses(stat.color, 'icon')} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;