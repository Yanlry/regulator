import React from 'react';
import { ScheduleHeaderProps } from '../Regulation/types';
import { formatDate } from '../Regulation/utils';
import { Clipboard } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Interface étendue pour inclure le thème
interface ThemeAwareScheduleHeaderProps extends Omit<ScheduleHeaderProps, 'theme'> {
  theme?: 'dark' | 'light';
}

const ScheduleHeader: React.FC<ThemeAwareScheduleHeaderProps> = ({ 
  tomorrow,
  theme: propTheme 
}) => {
  // Récupérer le thème du contexte si non fourni via props
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;

  // Classes CSS adaptatives selon le thème
  const iconContainerClasses = `
    p-2 rounded-lg mr-4 flex-shrink-0
    ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}
  `;

  const iconClasses = `
    h-6 w-6
    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
  `;

  const titleClasses = `
    text-2xl font-bold
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const subtitleClasses = `
    text-lg font-medium flex items-center
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
  `;

  const dateClasses = `
    ml-1
    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
  `;

  return (
    <header className="mb-8">
      <div className="flex items-center mb-2">
        <div className={iconContainerClasses}>
          <Clipboard className={iconClasses} />  
        </div>
        <div>
          <h1 className={titleClasses}>Régulation</h1>
          <h2 className={subtitleClasses}>
            Planning pour le <span className={dateClasses}>{formatDate(tomorrow)}</span>  
          </h2>
        </div>
      </div>
    </header>
  );
};

export default React.memo(ScheduleHeader);