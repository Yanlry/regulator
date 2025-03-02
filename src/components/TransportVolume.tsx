import { useState } from "react";
import TransportVolumeChart from "./TransportVolumeChart";

const TransportVolume = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Aujourd'hui");

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Volume de transports
        </h2>
        <select
          className="text-sm border rounded-md px-2 py-1"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option>Aujourd'hui</option>
          <option>Cette semaine</option>
          <option>Ce mois</option>
        </select>
      </div>
      <div className="h-80 w-full">
        <TransportVolumeChart selectedPeriod={selectedPeriod} />
      </div>
    </div>
  );
};

export default TransportVolume;