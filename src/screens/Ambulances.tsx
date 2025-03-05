import React, { useState } from "react";
import { Truck, Search } from "lucide-react";

interface AmbulancesProps {
  isOpen: boolean;
}

const ambulancesData = [
  { id: "AMB-101", type: "Ambulance", equipe: "Martin D. / Sophie L.", status: "En service" },
  { id: "AMB-203", type: "Ambulance", equipe: "Thomas B. / Julie R.", status: "En service" },
  { id: "VSL-301", type: "VSL", equipe: "Paul G. / Léa M.", status: "En service" },
  { id: "AMB-417", type: "Ambulance", equipe: "Hugo T. / Camille R.", status: "Hors service" },
  { id: "VSL-420", type: "VSL", equipe: "Emma V. / Nathan S.", status: "Hors service" },
  { id: "AMB-118", type: "Ambulance", equipe: "Lucas V. / Marie D.", status: "Hors service" },  
  { id: "AMB-101", type: "Ambulance", equipe: "Martin D. / Sophie L.", status: "En service" },
  { id: "AMB-203", type: "Ambulance", equipe: "Thomas B. / Julie R.", status: "En service" },
  { id: "VSL-301", type: "VSL", equipe: "Paul G. / Léa M.", status: "En service" },
  { id: "AMB-417", type: "Ambulance", equipe: "Hugo T. / Camille R.", status: "Hors service" },
  { id: "VSL-420", type: "VSL", equipe: "Emma V. / Nathan S.", status: "Hors service" },
  { id: "AMB-118", type: "Ambulance", equipe: "Lucas V. / Marie D.", status: "Hors service" },
];

const Ambulances: React.FC<AmbulancesProps> = ({ isOpen }) => {
  const [search, setSearch] = useState("");

  const filteredAmbulances = ambulancesData.filter((ambulance) =>
    ambulance.id.toLowerCase().includes(search.toLowerCase()) ||
    ambulance.equipe.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`transition-all duration-300 p-6 bg-gray-100 min-h-screen ${isOpen ? "ml-64" : "ml-16"}`}>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Mes ambulances</h1>

      <div className="mb-6 flex items-center bg-white p-3 rounded-lg shadow-md">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une ambulance ou un équipage..."
          className="ml-2 w-full bg-transparent focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Ambulances en service */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">🚑 Ambulances en service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAmbulances.filter(a => a.status === "En service").map((ambulance) => (
            <div key={ambulance.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <Truck size={24} className="text-blue-600" />
              <div className="ml-3">
                <h3 className="text-md font-semibold">{ambulance.id} ({ambulance.type})</h3>
                <p className="text-sm text-gray-600">{ambulance.equipe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambulances hors service */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-2">⛔ Ambulances hors service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAmbulances.filter(a => a.status === "Hors service").map((ambulance) => (
            <div key={ambulance.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <Truck size={24} className="text-gray-400" />
              <div className="ml-3">
                <h3 className="text-md font-semibold">{ambulance.id} ({ambulance.type})</h3>
                <p className="text-sm text-gray-600">{ambulance.equipe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ambulances;