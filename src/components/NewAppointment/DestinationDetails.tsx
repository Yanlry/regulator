import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { MapPin, Building, Navigation, Phone, User, Check } from 'lucide-react';
import { DestinationDetailsProps } from './types';

const DestinationDetails: React.FC<DestinationDetailsProps> = ({ destination, setAppointment }) => {
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointment(prev => ({
      ...prev,
      destination: {
        ...prev.destination,
        [name]: value
      }
    }));
  };

  const commonDestinations = [
    { name: "Hôpital Saint-Louis", address: "1 Avenue Claude Vellefaux, 75010 Paris" },
    { name: "Clinique du Parc", address: "155 Ter Boulevard de Stalingrad, 94240 L'Haÿ-les-Roses" },
    { name: "Centre de Rééducation Maurice Dantec", address: "25 Rue Mathurin Régnier, 75015 Paris" }
  ];

  const handleSelectCommon = (address: string) => {
    setAppointment(prev => ({
      ...prev,
      destination: {
        ...prev.destination,
        address
      }
    }));
  };

  // Dynamic theming classes
  const containerClasses = theme === 'dark'
    ? 'p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700 text-gray-100'
    : 'p-6 bg-white rounded-xl shadow-md border border-gray-100';

  const headerClasses = theme === 'dark'
    ? 'flex items-center mb-6 pb-3 border-b border-gray-700'
    : 'flex items-center mb-6 pb-3 border-b border-gray-100';

  const headerTitleClasses = theme === 'dark'
    ? 'text-xl font-semibold text-gray-100'
    : 'text-xl font-semibold text-gray-800';

  const iconBackgroundClasses = theme === 'dark'
    ? 'p-2 bg-red-900 rounded-full mr-3'
    : 'p-2 bg-red-50 rounded-full mr-3';

  const iconClasses = theme === 'dark'
    ? 'text-red-400'
    : 'text-red-600';

  const labelClasses = theme === 'dark'
    ? 'block text-sm font-medium text-gray-400 mb-1'
    : 'block text-sm font-medium text-gray-700 mb-1';

    const inputClasses = theme === 'dark'
    ? 'focus:ring-green-500 focus:border-green-500 block w-full py-2.5 pl-10 sm:text-sm bg-gray-700 border-gray-600 rounded-md text-white placeholder-gray-400'
    : 'focus:ring-green-500 focus:border-green-500 block w-full py-2.5 pl-10 sm:text-sm border-gray-300 rounded-md';
  
  const textareaClasses = theme === 'dark'
    ? 'focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400'
    : 'focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3';

  const commonDestinationButtonClasses = theme === 'dark'
    ? 'inline-flex items-center px-3 py-1 text-xs font-medium text-red-400 bg-red-900 rounded-md hover:bg-red-800 transition border border-red-800'
    : 'inline-flex items-center px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition border border-red-100';

  const confirmedDestinationClasses = theme === 'dark'
    ? 'mt-4 p-3 bg-red-900 border border-red-800 rounded-lg flex items-start'
    : 'mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start';

  return (
    <section className={containerClasses}>
      <div className={headerClasses}>
        <div className={iconBackgroundClasses}>
          <MapPin className={iconClasses} size={22} />
        </div>
        <h2 className={headerTitleClasses}>Destination</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className={labelClasses}>
            Adresse complète
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              name="address"
              value={destination.address}
              onChange={handleChange}
              placeholder="Établissement, numéro, rue, code postal, ville"
              className={inputClasses}
            />
          </div>
          
          <div className="mt-3">
            <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mb-2`}>
              Destinations fréquentes :
            </p>
            <div className="flex flex-wrap gap-2">
              {commonDestinations.map((dest, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectCommon(dest.address)}
                  className={commonDestinationButtonClasses}
                >
                  <Building className="mr-1" size={14} />
                  {dest.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className={labelClasses}>
              Service
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Navigation className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                name="service"
                value={destination.service || ''}
                onChange={handleChange}
                placeholder="Ex: Cardiologie + nom du médecin"
                className={inputClasses}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>
              Personne à contacter
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                name="contactPerson"
                value={destination.contactPerson || ''}
                onChange={handleChange}
                placeholder="Nom du contact sur place"
                className={inputClasses}
              />
            </div>
          </div>
          
          <div>
            <label className={labelClasses}>
              Téléphone du contact
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="tel"
                name="contactPhone"
                value={destination.contactPhone || ''}
                onChange={handleChange}
                placeholder="Ex: 06 xx xx xx xx"
                className={inputClasses}
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className={labelClasses}>
            Instructions particulières
          </label>
          <textarea
            name="notes"
            value={destination.notes}
            onChange={handleChange}
            rows={3}
            className={textareaClasses}
            placeholder="Précisions pour l'arrivée, chemin à suivre, formalités particulières..."
          />
          <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            Ces informations faciliteront l'arrivée du patient à destination.
          </p>
        </div>
      </div>
      
      {destination.address && (
        <div className={confirmedDestinationClasses}>
          <div className="mt-0.5">
            <Check className={iconClasses} size={18} />
          </div>
          <div className="ml-2">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-800'}`}>
              Destination confirmée
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-red-500' : 'text-red-700'}`}>
              {destination.address}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DestinationDetails;