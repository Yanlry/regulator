import React, { useState, useEffect, useCallback } from "react";
import { PlanningProps, EmployeePlanning } from "./types";
import { 
  employees, 
  initialEmployeesPlanning, 
  STATUS_OPTIONS, 
  MONTH_NAMES 
} from "./data";
import { 
  getStartOfWeek, 
  getWeekDays 
} from "./utils";
import WeeklyPlanning from "./WeeklyPlanning";
import MonthlyRecap from "./MonthlyRecap";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useTheme } from "../../contexts/ThemeContext";

/**
 * Planning component that displays weekly and monthly views of employee schedules
 * Supports both light and dark themes through the ThemeContext
 */
const Planning: React.FC<PlanningProps> = () => {
  // Get current theme from context
  const { theme } = useTheme();
  
  // Calculate initial dates
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getStartOfWeek(today)
  );
  
  // State for employee planning data
  const [employeesPlanning, setEmployeesPlanning] = useState<EmployeePlanning[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load planning data on component mount
  useEffect(() => {
    const loadPlanningData = async () => {
      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        setEmployeesPlanning(initialEmployeesPlanning);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement du planning:", error);
        setIsLoading(false);
      }
    };

    loadPlanningData();
  }, []);

  // Calculate week days based on current week start
  const weekDays = getWeekDays(currentWeekStart);

  // Navigation handlers
  const goToPreviousWeek = useCallback(() => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeekStart(newStart);
    setCurrentMonth(newStart.getMonth());
    setCurrentYear(newStart.getFullYear());
  }, [currentWeekStart]);

  const goToNextWeek = useCallback(() => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
    setCurrentMonth(newStart.getMonth());
    setCurrentYear(newStart.getFullYear());
  }, [currentWeekStart]);

  const goToPreviousMonth = useCallback(() => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setCurrentWeekStart(getStartOfWeek(newDate));
  }, [currentMonth, currentYear]);

  const goToNextMonth = useCallback(() => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setCurrentWeekStart(getStartOfWeek(newDate));
  }, [currentMonth, currentYear]);

  // Update an employee's status for a specific day
  const updateEmployeeStatus = useCallback((
    employeeIndex: number,
    dayIndex: number,
    status: string
  ) => {
    setEmployeesPlanning(prevPlanning => {
      const updatedPlaning = [...prevPlanning];
      updatedPlaning[employeeIndex] = {
        ...updatedPlaning[employeeIndex],
        schedule: [
          ...updatedPlaning[employeeIndex].schedule.slice(0, dayIndex),
          status,
          ...updatedPlaning[employeeIndex].schedule.slice(dayIndex + 1),
        ],
      };
      return updatedPlaning;
    });
  }, []);

  // Theme-specific style classes
  const containerClasses = `
    transition-all duration-300 
    ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}
    min-h-screen p-4
  `;

  const headerClasses = `text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`;
  
  const buttonClasses = `
    px-3 py-1 
    ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} 
    text-white rounded 
    ${theme === 'dark' ? 'hover:bg-blue-700' : 'hover:bg-blue-600'} 
    text-sm
    transition-colors
  `;

  const contentClasses = `
    p-6 
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  return (
    <div className={containerClasses}>
      {isLoading ? (
        <div className="relative w-full h-full min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className={contentClasses}>
          {/* En-tête du planning */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className={headerClasses}>
                Planning du mois de {MONTH_NAMES[currentMonth]} {currentYear}
              </h1>
              <div className="flex space-x-2">
                <button
                  onClick={goToPreviousMonth}
                  className={buttonClasses}
                >
                  &lt; Mois préc.
                </button>
                <button
                  onClick={goToNextMonth}
                  className={buttonClasses}
                >
                  Mois suiv. &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Planning hebdomadaire */}
          <div className={`p-4 rounded-lg mb-6 shadow ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
          }`}>
            <WeeklyPlanning 
              employeesPlanning={employeesPlanning}
              weekDays={weekDays}
              goToPreviousWeek={goToPreviousWeek}
              goToNextWeek={goToNextWeek}
              updateEmployeeStatus={updateEmployeeStatus}
              statusOptions={STATUS_OPTIONS}
              theme={theme} // Pass theme to child component
            />
          </div>

          {/* Récapitulatif mensuel */}
          <div className={`p-4 rounded-lg shadow ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
          }`}>
            <MonthlyRecap 
              employees={employees}
              currentMonth={currentMonth}
              currentYear={currentYear}
              theme={theme} // Pass theme to child component
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Planning;