import React from "react";
import { Marker, Circle } from "react-leaflet";
import { AmbulanceMarkerProps } from "../data/types";
import { ambulanceIcons } from "../data/icons";
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