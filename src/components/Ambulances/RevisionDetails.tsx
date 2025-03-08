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
}

const RevisionDetails: React.FC<RevisionDetailsProps> = ({ ambulance, onClose }) => {
  const [materielObligatoire] = useState(
    ambulance.type === "VSL" ? materielVSL : materielAmbulance
  );
  const [datesPeremption, setDatesPeremption] = useState<
    Record<number, string>
  >({});
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  useEffect(() => {
    setDatesPeremption(
      materielObligatoire.reduce((acc, item) => {
        acc[item.id] = "";
        return acc;
      }, {} as Record<number, string>)
    );
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
    setDatesPeremption((prev) => ({
      ...prev,
      [id]: date,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        {ambulance.type === "Ambulance" ? "🚑" : "🚗"} Détails de {ambulance.id}
      </h2>

      {/* Informations supplémentaires */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition">
            <Car size={18} className="text-blue-500" />
            <div>
              <strong className="text-sm font-semibold text-gray-700">
                Modèle :
              </strong>
              <span className="block text-md text-gray-800">
                {ambulance.modele}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition">
            <FileText size={18} className="text-green-500" />
            <div>
              <strong className="text-sm font-semibold text-gray-700">
                Immatriculation :
              </strong>
              <span className="block text-md text-gray-800">
                {ambulance.immatriculation}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition">
            <CheckCircle size={18} className="text-teal-500" />
            <div>
              <strong className="text-sm font-semibold text-gray-700">
                Statut :
              </strong>
              <span className="block text-md text-gray-800">
                {ambulance.status}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition">
            <MapPin size={18} className="text-red-500" />
            <div>
              <strong className="text-sm font-semibold text-gray-700">
                Localisation :
              </strong>
              <span className="block text-md text-gray-800">
                {ambulance.localisation}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition">
            <Gauge size={18} className="text-purple-500" />
            <div>
              <strong className="text-sm font-semibold text-gray-700">
                Kilométrage :
              </strong>
              <span className="block text-md text-gray-800">
                {ambulance.kilometrage} km
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition">
            <Droplet size={18} className="text-yellow-500" />
            <div>
              <strong className="text-sm font-semibold text-gray-700">
                Carburant :
              </strong>
              <span className="block text-md text-gray-800">
                {ambulance.carburant}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 bg-white rounded-lg shadow-md">
        {[
          { label: "Pneus", field: "pneus", icon: <Circle size={20} className="text-blue-500" /> },
          { label: "Freins", field: "freins", icon: <Disc size={20} className="text-red-500" /> },
          { label: "Dernière vidange", field: "derniereVidange", icon: <Droplet size={20} className="text-yellow-500" /> },
          { label: "Courroie distribution", field: "courroieDistribution", icon: <Cog size={20} className="text-gray-500" /> },
          { label: "Prochaine révision", field: "prochaineRevision", icon: <Calendar size={20} className="text-green-500" /> },
          { label: "Contrôle technique", field: "ct", icon: <ShieldCheck size={20} className="text-purple-500" /> },
          { label: "Disponibilité", field: "disponibilite", icon: <CheckCircle size={20} className="text-teal-500" /> },
        ].map(({ label, field, icon }) => (
          <div key={field} className="flex items-center gap-4 p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition">
            <span className="text-xl">{icon}</span>
            {editingField === field ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="text-sm text-gray-800 border-b-2 border-gray-400 focus:border-blue-500 transition-all w-full outline-none py-1"
                />
                <button
                  onClick={() => handleSave(field as keyof Ambulance)}
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
              <div className="flex flex-col flex-grow">
                <span className="text-md font-semibold text-gray-700">{label}</span>
                <span
                  className="text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition"
                  onClick={() => handleEditClick(field as keyof Ambulance)}
                >
                  {ambulance[field as keyof Ambulance]}
                </span>
              </div>
            )}
            {editingField !== field && (
              <button
                onClick={() => handleEditClick(field as keyof Ambulance)}
                className="p-1 text-gray-400 hover:text-blue-500 transition"
              >
                <Edit2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Péremption du matériel */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
          Péremption du matériel
        </h3>
        <div className="mt-2 space-y-2">
          {materielObligatoire.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-3 rounded-lg border shadow-sm"
            >
              <span className="text-sm font-medium text-gray-700">
                {item.nom}
              </span>
              <input
                type="date"
                className="border rounded-lg p-2 text-sm"
                value={datesPeremption[item.id] || ""}
                onChange={(e) => handleDateChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
      >
        Fermer
      </button>
    </div>
  );
};

export default RevisionDetails;