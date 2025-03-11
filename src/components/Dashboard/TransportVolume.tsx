import { useState } from "react";
import TransportVolumeChart from "./TransportVolumeChart";

interface TransportVolumeProps {
  theme: string; 
}

const TransportVolume: React.FC<TransportVolumeProps> = ({ theme }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Aujourd'hui");

  // Theme-specific class definitions
  const containerClasses = `
    rounded-xl shadow-md p-2 flex flex-col h-full
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const selectClasses = `
    text-xs border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500
    ${theme === 'dark' 
      ? 'bg-gray-600 border-gray-600 text-gray-200' 
      : 'bg-gray-50 border-gray-200 text-gray-800'}
  `;

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <select
          className={selectClasses}
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option>Aujourd'hui</option>
          <option>Cette semaine</option>
          <option>Ce mois</option>
        </select>
      </div>
      <div className="flex-grow w-full">
        <TransportVolumeChart selectedPeriod={selectedPeriod} theme={theme} />
      </div>
    </div>
  );
};

export default TransportVolume;