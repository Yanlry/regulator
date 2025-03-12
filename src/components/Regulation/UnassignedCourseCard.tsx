import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSourceMonitor } from 'react-dnd';
import { UnassignedCourseCardProps, DragItem } from '../Regulation/types';
import { formatTime } from '../Regulation/utils';
import { useTheme } from '../../contexts/ThemeContext';

// Interface étendue pour inclure le thème
interface ThemeAwareUnassignedCourseCardProps extends Omit<UnassignedCourseCardProps, 'theme'> {
  theme?: 'dark' | 'light';
}

const UnassignedCourseCard: React.FC<ThemeAwareUnassignedCourseCardProps> = ({ 
  course,
  theme: propTheme 
}) => {
  // Récupérer le thème du contexte si non fourni via props
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "COURSE",
    item: {
      id: course.id,
      fromSchedule: false,
      type: "COURSE",
    } as DragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // Classes CSS adaptatives selon le thème
  const cardClasses = `
    p-2 rounded shadow-sm border
    ${isDragging ? "opacity-50" : "opacity-100"} cursor-grab hover:shadow 
    transition-shadow duration-200 w-[180px]
    ${theme === 'dark' 
      ? 'bg-gray-700 border-gray-600' 
      : 'bg-white border-gray-200'}
  `;

  const timeClasses = `
    flex items-center text-xs font-medium mb-1
    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
  `;

  const nameClasses = `
    font-medium text-sm truncate mb-1
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const addressClasses = `
    text-xs truncate flex items-start
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  return (
    <div
      ref={drag}
      className={cardClasses}
    >
      <div className={timeClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        {formatTime(course.appointmentTime)}
      </div>
      <div className={nameClasses}>
        {course.patientName}
      </div>
      <div className={`${addressClasses} mb-0.5`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="truncate">{course.pickupAddress}</span>
      </div>
      <div className={addressClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span className="truncate">{course.destinationAddress}</span>
      </div>
    </div>
  );
};

export default React.memo(UnassignedCourseCard);