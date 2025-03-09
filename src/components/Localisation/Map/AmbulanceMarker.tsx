import React from "react";
import { Marker, Popup, Circle } from "react-leaflet";
import { AmbulanceMarkerProps } from "../data/types";
import { ambulanceIcons } from "../data/icons";
import {
  FaUser,
  FaMapMarkerAlt,
  FaRegHospital,
  FaClock,
  FaRoute,
} from "react-icons/fa";

const AmbulanceMarker: React.FC<AmbulanceMarkerProps> = ({
  ambulance,
  handleAmbulanceClick,
}) => {
  return (
    <React.Fragment>
      <Marker
        position={[ambulance.lat, ambulance.lng]}
        icon={ambulanceIcons[ambulance.status as keyof typeof ambulanceIcons]}
        eventHandlers={{
          click: () => handleAmbulanceClick(ambulance.id),
        }}
      >
        <Popup>
          <div className="text-sm">
            <h3 className="text-lg font-semibold flex items-center">
              🚑 {ambulance.id}
              {ambulance.urgence && (
                <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full animate-pulse">
                  URGENCE
                </span>
              )}
            </h3>
            <p className="flex items-center text-gray-700">
              <FaUser className="mr-2 text-blue-500" />
              Équipage: {ambulance.equipe}
            </p>
            <p className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              Localisation: {ambulance.localisation}
            </p>
            {ambulance.destination && (
              <p className="flex items-center text-gray-700">
                <FaRegHospital className="mr-2 text-green-500" />
                Destination: {ambulance.destination}
              </p>
            )}
            <p className="flex items-center text-gray-700">
              <FaClock className="mr-2 text-gray-500" />
              Départ: {ambulance.heureDepart} - Arrivée: {ambulance.heureArrivee}
            </p>
            <p
              className={`text-sm font-semibold flex items-center mt-2 ${
                ambulance.status === "libre"
                  ? "text-green-600"
                  : ambulance.status === "occupe"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              <FaRoute className="mr-2" />
              Statut: {ambulance.status.charAt(0).toUpperCase() + ambulance.status.slice(1)}
            </p>
            <button
              onClick={() => handleAmbulanceClick(ambulance.id)}
              className="mt-2 w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600"
            >
              Détails complets
            </button>
          </div>
        </Popup>
      </Marker>

      {/* Zone d'autonomie (en fonction du carburant et de la distance disponible) */}
      {ambulance.status === "libre" && (
        <Circle
          center={[ambulance.lat, ambulance.lng]}
          radius={ambulance.carburant * 100} 
          pathOptions={{
            fillColor: "green",
            fillOpacity: 0.05,
            color: "green",
            weight: 1,
            opacity: 0.3,
          }}
        />
      )}
    </React.Fragment>
  );
};

export default AmbulanceMarker;