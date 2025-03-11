import React, { memo } from 'react';
import { MonthlyRecapProps, Employee } from './types';
import { MONTH_NAMES, MONTHLY_LEGEND_ITEMS } from './data';
import Legend from './Legend';
import useMonthlyRecapStyles from './hooks/useMonthlyRecapStyles';

/**
 * Composant pour une ligne d'employé dans le tableau
 */
const EmployeeRow = memo(({ 
  employee, 
  index, 
  styles 
}: { 
  employee: Employee; 
  index: number; 
  styles: ReturnType<typeof useMonthlyRecapStyles>; 
}) => {
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
});

EmployeeRow.displayName = 'EmployeeRow';

/**
 * Composant d'en-tête du récapitulatif
 */
const RecapHeader = memo(({ 
  currentMonth, 
  currentYear, 
  styles 
}: { 
  currentMonth: number; 
  currentYear: number; 
  styles: ReturnType<typeof useMonthlyRecapStyles>; 
}) => {
  return (
    <div className="mt-10 mb-6">
      <h1 className={styles.headerTitle}>
        Récapitulatif du mois de {MONTH_NAMES[currentMonth]}
      </h1>
      <p className={styles.headerSubtitle}>
        Suivie des heures depuis le 01 {MONTH_NAMES[currentMonth]}{" "}
        {currentYear}
      </p>
    </div>
  );
});

RecapHeader.displayName = 'RecapHeader';

/**
 * Composant principal de récapitulatif mensuel
 * Utilise des sous-composants mémorisés pour optimiser les performances
 */
const MonthlyRecap: React.FC<MonthlyRecapProps> = ({ 
  employees, 
  currentMonth, 
  currentYear,
  theme = 'light'
}) => {
  // Obtenir les styles adaptés au thème
  const styles = useMonthlyRecapStyles(theme);
  
  return (
    <>
      <RecapHeader 
        currentMonth={currentMonth} 
        currentYear={currentYear} 
        styles={styles} 
      />

      <div className={styles.card}>
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
                  styles={styles} 
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.legendContainer}>
          <Legend items={MONTHLY_LEGEND_ITEMS} theme={theme} />
        </div>
      </div>
    </>
  );
};

export default memo(MonthlyRecap);