import React from "react";
import { DetailPanelProps } from "../data/types";
import AmbulanceDetail from "./AmbulanceDetail";
import DashboardView from "./DashboardView";

const DetailPanel: React.FC<DetailPanelProps> = ({ 
  selectedAmbulance, 
  stats 
}) => {
  return (
    <div className="w-1/4 bg-white shadow-md overflow-y-auto">
      {selectedAmbulance ? (
        <AmbulanceDetail ambulance={selectedAmbulance} />
      ) : (
        <DashboardView stats={stats} />
      )}
    </div>
  );
};

export default DetailPanel;