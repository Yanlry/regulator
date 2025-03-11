import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSourceMonitor } from 'react-dnd';
import { UnassignedCourseCardProps, DragItem } from '../Regulation/types';
import { formatTime } from '../Regulation/utils';

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
        {course.patientName}
      </div>
      <div className="flex-shrink-0 text-xs text-gray-500 truncate bg-gray-50 px-1.5 py-0.5 rounded-full">
        {course.destinationAddress?.split(' ')[0]}
      </div>
    </div>
  );
};

export default CompactCourseCard;