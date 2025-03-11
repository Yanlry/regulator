import React from 'react';
import { Course } from '../Regulation/types';
import CompactCourseCard from './CompactCourseCard';

// Fonction utilitaire pour formater l'heure au format HH:MM
const formatTimeHHMM = (dateString: string | undefined): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
};

// Fonction pour formater la plage horaire d'une liste de courses
const formatTimeRange = (courses: Course[]): string => {
  if (!courses.length) return '';
  
  // Trier les courses par heure de début
  const sortedCourses = [...courses].sort((a, b) => {
    const timeA = a.startTime ? new Date(a.startTime).getTime() : 0;
    const timeB = b.startTime ? new Date(b.startTime).getTime() : 0;
    return timeA - timeB;
  });
  
  const firstCourse = sortedCourses[0];
  const lastCourse = sortedCourses[sortedCourses.length - 1];
  
  const startTime = formatTimeHHMM(firstCourse.startTime);
  const endTime = formatTimeHHMM(lastCourse.endTime);
  
  return `${startTime} - ${endTime}`;
};

// Interfaces pour typer correctement les props
interface AmbulanceHeaderProps {
  name: string;
  color: string;
  timeRange: string;
  count: number;
  isExpanded: boolean;
  toggleExpand: () => void;
}

interface AssignmentStatsProps {
  totalCourses: number;
  assignedCourses: number;
  ambulancesCount: number;
  coursesOutOfTimeRange: number;
}

// Composant pour l'en-tête d'une section d'ambulance
const AmbulanceHeader: React.FC<AmbulanceHeaderProps> = ({ 
  name, 
  color, 
  timeRange, 
  count, 
  isExpanded, 
  toggleExpand 
}) => (
  <div 
    className="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
    onClick={toggleExpand}
  >
    <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
    <h4 className="font-medium text-gray-800 text-sm">{name}</h4>
    {timeRange && (
      <span className="text-xs text-gray-500 ml-2">({timeRange})</span>
    )}
    <span className="ml-auto text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
      {count} course{count > 1 ? 's' : ''}
    </span>
    <svg 
      className={`w-4 h-4 ml-2 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

// Interface pour définir le type de la config d'ambulance
interface AmbulanceConfig {
  id: string;
  name: string;
  color: string;
  startHour?: number;
  endHour?: number;
}

// Fonction pour rendre les courses assignées de manière compacte
const renderAssignedCoursesCompact = (
  ambulanceConfigs: AmbulanceConfig[], 
  assignedCoursesState: { [ambulanceId: string]: Course[] },
  expandedAmbulances: { [ambulanceId: string]: boolean },
  toggleAmbulanceExpansion: (ambulanceId: string) => void
) => {
  return (
    <div className="space-y-2">
      {ambulanceConfigs.map((config) => {
        const ambulanceCourses = assignedCoursesState[config.id] || [];
        const isExpanded = expandedAmbulances[config.id] || false;
        const timeRange = formatTimeRange(ambulanceCourses);
        
        if (ambulanceCourses.length === 0) return null;
        
        // Trier les courses par heure
        const sortedCourses = [...ambulanceCourses].sort((a, b) => {
          const timeA = a.startTime ? new Date(a.startTime).getTime() : 0;
          const timeB = b.startTime ? new Date(b.startTime).getTime() : 0;
          return timeA - timeB;
        });
        
        return (
          <div key={config.id} className="border border-gray-200 rounded-md overflow-hidden">
            <AmbulanceHeader 
              name={config.name}
              color={config.color}
              timeRange={timeRange}
              count={ambulanceCourses.length}
              isExpanded={isExpanded}
              toggleExpand={() => toggleAmbulanceExpansion(config.id)}
            />
            
            {isExpanded && (
              <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5">
                {sortedCourses.map((course) => (
                  <CompactCourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Composant pour afficher les statistiques d'assignation de manière compacte
const AssignmentStats: React.FC<AssignmentStatsProps> = ({ 
  totalCourses, 
  assignedCourses, 
  ambulancesCount, 
  coursesOutOfTimeRange 
}) => (
  <div className="bg-white border border-blue-100 rounded-md p-2 mb-4">
    <h3 className="text-sm font-medium text-blue-700 mb-2">Statistiques d'assignation</h3>
    <div className="grid grid-cols-4 gap-2 text-center">
      <div>
        <div className="text-xs text-gray-500">Total</div>
        <div className="font-semibold">{totalCourses}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Assignées</div>
        <div className="font-semibold">{assignedCourses}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Ambulances</div>
        <div className="font-semibold">{ambulancesCount}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Hors plage</div>
        <div className="font-semibold">{coursesOutOfTimeRange}</div>
      </div>
    </div>
  </div>
);

export { renderAssignedCoursesCompact };
export { AssignmentStats };