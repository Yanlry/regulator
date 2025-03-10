import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { DropTargetMonitor } from 'react-dnd';
import { Course, DragItem } from '../Regulation/types';
import UnassignedCourseCard from './UnassignedCourseCard';


interface UnassignedAreaProps {
  courses: Course[];
  onDropCourse: (courseId: string) => void;
}

const UnassignedArea: React.FC<UnassignedAreaProps> = ({ courses, onDropCourse }) => {
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(
    () => ({
      accept: "COURSE",
      drop: (item: DragItem) => {
        if (item.fromSchedule) {
          onDropCourse(item.id);
        }
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
      }),
    })
  );

  const [showAllCourses, setShowAllCourses] = useState(false);

  const displayedCourses = showAllCourses ? courses : courses.slice(0, 15);

  return (
    <div
      ref={drop}
      className={`bg-white border border-gray-200 p-4 mb-5 rounded-md shadow-sm
        ${isOver ? "border-blue-300 bg-blue-50" : ""} transition-colors duration-200`}
    >
      <h3 className="text-base font-semibold mb-3 flex items-center text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
        </svg>
        Courses à affecter ({courses.length})
      </h3>

      <div className="flex flex-wrap gap-2">
        {displayedCourses.map((course) => (
          <UnassignedCourseCard key={course.id} course={course} />
        ))}

        {courses.length === 0 && (
          <div className="text-sm text-gray-500 italic py-2">
            Toutes les courses ont été affectées
          </div>
        )}
      </div>

      {/* Bouton "Voir tout" si plus de 15 courses non affectées */}
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

export default React.memo(UnassignedArea);