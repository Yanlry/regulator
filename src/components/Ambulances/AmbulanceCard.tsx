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
  theme: string; 
}

const AmbulanceCard: React.FC<AmbulanceCardProps> = ({ ambulance, onSelect, theme }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  const getMaintenanceInfo = (status: string) => {
    if (status === "À jour") {
      return {
        color: theme === 'dark' ? "text-green-400" : "text-green-700",
        bgColor: theme === 'dark' ? "bg-green-900" : "bg-green-50",
        icon: <CheckCircle size={14} className="mr-1" />,
      };
    } else if (status === "Entretien imminent") {
      return {
        color: theme === 'dark' ? "text-orange-400" : "text-orange-700",
        bgColor: theme === 'dark' ? "bg-orange-900" : "bg-orange-50",
        icon: <Clock size={14} className="mr-1" />,
      };
    } else if (status.includes("Réparation")) {
      return {
        color: theme === 'dark' ? "text-red-400" : "text-red-700",
        bgColor: theme === 'dark' ? "bg-red-900" : "bg-red-50",
        icon: <Wrench size={14} className="mr-1" />,
      };
    } else {
      return {
        color: theme === 'dark' ? "text-amber-400" : "text-amber-700",
        bgColor: theme === 'dark' ? "bg-amber-900" : "bg-amber-50",
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
      return { 
        label: `Dépassé de ${-remainingKm} km`, 
        color: theme === 'dark' ? "text-red-400" : "text-red-700" 
      };
    if (remainingKm <= 1000)
      return { 
        label: `${remainingKm} km restants`, 
        color: theme === 'dark' ? "text-orange-400" : "text-orange-700" 
      };
    return { 
      label: `${remainingKm} km restants`, 
      color: theme === 'dark' ? "text-green-400" : "text-green-700" 
    };
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

  // Theme-specific classes
  const cardClasses = `
    rounded-md shadow-md p-4 border-l-4
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
    ${ambulance.status === "En service"
      ? "border-green-500"
      : "border-red-500"
    }
  `;

  const titleClasses = `
    text-md font-semibold ml-2
    ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
  `;

  const inputClasses = `
    text-sm border-b-2 border-gray-400 focus:border-blue-500 transition-all w-full outline-none py-1
    ${theme === 'dark' ? 'text-white bg-gray-600' : 'text-gray-800 bg-white'}
  `;

  const editButtonClasses = `
    ml-2 opacity-0 group-hover:opacity-100 transition-opacity 
    ${theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}
  `;

  const modelClasses = `
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
  `;

  const immatriculationClasses = `
    font-medium
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const locationLabelClasses = `
    font-medium
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
  `;

  const locationIconClasses = `
    mr-2
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const locationTextClasses = `
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  `;

  const infoBlockClasses = `
    p-2 rounded
    ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}
  `;

  const infoLabelClasses = `
    text-xs
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const infoValueClasses = `
    font-medium
    ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
  `;

  const notesClasses = `
    p-2 rounded mt-2
    ${theme === 'dark' ? 'bg-amber-900' : 'bg-amber-50'}
  `;

  const notesTextClasses = `
    text-xs flex items-center
    ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}
  `;

  const detailsButtonClasses = `
    mt-2 px-3 py-1 rounded-md text-sm text-white
    ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}
  `;

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
            className={inputClasses}
          />
          <button
            onClick={() => handleSave(field)}
            className="p-1 text-green-500 hover:text-green-400 transition"
          >
            <Check size={20} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-red-500 hover:text-red-400 transition"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          {children}
          <button
            onClick={() => handleEditClick(field)}
            className={editButtonClasses}
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

  const statusBadgeClasses = `
    text-xs px-2 py-1 rounded-full
    ${ambulance.status === "En service"
      ? theme === 'dark' ? "bg-green-800 text-green-200" : "bg-green-100 text-green-700"
      : theme === 'dark' ? "bg-red-800 text-red-200" : "bg-red-100 text-red-700"
    }
  `;

  return (
    <div className={cardClasses}>
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
            <h3 className={titleClasses}>
              {ambulance.id}
            </h3>
          </EditableField>
          <span className={statusBadgeClasses}>
            {ambulance.status}
          </span>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <EditableField field="modele" value={ambulance.modele}>
            <span className={modelClasses}>{ambulance.modele}</span>
          </EditableField>
          <EditableField field="immatriculation" value={ambulance.immatriculation}>
            <span className={immatriculationClasses}>
              {ambulance.immatriculation}
            </span>
          </EditableField>
        </div>
        <EditableField field="localisation" value={ambulance.localisation}>
          <p className={`flex items-center ${locationTextClasses}`}>
            <MapPin size={14} className={locationIconClasses} />
            <span className={locationLabelClasses}>Localisation :</span>{" "}
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
          <div className={infoBlockClasses}>
            <p className={infoLabelClasses}>Dernier entretien</p>
            <EditableField field="dateDernierEntretien" value={ambulance.dateDernierEntretien}>
              <p className={`${infoValueClasses} flex items-center`}>
                <Calendar size={12} className="mr-1 text-blue-500" />
                {ambulance.dateDernierEntretien}
              </p>
            </EditableField>
          </div>
          <div className={infoBlockClasses}>
            <p className={infoLabelClasses}>Prochain entretien</p>
            <EditableField field="prochainEntretien" value={ambulance.prochainEntretien}>
              <p className={`${infoValueClasses} flex items-center`}>
                <Calendar size={12} className="mr-1 text-purple-500" />
                {ambulance.prochainEntretien}
              </p>
            </EditableField>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className={infoBlockClasses}>
            <p className={infoLabelClasses}>Kilométrage</p>
            <EditableField field="kilometrage" value={ambulance.kilometrage.toString()}>
              <p className={infoValueClasses}>
                {ambulance.kilometrage.toLocaleString()} km
              </p>
            </EditableField>
          </div>
          <div className={infoBlockClasses}>
            <p className={infoLabelClasses}>Prochaine révision</p>
            <EditableField field="prochaineRevision" value={ambulance.prochaineRevision}>
              <p className={`${infoValueClasses} ${kilometrageInfo.color}`}>
                {kilometrageInfo.label}
              </p>
            </EditableField>
          </div>
        </div>
        {ambulance.notes && (
          <EditableField field="notes" value={ambulance.notes}>
            <div className={notesClasses}>
              <p className={notesTextClasses}>
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
        className={detailsButtonClasses}
      >
        Détails
      </button>
    </div>
  );
};

export default AmbulanceCard;