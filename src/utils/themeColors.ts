import { Theme, ThemeColors } from '../types/theme';

/**
 * Palette de couleurs définissant les styles pour les thèmes clair et sombre
 */
export const themeColors: Record<Theme, ThemeColors> = {
  light: {
    background: 'bg-gray-100',
    text: 'text-gray-900',
    sidebar: {
      background: 'bg-gradient-to-b from-blue-50 to-gray-100',
      hoverBackground: 'hover:bg-gray-200',
      text: 'text-gray-800',
      activeItem: 'bg-blue-600',
    },
    card: {
      background: 'bg-white',
      border: 'border-gray-200',
    },
    input: {
      background: 'bg-white',
      text: 'text-gray-800',
      placeholder: 'placeholder-gray-500',
    },
    button: {
      primary: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
    },
  },
  dark: {
    background: 'bg-gray-800',
    text: 'text-white',
    sidebar: {
      background: 'bg-gradient-to-b from-gray-900 to-gray-800',
      hoverBackground: 'hover:bg-gray-700',
      text: 'text-white',
      activeItem: 'bg-blue-700',
    },
    card: {
      background: 'bg-gray-700',
      border: 'border-gray-700',
    },
    input: {
      background: 'bg-gray-800',
      text: 'text-white',
      placeholder: 'placeholder-gray-400',
    },
    button: {
      primary: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
    },
  },
};