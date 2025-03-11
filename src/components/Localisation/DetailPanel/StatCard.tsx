import React from "react";
import { useTheme } from '../../../contexts/ThemeContext';
import { StatCardProps } from "../data/types";

/**
 * StatCard component for displaying statistical information
 * Supports dynamic theming based on light/dark mode
 */
const StatCard: React.FC<StatCardProps> = ({ value, color, label }) => {
  // Use theme context to determine current theme
  const { theme } = useTheme();

  // Generate dynamic classes based on theme and color
  const cardClasses = `
    rounded-md p-3 
    ${theme === 'dark' 
      ? `bg-${color}-500 text-white` 
      : `bg-${color}-100 text-${color}-700`
    }
  `;

  const valueClasses = `
    block text-2xl font-bold 
    ${theme === 'dark' ? 'text-white' : ''}
  `;

  return (
    <div className={cardClasses}>
      <div className="text-sm text-center">
        <span className={valueClasses}>{value}</span>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default StatCard;