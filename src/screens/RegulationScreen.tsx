import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getEmptyImage } from 'react-dnd-html5-backend';
import type { DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

/**
 * Type definitions for domain entities
 */
interface Ambulance {
  id: string;
  name: string;
  color: string;
}

interface Course {
  id: string;
  patientName: string;
  pickupAddress: string;
  destinationAddress: string;
  appointmentTime: Date;   // Heure de rendez-vous (fixe)
  assignedTo: string | null;  // ID de l'ambulance assignée
  scheduledTime: Date | null; // Heure de prise en charge (modifiable)
}

/**
 * Interface pour un groupe de courses
 */
interface CourseGroup {
  id: string;
  courses: Course[];
  startTime: Date;
  endTime: Date;
}

interface DragItem {
  id: string;
  fromSchedule: boolean;
  type: string;
}

interface HourBlockProps {
  hour: number;
  date: Date;
  ambulanceId: string;
  ambulance: Ambulance;
  onDropCourse: (courseId: string, ambulanceId: string, time: Date, fromSchedule: boolean) => void;
  scheduledCourses: Course[];
  onRemoveCourse: (courseId: string) => void;
  isAlternateRow: boolean;
  onHoverTimeChange: (hour: number, minute: number) => void;
  onHoverEnd?: () => void;
}

interface DropPreviewData {
  isVisible: boolean;
  time: Date | null;
  x: number;
  y: number;
}

/**
 * Application constants and configuration
 */
const START_HOUR = 6;
const END_HOUR = 22;
const TIME_INTERVAL = 5; // minutes

/**
 * Color palette for ambulances and UI elements
 */
const COLORS = {
  blue: {
    primary: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    light: 'bg-blue-50',
    lighter: 'bg-blue-25',
    border: 'border-blue-200',
    text: 'text-blue-600',
  },
  gray: {
    primary: 'bg-gray-700',
    hover: 'hover:bg-gray-800',
    light: 'bg-gray-50',
    lighter: 'bg-gray-25',
    border: 'border-gray-200',
    text: 'text-gray-700',
  },
  teal: {
    primary: 'bg-teal-600',
    hover: 'hover:bg-teal-700',
    light: 'bg-teal-50',
    lighter: 'bg-teal-25',
    border: 'border-teal-200',
    text: 'text-teal-600', 
  },
  amber: {
    primary: 'bg-amber-600',
    hover: 'hover:bg-amber-700',
    light: 'bg-amber-50',
    lighter: 'bg-amber-25',
    border: 'border-amber-200',
    text: 'text-amber-600',
  },
  indigo: {
    primary: 'bg-indigo-600',
    hover: 'hover:bg-indigo-700',
    light: 'bg-indigo-50',
    lighter: 'bg-indigo-25',
    border: 'border-indigo-200',
    text: 'text-indigo-600',
  }
};

const AMBULANCE_COLORS = [
  COLORS.blue,
  COLORS.teal,
  COLORS.indigo,
  COLORS.amber,
  COLORS.gray,
];

/**
 * Utility functions for date formatting and test data generation
 */

/**
 * Format a date for time display
 */
const formatTime = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Détecte si deux courses sont trop proches l'une de l'autre (collision)
 * @param course1 Première course à comparer
 * @param course2 Deuxième course à comparer
 * @param minuteThreshold Seuil de proximité en minutes
 * @returns true si les courses sont trop proches
 */
const areCoursesTooClose = (course1: Course, course2: Course, minuteThreshold: number = 10): boolean => {
  if (!course1.scheduledTime || !course2.scheduledTime) return false;
  
  const time1 = course1.scheduledTime.getTime();
  const time2 = course2.scheduledTime.getTime();
  const diffInMs = Math.abs(time1 - time2);
  const diffInMinutes = diffInMs / (1000 * 60);
  
  return diffInMinutes < minuteThreshold;
};

/**
 * Regroupe les courses qui sont trop proches les unes des autres
 * @param courses Liste des courses à analyser
 * @param minuteThreshold Seuil de proximité en minutes pour le regroupement
 * @returns Un tableau de courses individuelles et de groupes de courses
 */
const groupCloseScheduledCourses = (courses: Course[], minuteThreshold: number = 20): (Course | CourseGroup)[] => {
  if (courses.length <= 1) return courses;
  
  // Trier les courses par heure
  const sortedCourses = [...courses].sort((a, b) => {
    if (!a.scheduledTime || !b.scheduledTime) return 0;
    return a.scheduledTime.getTime() - b.scheduledTime.getTime();
  });
  
  const result: (Course | CourseGroup)[] = [];
  let currentGroup: Course[] = [];
  
  // Parcourir les courses triées
  sortedCourses.forEach((course, index) => {
    // Si c'est la première course ou si elle est trop éloignée de la précédente
    if (index === 0 || !areCoursesTooClose(course, sortedCourses[index - 1], minuteThreshold)) {
      // Si on avait déjà un groupe en cours
      if (currentGroup.length > 1) {
        // Créer un nouveau groupe avec les courses accumulées jusqu'à présent
        const startTime = currentGroup[0].scheduledTime!;
        const endTime = currentGroup[currentGroup.length - 1].scheduledTime!;
        
        result.push({
          id: `group-${currentGroup.map(c => c.id).join('-')}`,
          courses: [...currentGroup],
          startTime,
          endTime
        });
        
        // Réinitialiser le groupe
        currentGroup = [course];
      } else if (currentGroup.length === 1) {
        // Ajouter la course individuelle précédente
        result.push(currentGroup[0]);
        currentGroup = [course];
      } else {
        // Premier élément
        currentGroup = [course];
      }
    } else {
      // Ajouter la course au groupe en cours
      currentGroup.push(course);
    }
  });
  
  // Traiter le dernier groupe
  if (currentGroup.length > 1) {
    const startTime = currentGroup[0].scheduledTime!;
    const endTime = currentGroup[currentGroup.length - 1].scheduledTime!;
    
    result.push({
      id: `group-${currentGroup.map(c => c.id).join('-')}`,
      courses: [...currentGroup],
      startTime,
      endTime
    });
  } else if (currentGroup.length === 1) {
    result.push(currentGroup[0]);
  }
  
  return result;
};

const generateMockAmbulances = (count: number): Ambulance[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `amb-${index + 1}`,
    name: `Ambulance ${index + 1}`,
    color: AMBULANCE_COLORS[index % AMBULANCE_COLORS.length].primary,
  }));
};

