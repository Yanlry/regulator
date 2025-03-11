export interface PlanningProps {
  isOpen: boolean;
}

export interface Employee {
  // Ajout de l'ID manquant qui cause l'erreur
  id: string; 
  name: string;
  role: string;
  hoursWorked: number;
  overtime25: number;
  overtime50: number;
  leave: boolean;
  restDay: string;
}

export type Theme = 'light' | 'dark';

export interface MonthlyRecapStyles {
  headerTitle: string;
  headerSubtitle: string;
  card: string;
  tableHeader: string;
  tableHeaderCell: string;
  tableRowEven: string;
  tableRowOdd: string;
  tableRowHover: string;
  tableRowBorder: string;
  tableCell: string;
  employeeActive: string;
  employeeOnLeave: string;
  employeeName: string;
  hoursWorked: string;
  overtimeHours: string;
  restDayWeekend: string;
  restDayWeekday: string;
  legendContainer: string;
  // Supprimez theme d'ici - ce n'est pas une classe CSS mais une propriété de composant
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
  theme?: Theme; // Optionnel pour la compatibilité avec la version actuelle
}

export interface MonthlyRecapProps {
  employees: Employee[];
  currentMonth: number;
  currentYear: number;
  theme?: Theme; // Ajout de la propriété theme qui manquait
}

export interface StatusSelectorProps {

  options: StatusOption[];

  onSelect: (value: string) => void;

  theme: 'light' | 'dark'; // Ajout de la propriété theme

}

export interface LegendProps {
  items: LegendItem[];
  theme?: Theme; // Optionnel pour la compatibilité
}