import { Employee, EmployeePlanning, StatusOption, LegendItem } from './types';

export const employees: Employee[] = [
  {
    id: "1",
    name: "Alice Martin",
    role: "Secrétaire",
    hoursWorked: 22,
    overtime25: 0,
    overtime50: 0,
    leave: false,
    restDay: "Dimanche 3 Mars 2025",
  },
  {
    id: "2",
    name: "Emma Dubois",
    role: "Secrétaire",
    hoursWorked: 138,
    overtime25: 3,
    overtime50: 0,
    leave: true,
    restDay: "Retour le 22 Avril 2025",
  },
  ...Array(6)
    .fill(null)
    .map((_, i) => ({
      id: `aux-${i + 1}`,
      name: `Auxiliaire ${i + 1}`,
      role: "Auxiliaire Ambulancier",
      hoursWorked: 144,
      overtime25: 15,
      overtime50: 5,
      leave: false,
      restDay: "Samedi 2 Mars 2025",
    })),
  ...Array(7)
    .fill(null)
    .map((_, i) => ({
      id: `amb-${i + 1}`,
      name: `Ambulancier ${i + 1}`,
      role: "Ambulancier",
      hoursWorked: 144,
      overtime25: 10,
      overtime50: 5,
      leave: false,
      restDay: "Vendredi 1 Mars 2025",
    })),
].flat();

export const initialEmployeesPlanning: EmployeePlanning[] = [
  {
    name: "Alice Martin",
    role: "Secrétaire",
    schedule: [
      "Repos",
      "Travail",
      "Travail",
      "Travail",
      "Travail",
      "Travail",
      "Repos",
    ],
  },
  {
    name: "Emma Dubois",
    role: "Secrétaire",
    schedule: [
      "Travail",
      "Travail",
      "Repos",
      "Travail",
      "Travail",
      "Travail",
      "Repos",
    ],
  },
  ...Array(6)
    .fill(null)
    .map((_, i) => ({
      name: `Auxiliaire ${i + 1}`,
      role: "Auxiliaire Ambulancier",
      schedule:
        i % 2 === 0
          ? [
              "Travail",
              "Travail",
              "Repos",
              "Travail",
              "Travail",
              "Travail",
              "Repos",
            ]
          : [
              "Travail",
              "Travail",
              "Travail",
              "Repos",
              "Travail",
              "Travail",
              "Repos",
            ],
    })),
  ...Array(7)
    .fill(null)
    .map((_, i) => ({
      name: `Ambulancier ${i + 1}`,
      role: "Ambulancier",
      schedule:
        i % 3 === 0
          ? [
              "Repos",
              "Travail",
              "Travail",
              "Travail",
              "Repos",
              "Travail",
              "Travail",
            ]
          : [
              "Travail",
              "Travail",
              "Repos",
              "Travail",
              "Travail",
              "Travail",
              "Repos",
            ],
    })),
].flat();

export const STATUS_OPTIONS: StatusOption[] = [
  { value: "Travail", label: "✅ Travail", color: "bg-green-500 text-white" },
  { value: "Absent", label: "🚫 Absent", color: "bg-blue-500 text-white" },
  { value: "Repos", label: "🏖️ Repos", color: "bg-yellow-400 text-gray-900" },
  { value: "Congés", label: "📅 Congés", color: "bg-purple-500 text-white" },
  { value: "Arrêt", label: "🏥 Arrêt", color: "bg-red-500 text-white" },
];

export const WEEKLY_LEGEND_ITEMS: LegendItem[] = [
  { color: "bg-green-500", label: "Jour travaillé" },
  { color: "bg-yellow-400", label: "Jour de repos" },
  { color: "bg-blue-500", label: "Absent" },
  { color: "bg-red-500", label: "Arrêt maladie" },
  { color: "bg-violet-500", label: "Congés" },
];

export const MONTHLY_LEGEND_ITEMS: LegendItem[] = [
  { color: "bg-green-500", label: "Présent" },
  { color: "bg-red-500", label: "En congé / Arrêt maladie" },
];

export const DAYS_OF_WEEK = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

export const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];