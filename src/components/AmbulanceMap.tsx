// src/components/AmbulanceMap.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Définition du centre de la carte (Nord-Pas-de-Calais)
const defaultCenter: [number, number] = [50.62925, 3.057256]; // Lille

// Chargement des icônes d'ambulance
import libreIconUrl from "../assets/libre.png";
import occupeIconUrl from "../assets/occupe.png";
import pauseIconUrl from "../assets/pause.png";

// Définition des icônes personnalisées
const ambulanceIcons = {
  libre: new L.Icon({ iconUrl: libreIconUrl, iconSize: [32, 32] }),
  occupe: new L.Icon({ iconUrl: occupeIconUrl, iconSize: [32, 32] }),
  pause: new L.Icon({ iconUrl: pauseIconUrl, iconSize: [32, 32] }),
};

// Données des ambulances avec leur statut et leur localisation
const ambulances = [
  { id: "AMB-101", equipe: "Martin D. / Sophie L.", lat: 50.62925, lng: 3.057256, status: "libre" }, // Lille
  { id: "AMB-203", equipe: "Thomas B. / Julie R.", lat: 50.690102, lng: 2.889883, status: "occupe" }, // Armentières
  { id: "VSL-301", equipe: "Paul G. / Léa M.", lat: 50.518, lng: 2.632, status: "pause" }, // Béthune
  { id: "AMB-417", equipe: "Hugo T. / Camille R.", lat: 50.284, lng: 2.781, status: "libre" }, // Arras
  { id: "VSL-420", equipe: "Emma V. / Nathan S.", lat: 50.723, lng: 2.539, status: "occupe" }, // Dunkerque
  { id: "AMB-118", equipe: "Lucas V. / Marie D.", lat: 50.995, lng: 2.295, status: "pause" }, // Calais
];

const AmbulanceMap: React.FC = () => {
  return (
    <MapContainer center={defaultCenter} zoom={8} className="w-full h-80 rounded-lg overflow-hidden">
      {/* Couches de la carte OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marqueurs des ambulances */}
      {ambulances.map((ambulance) => (
        <Marker
          key={ambulance.id}
          position={[ambulance.lat, ambulance.lng]}
          icon={ambulanceIcons[ambulance.status as keyof typeof ambulanceIcons]} // Sélection de l'icône selon le statut
        >
          <Popup>
            <strong>{ambulance.id}</strong><br />
            🚑 {ambulance.equipe}<br />
            Statut : {ambulance.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AmbulanceMap;