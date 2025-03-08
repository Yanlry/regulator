import React from 'react';
import { Ambulance, Car } from 'lucide-react';
import { VehicleTypeSelectorProps } from './types';

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({ vehicleType, setAppointment }) => {
  
  const handleVehicleTypeChange = (type: 'ambulance' | 'vsl') => {
    setAppointment(prev => ({
      ...prev,
      vehicleType: type
    }));
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
        <div className="p-2 bg-indigo-50 rounded-full mr-3">
          <Car className="text-indigo-600" size={22} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Type de véhicule</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          className={`cursor-pointer rounded-lg border p-4 flex items-center ${
            vehicleType === 'ambulance' 
              ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => handleVehicleTypeChange('ambulance')}
        >
          <div className={`p-3 rounded-full ${vehicleType === 'ambulance' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <Ambulance size={24} className={vehicleType === 'ambulance' ? 'text-indigo-600' : 'text-gray-500'} />
          </div>
          <div className="ml-4">
            <h3 className={`text-lg font-medium ${vehicleType === 'ambulance' ? 'text-indigo-900' : 'text-gray-700'}`}>
              Ambulance
            </h3>
            <p className="text-sm text-gray-500">Transport allongé ou assis avec équipement médical</p>
          </div>
        </div>
        
        <div 
          className={`cursor-pointer rounded-lg border p-4 flex items-center ${
            vehicleType === 'vsl' 
              ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => handleVehicleTypeChange('vsl')}
        >
          <div className={`p-3 rounded-full ${vehicleType === 'vsl' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <Car size={24} className={vehicleType === 'vsl' ? 'text-indigo-600' : 'text-gray-500'} />
          </div>
          <div className="ml-4">
            <h3 className={`text-lg font-medium ${vehicleType === 'vsl' ? 'text-indigo-900' : 'text-gray-700'}`}>
              VSL
            </h3>
            <p className="text-sm text-gray-500">Véhicule Sanitaire Léger pour transport assis</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleTypeSelector;