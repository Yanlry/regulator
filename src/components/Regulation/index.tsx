import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useScheduleData } from "./hooks/useScheduleData";
import { useDragPreview } from "./hooks/useDragPreview";
import LoadingSpinner from "../../common/LoadingSpinner";
import ScheduleHeader from "../Regulation/ScheduleHeader";
import UnassignedArea from "../Regulation/UnassignedArea";
import ScheduleGrid from "../Regulation/ScheduleGrid";
import CourseDragPreview from "../Regulation/CourseDragPreview";
import { useTheme } from "../../contexts/ThemeContext";

export interface RegulationProps {
  isOpen: boolean;
}

const Regulation: React.FC<RegulationProps> = ({ isOpen }) => {
  // Récupérer le thème du contexte
  const { theme } = useTheme();

  const {
    ambulances,
    isLoading,
    hours, // Récupérer hours de useScheduleData
    unassignedCourses,
    tomorrow,
    handleUnassignCourse,
    handleDropCourse,
    getCoursesForHour,
    handleClearAmbulance,
  } = useScheduleData();

  const {
    dragPreview,
    hoveredTimeInfo,
    setHoveredTimeInfo,
  } = useDragPreview();

  // Classes CSS adaptatives selon le thème
  const containerClasses = `
    transition-all duration-300 
    ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}
    min-h-screen p-4
  `;

  const contentClasses = `
    max-w-7xl mx-auto px-3 py-5
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}
  `;

  // Vérifier que handleClearAmbulance est disponible
  console.log("handleClearAmbulance disponible:", !!handleClearAmbulance);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={containerClasses}>
        {isLoading ? (
          <LoadingSpinner isOpen={isOpen} />
        ) : (
          <div className={contentClasses}>
            <ScheduleHeader 
              tomorrow={tomorrow} 
              theme={theme} 
            />

            <CourseDragPreview 
              preview={dragPreview} 
              theme={theme} 
            />

            <UnassignedArea
              courses={unassignedCourses}
              ambulances={ambulances}
              onDropCourse={handleUnassignCourse}
              onAutoAssign={() => { /* Add your onAutoAssign logic here */ }}
            />

            <ScheduleGrid
              hours={hours} // Ajouter hours comme prop
              tomorrow={tomorrow}
              hoveredTimeInfo={hoveredTimeInfo}
              setHoveredTimeInfo={setHoveredTimeInfo}
              handleDropCourse={handleDropCourse}
              handleUnassignCourse={handleUnassignCourse}
              getCoursesForHour={getCoursesForHour}
              theme={theme}
              handleClearAmbulance={handleClearAmbulance}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default React.memo(Regulation);