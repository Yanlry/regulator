import React, { useState, useEffect } from 'react';
import {
  Car,
  Edit2,
  Check,
  X,
  ShieldCheck,
  Circle,
  Cog,
  Disc,
  Droplet,
  Gauge,
  Calendar,
  CheckCircle,
  MapPin,
  FileText
} from 'lucide-react';
import { Ambulance } from '../../types';
import { materielAmbulance, materielVSL } from './data';

interface RevisionDetailsProps {
  ambulance: Ambulance;
  onClose: () => void;
  theme: string;
}

const RevisionDetails: React.FC<RevisionDetailsProps> = ({ ambulance, onClose, theme }) => {
  const [materielObligatoire] = useState(
    ambulance.type === "VSL" ? materielVSL : materielAmbulance
  );
  
  // Fixed syntax for state declaration
  const [datesPeremption, setDatesPeremption] = useState<Record<number, string>>({});
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  useEffect(() => {
    // Initialize dates with empty strings
    const initialDates: Record<number, string> = {};
    materielObligatoire.forEach(item => {
      initialDates[item.id] = "";
    });
    setDatesPeremption(initialDates);
  }, [materielObligatoire]);

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

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleSave = (field: keyof Ambulance) => {
    handleChange(field, tempValue);
    setEditingField(null);
    setTempValue("");
  };

  const handleDateChange = (id: number, date: string) => {
    setDatesPeremption(prev => ({
      ...prev,
      [id]: date,
    }));
  };

  // Theme-specific classes
  const containerClasses = `
    p-6 rounded-lg shadow-lg space-y-6
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const titleClasses = `
    text-2xl font-bold flex items-center gap-2
    ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
  `;

  const closeButtonClasses = `
    px-4 py-2 rounded-lg text-sm
    transition-colors flex items-center
    border
    ${theme === 'dark' 
      ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 border-gray-500' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'}
  `;

  const infoGridClasses = `
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-lg shadow-md
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const infoItemClasses = `
    flex items-center space-x-2 p-3 rounded-md border transition
    ${theme === 'dark' 
      ? 'bg-gray-600 border-gray-500 hover:bg-gray-500' 
      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}
  `;

  const infoLabelClasses = `
    text-sm font-semibold
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  `;

  const infoValueClasses = `
    block text-md
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const detailsGridClasses = `
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 rounded-lg shadow-md
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
  `;

  const detailItemClasses = `
    flex items-center gap-4 p-4 rounded-md border transition
    ${theme === 'dark' 
      ? 'bg-gray-600 border-gray-500 hover:bg-gray-500' 
      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}
  `;

  const inputClasses = `
    text-sm border-b-2 transition-all w-full outline-none py-1
    ${theme === 'dark' 
      ? 'text-white bg-gray-600 border-gray-500 focus:border-blue-400' 
      : 'text-gray-800 bg-transparent border-gray-400 focus:border-blue-500'}
  `;

  const detailLabelClasses = `
    text-md font-semibold
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
  `;

  const detailValueClasses = `
    text-sm cursor-pointer transition
    ${theme === 'dark' 
      ? 'text-gray-300 hover:text-blue-400' 
      : 'text-gray-600 hover:text-blue-600'}
  `;

  const editButtonClasses = `
    p-1 transition
    ${theme === 'dark' 
      ? 'text-gray-400 hover:text-blue-400' 
      : 'text-gray-400 hover:text-blue-500'}
  `;

  const saveButtonClasses = `
    p-1 transition
    ${theme === 'dark' ? 'text-green-400 hover:text-green-500' : 'text-green-500 hover:text-green-700'}
  `;

  const cancelButtonClasses = `
    p-1 transition
    ${theme === 'dark' ? 'text-red-400 hover:text-red-500' : 'text-red-500 hover:text-red-700'}
  `;

  const materielContainerClasses = `
    p-4 rounded-lg shadow-sm
    ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-50'}
  `;

  const materielTitleClasses = `
    text-md font-semibold flex items-center gap-2
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const materielItemClasses = `
    flex justify-between items-center p-3 rounded-lg border shadow-sm
    ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}
  `;

  const materielLabelClasses = `
    text-sm font-medium
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  `;

  const materielInputClasses = `
    border rounded-lg p-2 text-sm
    ${theme === 'dark' 
      ? 'bg-gray-600 border-gray-500 text-white' 
      : 'bg-white border-gray-300 text-gray-700'}
  `;

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={titleClasses}>
          {ambulance.type === "Ambulance" ? "🚑" : "🚗"} Détails de {ambulance.id}
        </h2>
        <button
          onClick={onClose}
          className={closeButtonClasses}
        >
          <X className="mr-2 w-4 h-4" /> Fermer
        </button>
      </div>
      
      {/* Informations supplémentaires */}
      <div className="space-y-4">
        <div className={infoGridClasses}>
          <div className={infoItemClasses}>
            <Car size={18} className="text-blue-500" />
            <div>
              <strong className={infoLabelClasses}>
                Modèle :
              </strong>
              <span className={infoValueClasses}>
                {ambulance.modele}
              </span>
            </div>
          </div>
          <div className={infoItemClasses}>
            <FileText size={18} className="text-green-500" />
            <div>
              <strong className={infoLabelClasses}>
                Immatriculation :
              </strong>
              <span className={infoValueClasses}>
                {ambulance.immatriculation}
              </span>
            </div>
          </div>
          <div className={infoItemClasses}>
            <CheckCircle size={18} className="text-teal-500" />
            <div>
              <strong className={infoLabelClasses}>
                Statut :
              </strong>
              <span className={infoValueClasses}>
                {ambulance.status}
              </span>
            </div>
          </div>
          <div className={infoItemClasses}>
            <MapPin size={18} className="text-red-500" />
            <div>
              <strong className={infoLabelClasses}>
                Localisation :
              </strong>
              <span className={infoValueClasses}>
                {ambulance.localisation}
              </span>
            </div>
          </div>
          <div className={infoItemClasses}>
            <Gauge size={18} className="text-purple-500" />
            <div>
              <strong className={infoLabelClasses}>
                Kilométrage :
              </strong>
              <span className={infoValueClasses}>
                {ambulance.kilometrage} km
              </span>
            </div>
          </div>
          <div className={infoItemClasses}>
            <Droplet size={18} className="text-yellow-500" />
            <div>
              <strong className={infoLabelClasses}>
                Carburant :
              </strong>
              <span className={infoValueClasses}>
                {ambulance.carburant}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={detailsGridClasses}>
        {[
          { label: "Pneus", field: "pneus", icon: <Circle size={20} className="text-blue-500" /> },
          { label: "Freins", field: "freins", icon: <Disc size={20} className="text-red-500" /> },
          { label: "Dernière vidange", field: "derniereVidange", icon: <Droplet size={20} className="text-yellow-500" /> },
          { label: "Courroie distribution", field: "courroieDistribution", icon: <Cog size={20} className="text-gray-500" /> },
          { label: "Prochaine révision", field: "prochaineRevision", icon: <Calendar size={20} className="text-green-500" /> },
          { label: "Contrôle technique", field: "ct", icon: <ShieldCheck size={20} className="text-purple-500" /> },
          { label: "Disponibilité", field: "disponibilite", icon: <CheckCircle size={20} className="text-teal-500" /> },
        ].map(({ label, field, icon }) => (
          <div key={field} className={detailItemClasses}>
            <span className="text-xl">{icon}</span>
            {editingField === field ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className={inputClasses}
                />
                <button
                  onClick={() => handleSave(field as keyof Ambulance)}
                  className={saveButtonClasses}
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={handleCancel}
                  className={cancelButtonClasses}
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col flex-grow">
                <span className={detailLabelClasses}>{label}</span>
                <span
                  className={detailValueClasses}
                  onClick={() => handleEditClick(field as keyof Ambulance)}
                >
                  {ambulance[field as keyof Ambulance]}
                </span>
              </div>
            )}
            {editingField !== field && (
              <button
                onClick={() => handleEditClick(field as keyof Ambulance)}
                className={editButtonClasses}
              >
                <Edit2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Péremption du matériel */}
      <div className={materielContainerClasses}>
        <h3 className={materielTitleClasses}>
          Péremption du matériel
        </h3>
        <div className="mt-2 space-y-2">
          {materielObligatoire.map((item) => (
            <div
              key={item.id}
              className={materielItemClasses}
            >
              <span className={materielLabelClasses}>
                {item.nom}
              </span>
              <input
                type="date"
                className={materielInputClasses}
                value={datesPeremption[item.id] || ""}
                onChange={(e) => handleDateChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevisionDetails;