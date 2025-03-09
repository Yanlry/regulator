import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { MapComponentProps } from "../data/types";
import AmbulanceMarker from "./AmbulanceMarker";
import HopitalMarker from "./HopitalMarker";
import ControlButton from "./ControlButton";
import { hopitaux } from "../data/hopitaux";
import { defaultCenter, defaultZoom } from "../utils/mapUtils";

// Composant pour gérer l'accès à l'instance de la carte
const MapController: React.FC<{ onMapReady: (map: L.Map) => void }> = ({ onMapReady }) => {
  const map = useMap();
  
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  showDetails,
  setShowDetails,
  activeFilters,
  filteredAmbulances,
  handleAmbulanceClick,
}) => {
  const mapRef = useRef<L.Map | null>(null);

  // Fonction mémorisée pour récupérer l'instance de la carte
  const handleMapReady = React.useCallback((map: L.Map) => {
    mapRef.current = map;
  }, []);

  // Redimensionner la carte lorsque le panneau de détails change
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 300);
    }
  }, [showDetails]);

  // Fonction pour basculer l'affichage du panneau de détails
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
  className={`${
    showDetails ? "w-3/4" : "w-full"
  } transition-all duration-300 relative z-10`} // Ajout de z-10
  style={{ height: "100%" }}
>
      <MapContainer
    center={defaultCenter}
    zoom={defaultZoom}
    className="w-full h-full relative z-0"
      >
        <MapController onMapReady={handleMapReady} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marqueurs des hôpitaux */}
        {activeFilters.showHopitaux &&
          hopitaux.map((hopital) => (
            <HopitalMarker key={hopital.id} hopital={hopital} />
          ))}

        {/* Marqueurs des ambulances */}
        {filteredAmbulances.map((ambulance) => (
          <AmbulanceMarker
            key={ambulance.id}
            ambulance={ambulance}
            handleAmbulanceClick={handleAmbulanceClick}
          />
        ))}
      </MapContainer>

      {/* Bouton pour afficher/masquer les détails - avec position fixe */}
      <div className="absolute bottom-4 right-4 z-[60]">
      <ControlButton
        showDetails={showDetails}
        setShowDetails={handleToggleDetails}
      />
    </div>
    </div>
  );
};

export default MapComponent;