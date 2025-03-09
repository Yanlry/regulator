import React from "react";
import { Marker, Popup } from "react-leaflet";
import { HopitalMarkerProps } from "../data/types";
import { ambulanceIcons } from "../data/icons";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegHospital,
} from "react-icons/fa";

const HopitalMarker: React.FC<HopitalMarkerProps> = ({ hopital }) => {
  return (
    <Marker
      key={hopital.id}
      position={[hopital.lat, hopital.lng]}
      icon={ambulanceIcons.hopital}
    >
      <Popup>
        <div className="text-sm">
          <h3 className="text-lg font-semibold">🏥 {hopital.nom}</h3>
          <p className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            {hopital.adresse}
          </p>
          <p className="flex items-center text-gray-700">
            <FaPhoneAlt className="mr-2 text-blue-500" />
            {hopital.tel}
          </p>
          <p className="flex items-center text-gray-700">
            <FaRegHospital className="mr-2 text-green-500" />
            {hopital.niveau}
          </p>
          <div className="mt-2">
            <div className="text-sm font-medium mb-1">
              Taux d'occupation: {hopital.occupation}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  hopital.occupation > 85
                    ? "bg-red-500"
                    : hopital.occupation > 65
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${hopital.occupation}%` }}
              ></div>
            </div>
            <p
              className={`text-sm font-semibold mt-1 ${
                hopital.occupation > 85
                  ? "text-red-500"
                  : hopital.occupation > 65
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              Disponibilité: {hopital.disponibilite}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default HopitalMarker;