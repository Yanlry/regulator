import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DropTargetMonitor, DragSourceMonitor } from 'react-dnd';
import { Course, DragItem, Ambulance } from '../Regulation/types';
import { formatTime } from '../Regulation/utils';
import { UnassignedCourseCardProps } from '../Regulation/types';

// Carte de course compacte pour l'affichage après assignation
const CompactCourseCard: React.FC<UnassignedCourseCardProps> = ({ course }) => {
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

  return (
    <div
      ref={drag}
      className={`p-1.5 rounded shadow-sm bg-white border border-gray-200
        ${isDragging ? "opacity-50" : "opacity-100"} cursor-grab hover:shadow 
        transition-shadow duration-200 flex items-center text-sm w-full h-10`}
    >
      <div className="flex-shrink-0 text-xs font-medium text-blue-600 w-12">
        {formatTime(course.appointmentTime)}
      </div>
      <div className="font-medium text-gray-800 text-xs truncate mx-1.5 flex-grow">
        {course.patientName || 'Patient'}
      </div>
      <div className="flex-shrink-0 text-xs text-gray-500 truncate bg-gray-50 px-1.5 py-0.5 rounded-full">
        {course.destinationAddress?.split(' ')[0] || 'Destination'}
      </div>
    </div>
  );
};

// Carte de course standard pour l'affichage avant assignation
const RegularCourseCard: React.FC<UnassignedCourseCardProps> = ({ course }) => {
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

  return (
    <div
      ref={drag}
      className={`p-2 rounded shadow-sm bg-white border border-gray-200
        ${isDragging ? "opacity-50" : "opacity-100"} cursor-grab hover:shadow 
        transition-shadow duration-200 w-[180px]`}
    >
      <div className="flex items-center text-xs text-blue-600 font-medium mb-1">
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
      <div className="font-medium text-gray-800 text-sm truncate mb-1">
        {course.patientName}
      </div>
      <div className="text-xs text-gray-500 truncate mb-0.5 flex items-start">
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
      <div className="text-xs text-gray-500 truncate flex items-start">
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

// Interface pour les props du composant principal
interface UnassignedAreaProps {
  courses: Course[];
  ambulances?: Ambulance[];
  onDropCourse: (courseId: string) => void;
  onAutoAssign?: (assignedCourses: { [ambulanceId: string]: Course[] }) => void;
}

// Interface pour la config d'ambulance
interface AmbulanceConfig {
  id: string;
  name: string;
  startHour: number;
  endHour: number;
  color: string;
}

// Composant principal pour l'affichage et l'assignation des courses
const UnassignedArea: React.FC<UnassignedAreaProps> = ({ 
  courses, 
  ambulances = [],
  onDropCourse,
  onAutoAssign 
}) => {
  // Configuration de react-dnd pour le drop
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
    accept: "COURSE",
    drop: (item: DragItem) => {
      if (item.fromSchedule) {
        onDropCourse(item.id);
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // États pour l'affichage et la gestion
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [isAutoAssigned, setIsAutoAssigned] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [marginMinutes, setMarginMinutes] = useState(30);
  const [assignedCoursesState, setAssignedCoursesState] = useState<{ [ambulanceId: string]: Course[] }>({});
  const [expandedAmbulances, setExpandedAmbulances] = useState<{ [ambulanceId: string]: boolean }>({});
  
  // État pour la configuration des ambulances
  const [ambulanceConfigs, setAmbulanceConfigs] = useState<AmbulanceConfig[]>(() => {
    if (ambulances.length > 0) {
      return ambulances.map((amb, index) => ({
        id: amb.id,
        name: amb.name || `Ambulance ${index + 1}`,
        startHour: 8,
        endHour: 18,
        color: amb.color || getRandomColor()
      }));
    } else {
      return Array.from({ length: 5 }, (_, i) => ({
        id: (i + 1).toString(),
        name: `Ambulance ${i + 1}`,
        startHour: 8,
        endHour: 18,
        color: getRandomColor()
      }));
    }
  });
  const [ambulanceCount, setAmbulanceCount] = useState(ambulanceConfigs.length);

  // Générer une couleur aléatoire pour l'ambulance
  function getRandomColor() {
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  }  

  // Obtenir les courses à afficher selon l'état d'affichage
  const displayedCourses = showAllCourses ? courses : courses.slice(0, 15);
  
  // Mettre à jour le nombre d'ambulances
  const updateAmbulanceCount = (count: number) => {
    if (count < ambulanceConfigs.length) {
      // Réduire le nombre d'ambulances
      setAmbulanceConfigs(ambulanceConfigs.slice(0, count));
    } else if (count > ambulanceConfigs.length) {
      // Augmenter le nombre d'ambulances
      const newAmbulances = Array.from(
        { length: count - ambulanceConfigs.length },
        (_, i) => {
          const index = ambulanceConfigs.length + i + 1;
          return {
            id: index.toString(),
            name: `Ambulance ${index}`,
            startHour: 8,
            endHour: 18,
            color: getRandomColor()
          };
        }
      );
      setAmbulanceConfigs([...ambulanceConfigs, ...newAmbulances]);
    }
    setAmbulanceCount(count);
  };

  // Mettre à jour la configuration d'une ambulance
  const updateAmbulanceConfig = (index: number, field: keyof AmbulanceConfig, value: string | number) => {
    const newConfigs = [...ambulanceConfigs];
    newConfigs[index] = { ...newConfigs[index], [field]: value };
    setAmbulanceConfigs(newConfigs);
  };
  
  // Basculer l'expansion d'une ambulance
  const toggleAmbulanceExpansion = (ambulanceId: string) => {
    setExpandedAmbulances(prev => ({
      ...prev,
      [ambulanceId]: !prev[ambulanceId]
    }));
  };

  // Fonction principale pour la répartition automatique
  const autoAssignCourses = () => {
    if (!onAutoAssign) return;
    
    // Création d'un objet pour stocker les courses assignées par ambulance
    const assignedCourses: { [ambulanceId: string]: Course[] } = {};
    
    // Initialisation des tableaux vides pour chaque ambulance
    ambulanceConfigs.forEach(config => {
      assignedCourses[config.id] = [];
    });

    // Trier les courses par heure de début
    const sortedCourses = [...courses].sort((a, b) => {
      if (!a.startTime) return 1;
      if (!b.startTime) return -1;
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
    
    // Affecter chaque course à une ambulance disponible
    for (const course of sortedCourses) {
      // Assigner à l'ambulance ayant le moins de courses
      const sortedConfigs = [...ambulanceConfigs].sort((a, b) => 
        assignedCourses[a.id].length - assignedCourses[b.id].length
      );
      
      if (sortedConfigs.length > 0) {
        assignedCourses[sortedConfigs[0].id].push(course);
      }
    }

    // Définir toutes les ambulances comme réduites initialement
    const initialExpanded: { [ambulanceId: string]: boolean } = {};
    ambulanceConfigs.forEach(config => {
      initialExpanded[config.id] = false; // Toutes réduites par défaut
    });
    
    // La première ambulance est développée pour montrer à l'utilisateur l'interface
    if (ambulanceConfigs.length > 0) {
      initialExpanded[ambulanceConfigs[0].id] = true;
    }
    
    setExpandedAmbulances(initialExpanded);
    
    // Stocker les courses assignées dans l'état
    setAssignedCoursesState(assignedCourses);
    
    // Appeler la fonction de rappel avec les courses assignées
    onAutoAssign(assignedCourses);
    setIsAutoAssigned(true);
    setShowConfigModal(false);
  };

  // Réinitialiser l'assignation
  const resetAssignment = () => {
    setIsAutoAssigned(false);
    setAssignedCoursesState({});
    setExpandedAmbulances({});
  };
  
  // Composant d'en-tête pour les sections d'ambulance
  const AmbulanceHeader = ({ 
    name, 
    color, 
    count, 
    isExpanded, 
    toggleExpand 
  }: { 
    name: string; 
    color: string; 
    count: number; 
    isExpanded: boolean;
    toggleExpand: () => void;
  }) => (
    <div 
      onClick={toggleExpand}
      className="flex items-center p-2 bg-gray-50 rounded-t-md border-b border-gray-200 cursor-pointer hover:bg-gray-100"
    >
      <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
      <h4 className="font-medium text-gray-800 text-sm">{name}</h4>
      <span className="text-xs font-medium bg-blue-100 text-blue-800 ml-auto rounded-full px-2 py-0.5">
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

  // Rendu des courses non assignées
  const renderUnassignedCourses = () => (
    <>
      <div className="flex flex-wrap gap-2">
        {displayedCourses.map((course) => (
          <RegularCourseCard key={course.id} course={course} />
        ))}

        {courses.length === 0 && (
          <div className="text-sm text-gray-500 italic py-2">
            Toutes les courses ont été affectées
          </div>
        )}
      </div>

      {courses.length > 15 && (
        <button
          onClick={() => setShowAllCourses(!showAllCourses)}
          className="mt-2 text-blue-600 text-sm hover:underline"
        >
          {showAllCourses ? "Voir moins" : "Voir tout"}
        </button>
      )}
    </>
  );

  // Rendu des courses après assignation
  const renderAssignedCourses = () => {
    // Si pas d'ambulances configurées ou pas de courses assignées, ne rien afficher
    if (ambulanceConfigs.length === 0 || Object.keys(assignedCoursesState).length === 0) {
      return <div className="text-sm text-gray-500 italic py-2">Aucune course assignée</div>;
    }

    // Statistiques d'assignation
    const totalCourses = courses.length;
    const assignedCourses = Object.values(assignedCoursesState).flat().length;
    const usedAmbulances = Object.keys(assignedCoursesState).filter(id => 
      assignedCoursesState[id]?.length > 0
    ).length;

    return (
      <div className="space-y-4">
        {/* Statistiques d'assignation */}
        <div className="bg-white border border-blue-100 rounded-md p-2">
          <h3 className="text-sm font-medium text-blue-700 mb-2">Statistiques d'assignation</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-xs text-gray-500">Total des courses</div>
              <div className="font-semibold">{totalCourses}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Courses assignées</div>
              <div className="font-semibold">{assignedCourses}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Ambulances utilisées</div>
              <div className="font-semibold">{usedAmbulances}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Hors plage horaire</div>
              <div className="font-semibold">0</div>
            </div>
          </div>
        </div>

        {/* Affichage des ambulances avec leurs courses */}
        <div className="space-y-2">
          {ambulanceConfigs.map((config) => {
            const ambulanceCourses = assignedCoursesState[config.id] || [];
            if (ambulanceCourses.length === 0) return null;
            
            const isExpanded = expandedAmbulances[config.id] || false;
            
            // Trier les courses par heure de début
            const sortedCourses = [...ambulanceCourses].sort((a, b) => {
              if (!a.startTime) return 1;
              if (!b.startTime) return -1;
              return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
            });
            
            return (
              <div key={config.id} className="border border-gray-200 rounded-md overflow-hidden">
                <AmbulanceHeader 
                  name={config.name}
                  color={config.color}
                  count={ambulanceCourses.length}
                  isExpanded={isExpanded}
                  toggleExpand={() => toggleAmbulanceExpansion(config.id)}
                />
                
                {isExpanded && (
                  <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
                    {sortedCourses.map((course) => (
                      <CompactCourseCard key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-end mt-2">
          <button
            onClick={resetAssignment}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
          >
            Réinitialiser l'assignation
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        ref={drop}
        className={`bg-white border border-gray-200 p-4 mb-5 rounded-md shadow-sm transition-colors duration-200
          ${isOver ? "border-blue-300 bg-blue-50" : ""}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold flex items-center text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
            {isAutoAssigned ? "Courses assignées" : `Courses à affecter (${courses.length})`}
          </h3>
          
          {onAutoAssign && (
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              onClick={() => isAutoAssigned ? resetAssignment() : setShowConfigModal(true)}
            >
              {isAutoAssigned ? "Réinitialiser" : "Configuration et répartition"}
            </button>
          )}
        </div>

        {isAutoAssigned ? renderAssignedCourses() : renderUnassignedCourses()}
      </div>

      {/* Modal de configuration */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Configuration de la répartition</h2>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marge entre les courses (en minutes)
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={marginMinutes}
                onChange={(e) => setMarginMinutes(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre d'ambulances
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => updateAmbulanceCount(Math.max(1, ambulanceCount - 1))}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100">{ambulanceCount}</span>
                  <button
                    onClick={() => updateAmbulanceCount(ambulanceCount + 1)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Configuration des ambulances</h3>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto p-2">
                {ambulanceConfigs.map((config, index) => (
                  <div 
                    key={`ambulance-config-${index}`}
                    className="grid grid-cols-12 gap-2 p-3 border border-gray-200 rounded-md bg-gray-50"
                  >
                    <div className="col-span-1 flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full ${config.color}`}></div>
                    </div>
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={config.name}
                        placeholder="Nom"
                        onChange={(e) => updateAmbulanceConfig(index, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-4 flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Disponible de</span>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={config.startHour}
                        onChange={(e) => updateAmbulanceConfig(index, 'startHour', parseInt(e.target.value) || 0)}
                        className="w-16 p-2 border border-gray-300 rounded-md"
                      />
                      <span className="text-sm text-gray-500 mx-1">h à</span>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={config.endHour}
                        onChange={(e) => updateAmbulanceConfig(index, 'endHour', parseInt(e.target.value) || 0)}
                        className="w-16 p-2 border border-gray-300 rounded-md"
                      />
                      <span className="text-sm text-gray-500 ml-1">h</span>
                    </div>
                    <div className="col-span-4 flex items-center gap-2">
                      <label className="text-sm text-gray-500">Couleur</label>
                      <select
                        value={config.color}
                        onChange={(e) => updateAmbulanceConfig(index, 'color', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        <option value="bg-red-500">Rouge</option>
                        <option value="bg-blue-500">Bleu</option>
                        <option value="bg-green-500">Vert</option>
                        <option value="bg-yellow-500">Jaune</option>
                        <option value="bg-purple-500">Violet</option>
                        <option value="bg-pink-500">Rose</option>
                        <option value="bg-indigo-500">Indigo</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={autoAssignCourses}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Répartir les courses
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(UnassignedArea);