import React from 'react';
import { useTheme } from './ThemeContext';

/**
 * Props pour le composant ThemedComponent
 */
interface ThemedComponentProps {
  /** Contenu du composant */
  children: React.ReactNode;
  /** Classes CSS additionnelles */
  className?: string;
  /** Type de conteneur (container, card, section) */
  type?: 'container' | 'card' | 'section';
}

/**
 * Composant réutilisable qui applique automatiquement les styles en fonction du thème
 * Peut être utilisé comme conteneur de base pour d'autres composants
 */
const ThemedComponent: React.FC<ThemedComponentProps> = ({
  children,
  className = '',
  type = 'container',
}) => {
  const { theme } = useTheme();
  try {

    // Styles de base communs à tous les types
    let baseClasses = 'transition-colors duration-300 ';

    // Styles spécifiques au type de composant
    switch (type) {
      case 'card':
        baseClasses += `rounded-lg shadow-md p-4 ${
          theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
        }`;
        break;
      case 'section':
        baseClasses += `p-4 mb-6 ${
          theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
        } rounded-lg shadow`;
        break;
      case 'container':
      default:
        baseClasses += `${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
        }`;
        break;
    }

    return (
      <div className={`${baseClasses} ${className}`}>
        {children}
      </div>
    );
  } catch (error) {
    console.error("Erreur dans ThemedComponent:", error);
    // Fallback en cas d'erreur (mode clair par défaut)
    const fallbackClass = type === 'card' 
      ? 'bg-white text-gray-900 rounded-lg shadow-md p-4'
      : type === 'section'
        ? 'bg-white text-gray-900 p-4 mb-6 rounded-lg shadow'
        : 'bg-gray-100 text-gray-900';
    
    return (
      <div className={`transition-colors duration-300 ${fallbackClass} ${className}`}>
        {children}
      </div>
    );
  }
};

export default ThemedComponent;