const generateMockCourses = (count: number): Course[] => {
  const courses: Course[] = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  // Create courses with unique, incrementally increasing times
  for (let i = 0; i < count; i++) {
    // Calculate a unique time slot
    // Start from START_HOUR and distribute courses evenly
    const minuteIncrement = Math.floor(60 / (count / (END_HOUR - START_HOUR)));
    const totalMinutesPassed = i * minuteIncrement;
    
    const hour = START_HOUR + Math.floor(totalMinutesPassed / 60);
    const minute = totalMinutesPassed % 60;
    
    const appointmentTime = new Date(tomorrow);
    appointmentTime.setHours(hour, minute, 0, 0);
    
    courses.push({
      id: `course-${i + 1}`,
      patientName: `Patient ${i + 1}`,
      pickupAddress: `${Math.floor(Math.random() * 100) + 1} Rue de Paris`,
      destinationAddress: `Hôpital ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
      appointmentTime,
      assignedTo: null,
      scheduledTime: null,
    });
  }
  
  // Sort courses by appointment time (already should be sorted, but ensure it)
  return courses.sort((a, b) => a.appointmentTime.getTime() - b.appointmentTime.getTime());
};

/**
 * GroupedCoursesCard - Composant pour afficher plusieurs courses regroupées
 * Permet d'afficher un résumé du groupe et de développer les détails au clic
 */
interface GroupedCoursesCardProps {
  group: CourseGroup;
  ambulance: Ambulance;
  onRemoveCourse: (courseId: string) => void;
}

const GroupedCoursesCard: React.FC<GroupedCoursesCardProps> = ({ 
  group, 
  ambulance,
  onRemoveCourse
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format du créneau horaire (ex: "06:00 - 06:15")
  const timeRangeDisplay = useMemo(() => {
    return `${formatTime(group.startTime)} - ${formatTime(group.endTime)}`;
  }, [group.startTime, group.endTime]);
  
  // Couleur de la bordure basée sur l'ambulance
  const getColorClass = useCallback((colorName: string): string => {
    const baseColor = colorName.split('-')[1];
    return `border-l-2 border-${baseColor}-500`;
  }, []);
  
  // Obtenir les noms des patients sous forme de liste
  const patientsList = useMemo(() => {
    return group.courses.map(course => course.patientName).join(', ');
  }, [group.courses]);
  
  // Affichage condensé (quand non développé)
  if (!isExpanded) {
    return (
      <div
        className={`p-1.5 rounded shadow-sm bg-white ${getColorClass(ambulance.color)}
          cursor-pointer flex items-center gap-1 z-10 mr-1 text-xs hover:shadow 
          transition-all duration-200 border-blue-200 border`}
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center mr-1">
          <span className="text-xs font-medium">{group.courses.length}</span>
        </div>
        <div className="flex-shrink-0">
          <div className="text-blue-600 font-medium flex items-center text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {timeRangeDisplay}
          </div>
        </div>
        <div className="flex-grow truncate">
          <div className="font-medium text-gray-800 truncate">{patientsList}</div>
        </div>
      </div>
    );
  }
  
  // Affichage détaillé (quand développé)
  return (
    <div
      className={`p-2 rounded shadow-md bg-white ${getColorClass(ambulance.color)}
        z-20 mr-1 text-xs absolute left-0 right-1 border-blue-200 border`}
    >
      <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-gray-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center mr-1.5">
            <span className="text-xs font-medium">{group.courses.length}</span>
          </div>
          <span className="text-blue-600 font-medium">
            {timeRangeDisplay}
          </span>
        </div>
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Liste des courses dans le groupe */}
      <div className="space-y-1.5">
        {group.courses.map(course => (
          <div key={course.id} className="flex border-b border-gray-100 pb-1.5 last:border-0 last:pb-0">
            <div className="flex-shrink-0 mr-1">
              <div className="text-green-600 text-xs">
                {formatTime(course.scheduledTime)}
              </div>
            </div>
            <div className="flex-grow">
              <div className="font-medium text-gray-800">{course.patientName}</div>
              <div className="text-gray-500 truncate text-xs">{course.destinationAddress}</div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRemoveCourse(course.id);
              }}
              className="text-gray-400 hover:text-red-500 ml-1"
              title="Retirer du planning"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * UnassignedCourseCard - Component for a course in the "to be scheduled" area
 */
const UnassignedCourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'COURSE',
    item: { 
      id: course.id, 
      fromSchedule: false,
      type: 'COURSE'
    } as DragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Use empty image as drag preview (we'll use custom preview)
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={drag}
      className={`p-2 rounded shadow-sm bg-white border border-gray-200
        ${isDragging ? 'opacity-50' : 'opacity-100'} cursor-grab hover:shadow 
        transition-shadow duration-200 w-[180px]`}
    >
      <div className="flex items-center text-xs text-blue-600 font-medium mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        {formatTime(course.appointmentTime)}
      </div>
      <div className="font-medium text-gray-800 text-sm truncate mb-1">{course.patientName}</div>
      <div className="text-xs text-gray-500 truncate mb-0.5 flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span className="truncate">{course.pickupAddress}</span>
      </div>
      <div className="text-xs text-gray-500 truncate flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span className="truncate">{course.destinationAddress}</span>
      </div>
    </div>
  );
};

/**
 * ScheduledCourseCard - Component for a course that has been assigned to an ambulance
 */
const ScheduledCourseCard: React.FC<{ 
  course: Course;
  onRemove?: () => void;
  ambulance: Ambulance;
  isCompact?: boolean;
  hasCollision?: boolean;
}> = ({ course, onRemove, ambulance, isCompact = false, hasCollision = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'COURSE',
    item: { 
      id: course.id, 
      fromSchedule: true,
      type: 'COURSE'
    } as DragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Use empty image as drag preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // Get color scheme based on ambulance
  const getColorClass = (colorName: string): string => {
    const baseColor = colorName.split('-')[1];
    return `border-l-2 border-${baseColor}-500`;
  };

  // Compact mode is used when courses are too close to each other
  if (isCompact && !expanded) {
    return (
      <div
        ref={drag}
        className={`p-1 rounded shadow-sm bg-white ${getColorClass(ambulance.color)} 
          ${isDragging ? 'opacity-50' : 'opacity-100'} cursor-grab flex items-center 
          justify-between gap-1 z-10 mr-1 text-xs hover:shadow transition-all duration-200
          ${hasCollision ? 'mb-1 opacity-80' : ''}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="flex-shrink-0 font-medium truncate">
          {course.patientName.split(' ')[0]}
        </div>
        <div className="flex-shrink-0 text-blue-600 flex items-center text-xs whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 mr-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {formatTime(course.scheduledTime)}
        </div>
        {onRemove && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors w-4 h-4 
              flex items-center justify-center rounded-full hover:bg-red-50"
            title="Retirer du planning"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={drag}
      className={`p-1.5 rounded shadow-sm bg-white ${getColorClass(ambulance.color)}
        ${isDragging ? 'opacity-50' : 'opacity-100'} cursor-grab flex items-center 
        gap-1 z-10 mr-1 text-xs hover:shadow transition-shadow duration-200
        ${isCompact && expanded ? 'shadow-md z-20 absolute left-0 right-1 bg-white' : ''}
        ${hasCollision ? 'opacity-90' : ''}`}
      onMouseLeave={() => isCompact && setExpanded(false)}
    >
      <div className="flex-shrink-0">
        <div className="text-green-600 flex items-center text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-1-1h-8a1 1 0 00-.8.4L8.65 8H3V4z" />
          </svg>
          {formatTime(course.scheduledTime)}
        </div>
        <div className="text-blue-600 flex items-center text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {formatTime(course.appointmentTime)}
        </div>
      </div>
      <div className="flex-grow truncate">
        <div className="font-medium text-gray-800 truncate">{course.patientName}</div>
        <div className="text-gray-500 truncate flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 mr-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
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
          className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors w-4 h-4 
            flex items-center justify-center rounded-full hover:bg-red-50"
          title="Retirer du planning"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

/**
 * CourseDragPreview - Shows time indicator when dragging a course
 */
const CourseDragPreview: React.FC<{ preview: DropPreviewData | null }> = ({ preview }) => {
  if (!preview || !preview.isVisible || !preview.time) return null;

  return (
    <div 
      className="fixed pointer-events-none bg-blue-600 text-white px-2 py-1 text-xs rounded shadow-lg z-50 flex items-center"
      style={{ left: preview.x + 15, top: preview.y + 15 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      {formatTime(preview.time)}
    </div>
  );
};

/**
 * UnassignedArea - Container for courses that haven't been scheduled yet
 */
const UnassignedArea: React.FC<{
  courses: Course[];
  onDropCourse: (courseId: string) => void;
}> = ({ courses, onDropCourse }) => {
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
    accept: 'COURSE',
    drop: (item: DragItem) => {
      if (item.fromSchedule) {
        onDropCourse(item.id);
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // État pour basculer entre affichage limité et complet
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  // Sélection des 15 premières courses ou toutes selon l'état
  const displayedCourses = showAllCourses ? courses : courses.slice(0, 15);

  return (
    <div 
      ref={drop}
      className={`bg-white border border-gray-200 p-4 mb-5 rounded-md shadow-sm
        ${isOver ? 'border-blue-300 bg-blue-50' : ''} transition-colors duration-200`}
    >
      <h3 className="text-base font-semibold mb-3 flex items-center text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
        </svg>
        Courses à affecter ({courses.length})
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {displayedCourses.map(course => (
          <UnassignedCourseCard key={course.id} course={course} />
        ))}

        {courses.length === 0 && (
          <div className="text-sm text-gray-500 italic py-2">
            Toutes les courses ont été affectées
          </div>
        )}
      </div>

      {/* Bouton "Voir tout" */}
      {courses.length > 15 && (
        <button 
          onClick={() => setShowAllCourses(!showAllCourses)}
          className="mt-2 text-blue-600 text-sm hover:underline"
        >
          {showAllCourses ? "Voir moins" : "Voir tout"}
        </button>
      )}
    </div>
  );
};

/**
 * HourBlock - Represents a one-hour time block in the schedule
 */
const HourBlock: React.FC<HourBlockProps> = ({ 
  hour, 
  date, 
  ambulanceId,
  ambulance,
  onDropCourse, 
  scheduledCourses,
  onRemoveCourse,
  isAlternateRow,
  onHoverTimeChange,
  onHoverEnd
}) => {
  const [previewTime, setPreviewTime] = useState<Date | null>(null);
  const blockRef = useRef<HTMLDivElement | null>(null);
  
  // Create reference time for this hour
  const hourStartTime = useMemo(() => {
    const time = new Date(date);
    time.setHours(hour, 0, 0, 0);
    return time;
  }, [hour, date]);

  // Calculate time based on vertical position
  const calculateTimeFromPosition = useCallback((clientY: number): Date => {
    if (!blockRef.current) {
      return new Date(hourStartTime);
    }
    
    const rect = blockRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const percentageY = Math.min(Math.max(relativeY / rect.height, 0), 0.99);
    
    // Calculate minutes based on position (0 to 59 minutes)
    const minutesInHour = percentageY * 60; 
    
    // Round to nearest TIME_INTERVAL (e.g., 5 minutes)
    const roundedMinutes = Math.floor(minutesInHour / TIME_INTERVAL) * TIME_INTERVAL;
    
    const time = new Date(hourStartTime);
    time.setMinutes(roundedMinutes);
    
    return time;
  }, [hourStartTime]);

  /**
   * Configure drop handling with types
   */
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
    accept: 'COURSE',
    hover: (dragItem: DragItem, monitor: DropTargetMonitor) => {
      if (dragItem && dragItem.id) {
        const clientOffset = monitor.getClientOffset();
        if (clientOffset) {
          const hoverTime = calculateTimeFromPosition(clientOffset.y);
          setPreviewTime(hoverTime);
          
          // Mettre à jour l'état global des informations de survol
          if (hoverTime) {
            onHoverTimeChange(hour, hoverTime.getMinutes());
          }
        }
      }
    },
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const dropTime = calculateTimeFromPosition(clientOffset.y);
        onDropCourse(item.id, ambulanceId, dropTime, item.fromSchedule);
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [ambulanceId, calculateTimeFromPosition, onDropCourse, hour, onHoverTimeChange]);
  
  // Advanced refs management to avoid direct .current assignment
  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (blockNode) {
      blockRef.current = blockNode;
    }
  }, [blockNode]);

  const handleRefUpdate = useCallback((node: HTMLDivElement | null) => {
    drop(node);
    setBlockNode(node);
  }, [drop]);

  return (
    <div 
      ref={handleRefUpdate}
      className={`border-t border-gray-200 relative ${isAlternateRow ? 'bg-gray-50' : 'bg-white'} 
        ${isOver ? 'bg-blue-50' : ''} transition-colors duration-200`}
      style={{ height: '100px' }}
      onMouseLeave={() => onHoverEnd && onHoverEnd()}
    >
      {/* Time selection indicator */}
      {isOver && previewTime && (
        <>
          {/* Ligne pointillée indiquant l'heure exacte */}
          <div className="absolute left-0 right-0 border-t border-dashed border-blue-500 z-10"
            style={{
              top: `${((previewTime.getMinutes() / 60) * 100)}%`,
            }}
          />
        </>
      )}
      
      {/* Scheduled courses and course groups */}
      {(() => {
        // Regrouper les courses proches
        const courseItems = groupCloseScheduledCourses(scheduledCourses, 20);
        
        return courseItems.map(item => {
          // Déterminer s'il s'agit d'un groupe ou d'une course individuelle
          const isGroup = 'courses' in item;
          
          if (isGroup) {
            // C'est un groupe de courses
            const group = item as CourseGroup;
            const topPosition = (group.startTime.getMinutes() / 60) * 100;
            
            return (
              <div 
                key={group.id} 
                className="absolute left-0 right-1 z-20"
                style={{ top: `${topPosition}%` }}
              >
                <GroupedCoursesCard 
                  group={group}
                  ambulance={ambulance}
                  onRemoveCourse={onRemoveCourse}
                />
              </div>
            );
          } else {
            // C'est une course individuelle
            const course = item as Course;
            if (!course.scheduledTime) return null;
            
            const minutes = course.scheduledTime.getMinutes();
            const topPosition = (minutes / 60) * 100;
            
            return (
              <div 
                key={course.id} 
                className="absolute left-0 right-1 z-20"
                style={{ top: `${topPosition}%` }}
              >
                <ScheduledCourseCard 
                  course={course}
                  ambulance={ambulance}
                  onRemove={() => onRemoveCourse(course.id)}
                  isCompact={false}
                  hasCollision={false}
                />
              </div>
            );
          }
        });
      })()}
    </div>
  );
};

/**
 * Main RegulationPage component
 */
interface RegulationPageProps {
  isOpen: boolean;
}

const RegulationScreen: React.FC<RegulationPageProps> = ({ isOpen }) => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [dragPreview, setDragPreview] = useState<DropPreviewData | null>(null);
  // État pour suivre l'heure précise survolée
  const [hoveredTimeInfo, setHoveredTimeInfo] = useState<{hour: number, minute: number} | null>(null);
  
  // Initialize data on component mount
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    setAmbulances(generateMockAmbulances(5));
    setCourses(generateMockCourses(75));
  }, []);

  /**
   * Handles global mouse movement to update drag preview
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragPreview && dragPreview.isVisible) {
      setDragPreview({
        ...dragPreview,
        x: e.clientX,
        y: e.clientY
      });
    }
  }, [dragPreview]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  /**
   * Unassign a course back to the pool
   */
  const handleUnassignCourse = useCallback((courseId: string) => {
    setCourses(prevCourses => prevCourses.map(course => 
      course.id === courseId 
        ? { ...course, assignedTo: null, scheduledTime: null } 
        : course
    ));
  }, []);

  /**
   * Handle dropping a course onto the schedule
   */
  const handleDropCourse = useCallback((
    courseId: string, 
    ambulanceId: string, 
    time: Date, 
    fromSchedule: boolean
  ) => {
    setCourses(prevCourses => {
      // Check if slot is already occupied
      const targetSlotOccupied = prevCourses.some(c => 
        c.assignedTo === ambulanceId && 
        c.scheduledTime?.getHours() === time.getHours() && 
        c.scheduledTime?.getMinutes() === time.getMinutes() &&
        c.id !== courseId
      );

      if (targetSlotOccupied) {
        return prevCourses;
      }

      return prevCourses.map(course => {
        if (course.id === courseId) {
          // Log if repositioning from schedule
          if (fromSchedule) {
            console.log(`Course ${courseId} relocalisée`);
          }
          
          return { 
            ...course, 
            assignedTo: ambulanceId, 
            scheduledTime: time 
          };
        }
        return course;
      });
    });
    
    setDragPreview(null);
  }, []);

  /**
   * Format date for display
   */
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  /**
   * Get courses for a specific hour/ambulance
   */
  const getCoursesForHour = useCallback((ambulanceId: string, hour: number): Course[] => {
    return courses.filter(course => {
      if (!course.scheduledTime || course.assignedTo !== ambulanceId) return false;
      return course.scheduledTime.getHours() === hour;
    });
  }, [courses]);

  // Get array of hours from START_HOUR to END_HOUR
  const hours = useMemo(() => 
    Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i),
    []
  );

  // Filter unassigned courses
  const unassignedCourses = useMemo(() => 
    courses.filter(course => !course.assignedTo),
    [courses]
  );

  // Get tomorrow's date
  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
<div
      className={`
        transition-all duration-300 
        bg-gray-100 min-h-screen 
        ${isOpen ? "ml-64" : "ml-16"}
      `}
    >
        <div className="max-w-7xl mx-auto px-3 py-5 ">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-xl font-bold text-gray-800 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-1-1h-8a1 1 0 00-.8.4L8.65 8H3V4z" />
              </svg>
              Régulation des Ambulances
            </h1>
            <div className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <h2 className="font-medium">
                Planning pour <span className="text-blue-600">{formatDate(tomorrow)}</span>
              </h2>
            </div>
          </div>
          
          {/* Drag preview */}
          <CourseDragPreview preview={dragPreview} />
          
          {/* Unassigned courses */}
          <UnassignedArea 
            courses={unassignedCourses} 
            onDropCourse={handleUnassignCourse} 
          />

          {/* Schedule grid */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <div className="min-w-max">
                {/* Ambulance headers */}
                <div className="flex">
                  {/* Time column header */}
                  <div className="w-16 bg-gray-100 border-b border-r border-gray-200 font-medium text-xs text-gray-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Heure
                  </div>
                  
                  {/* Ambulance headers */}
                  {ambulances.map((ambulance) => (
                    <div key={ambulance.id} className="flex-1 min-w-[200px]">
                      <div className={`${ambulance.color} text-white p-2 font-medium text-sm flex items-center justify-center shadow-sm`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-1-1h-8a1 1 0 00-.8.4L8.65 8H3V4z" />
                        </svg>
                        {ambulance.name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time slots grid */}
                <div className="flex">
                  {/* Hours column with time labels */}
                  <div className="w-16 bg-gray-50 border-r border-gray-200">
                    {hours.map((hour, index) => (
                      <div 
                        key={`hour-${hour}`} 
                        className={`relative flex items-center justify-center font-medium text-xs text-gray-500 ${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                        }`} 
                        style={{ height: '100px' }}
                      >
                        <div className="flex items-center">
                          {hoveredTimeInfo && hoveredTimeInfo.hour === hour ? (
                            <div className="text-blue-700 font-medium">
                              {`${hour}:${hoveredTimeInfo.minute.toString().padStart(2, '0')}`}
                            </div>
                          ) : (
                            `${hour}:00`
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Ambulance columns */}
                  {ambulances.map((ambulance) => (
                    <div key={ambulance.id} className="flex-1 min-w-[200px] border-r border-gray-200">
                      {/* Hour blocks */}
                      {hours.map((hour, hourIndex) => (
                        <HourBlock
                          key={`${ambulance.id}-${hour}`}
                          hour={hour}
                          date={tomorrow}
                          ambulanceId={ambulance.id}
                          ambulance={ambulance}
                          onDropCourse={handleDropCourse}
                          onRemoveCourse={handleUnassignCourse}
                          scheduledCourses={getCoursesForHour(ambulance.id, hour)}
                          isAlternateRow={hourIndex % 2 === 0}
                          onHoverTimeChange={(hourVal, minute) => setHoveredTimeInfo({ hour: hourVal, minute })}
                          onHoverEnd={() => setHoveredTimeInfo(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default RegulationScreen;