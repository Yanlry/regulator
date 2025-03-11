import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const { theme } = useTheme();

  // Dynamic classes for title based on theme
  const titleClasses = theme === 'dark'
    ? 'text-2xl font-bold text-blue-400'
    : 'text-2xl font-bold text-blue-800';

  // Dynamic classes for description based on theme
  const descriptionClasses = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-600';

  return (
    <header className="mb-6">
      <h1 className={titleClasses}>{title}</h1>
      <p className={descriptionClasses}>{description}</p>
    </header>
  );
};

export default Header;