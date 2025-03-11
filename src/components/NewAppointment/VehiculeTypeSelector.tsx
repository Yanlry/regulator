import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Ambulance, Car } from 'lucide-react';
import { VehicleTypeSelectorProps } from './types';

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({ vehicleType, setAppointment }) => {
  const { theme } = useTheme();

  const handleVehicleTypeChange = (type: 'ambulance' | 'vsl') => {
    setAppointment(prev => ({
      ...prev,
      vehicleType: type
    }));
  };

  const sectionClasses = theme === 'dark' 
    ? 'p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700'
    : 'p-6 bg-white rounded-xl shadow-md border border-gray-100';

  const titleClasses = theme === 'dark'
    ? 'text-xl font-semibold text-gray-100'  
    : 'text-xl font-semibold text-gray-800';

  const cardClasses = (selected: boolean) => theme === 'dark'
    ? `cursor-pointer rounded-lg border p-4 flex items-center ${selected ? 'border-indigo-500 bg-indigo-900 ring-2 ring-indigo-700' : 'border-gray-700 hover:bg-gray-700'}`  
    : `cursor-pointer rounded-lg border p-4 flex items-center ${selected ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'border-gray-200 hover:bg-gray-50'}`;

  const iconClasses = (selected: boolean) => theme === 'dark'
    ? `p-3 rounded-full ${selected ? 'bg-indigo-800' : 'bg-gray-700'}`
    : `p-3 rounded-full ${selected ? 'bg-indigo-100' : 'bg-gray-100'}`;

  const titleTextClasses = (selected: boolean) => theme === 'dark' 
    ? `text-lg font-medium ${selected ? 'text-indigo-400' : 'text-gray-300'}`
    : `text-lg font-medium ${selected ? 'text-indigo-900' : 'text-gray-700'}`;

  const descriptionTextClasses = theme === 'dark'
    ? 'text-sm text-gray-400'
    : 'text-sm text-gray-500';

  return (
    <section className={sectionClasses}>
      <div className="flex items-center mb-6 pb-3 border-b border-gray-700">
        <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-50'}`}>
          <Car className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} size={22} />  
        </div>
        <h2 className={titleClasses}>Type de véhicule</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          className={cardClasses(vehicleType === 'ambulance')}
          onClick={() => handleVehicleTypeChange('ambulance')}
        >
          <div className={iconClasses(vehicleType === 'ambulance')}>
            <Ambulance size={24} className={vehicleType === 'ambulance' ? `${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}` : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="ml-4">
            <h3 className={titleTextClasses(vehicleType === 'ambulance')}>
              Ambulance
            </h3>
            <p className={descriptionTextClasses}>Transport allongé ou assis avec équipement médical</p>  
          </div>
        </div>
        
        <div 
          className={cardClasses(vehicleType === 'vsl')}  
          onClick={() => handleVehicleTypeChange('vsl')}
        >
          <div className={iconClasses(vehicleType === 'vsl')}>
            <Car size={24} className={vehicleType === 'vsl' ? `${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}` : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <div className="ml-4"> 
            <h3 className={titleTextClasses(vehicleType === 'vsl')}>
              VSL
            </h3>
            <p className={descriptionTextClasses}>Véhicule Sanitaire Léger pour transport assis</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleTypeSelector;