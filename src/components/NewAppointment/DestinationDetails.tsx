import React from 'react';
import { MapPin, Building, Navigation, Phone, User, Check } from 'lucide-react';
import { DestinationDetailsProps } from './types';

const DestinationDetails: React.FC<DestinationDetailsProps> = ({ destination, setAppointment }) => {
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

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
        <div className="p-2 bg-red-50 rounded-full mr-3">
          <MapPin className="text-red-600" size={22} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Destination</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse complète
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              value={destination.address}
              onChange={handleChange}
              placeholder="Établissement, numéro, rue, code postal, ville"
              className="pl-10 shadow-sm focus:ring-red-500 focus:border-red-500 block w-full py-2.5 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-500 mb-2">Destinations fréquentes :</p>
            <div className="flex flex-wrap gap-2">
              {commonDestinations.map((dest, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectCommon(dest.address)}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition border border-red-100"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Navigation className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="service"
                value={destination.service || ''}
                onChange={handleChange}
                placeholder="Ex: Cardiologie + nom du médecin"
                className="pl-9 shadow-sm focus:ring-red-500 focus:border-red-500 block w-full py-2.5 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          
      
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personne à contacter
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="contactPerson"
                value={destination.contactPerson || ''}
                onChange={handleChange}
                placeholder="Nom du contact sur place"
                className="pl-9 shadow-sm focus:ring-red-500 focus:border-red-500 block w-full py-2.5 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone du contact
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="tel"
                name="contactPhone"
                value={destination.contactPhone || ''}
                onChange={handleChange}
                placeholder="Ex: 06 xx xx xx xx"
                className="pl-9 shadow-sm focus:ring-red-500 focus:border-red-500 block w-full py-2.5 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions particulières
          </label>
          <textarea
            name="notes"
            value={destination.notes}
            onChange={handleChange}
            rows={3}
            className="mt-1 shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3"
            placeholder="Précisions pour l'arrivée, chemin à suivre, formalités particulières..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Ces informations faciliteront l'arrivée du patient à destination.
          </p>
        </div>
      </div>
      
      {destination.address && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <div className="mt-0.5">
            <Check className="text-red-600" size={18} />
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-red-800">Destination confirmée</p>
            <p className="text-xs text-red-700">{destination.address}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DestinationDetails;