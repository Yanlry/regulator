import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSourceMonitor } from 'react-dnd';
import { ScheduledCourseCardProps, DragItem } from '../Regulation/types';
import { formatTime, getAmbulanceColorClass } from '../Regulation/utils';
import { useTheme } from '../../contexts/ThemeContext';

// Interface étendue pour inclure le thème
interface ThemeAwareScheduledCourseCardProps extends Omit<ScheduledCourseCardProps, 'theme'> {
  theme?: 'dark' | 'light';
}

const ScheduledCourseCard: React.FC<ThemeAwareScheduledCourseCardProps> = ({
  course,
  onRemove,
  ambulance,
  isCompact = false,
  hasCollision = false,
  theme: propTheme,
}) => {
  // Récupérer le thème du contexte si non fourni via props
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;

  const [expanded, setExpanded] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "COURSE",
    item: {
      id: course.id,
      fromSchedule: true,
      type: "COURSE",
    } as DragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // Classes CSS adaptatives selon le thème pour le mode compact
  const compactCardClasses = `
    p-1 rounded shadow-sm ${getAmbulanceColorClass(ambulance.color)} 
    ${isDragging ? "opacity-50" : "opacity-100"} cursor-grab flex items-center 
    justify-between gap-1 z-10 mr-1 text-xs hover:shadow transition-all duration-200
    ${hasCollision ? "mb-1 opacity-80" : ""}
    ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'}
  `;

  // Classes CSS adaptatives selon le thème pour le mode standard
  const standardCardClasses = `
  p-1.5 rounded shadow-sm 
  border-2 ${getAmbulanceColorClass(ambulance.color).replace('border-l', 'border')}
  ${isDragging ? "opacity-50" : "opacity-100"} cursor-grab flex items-center 
  gap-1 z-10 mr-1 text-xs hover:shadow transition-shadow duration-200
  ${isCompact && expanded ? "shadow-md z-20 absolute left-0 right-1" : ""}
  ${hasCollision ? "opacity-90" : ""}
  ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'}
`;

  // Classes pour les textes et icônes
  const scheduledTimeClasses = `
    flex items-center text-xs
    ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}
  `;

  const appointmentTimeClasses = `
    flex items-center text-xs
    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
  `;

  const patientNameClasses = `
    font-medium truncate
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  const destinationAddressClasses = `
    truncate flex items-center
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const removeButtonClasses = `
    flex-shrink-0 transition-colors w-4 h-4 
    flex items-center justify-center rounded-full
    ${theme === 'dark' 
      ? 'text-gray-500 hover:text-red-400 hover:bg-gray-600' 
      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}
  `;

  if (isCompact && !expanded) {
    return (
      <div
        ref={drag}
        className={compactCardClasses}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="flex-shrink-0 font-medium truncate">
          {course.patientName.split(" ")[0]}
        </div>
        <div className={appointmentTimeClasses + " whitespace-nowrap"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2.5 w-2.5 mr-0.5 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          {formatTime(course.scheduledTime)}
        </div>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
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
        )}
      </div>
    );
  }

  return (
    <div
      ref={drag}
      className={standardCardClasses}
      onMouseLeave={() => isCompact && setExpanded(false)}
    >
      <div className="flex-shrink-0">
        <div className={scheduledTimeClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2.5 w-2.5 mr-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-1-1h-8a1 1 0 00-.8.4L8.65 8H3V4z" />
          </svg>
          {formatTime(course.scheduledTime)}
        </div>
        <div className={appointmentTimeClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2.5 w-2.5 mr-0.5"
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
      </div>
      <div className="flex-grow truncate">
        <div className={patientNameClasses}>
          {course.patientName}
        </div>
        <div className={destinationAddressClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2.5 w-2.5 mr-0.5 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="truncate">{course.destinationAddress}</span>
        </div>
      </div>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
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
      )}
    </div>
  );
};

export default React.memo(ScheduledCourseCard);