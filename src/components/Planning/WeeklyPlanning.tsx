import React, { useState, useMemo } from 'react';
import { WeeklyPlanningProps } from './types';
import { DAYS_OF_WEEK, WEEKLY_LEGEND_ITEMS } from './data';
import { formatDate, getStatusColor } from './utils';
import StatusSelector from './StatusSelector';
import Legend from './Legend';

/**
 * Composant affichant le planning hebdomadaire des employés
 * Supporte les thèmes clair et sombre
 */
const WeeklyPlanning: React.FC<WeeklyPlanningProps> = ({
  employeesPlanning,
  weekDays,
  goToPreviousWeek,
  goToNextWeek,
  updateEmployeeStatus,
  statusOptions,
  theme = 'light' // Valeur par défaut si non fournie
}) => {
  // État pour le menu de sélection de statut
  const [showStatusMenu, setShowStatusMenu] = useState<{
    employeeIndex: number;
    dayIndex: number;
  } | null>(null);

  // Classes CSS basées sur le thème
  const styles = useMemo(() => {
    const isDark = theme === 'dark';
    
    return {
      // Conteneur principal
      container: `p-4 rounded-lg shadow-md ${
        isDark ? 'bg-gray-700' : 'bg-white'
      }`,
      
      // Texte et dates
      dateText: `text-center ${
        isDark ? 'text-gray-300' : 'text-gray-500'
      }`,
      
      // En-tête du tableau
      tableHeader: `border-b ${
        isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-700'
      }`,
      
      // Lignes du tableau
      tableRow: `border-b ${
        isDark 
          ? 'hover:bg-gray-600 border-gray-600' 
          : 'hover:bg-gray-100 border-gray-200'
      }`,
      
      // Cellules et textes
      employeeCell: `p-3 font-semibold ${
        isDark ? 'text-white' : 'text-gray-700'
      } flex items-center`,
      
      // Boutons de navigation
      navButton: `px-2 py-1 text-white rounded text-xs ${
        isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-500 hover:bg-gray-600'
      }`,
    };
  }, [theme]);

  return (
    <div className={styles.container}>
      <div className="flex items-center justify-center mb-4">
        <p className={styles.dateText}>
          Semaine du {formatDate(weekDays[0])} au {formatDate(weekDays[6])}
        </p>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className={styles.tableHeader}>
            <th className="p-3 text-left">Employé</th>
            <th className="p-1 text-center">
              <button
                onClick={goToPreviousWeek}
                className={styles.navButton}
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
                className={styles.navButton}
              >
                &gt;
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {employeesPlanning.map((employee, empIndex) => (
            <tr key={empIndex} className={styles.tableRow}>
              <td className={styles.employeeCell}>
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
                        theme={theme} // Passer le thème au sélecteur de statut
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
        <Legend 
          items={WEEKLY_LEGEND_ITEMS} 
          theme={theme} // Passer le thème à la légende
        />
      </div>
    </div>
  );
};

export default WeeklyPlanning;