import React from 'react';
import {
  Truck,
  Car,
  MapPin,
  Wrench,
  CheckCircle,
  Calendar,
  AlertTriangle,
  Clock,
  FileText,
  BarChart3
} from 'lucide-react';
import { Ambulance } from '../../types';

interface AmbulanceCardProps {
  ambulance: Ambulance;
  onSelect: () => void;
}

const AmbulanceCard: React.FC<AmbulanceCardProps> = ({ ambulance, onSelect }) => {
  const getMaintenanceInfo = (status: string) => {
    if (status === "À jour") {
      return {
        color: "text-green-700",
        bgColor: "bg-green-50",
        icon: <CheckCircle size={14} className="mr-1" />,
      };
    } else if (status === "Entretien imminent") {
      return {
        color: "text-orange-700",
        bgColor: "bg-orange-50",
        icon: <Clock size={14} className="mr-1" />,
      };
    } else if (status.includes("Réparation")) {
      return {
        color: "text-red-700",
        bgColor: "bg-red-50",
        icon: <Wrench size={14} className="mr-1" />,
      };
    } else {
      return {
        color: "text-amber-700",
        bgColor: "bg-amber-50",
        icon: <AlertTriangle size={14} className="mr-1" />,
      };
    }
  };

  const getMaintenanceUrgency = (ambulance: Ambulance) => {
    const today = new Date();
    const nextMaintenanceDate = new Date(
      ambulance.prochainEntretien.split("/").reverse().join("-")
    );
    const daysUntilMaintenance = Math.ceil(
      (nextMaintenanceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (
      ambulance.maintenanceStatus.includes("Réparation") ||
      ambulance.maintenanceStatus.includes("dépassé")
    ) {
      return {
        label: "Urgent",
        color: "bg-red-600 text-white",
        days: "Immédiat",
      };
    } else if (ambulance.maintenanceStatus.includes("nécessaire")) {
      return {
        label: "À planifier",
        color: "bg-amber-500 text-white",
        days: "< 7 jours",
      };
    } else if (
      ambulance.maintenanceStatus === "Entretien imminent" ||
      daysUntilMaintenance <= 14
    ) {
      return {
        label: "Imminent",
        color: "bg-orange-500 text-white",
        days: `${daysUntilMaintenance} jours`,
      };
    } else {
      return {
        label: "Planifié",
        color: "bg-green-600 text-white",
        days: `${daysUntilMaintenance} jours`,
      };
    }
  };

  const getKilometrageInfo = (ambulance: Ambulance) => {
    const nextRevisionKm = parseInt(
      ambulance.prochaineRevision.replace(/[^0-9]/g, "")
    );
    const remainingKm = nextRevisionKm - ambulance.kilometrage;
    if (remainingKm <= 0)
      return { label: `Dépassé de ${-remainingKm} km`, color: "text-red-700" };
    if (remainingKm <= 1000)
      return { label: `${remainingKm} km restants`, color: "text-orange-700" };
    return { label: `${remainingKm} km restants`, color: "text-green-700" };
  };

  const maintenanceInfo = getMaintenanceInfo(ambulance.maintenanceStatus);
  const maintenanceUrgency = getMaintenanceUrgency(ambulance);
  const kilometrageInfo = getKilometrageInfo(ambulance);

  return (
    <div
      className={`bg-white rounded-md shadow-md p-4 border-l-4 ${
        ambulance.status === "En service"
          ? "border-green-500"
          : "border-red-500"
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          {ambulance.type === "Ambulance" ? (
            <Truck
              size={18}
              className={
                ambulance.status === "En service"
                  ? "text-green-600"
                  : "text-red-500"
              }
            />
          ) : (
            <Car
              size={18}
              className={
                ambulance.status === "En service"
                  ? "text-green-600"
                  : "text-red-500"
              }
            />
          )}
          <h3 className="text-md font-semibold text-gray-800">
            {ambulance.id}
          </h3>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            ambulance.status === "En service"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {ambulance.status}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">{ambulance.modele}</span>
          <span className="font-medium text-gray-800">
            {ambulance.immatriculation}
          </span>
        </div>
        <p className="flex items-center text-gray-700">
          <MapPin size={14} className="mr-2 text-gray-500" />
          <span className="font-medium">Localisation :</span>{" "}
          {ambulance.localisation}
        </p>
        <p className={`flex items-center ${maintenanceInfo.color}`}>
          {maintenanceInfo.icon}
          <span className="font-medium">Maintenance :</span>{" "}
          {ambulance.maintenanceStatus}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Dernier entretien</p>
            <p className="font-medium flex items-center">
              <Calendar size={12} className="mr-1 text-blue-500" />
              {ambulance.dateDernierEntretien}
            </p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Prochain entretien</p>
            <p className="font-medium flex items-center">
              <Calendar size={12} className="mr-1 text-purple-500" />
              {ambulance.prochainEntretien}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Kilométrage</p>
            <p className="font-medium">
              {ambulance.kilometrage.toLocaleString()} km
            </p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Prochaine révision</p>
            <p className={`font-medium ${kilometrageInfo.color}`}>
              {kilometrageInfo.label}
            </p>
          </div>
        </div>
        {ambulance.notes && (
          <div className="bg-amber-50 p-2 rounded mt-2">
            <p className="text-xs text-amber-700 flex items-center">
              <FileText size={12} className="mr-1" />
              Notes: {ambulance.notes}
            </p>
          </div>
        )}
      </div>
      <div
        className={`mt-3 p-2 rounded flex items-center justify-between ${maintenanceUrgency.color}`}
      >
        <div className="flex items-center font-medium text-sm">
          <Clock size={14} className="mr-1" />
          {maintenanceUrgency.label} - {maintenanceUrgency.days}
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Planifier maintenance: ${ambulance.id}`);
            }}
            className="px-2 py-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 text-sm"
          >
            <Wrench size={14} className="mr-1" />
            Maintenance
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Historique: ${ambulance.id}`);
            }}
            className="px-2 py-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 text-sm"
          >
            <BarChart3 size={14} className="mr-1" />
            Historique
          </button>
        </div>
      </div>
      <button
        onClick={onSelect}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
      >
        Détails
      </button>
    </div>
  );
};

export default AmbulanceCard;