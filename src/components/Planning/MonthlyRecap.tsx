import React, { useMemo } from 'react';
import { MonthlyRecapProps, Employee } from './types';
import { MONTH_NAMES, MONTHLY_LEGEND_ITEMS } from './data';
import Legend from './Legend';

/**
 * Composant affichant le récapitulatif mensuel des employés
 * Supporte les thèmes clair et sombre
 */
const MonthlyRecap: React.FC<MonthlyRecapProps> = ({
  employees,
  currentMonth,
  currentYear,
  theme = 'light' // Valeur par défaut si non fournie
}) => {
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
      tableHeader: `${
        isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-700'
      }`,
      tableHeaderCell: 'p-3 text-left',
      
      // Lignes du tableau
      tableRowEven: isDark ? 'bg-gray-700' : 'bg-white',
      tableRowOdd: isDark ? 'bg-gray-600' : 'bg-gray-50',
      tableRowHover: isDark ? 'hover:bg-gray-500' : 'hover:bg-gray-100',
      tableRowBorder: `border-b ${
        isDark ? 'border-gray-600' : 'border-gray-200'
      }`,
      
      // Cellules
      tableCell: 'p-3',
      
      // États des employés
      employeeActive: 'w-2 h-2 rounded-full bg-green-500 mr-2',
      employeeOnLeave: 'w-2 h-2 rounded-full bg-red-500 mr-2',
      employeeName: `font-medium ${
        isDark ? 'text-white' : 'text-gray-700'
      }`,
      
      // Heures et congés
      hoursWorked: `font-medium ${
        isDark ? 'text-blue-300' : 'text-blue-600'
      }`,
      overtimeHours: `font-medium ${
        isDark ? 'text-amber-300' : 'text-amber-600'
      }`,
      restDayWeekend: `px-2 py-1 rounded text-xs ${
        isDark ? 'bg-purple-700 text-purple-100' : 'bg-purple-100 text-purple-800'
      }`,
      restDayWeekday: `px-2 py-1 rounded text-xs ${
        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'
      }`,
      
      // Légende
      legendContainer: 'mt-6'
    };
  }, [theme]);

  /**
   * Composant pour une ligne d'employé dans le tableau
   */
  const EmployeeRow = ({ employee, index }: { employee: Employee; index: number }) => {
    return (
      <tr
        className={`${styles.tableRowBorder} ${
          index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
        } ${styles.tableRowHover} transition-colors`}
      >
        <td className={styles.tableCell}>
          <div className="flex items-center">
            <span
              className={employee.leave ? styles.employeeOnLeave : styles.employeeActive}
            ></span>
            <span className={styles.employeeName}>{employee.name}</span>
          </div>
        </td>
        <td className={styles.tableCell}>{employee.role}</td>
        <td className={styles.tableCell}>
          <span className={styles.hoursWorked}>
            {employee.hoursWorked}h
          </span>
        </td>
        <td className={styles.tableCell}>
          <span className={styles.overtimeHours}>
            {employee.overtime25}h
          </span>
        </td>
        <td className={styles.tableCell}>
          <span className={styles.overtimeHours}>
            {employee.overtime50}h
          </span>
        </td>
        <td className={styles.tableCell}>
          <span
            className={
              employee.restDay === "Samedi" ||
              employee.restDay === "Dimanche"
                ? styles.restDayWeekend
                : styles.restDayWeekday
            }
          >
            {employee.restDay}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <>
      {/* En-tête du récapitulatif affiché au-dessus du conteneur principal */}
      <div className="flex items-center justify-center mb-2">
        <div className="text-center">
          <h1 className="text-xl font-bold">
            Récapitulatif du mois de {MONTH_NAMES[currentMonth]}
          </h1>
          <p className={styles.dateText}>
            Suivie des heures depuis le 01 {MONTH_NAMES[currentMonth]}{" "}
            {currentYear}
          </p>
        </div>
      </div>

      {/* Conteneur principal avec le tableau */}
      <div className={styles.container}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableHeaderCell}>Employé</th>
                <th className={styles.tableHeaderCell}>Poste</th>
                <th className={styles.tableHeaderCell}>Heures travaillées</th>
                <th className={styles.tableHeaderCell}>Heures à 25%</th>
                <th className={styles.tableHeaderCell}>Heures à 50%</th>
                <th className={styles.tableHeaderCell}>Prochain poste</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <EmployeeRow 
                  key={employee.id || index}
                  employee={employee} 
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Légende */}
        <div className={styles.legendContainer}>
          <Legend items={MONTHLY_LEGEND_ITEMS} theme={theme} />
        </div>
      </div>
    </>
  );
};

export default MonthlyRecap;