import { Ambulance, Timer, Calendar, CheckCircle } from 'lucide-react';

const StatCards = () => {
  const stats = [
    { title: "Retour en attente", count: 4, note: "Attend depuis 1 h 26 min", icon: Timer, color: "red" },
    { title: "Ambulances en service", count: 5, note: "3 en charges", icon: Ambulance, color: "blue" },
    { title: "Transports planifiés", count: 28, note: "8 prévus dans l'heure", icon: Calendar, color: "blue" },
    { title: "Transports terminés", count: 12, note: "4 en attente", icon: CheckCircle, color: "green" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6 flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <h3 className="text-3xl font-bold mt-1">{stat.count}</h3>
            <p className={`text-${stat.color}-500 text-sm mt-1`}>{stat.note}</p>
          </div>
          <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
            <stat.icon size={24} className={`text-${stat.color}-600`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;