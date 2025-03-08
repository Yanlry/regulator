import React from "react";
import {
  Clock,
  AlertTriangle,
  Truck,
  FileCheck,
  FileX,
  FileClock,
  Briefcase,
  Ambulance,
  Info,
} from "lucide-react";
import { TransportDetailsProps } from "./types";

const TransportDetails: React.FC<TransportDetailsProps> = ({
  appointment,
  setAppointment,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    const newValue = type === "checkbox" ? checked : value;

    setAppointment((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleEquipmentChange = (equipment: string) => {
    setAppointment((prev) => {
      const current = [...prev.requiredEquipment];
      if (current.includes(equipment)) {
        return {
          ...prev,
          requiredEquipment: current.filter((e) => e !== equipment),
        };
      } else {
        return {
          ...prev,
          requiredEquipment: [...current, equipment],
        };
      }
    });
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
        <div className="p-2 bg-blue-50 rounded-full mr-3">
          <Truck className="text-blue-600" size={22} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Détails du Transport
        </h2>
      </div>

      <div className="space-y-5">
        {/* Aller-retour */}
        <div className="flex items-start p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center h-5 mt-0.5">
            <input
              id="returnTrip"
              name="returnTrip"
              type="checkbox"
              checked={appointment.returnTrip}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="returnTrip" className="font-medium text-gray-800">
              Transport aller-retour
            </label>
            <p className="text-sm text-gray-600">
              Cochez si le patient aura besoin d'un transport retour
            </p>
          </div>
        </div>

        {appointment.returnTrip && (
          <div className="ml-7 p-4 bg-white rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heure de retour approximative
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                name="returnTime"
                value={appointment.returnTime}
                onChange={handleChange}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Niveau d'urgence */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Types de priorité
          </label>
          <select
            name="urgencyLevel"
            value={appointment.urgencyLevel}
            onChange={handleChange}
            className="block w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="normal">Transport programmé</option>
            <option value="medecin">Appel médecin</option>
            <option value="urgence">S.A.M.U</option>
            <option value="smur">S.M.U.R</option>
          </select>
        </div>

        {appointment.urgencyLevel === "smur" && (
          <div className="rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle
                  className="h-5 w-5 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Urgence médicale
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>
                    Cette option néccéssite la mobilisation d'une ambulance de
                    type A.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Bon de transport */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut du bon de transport
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative flex">
              <div className="flex items-center h-5">
                <input
                  id="transport-ready"
                  name="transportFormStatus"
                  type="radio"
                  value="ready"
                  checked={appointment.transportFormStatus === "ready"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
              </div>
              <label
                htmlFor="transport-ready"
                className="ml-3 flex items-center text-sm font-medium text-gray-700"
              >
                <FileCheck size={18} className="mr-1 text-green-500" />
                Déjà établi
              </label>
            </div>

            <div className="relative flex">
              <div className="flex items-center h-5">
                <input
                  id="transport-collect"
                  name="transportFormStatus"
                  type="radio"
                  value="collect"
                  checked={appointment.transportFormStatus === "collect"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
              </div>
              <label
                htmlFor="transport-collect"
                className="ml-3 flex items-center text-sm font-medium text-gray-700"
              >
                <FileX size={18} className="mr-1 text-orange-500" />À récupérer
              </label>
            </div>

            <div className="relative flex">
              <div className="flex items-center h-5">
                <input
                  id="transport-pending"
                  name="transportFormStatus"
                  type="radio"
                  value="pending"
                  checked={appointment.transportFormStatus === "pending"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
              </div>
              <label
                htmlFor="transport-pending"
                className="ml-3 flex items-center text-sm font-medium text-gray-700"
              >
                <FileClock size={18} className="mr-1 text-blue-500" />
                En attente
              </label>
            </div>

            <div className="relative flex">
              <div className="flex items-center h-5">
                <input
                  id="transport-samu"
                  name="transportFormStatus"
                  type="radio"
                  value="samu"
                  checked={appointment.transportFormStatus === "samu"}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
              </div>
              <label
                htmlFor="transport-samu"
                className="ml-3 flex items-center text-sm font-medium text-gray-700"
              >
                <Ambulance size={18} className="mr-1 text-red-500" />
                Mission SAMU
              </label>
            </div>
          </div>

          {/* Messages informatifs conditionnels pour chaque option */}
          {appointment.transportFormStatus === "ready" && (
            <div className="mt-3 ml-7 text-sm text-gray-600 bg-green-50 p-3 rounded-md border border-green-100">
              <p className="flex items-center">
                <Info size={16} className="mr-2 text-green-500" />
                Le bon de transport est déjà disponible.
              </p>
            </div>
          )}

          {appointment.transportFormStatus === "collect" && (
            <div className="mt-3 ml-7 text-sm text-gray-600 bg-orange-50 p-3 rounded-md border border-orange-100">
              <p className="flex items-center">
                <Info size={16} className="mr-2 text-orange-500" />
                Le bon de transport est à récupérer à l'hôpital.
              </p>
            </div>
          )}

          {appointment.transportFormStatus === "pending" && (
            <div className="mt-3 ml-7 text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-100">
              <p className="flex items-center">
                <Info size={16} className="mr-2 text-blue-500" />
                Le bon de transport est en cours d'établissement par le médecin
                traitant.
              </p>
            </div>
          )}

          {appointment.transportFormStatus === "samu" && (
            <div className="mt-3 ml-7 text-sm text-gray-600 bg-red-50 p-3 rounded-md border border-red-100">
              <p className="flex items-center">
                <Info size={16} className="mr-2 text-red-500" />
                Mission commandée par le SAMU. Aucun bon de transport à
                récupérer, facturation directe au SAMU.
              </p>
            </div>
          )}
        </div>

        {/* Besoins spécifiques */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Besoins spécifiques
          </label>
          <div className="grid grid-cols-1 sm:grid-cols- gap-3">
            <div className="flex items-center">
              <input
                id="equipment-oxygen"
                type="checkbox"
                checked={appointment.requiredEquipment.includes("oxygen")}
                onChange={() => handleEquipmentChange("oxygen")}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="equipment-oxygen"
                className="ml-3 text-sm text-gray-700"
              >
                Assistance en oxygène
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="equipment-wheelchair"
                type="checkbox"
                checked={appointment.requiredEquipment.includes("wheelchair")}
                onChange={() => handleEquipmentChange("wheelchair")}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="equipment-wheelchair"
                className="ml-3 text-sm text-gray-700"
              >
                Chaise portoire
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="equipment-bariatric"
                type="checkbox"
                checked={appointment.requiredEquipment.includes("bariatric")}
                onChange={() => handleEquipmentChange("bariatric")}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="equipment-bariatric"
                className="ml-3 text-sm text-gray-700"
              >
                Équipement bariatrique
              </label>
            </div>
          </div>
        </div>

        {/* Notes supplémentaires */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Briefcase className="mr-1" size={16} />
            Notes pour l'équipe
          </label>
          <textarea
            name="additionalNotes"
            value={appointment.additionalNotes}
            onChange={handleChange}
            rows={3}
            className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
            placeholder="Informations essentielles pour l'équipe d'ambulanciers (accès difficile, matériel spécifique, etc.)"
          />
          <p className="mt-1 text-xs text-gray-500">
            Information critique pour la préparation de l'équipe et l'efficacité
            du transport
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransportDetails;
