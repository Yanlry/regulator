import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import libreIconUrl from "../../assets/libre.png";
import occupeIconUrl from "../../assets/occupe.png";
import pauseIconUrl from "../../assets/pause.png";

interface AmbulanceMapProps {
  theme: string;
}

const defaultCenter: [number, number] = [50.62925, 3.057256]; 

const ambulanceIcons = {
  libre: new L.Icon({ iconUrl: libreIconUrl, iconSize: [32, 32] }),
  occupe: new L.Icon({ iconUrl: occupeIconUrl, iconSize: [32, 32] }),
  pause: new L.Icon({ iconUrl: pauseIconUrl, iconSize: [32, 32] }),
};

const ambulances: Ambulance[] = [
  { id: "AMB-101", equipe: "Martin D. / Sophie L.", lat: 50.62925, lng: 3.057256, status: "libre" }, 
  { id: "AMB-203", equipe: "Thomas B. / Julie R.", lat: 50.690102, lng: 2.889883, status: "occupe" }, 
  { id: "VSL-301", equipe: "Paul G. / Léa M.", lat: 50.518, lng: 2.632, status: "pause" },  
  { id: "AMB-417", equipe: "Hugo T. / Camille R.", lat: 50.284, lng: 2.781, status: "libre" },  
  { id: "VSL-420", equipe: "Emma V. / Nathan S.", lat: 50.723, lng: 2.539, status: "occupe" },  
  { id: "AMB-118", equipe: "Lucas V. / Marie D.", lat: 50.995, lng: 2.295, status: "pause" }, 
];

// Custom Popup component with theme support
interface Ambulance {
  id: string;
  equipe: string;
  lat: number;
  lng: number;
  status: "libre" | "occupe" | "pause";
}

const ThemedPopup = ({ ambulance, theme }: { ambulance: Ambulance, theme: string }) => {
  const popupStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
    color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
    padding: '6px',
    borderRadius: '4px',
    boxShadow: theme === 'dark' ? '0 1px 2px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    color: theme === 'dark' ? '#f3f4f6' : '#111827',
    fontWeight: 'bold' as const,
    marginBottom: '4px'
  };

  const textStyle = {
    color: theme === 'dark' ? '#d1d5db' : '#4b5563',
    fontSize: '14px'
  };

  const statusStyle = {
    fontWeight: 'bold' as const,
    color: getStatusColor(ambulance.status, theme)
  };

  return (
    <div style={popupStyle}>
      <div style={titleStyle}>{ambulance.id}</div>
      <div style={textStyle}>🚑 {ambulance.equipe}</div>
      <div style={textStyle}>
        Statut : <span style={statusStyle}>{ambulance.status}</span>
      </div>
    </div>
  );
};

// Get appropriate color for status based on theme
const getStatusColor = (status: string, theme: string) => {
  if (theme === 'dark') {
    switch (status) {
      case 'libre': return '#34d399'; // green-400
      case 'occupe': return '#f87171'; // red-400
      case 'pause': return '#fbbf24';  // amber-400
      default: return '#9ca3af';       // gray-400
    }
  } else {
    switch (status) {
      case 'libre': return '#059669'; // green-600
      case 'occupe': return '#dc2626'; // red-600
      case 'pause': return '#d97706';  // amber-600
      default: return '#4b5563';       // gray-600
    }
  }
};

const AmbulanceMap: React.FC<AmbulanceMapProps> = ({ theme }) => {
  // Choose map tile layer based on theme
  const tileLayer = theme === 'dark' 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  
  const attribution = theme === 'dark'
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const containerClasses = `
    w-full h-80 rounded-lg overflow-hidden
    ${theme === 'dark' ? 'border border-gray-700' : ''}
  `;

  return (
    <MapContainer center={defaultCenter} zoom={8} className={containerClasses}>
      {/* Couches de la carte adaptée au thème */}
      <TileLayer
        url={tileLayer}
        attribution={attribution}
      />

      {/* Marqueurs des ambulances */}
      {ambulances.map((ambulance) => (
        <Marker
          key={ambulance.id}
          position={[ambulance.lat, ambulance.lng]}
          icon={ambulanceIcons[ambulance.status as keyof typeof ambulanceIcons]} 
        >
          <Popup>
            <ThemedPopup ambulance={ambulance} theme={theme} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AmbulanceMap;