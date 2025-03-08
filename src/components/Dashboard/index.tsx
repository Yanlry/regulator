import React from "react";
import { DashboardProps } from "./types";
import Notifications from "./Notifications";
import TransportVolume from "./TransportVolume";
import AmbulanceTracking from "./AmbulanceTracking";
import StatCards from "./StatCards";
import Header from "./Header";
import ReturnsList from "./ReturnsList";
import TransportTable from "./TransportTable";
import InterventionSummary from "./InterventionSummary";
import ProximityTransport from "./ProximityTransport";

 
import { pendingReturns, upcomingReturns, transportsData, ambulanceStatsData } from "./data";

const Dashboard: React.FC<DashboardProps> = ({ isOpen }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Main Content */}
      <div
        className={`transition-all duration-300 p-6 overflow-y-auto h-screen w-full ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <StatCards />

        {/* Cartes détaillées pour les retours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ReturnsList
            title="Retours en attente"
            count={pendingReturns.length}
            description="Patients en attente"
            iconColor="text-red-600"
            bgColor="bg-red-100"
            patients={pendingReturns}
          />
          <ReturnsList
            title="Retours à prévoir"
            count={upcomingReturns.length}
            description="Retours programmés dans les 3h"
            iconColor="text-orange-600"
            bgColor="bg-orange-100"
            patients={upcomingReturns}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TransportTable transports={transportsData} />
          <AmbulanceTracking stats={ambulanceStatsData} activities={[]} />
          <InterventionSummary />
          <TransportVolume />
          <ProximityTransport transports={transportsData} />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;