import React, { useState, useEffect } from "react";
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
import LoadingSpinner from "../../Common/LoadingSpinner";

const Planning: React.FC<PlanningProps> = ({ isOpen }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getStartOfWeek(today)
  );
  const [employeesPlanning, setEmployeesPlanning] = useState<EmployeePlanning[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlanningData = async () => {
      try {
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

  const weekDays = getWeekDays(currentWeekStart);

  const goToPreviousWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeekStart(newStart);
    setCurrentMonth(newStart.getMonth());
    setCurrentYear(newStart.getFullYear());
  };

  const goToNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
    setCurrentMonth(newStart.getMonth());
    setCurrentYear(newStart.getFullYear());
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setCurrentWeekStart(getStartOfWeek(newDate));
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setCurrentWeekStart(getStartOfWeek(newDate));
  };

  const updateEmployeeStatus = (
    employeeIndex: number,
    dayIndex: number,
    status: string
  ) => {
    const updatedPlaning = [...employeesPlanning];
    updatedPlaning[employeeIndex] = {
      ...updatedPlaning[employeeIndex],
      schedule: [
        ...updatedPlaning[employeeIndex].schedule.slice(0, dayIndex),
        status,
        ...updatedPlaning[employeeIndex].schedule.slice(dayIndex + 1),
      ],
    };
    setEmployeesPlanning(updatedPlaning);
  };

  return (
    <div
      className={`transition-all duration-300 bg-gray-100 min-h-screen ${
        isOpen ? "ml-64" : "ml-16"
      }`}
    >
      {isLoading ? (
        <div className="relative w-full h-full min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="p-6">
          {/* En-tête du planning */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">
                Planning du mois de {MONTH_NAMES[currentMonth]} {currentYear}
              </h1>
              <div className="flex space-x-2">
                <button
                  onClick={goToPreviousMonth}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  &lt; Mois préc.
                </button>
                <button
                  onClick={goToNextMonth}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Mois suiv. &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Planning hebdomadaire */}
          <WeeklyPlanning 
            employeesPlanning={employeesPlanning}
            weekDays={weekDays}
            goToPreviousWeek={goToPreviousWeek}
            goToNextWeek={goToNextWeek}
            updateEmployeeStatus={updateEmployeeStatus}
            statusOptions={STATUS_OPTIONS}
          />

          {/* Récapitulatif mensuel */}
          <MonthlyRecap 
            employees={employees}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </div>
      )}
    </div>
  );
};

export default Planning;