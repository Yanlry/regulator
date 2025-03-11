import React from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { User, Search, Check, AlertCircle } from "lucide-react";
import { PatientInfoProps } from "./types";

const PatientInfo: React.FC<PatientInfoProps> = ({
  patient,
  setAppointment,
}) => {
  const { theme } = useTheme();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        [name]: value,
      },
    }));
  };

  // Dynamic theming classes
  const containerClasses = theme === 'dark'
    ? 'p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700 text-gray-100'
    : 'p-6 bg-white rounded-xl shadow-md border border-gray-100';

  const headerClasses = theme === 'dark'
    ? 'flex items-center mb-6 pb-3 border-b border-gray-700'
    : 'flex items-center mb-6 pb-3 border-b border-gray-100';

  const headerTitleClasses = theme === 'dark'
    ? 'text-xl font-semibold text-gray-100'
    : 'text-xl font-semibold text-gray-800';

  const iconBackgroundClasses = theme === 'dark'
    ? 'p-2 bg-blue-900 rounded-full mr-3'
    : 'p-2 bg-blue-50 rounded-full mr-3';

  const iconClasses = theme === 'dark'
    ? 'text-blue-400'
    : 'text-blue-600';

  const labelClasses = theme === 'dark'
    ? 'block text-sm font-medium text-gray-400 mb-1'
    : 'block text-sm font-medium text-gray-700 mb-1';

  const searchSectionClasses = theme === 'dark'
    ? 'md:col-span-2 bg-blue-900 p-4 rounded-lg mb-2'
    : 'md:col-span-2 bg-blue-50 p-4 rounded-lg mb-2';

    const inputClasses = theme === 'dark'
    ? 'focus:ring-green-500 focus:border-green-500 block w-full py-2.5 pl-10 sm:text-sm bg-gray-700 border-gray-600 rounded-md text-white placeholder-gray-400'
    : 'focus:ring-green-500 focus:border-green-500 block w-full py-2.5 pl-10 sm:text-sm border-gray-300 rounded-md';
  

  const searchInputClasses = theme === 'dark'
 ? 'focus:ring-green-500 focus:border-green-500 block w-full py-2.5 pl-10 sm:text-sm bg-gray-700 border-gray-600 rounded-md text-white placeholder-gray-400'
    : 'focus:ring-green-500 focus:border-green-500 block w-full py-2.5 pl-10 sm:text-sm border-gray-300 rounded-md';

  const searchButtonClasses = theme === 'dark'
    ? 'ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150'
    : 'ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150';

  const selectClasses = theme === 'dark'
    ? 'mt-1 block w-full pl-3 pr-10 py-2.5 text-base border border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-gray-900 text-gray-100'
    : 'mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none';

  const searchTipClasses = theme === 'dark'
    ? 'mt-2 text-sm text-blue-400 flex items-center'
    : 'mt-2 text-sm text-blue-600 flex items-center';

  const confirmationClasses = theme === 'dark'
    ? 'mt-4 p-3 bg-green-900 rounded-lg flex items-center text-green-300'
    : 'mt-4 p-3 bg-green-50 rounded-lg flex items-center text-green-800';

  return (
    <section className={containerClasses}>
      <div className={headerClasses}>
        <div className={iconBackgroundClasses}>
          <User className={iconClasses} size={22} />
        </div>
        <h2 className={headerTitleClasses}>Information du Patient</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={searchSectionClasses}>
          <label className={labelClasses}>
            Rechercher un patient existant
          </label>
          <div className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                name="patientSearch"
                placeholder="Rechercher un patient"
                className={searchInputClasses}
              />
            </div>
            <button
              type="button"
              className={searchButtonClasses}
            >
              Rechercher
            </button>
          </div>
          <div className={searchTipClasses}>
            <AlertCircle size={14} className="mr-1" />
            Astuce: Vous pouvez rechercher par nom, numéro de téléphone ou adresse
          </div>
        </div>

        <div>
          <label className={labelClasses}>
            Nom complet
          </label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Prénom et nom du patient"
          />
        </div>

        <div>
          <label className={labelClasses}>
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={patient.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Ex: 06 xx xx xx xx"
          />
        </div>

        <div>
          <label className={labelClasses}>
            Numéro d'assurance
          </label>
          <input
            type="text"
            name="insuranceNumber"
            value={patient.insuranceNumber}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Numéro de sécurité sociale"
          />
        </div>

        <div>
          <label className={labelClasses}>
            Mobilité
          </label>
          <div className="relative">
            <select
              name="mobility"
              value={patient.mobility}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="walking">Marchant</option>
              <option value="wheelchair">Fauteuil roulant</option>
              <option value="stretcher">Brancard</option>
              <option value="assisted">Marche assistée</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {patient.name && patient.phone && patient.insuranceNumber && (
        <div className={confirmationClasses}>
          <Check className={`mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} size={18} />
          <span className="text-sm">Informations du patient complètes</span>
        </div>
      )}
    </section>
  );
};

export default PatientInfo;