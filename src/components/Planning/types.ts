export interface PlanningProps {
    isOpen: boolean;
  }
  
  export interface Employee {
    name: string;
    role: string;
    hoursWorked: number;
    overtime25: number;
    overtime50: number;
    leave: boolean;
    restDay: string;
  }
  
  export interface EmployeePlanning {
    name: string;
    role: string;
    schedule: string[];
  }
  
  export interface StatusOption {
    value: string;
    label: string;
    color: string;
  }
  
  export interface StatusMenuState {
    employeeIndex: number;
    dayIndex: number;
  }
  
  export interface LegendItem {
    color: string;
    label: string;
  }
  
export interface WeeklyPlanningProps {
  employeesPlanning: EmployeePlanning[];
  weekDays: Date[];
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  updateEmployeeStatus: (employeeIndex: number, dayIndex: number, status: string) => void;
  statusOptions: StatusOption[];
}
  export interface MonthlyRecapProps {
    employees: Employee[];
    currentMonth: number;
    currentYear: number;
  }
  
  export interface StatusSelectorProps {
    options: StatusOption[];
    onSelect: (status: string) => void;
  }
  
  export interface LegendProps {
    items: LegendItem[];
  }