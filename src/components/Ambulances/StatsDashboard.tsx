import React from 'react';
import { Stats } from '../../types';

interface StatsDashboardProps {
  stats: Stats;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats }) => (
  <div className="mb-6 bg-white rounded-md shadow-md p-4">
    <h2 className="font-semibold text-gray-800 mb-2">État de la flotte</h2>
    <p className="text-sm text-gray-500 mb-4">
      Vue d'ensemble de la maintenance
    </p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <span className="text-blue-900 text-sm font-semibold">
          Taux opérationnel
        </span>
        <span className="block text-blue-900 text-xl font-bold">
          {stats.operationalRate}%
        </span>
      </div>
      <div className="bg-green-100 p-3 rounded-md text-center">
        <span className="text-green-900 text-sm font-semibold">
          Maintenance à jour
        </span>
        <span className="block text-green-900 text-xl font-bold">
          {stats.maintenanceUpToDate}
        </span>
      </div>
      <div className="bg-amber-100 p-3 rounded-md text-center">
        <span className="text-amber-900 text-sm font-semibold">
          Maintenance à prévoir
        </span>
        <span className="block text-amber-900 text-xl font-bold">
          {stats.maintenanceNeeded}
        </span>
      </div>
      <div className="bg-red-100 p-3 rounded-md text-center">
        <span className="text-red-900 text-sm font-semibold">
          En réparation
        </span>
        <span className="block text-red-900 text-xl font-bold">
          {stats.underRepair}
        </span>
      </div>
      <div className="bg-purple-100 p-3 rounded-md text-center">
        <span className="text-purple-900 text-sm font-semibold">
          En service
        </span>
        <span className="block text-purple-900 text-xl font-bold">
          {stats.inService}
        </span>
      </div>
      <div className="bg-gray-100 p-3 rounded-md text-center">
        <span className="text-gray-900 text-sm font-semibold">
          Hors service
        </span>
        <span className="block text-gray-900 text-xl font-bold">
          {stats.outOfService}
        </span>
      </div>
    </div>
  </div>
);

export default StatsDashboard;