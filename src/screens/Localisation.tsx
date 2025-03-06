import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import libreIconUrl from "../assets/libre.png";
import occupeIconUrl from "../assets/occupe.png";
import pauseIconUrl from "../assets/pause.png";
import {
  FaMapMarkerAlt,
  FaUser,
  FaClock,
  FaRoute,
  FaRegHospital,
} from "react-icons/fa";

const defaultCenter: [number, number] = [50.62925, 3.057256];

const ambulanceIcons = {
  libre: new L.Icon({ iconUrl: libreIconUrl, iconSize: [32, 32] }),
  occupe: new L.Icon({ iconUrl: occupeIconUrl, iconSize: [32, 32] }),
  pause: new L.Icon({ iconUrl: pauseIconUrl, iconSize: [32, 32] }),
};

const ambulances = [
  {
    id: "AMB-101",
    equipe: "Martin D. / Sophie L.",
    lat: 50.62925,
    lng: 3.057256,
    status: "libre",
    localisation: "35 Rue Jean Sans Peur, Lille",
    destination: "12 Rue de la Justice, Lys-Lez-Lannoy",
    heureDepart: "10:00",
    heureArrivee: "10:16",
  },
  {
    id: "AMB-203",
    equipe: "Thomas B. / Julie R.",
    lat: 50.690102,
    lng: 2.889883,
    status: "occupe",
    localisation: "187 Avenue de la République, Marcq-en-Baroeul",
    destination: "Hospital Claude Huriez, Centre Sud",
    heureDepart: "10:30",
    heureArrivee: "10:58",
  },
  {
    id: "VSL-301",
    equipe: "Paul G. / Léa M.",
    lat: 50.518,
    lng: 2.632,
    status: "pause",
    localisation: "12 Rue Jouffroy, Lys-Lez-Lannoy",
    destination: "Hôpital Victor Provo",
    heureDepart: "11:00",
    heureArrivee: "11:07",
  },
  {
    id: "AMB-417",
    equipe: "Hugo T. / Camille R.",
    lat: 50.284,
    lng: 2.781,
    status: "libre",
    localisation: "CH. Roger Salengro",
    destination: "HPVA",
    heureDepart: "11:30",
    heureArrivee: "11:55",
  },
  {
    id: "VSL-420",
    equipe: "Emma V. / Nathan S.",
    lat: 50.723,
    lng: 2.539,
    status: "occupe",
    localisation: "Centre E.L.A.N, Hôpital de Wattrelos",
    destination: "32 Rue Jean Mermoz, Wattrelos",
    heureDepart: "12:00",
    heureArrivee: "12:12",
  },
  {
    id: "AMB-118",
    equipe: "Lucas V. / Marie D.",
    lat: 50.995,
    lng: 2.295,
    status: "pause",
    localisation: "Clinique Les Peupliers",
    destination: "22 Rue du Docteur Schweitzer, Roubaix",
    heureDepart: "12:30",
    heureArrivee: "12:54",
  },
];

interface LocalisationProps {
  isOpen: boolean;
}

const Localisation: React.FC<LocalisationProps> = ({ isOpen }) => {
  const [mapCenter] = useState(defaultCenter);

  const [zoom] = useState(8);

  return (
    <div
      className={`transition-all duration-300 w-full h-screen ${
        isOpen ? "ml-64" : "ml-16"
      }`}
    >
      <MapContainer center={mapCenter} zoom={zoom} className="w-full h-full">
        {/* Carte OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marqueurs des ambulances */}
        {ambulances.map((ambulance) => (
          <Marker
            key={ambulance.id}
            position={[ambulance.lat, ambulance.lng]}
            icon={
              ambulanceIcons[ambulance.status as keyof typeof ambulanceIcons]
            }
          >
            <Popup>
              <div className="text-sm">
                <h3 className="text-lg font-semibold">🚑 {ambulance.id}</h3>
                <p className="flex items-center text-gray-700">
                  <FaUser className="mr-2 text-blue-500" />
                  Équipage: {ambulance.equipe}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  Localisation: {ambulance.localisation}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaRegHospital className="mr-2 text-green-500" />
                  Destination: {ambulance.destination}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaClock className="mr-2 text-gray-500" />
                  Départ: {ambulance.heureDepart} - Arrivée:{" "}
                  {ambulance.heureArrivee}
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
                  Statut:{" "}
                  {ambulance.status.charAt(0).toUpperCase() +
                    ambulance.status.slice(1)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Localisation;
