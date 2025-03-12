import React, { useState, useCallback, useMemo } from 'react';
import { GroupedCoursesCardProps } from '../Regulation/types';
import { formatTime, getAmbulanceColorClass } from '../Regulation/utils';
import { useTheme } from '../../contexts/ThemeContext';

// Extension de l'interface pour inclure le thème
interface ThemeAwareGroupedCoursesCardProps extends GroupedCoursesCardProps {
  theme?: 'dark' | 'light';
}

const GroupedCoursesCard: React.FC<ThemeAwareGroupedCoursesCardProps> = ({
  group,
  ambulance,
  onRemoveCourse,
  theme: propTheme,
}) => {
  // Utiliser le thème du contexte si non fourni en prop
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;

  const [isExpanded, setIsExpanded] = useState(false);

  const timeRangeDisplay = useMemo(() => {
    return `${formatTime(group.startTime)} - ${formatTime(group.endTime)}`;
  }, [group.startTime, group.endTime]);

  const colorClass = useCallback(() => {
    return getAmbulanceColorClass(ambulance.color);
  }, [ambulance.color]);

  const patientsList = useMemo(() => {
    return group.courses.map((course) => course.patientName).join(", ");
  }, [group.courses]);

  // Classes CSS adaptatives selon le thème
  const collapsedCardClasses = `
    p-1.5 rounded shadow-sm ${colorClass()}
    cursor-pointer flex items-center gap-1 z-10 mr-1 text-xs hover:shadow 
    transition-all duration-200 border 
    ${theme === 'dark' 
      ? 'bg-gray-700 border-blue-700 text-gray-200' 
      : 'bg-white border-blue-200 text-gray-800'}
  `;

  const expandedCardClasses = `
    p-2 rounded shadow-md z-20 mr-1 text-xs absolute left-0 right-1 border
    ${theme === 'dark' 
      ? 'bg-gray-700 border-blue-700' 
      : 'bg-white border-blue-200'}
  `;

  const headerRowClasses = `
    flex justify-between items-center mb-1.5 pb-1 border-b 
    ${theme === 'dark' ? 'border-gray-600' : 'border-gray-100'}
  `;

  const courseItemClasses = `
    flex border-b pb-1.5 last:border-0 last:pb-0 
    ${theme === 'dark' ? 'border-gray-600' : 'border-gray-100'}
  `;

  const timeClasses = `
    text-blue-600 font-medium flex items-center text-xs
    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
  `;

  const closeButtonClasses = `
    ${theme === 'dark' ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}
  `;

  const removeButtonClasses = `
    ml-1
    ${theme === 'dark' ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}
  `;

  const badgeClasses = `
    flex-shrink-0 text-white rounded-full h-5 w-5 flex items-center justify-center mr-1
    ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}
  `;

  const nameClasses = `
    font-medium
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const addressClasses = `
    truncate text-xs
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const scheduledTimeClasses = `
    text-xs
    ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}
  `;

  if (!isExpanded) {
    return (
      <div
        className={collapsedCardClasses}
        onClick={() => setIsExpanded(true)}
      >
        <div className={badgeClasses}>
          <span className="text-xs font-medium">{group.courses.length}</span>
        </div>
        <div className="flex-shrink-0">
          <div className={timeClasses}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {timeRangeDisplay}
          </div>
        </div>
        <div className="flex-grow truncate">
          <div className={nameClasses}>
            {patientsList}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={expandedCardClasses}>
      <div className={headerRowClasses}>
        <div className="flex items-center">
          <div className={badgeClasses}>
            <span className="text-xs font-medium">{group.courses.length}</span>
          </div>
          <span className={timeClasses}>{timeRangeDisplay}</span>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className={closeButtonClasses}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Liste des courses dans le groupe */}
      <div className="space-y-1.5">
        {group.courses.map((course) => (
          <div
            key={course.id}
            className={courseItemClasses}
          >
            <div className="flex-shrink-0 mr-1">
              <div className={scheduledTimeClasses}>
                {formatTime(course.scheduledTime)}
              </div>
            </div>
            <div className="flex-grow">
              <div className={nameClasses}>
                {course.patientName}
              </div>
              <div className={addressClasses}>
                {course.destinationAddress}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveCourse(course.id);
              }}
              className={removeButtonClasses}
              title="Retirer du planning"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(GroupedCoursesCard);