import AmbulanceMap from "./AmbulanceMap";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  heureDepart: string;
  statusColor: string;
}

interface AmbulanceTrackingProps {
  stats: Stat[];
  activities: AmbulanceActivity[];
}

const AmbulanceTracking: React.FC<AmbulanceTrackingProps> = ({ stats }) => {

  const ambulances = [
    { id: "AMB-101", lat: 50.62925, lng: 3.057256, status: "Libre", statusColor: "bg-green-500", location: "35 Rue Jean Sans Peur, Lille", destination: "12 Rue de la Justice, Lys-Lez-Lannoy", heureDepart: "10:00", heureArrivee: "10:16"},  
    { id: "AMB-203", lat: 50.690102, lng: 2.889883, status: "Occupé", statusColor: "bg-red-500", location: "187 Avenue de la république, Marcq-en-Baroeul", destination: "Hospital Claude Huriez, Centre Sud", heureDepart: "10:30", heureArrivee: "10:58" }, 
    { id: "VSL-301", lat: 50.518, lng: 2.632, status: "Pause", statusColor: "bg-yellow-500", location: "12 Rue Jouffroy, Lys-Lez-Lannoy", destination: "Hôpital Victor Provo", heureDepart: "11:00", heureArrivee: "11:07" },  
    { id: "AMB-417", lat: 50.284, lng: 2.781, status: "Libre", statusColor: "bg-green-500", location: "CH. Roger Salengro", destination: "HPVA", heureDepart: "11:30", heureArrivee: "11:55" },  
    { id: "VSL-420", lat: 50.723, lng: 2.539, status: "Occupé", statusColor: "bg-red-500", location: "Centre E.L.A.N, Hopital de Wattrelos", destination: "32 Rue Jean Mermoz, Wattrelos", heureDepart: "12:00", heureArrivee: "12:12" },  
    { id: "AMB-118", lat: 50.995, lng: 2.295, status: "Pause", statusColor: "bg-yellow-500", location: "Clinique Les Peupliers", destination: "22 Rue du Docteur Schweitzer, Roubaix", heureDepart: "12:30", heureArrivee: "12:54" },  
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  interface ScrollFunction {
    (direction: "left" | "right"): void;
  }

  const scroll: ScrollFunction = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 600; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };


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
      <div className="relative">
      {/* Bouton gauche */}
      <button
        className="absolute left-[-30px] top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
        onClick={() => scroll("left")}
      >
        <FaChevronLeft />
      </button>

      {/* Conteneur scrollable */}
      <div
        ref={scrollRef}
        className="mt-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        <table className="min-w-[1200px] divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {["Vehicule", "Statut", "Lieu actuel", "Destination", "Départ", "Arrivée"].map((header) => (
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
            {ambulances.map((ambulance, index) => (
              <tr key={index}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ambulance.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${ambulance.statusColor}`}>
                    {ambulance.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {ambulance.location}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {ambulance.destination}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {ambulance.heureDepart}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {ambulance.heureArrivee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bouton droit */}
      <button
        className="absolute right-[-30px] top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
        onClick={() => scroll("right")}
      >
        <FaChevronRight />
      </button>
    </div>
    </div>
  );
};

export default AmbulanceTracking;