import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useScheduleData } from "./hooks/useScheduleData";
import { useDragPreview } from "./hooks/useDragPreview";
import LoadingSpinner from "../../Common/LoadingSpinner";
import ScheduleHeader from "../Regulation/ScheduleHeader";
import UnassignedArea from "../Regulation/UnassignedArea";
import ScheduleGrid from "../Regulation/ScheduleGrid";
import CourseDragPreview from "../Regulation/CourseDragPreview";

export interface RegulationProps {
  isOpen: boolean;
}

const Regulation: React.FC<RegulationProps> = ({ isOpen }) => {
  const {
    ambulances,
    isLoading,
    hours,
    unassignedCourses,
    tomorrow,
    handleUnassignCourse,
    handleDropCourse,
    getCoursesForHour,
  } = useScheduleData();

  const {
    dragPreview,
    hoveredTimeInfo,
    setHoveredTimeInfo,
  } = useDragPreview();

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`
        transition-all duration-300 
        bg-gray-100 min-h-screen 
        ${isOpen ? "ml-64" : "ml-16"}
      `}
      >
        {isLoading ? (
          <LoadingSpinner isOpen={isOpen} />
        ) : (
          <div className="max-w-7xl mx-auto px-3 py-5">
            <ScheduleHeader tomorrow={tomorrow} />

            <CourseDragPreview preview={dragPreview} />

            <UnassignedArea
              courses={unassignedCourses}
              onDropCourse={handleUnassignCourse}
            />

            <ScheduleGrid
              ambulances={ambulances}
              hours={hours}
              tomorrow={tomorrow}
              hoveredTimeInfo={hoveredTimeInfo}
              setHoveredTimeInfo={setHoveredTimeInfo}
              handleDropCourse={handleDropCourse}
              handleUnassignCourse={handleUnassignCourse}
              getCoursesForHour={getCoursesForHour}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default React.memo(Regulation);