import AmbulanceMap from "./AmbulanceMap";
import { useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

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
    {
      id: "AMB-101",
      lat: 50.62925,
      lng: 3.057256,
      status: "Libre",
      statusColor: "bg-green-500",
      location: "35 Rue Jean Sans Peur, Lille",
      destination: "12 Rue de la Justice, Lys-Lez-Lannoy",
      heureDepart: "10:00",
      heureArrivee: "10:16",
    },
    {
      id: "AMB-203",
      lat: 50.690102,
      lng: 2.889883,
      status: "Occupé",
      statusColor: "bg-red-500",
      location: "187 Avenue de la république, Marcq-en-Baroeul",
      destination: "Hospital Claude Huriez, Centre Sud",
      heureDepart: "10:30",
      heureArrivee: "10:58",
    },
    {
      id: "VSL-301",
      lat: 50.518,
      lng: 2.632,
      status: "Pause",
      statusColor: "bg-yellow-500",
      location: "12 Rue Jouffroy, Lys-Lez-Lannoy",
      destination: "Hôpital Victor Provo",
      heureDepart: "11:00",
      heureArrivee: "11:07",
    },
    {
      id: "AMB-417",
      lat: 50.284,
      lng: 2.781,
      status: "Libre",
      statusColor: "bg-green-500",
      location: "CH. Roger Salengro",
      destination: "HPVA",
      heureDepart: "11:30",
      heureArrivee: "11:55",
    },
    {
      id: "VSL-420",
      lat: 50.723,
      lng: 2.539,
      status: "Occupé",
      statusColor: "bg-red-500",
      location: "Centre E.L.A.N, Hopital de Wattrelos",
      destination: "32 Rue Jean Mermoz, Wattrelos",
      heureDepart: "12:00",
      heureArrivee: "12:12",
    },
    {
      id: "AMB-118",
      lat: 50.995,
      lng: 2.295,
      status: "Pause",
      statusColor: "bg-yellow-500",
      location: "Clinique Les Peupliers",
      destination: "22 Rue du Docteur Schweitzer, Roubaix",
      heureDepart: "12:30",
      heureArrivee: "12:54",
    },
    {
      id: "AMB-101",
      lat: 50.62925,
      lng: 3.057256,
      status: "Libre",
      statusColor: "bg-green-500",
      location: "35 Rue Jean Sans Peur, Lille",
      destination: "12 Rue de la Justice, Lys-Lez-Lannoy",
      heureDepart: "10:00",
      heureArrivee: "10:16",
    },
    {
      id: "AMB-203",
      lat: 50.690102,
      lng: 2.889883,
      status: "Occupé",
      statusColor: "bg-red-500",
      location: "187 Avenue de la république, Marcq-en-Baroeul",
      destination: "Hospital Claude Huriez, Centre Sud",
      heureDepart: "10:30",
      heureArrivee: "10:58",
    },
    {
      id: "VSL-301",
      lat: 50.518,
      lng: 2.632,
      status: "Pause",
      statusColor: "bg-yellow-500",
      location: "12 Rue Jouffroy, Lys-Lez-Lannoy",
      destination: "Hôpital Victor Provo",
      heureDepart: "11:00",
      heureArrivee: "11:07",
    },
    {
      id: "AMB-417",
      lat: 50.284,
      lng: 2.781,
      status: "Libre",
      statusColor: "bg-green-500",
      location: "CH. Roger Salengro",
      destination: "HPVA",
      heureDepart: "11:30",
      heureArrivee: "11:55",
    },
    {
      id: "VSL-420",
      lat: 50.723,
      lng: 2.539,
      status: "Occupé",
      statusColor: "bg-red-500",
      location: "Centre E.L.A.N, Hopital de Wattrelos",
      destination: "32 Rue Jean Mermoz, Wattrelos",
      heureDepart: "12:00",
      heureArrivee: "12:12",
    },
    {
      id: "AMB-118",
      lat: 50.995,
      lng: 2.295,
      status: "Pause",
      statusColor: "bg-yellow-500",
      location: "Clinique Les Peupliers",
      destination: "22 Rue du Docteur Schweitzer, Roubaix",
      heureDepart: "12:30",
      heureArrivee: "12:54",
    },
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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Libre":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          dotColor: "bg-green-500",
        };
      case "Occupé":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          dotColor: "bg-red-500",
        };
      case "Pause":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          dotColor: "bg-yellow-500",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          dotColor: "bg-gray-500",
        };
    }
  };

  return (
    <div
      className="lg:col-span-2 bg-white rounded-xl shadow-md p-2 w-full overflow-hidden flex flex-col"
      style={{ maxHeight: "750px", height: "100%" }}
    >
      {/* Map - taille fixe */}
      <div className="h-72 w-full bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <AmbulanceMap />
      </div>

      {/* Statistics - taille fixe */}
      <div className="mt-2 mb-2 flex justify-around bg-gray-50 p-2 rounded-lg flex-shrink-0">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center">
            <span className={`h-3 w-3 rounded-full ${stat.color} mr-2`}></span>
            <span className="text-xs font-medium text-gray-700">
              {stat.label}: <span className="font-bold">{stat.count}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Ambulance Activity Table - hauteur adaptable avec défilement */}
      <div
        className="relative mt-2 flex-grow flex flex-col overflow-hidden"
        style={{ maxHeight: "calc(750px - 72px - 60px)" }}
      >
        {/* Wrapper pour les boutons et le contenu */}
        <div className="relative flex-grow overflow-hidden">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md z-20 hover:bg-gray-100 transition-colors border border-gray-200"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft className="text-gray-500" />
          </button>

          <div className="h-full overflow-y-auto">
            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mx-8 min-h-full"
            >
              <div className="min-w-[1200px] pb-4">
                {ambulances.map((ambulance, index) => {
                  const { bgColor, textColor, dotColor } = getStatusStyles(
                    ambulance.status
                  );
                  return (
                    <div
                      key={index}
                      className={`mb-2 p-2 rounded-lg ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border border-gray-100 transition-all hover:shadow-sm`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Vehicle ID & Status */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`font-bold text-gray-900 text-xs px-3 py-1 rounded-md bg-gray-100`}
                            >
                              {ambulance.id}
                            </div>
                            <div
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} flex items-center`}
                            >
                              <span
                                className={`w-2 h-2 ${dotColor} rounded-full mr-1.5`}
                              ></span>
                              {ambulance.status}
                            </div>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="col-span-3">
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-gray-500 font-medium">
                                Origine
                              </div>
                              <div
                                className="text-xs text-gray-900 truncate"
                                title={ambulance.location}
                              >
                                {ambulance.location}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="col-span-1 flex justify-center">
                          <FaArrowRight className="text-gray-400" />
                        </div>

                        {/* Destination */}
                        <div className="col-span-3">
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-gray-500 font-medium">
                                Destination
                              </div>
                              <div
                                className="text-xs text-gray-900 truncate"
                                title={ambulance.destination}
                              >
                                {ambulance.destination}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="col-span-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-start justify-start">
                              <FaCalendarAlt className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                              <div>
                                <div className="text-xs text-gray-500 font-medium">
                                  Départ
                                </div>
                                <div className="text-xs text-gray-900">
                                  {ambulance.heureDepart}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start justify-end pr-4">
                              <FaClock className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                              <div>
                                <div className="text-xs text-gray-500 font-medium">
                                  Arrivée
                                </div>
                                <div className="text-xs text-gray-900">
                                  {ambulance.heureArrivee}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md z-20 hover:bg-gray-100 transition-colors border border-gray-200"
            onClick={() => scroll("right")}
          >
            <FaChevronRight className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceTracking;
