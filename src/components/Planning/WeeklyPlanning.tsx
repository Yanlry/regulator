import React, { useState } from 'react';
import { WeeklyPlanningProps } from './types';
import { DAYS_OF_WEEK, WEEKLY_LEGEND_ITEMS } from './data';
import { formatDate, getStatusColor } from './utils';
import StatusSelector from './StatusSelector';
import Legend from './Legend';

const WeeklyPlanning: React.FC<WeeklyPlanningProps> = ({
  employeesPlanning,
  weekDays,
  goToPreviousWeek,
  goToNextWeek,
  updateEmployeeStatus,
  statusOptions
}) => {

  const [showStatusMenu, setShowStatusMenu] = useState<{
    employeeIndex: number;
    dayIndex: number;
  } | null>(null);

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <p className="text-gray-500">
          Semaine du {formatDate(weekDays[0])} au {formatDate(weekDays[6])}
        </p>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-gray-200 text-gray-700">
            <th className="p-3 text-left">Employé</th>
            <th className="p-1 text-center">
              <button
                onClick={goToPreviousWeek}
                className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs"
              >
                &lt;
              </button>
            </th>
            {weekDays.map((day, index) => (
              <th
                key={index}
                className={`p-3 text-center ${
                  index === 0 || index === 6 ? "relative" : ""
                }`}
              >
                <div>{DAYS_OF_WEEK[(index + 1) % 7]}</div>
                <div className="text-xs font-normal">{formatDate(day)}</div>
              </th>
            ))}
            <th className="p-1 text-center">
              <button
                onClick={goToNextWeek}
                className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs"
              >
                &gt;
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {employeesPlanning.map((employee, empIndex) => (
            <tr key={empIndex} className="border-b hover:bg-gray-100">
              <td className="p-3 font-semibold text-gray-700 flex items-center">
                {employee.name}
              </td>
              <td></td>{" "}
              {/* Cellule vide pour l'alignement avec le bouton précédent */}
              {employee.schedule.map((status, dayIndex) => (
                <td key={dayIndex} className="p-3 text-center relative">
                  <div
                    className={`p-2 rounded cursor-pointer ${getStatusColor(
                      status,
                      statusOptions
                    )}`}
                    onClick={() =>
                      setShowStatusMenu({ employeeIndex: empIndex, dayIndex })
                    }
                  >
                    {status}
                  </div>

                  {/* Menu de sélection de statut */}
                  {showStatusMenu &&
                    showStatusMenu.employeeIndex === empIndex &&
                    showStatusMenu.dayIndex === dayIndex && (
                      <StatusSelector
                        options={statusOptions}
                        onSelect={(value) => {
                          updateEmployeeStatus(empIndex, dayIndex, value);
                          setShowStatusMenu(null);
                        }}
                      />
                    )}
                </td>
              ))}
              <td></td>{" "}
              {/* Cellule vide pour l'alignement avec le bouton suivant */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Légende */}
      <div className="mt-6">
        <Legend items={WEEKLY_LEGEND_ITEMS} />
      </div>
    </div>
  );
};

export default WeeklyPlanning;