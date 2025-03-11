import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { MapPin, Calendar, Clock, Home, Building, Info } from 'lucide-react';
import { PickupDetailsProps } from './types';

const PickupDetails: React.FC<PickupDetailsProps> = ({ pickup, setAppointment }) => {
  const { theme } = useTheme();
  
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

  const sectionClasses = theme === 'dark' 
    ? 'p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700' 
    : 'p-6 bg-white rounded-xl shadow-md border border-gray-100';
    
  const titleClasses = theme === 'dark'
    ? 'text-xl font-semibold text-gray-100'
    : 'text-xl font-semibold text-gray-800';
    
  const labelClasses = theme === 'dark'
    ? 'block text-sm font-medium text-gray-300 mb-1'
    : 'block text-sm font-medium text-gray-700 mb-1';
    
  const inputClasses = theme === 'dark'
    ? 'focus:ring-green-500 focus:border-green-500 block w-full py-2.5 pl-10 sm:text-sm bg-gray-700 border-gray-600 rounded-md text-white placeholder-gray-400'
    : 'focus:ring-green-500 focus:border-green-500 block w-full py-2.5 pl-10 sm:text-sm border-gray-300 rounded-md';
  
  const textareaClasses = theme === 'dark'
    ? 'focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400'
    : 'focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3';
    
  const notesClasses = theme === 'dark'
    ? 'mt-1 text-xs text-gray-500'
    : 'mt-1 text-xs text-gray-500';

  return (
    <section className={sectionClasses}>
      <div className="flex items-center mb-6 pb-3 border-b border-gray-700">
        <div className="p-2 bg-green-900 rounded-full mr-3">
          <MapPin className="text-green-400" size={22} />
        </div>
        <h2 className={titleClasses}>Lieu de Prise en Charge</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className={labelClasses}>
            Adresse complète
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="address"
              value={pickup.address}
              onChange={handleChange}
              placeholder="Numéro, rue, code postal, ville"
              className={`${inputClasses} pl-10`}
            />
          </div>
          <div className="mt-1.5 flex justify-end">
            <button 
              type="button" 
              className={`inline-flex items-center px-3 py-1 text-xs font-medium ${theme === 'dark' ? 'text-green-400 bg-green-900 hover:bg-green-800' : 'text-green-700 bg-green-100 hover:bg-green-200'} rounded-md transition`}
            >
              <Building className="mr-1" size={14} />
              Sélectionner un établissement
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={`${labelClasses} flex items-center`}>
              <span>Date de prise en charge</span>
              <span title="Date à laquelle le patient doit être pris en charge">
                <Info size={14} className={`ml-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} cursor-help`} />
              </span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="date"
                name="date"
                min={today}
                value={pickup.date}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
          
          <div>
            <label className={labelClasses}>
              Heure de prise en charge
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="time"
                name="time"
                value={pickup.time}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className={labelClasses}>
            Instructions particulières
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <textarea
              name="notes"
              value={pickup.notes}
              onChange={handleChange}
              rows={3}
              className={textareaClasses}
              placeholder="Code d'entrée, étage, point de rencontre, personne à contacter sur place..."
            />
          </div>
          <p className={notesClasses}>
            Ces informations seront transmises à l'équipe d'ambulanciers pour faciliter la prise en charge.
          </p>
        </div>
      </div>
      
      {pickup.address && pickup.date && pickup.time && (
        <div className={`mt-4 p-3 border rounded-lg flex items-start ${theme === 'dark' ? 'bg-green-900 border-green-800 text-green-500' : 'bg-green-50 border-green-200 text-green-800'}`}>
          <div className="mt-0.5">
            <MapPin className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} size={18} />
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">Prise en charge prévue</p>
            <p className="text-xs">
              {pickup.address} • {pickup.date && new Date(pickup.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à {pickup.time}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PickupDetails;