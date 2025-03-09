import React, { useState } from 'react';
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
  BarChart3,
  Edit2,
  Check,
  X
} from 'lucide-react';
import { Ambulance } from '../../types';

interface AmbulanceCardProps {
  ambulance: Ambulance;
  onSelect: () => void;
}

const AmbulanceCard: React.FC<AmbulanceCardProps> = ({ ambulance, onSelect }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

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

  const handleEditClick = (field: keyof Ambulance) => {
    if (editingField === null) {
      const confirmEdit = confirm("Voulez-vous modifier cette information ?");
      if (confirmEdit) {
        setEditingField(field);
        setTempValue(String(ambulance[field]));
      }
    }
  };

  const handleChange = (field: keyof Ambulance, value: string) => {
    console.log(`Mise à jour de ${field} pour ${ambulance.id} : ${value}`);
    // Implémentez ici la logique de mise à jour réelle
  };

  const handleSave = (field: keyof Ambulance) => {
    handleChange(field, tempValue);
    setEditingField(null);
    setTempValue("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const EditableField = ({ 
    field, 
    children 
  }: { 
    field: keyof Ambulance, 
    value: string, 
    children: React.ReactNode 
  }) => (
    <div className="relative group">
      {editingField === field ? (
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="text-sm text-gray-800 border-b-2 border-gray-400 focus:border-blue-500 transition-all w-full outline-none py-1"
          />
          <button
            onClick={() => handleSave(field)}
            className="p-1 text-green-500 hover:text-green-700 transition"
          >
            <Check size={20} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-red-500 hover:text-red-700 transition"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          {children}
          <button
            onClick={() => handleEditClick(field)}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-blue-500"
          >
            <Edit2 size={14} />
          </button>
        </div>
      )}
    </div>
  );

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
          <EditableField field="id" value={ambulance.id}>
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
            <h3 className="text-md font-semibold text-gray-800 ml-2">
              {ambulance.id}
            </h3>
          </EditableField>
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
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <EditableField field="modele" value={ambulance.modele}>
            <span className="text-gray-600">{ambulance.modele}</span>
          </EditableField>
          <EditableField field="immatriculation" value={ambulance.immatriculation}>
            <span className="font-medium text-gray-800">
              {ambulance.immatriculation}
            </span>
          </EditableField>
        </div>
        <EditableField field="localisation" value={ambulance.localisation}>
          <p className="flex items-center text-gray-700">
            <MapPin size={14} className="mr-2 text-gray-500" />
            <span className="font-medium">Localisation :</span>{" "}
            {ambulance.localisation}
          </p>
        </EditableField>
        <EditableField field="maintenanceStatus" value={ambulance.maintenanceStatus}>
          <p className={`flex items-center ${maintenanceInfo.color}`}>
            {maintenanceInfo.icon}
            <span className="font-medium">Maintenance :</span>{" "}
            {ambulance.maintenanceStatus}
          </p>
        </EditableField>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Dernier entretien</p>
            <EditableField field="dateDernierEntretien" value={ambulance.dateDernierEntretien}>
              <p className="font-medium flex items-center">
                <Calendar size={12} className="mr-1 text-blue-500" />
                {ambulance.dateDernierEntretien}
              </p>
            </EditableField>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Prochain entretien</p>
            <EditableField field="prochainEntretien" value={ambulance.prochainEntretien}>
              <p className="font-medium flex items-center">
                <Calendar size={12} className="mr-1 text-purple-500" />
                {ambulance.prochainEntretien}
              </p>
            </EditableField>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Kilométrage</p>
            <EditableField field="kilometrage" value={ambulance.kilometrage.toString()}>
              <p className="font-medium">
                {ambulance.kilometrage.toLocaleString()} km
              </p>
            </EditableField>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="text-xs text-gray-500">Prochaine révision</p>
            <EditableField field="prochaineRevision" value={ambulance.prochaineRevision}>
              <p className={`font-medium ${kilometrageInfo.color}`}>
                {kilometrageInfo.label}
              </p>
            </EditableField>
          </div>
        </div>
        {ambulance.notes && (
          <EditableField field="notes" value={ambulance.notes}>
            <div className="bg-amber-50 p-2 rounded mt-2">
              <p className="text-xs text-amber-700 flex items-center">
                <FileText size={12} className="mr-1" />
                Notes: {ambulance.notes}
              </p>
            </div>
          </EditableField>
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