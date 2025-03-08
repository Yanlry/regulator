import React from 'react';
import { MapPin, Calendar, Clock, Home, Building, Info } from 'lucide-react';
import { PickupDetailsProps } from './types';

const PickupDetails: React.FC<PickupDetailsProps> = ({ pickup, setAppointment }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointment(prev => ({
      ...prev,
      pickup: {
        ...prev.pickup,
        [name]: value
      }
    }));
  };

  const today = new Date().toISOString().split('T')[0]; 

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
        <div className="p-2 bg-green-50 rounded-full mr-3">
          <MapPin className="text-green-600" size={22} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Lieu de Prise en Charge</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse complète
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              value={pickup.address}
              onChange={handleChange}
              placeholder="Numéro, rue, code postal, ville"
              className="pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full py-2.5 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-1.5 flex justify-end">
            <button 
              type="button" 
              className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 transition"
            >
              <Building className="mr-1" size={14} />
              Sélectionner un établissement
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <span>Date de prise en charge</span>
              <span title="Date à laquelle le patient doit être pris en charge">
                <Info size={14} className="ml-1 text-gray-400 cursor-help" />
              </span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                min={today}
                value={pickup.date}
                onChange={handleChange}
                className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 py-2.5 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heure de prise en charge
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                name="time"
                value={pickup.time}
                onChange={handleChange}
                className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 py-2.5 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions particulières
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <textarea
              name="notes"
              value={pickup.notes}
              onChange={handleChange}
              rows={3}
              className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
              placeholder="Code d'entrée, étage, point de rencontre, personne à contacter sur place..."
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Ces informations seront transmises à l'équipe d'ambulanciers pour faciliter la prise en charge.
          </p>
        </div>
      </div>
      
      {pickup.address && pickup.date && pickup.time && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <div className="mt-0.5">
            <MapPin className="text-green-600" size={18} />
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-green-800">Prise en charge prévue</p>
            <p className="text-xs text-green-700">
              {pickup.address} • {pickup.date && new Date(pickup.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à {pickup.time}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PickupDetails;