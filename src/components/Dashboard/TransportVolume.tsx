import { useState } from "react";
import TransportVolumeChart from "./TransportVolumeChart";

const TransportVolume = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Aujourd'hui");

  return (
    <div className="bg-white rounded-xl shadow-md p-2 flex flex-col h-full">
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <select
          className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option>Aujourd'hui</option>
          <option>Cette semaine</option>
          <option>Ce mois</option>
        </select>
      </div>
      <div className="flex-grow w-full">
        <TransportVolumeChart selectedPeriod={selectedPeriod} />
      </div>
    </div>
  );
};

export default TransportVolume;