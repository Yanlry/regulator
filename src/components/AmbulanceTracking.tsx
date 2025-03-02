import AmbulanceMap from "./AmbulanceMap";

interface Stat {
  color: string;
  label: string;
  count: number;
}

interface AmbulanceActivity {
  ambulance: string;
  equipe: string;
  status: string;
  location: string;
  destination: string;
  heure: string;
  statusColor: string;
}

interface AmbulanceTrackingProps {
  stats: Stat[];
  activities: AmbulanceActivity[];
}

const AmbulanceTracking: React.FC<AmbulanceTrackingProps> = ({ stats, activities }) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Suivi des ambulances en temps réel
        </h2>
        <button className="text-blue-500 hover:text-blue-700">Agrandir</button>
      </div>

      {/* 📍 Carte avec localisation */}
      <div className="h-80 w-full bg-gray-100 rounded-lg overflow-hidden">
        <AmbulanceMap />
      </div>

      {/* 🟢 Statistiques des ambulances */}
      <div className="mt-4 flex justify-between">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center">
            <span className={`h-3 w-3 rounded-full ${stat.color} mr-2`}></span>
            <span className="text-sm text-gray-600">
              {stat.label} ({stat.count})
            </span>
          </div>
        ))}
      </div>

      {/* 📋 Tableau des activités */}
      <div className="mt-6 overflow-y-auto max-h-56">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {["Ambulance", "Statut", "Lieu actuel", "Destination", "Heure"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <tr key={index}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-3 text-sm font-medium text-gray-900">
                      {activity.ambulance}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {activity.location}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {activity.destination}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {activity.heure}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmbulanceTracking;