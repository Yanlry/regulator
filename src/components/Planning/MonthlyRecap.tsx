import React from 'react';
import { MonthlyRecapProps } from './types';
import { MONTH_NAMES, MONTHLY_LEGEND_ITEMS } from './data';
import Legend from './Legend';

const MonthlyRecap: React.FC<MonthlyRecapProps> = ({ 
  employees, 
  currentMonth, 
  currentYear 
}) => {
  return (
    <>
      {/* En-tête avec dégradé */}
      <div className="mt-10 mb-6">
        <h1 className="text-2xl font-bold">
          Récapitulatif du mois de {MONTH_NAMES[currentMonth]}
        </h1>
        <p className="text-gray-500">
          Suivie des heures depuis le 01 {MONTH_NAMES[currentMonth]}{" "}
          {currentYear}
        </p>
      </div>

      {/* Carte principale */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Tableau avec style amélioré */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Employé
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Poste
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Heures travaillées
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Heures à 25%
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Heures à 50%
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Prochain poste
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={index}
                  className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span
                        className={`w-4 h-4 rounded-full mr-3 ${
                          employee.leave ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></span>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4 font-semibold">
                    {employee.hoursWorked}h
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-blue-600 font-medium">
                      {employee.overtime25}h
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-blue-600 font-medium">
                      {employee.overtime50}h
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        employee.restDay === "Samedi" ||
                        employee.restDay === "Dimanche"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {employee.restDay}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Légende */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <Legend items={MONTHLY_LEGEND_ITEMS} />
        </div>
      </div>
    </>
  );
};

export default MonthlyRecap;