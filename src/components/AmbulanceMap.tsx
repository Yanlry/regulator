import React from 'react';
import { MapPin } from 'lucide-react';

const AmbulanceMap: React.FC = () => {
  // This is a placeholder component for the map
  // In a real application, you would integrate with a mapping library like Leaflet or Google Maps
  
  return (
    <div className="relative h-full w-full bg-blue-50 flex items-center justify-center">
      <div className="absolute w-full h-full">
        {/* This would be replaced with an actual map */}
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="City Map" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      {/* Ambulance markers */}
      <div className="absolute top-1/4 left-1/4">
        <div className="relative">
          <MapPin size={24} className="text-green-600" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute top-1/3 right-1/3">
        <div className="relative">
          <MapPin size={24} className="text-blue-600" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4">
        <div className="relative">
          <MapPin size={24} className="text-red-600" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute bottom-1/3 left-1/3">
        <div className="relative">
          <MapPin size={24} className="text-gray-600" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Hospital markers */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white p-1 rounded-full shadow-md">
          <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 font-bold">H</span>
          </div>
        </div>
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-sm">
          Hôpital Central
        </div>
      </div>
      
      <div className="absolute bottom-1/4 left-1/2">
        <div className="bg-white p-1 rounded-full shadow-md">
          <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 font-bold">H</span>
          </div>
        </div>
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-sm">
          Clinique St. Michel
        </div>
      </div>
    </div>
  );
};

export default AmbulanceMap;