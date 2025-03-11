/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Activation du mode sombre via les classes CSS
  theme: {
    extend: {
      colors: {
        // Palette de couleurs pour le thème clair
        light: {
          background: '#f3f4f6', // gray-100
          surface: '#ffffff',
          sidebar: {
            background: '#f0f9ff', // blue-50
            hover: '#e0f2fe', // blue-100
          },
          text: {
            primary: '#111827', // gray-900
            secondary: '#4b5563', // gray-600
            muted: '#9ca3af', // gray-400
          },
          border: '#e5e7eb', // gray-200
        },
        // Palette de couleurs pour le thème sombre
        dark: {
          background: '#1f2937', // gray-800
          surface: '#374151', // gray-700
          sidebar: {
            background: '#111827', // gray-900
            hover: '#1f2937', // gray-800
          },
          text: {
            primary: '#f9fafb', // gray-50
            secondary: '#d1d5db', // gray-300
            muted: '#6b7280', // gray-500
          },
          border: '#4b5563', // gray-600
        },
        // Couleurs d'accent pour les deux thèmes
        brand: {
          primary: '#3b82f6', // blue-500
          secondary: '#2563eb', // blue-600
          hover: '#1d4ed8', // blue-700
          danger: '#ef4444', // red-500
          success: '#10b981', // emerald-500
          warning: '#f59e0b', // amber-500
        }
      },
      // Transitions spécifiques pour les changements de thème
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
      // Durées pour les transitions de thème
      transitionDuration: {
        '250': '250ms',
      }
    },
  },
  plugins: [],
};