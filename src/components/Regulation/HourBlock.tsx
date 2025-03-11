import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { DropTargetMonitor } from 'react-dnd';
import { HourBlockProps, DragItem, Course, CourseGroup } from '../Regulation/types';
import { groupCloseScheduledCourses } from '../Regulation/utils';
import ScheduledCourseCard from './ScheduledCourseCard';
import GroupedCoursesCard from './GroupedCoursesCard';

// Update the HourBlockProps interface in your types.ts file to include these new props
// export interface HourBlockProps {
//   // existing props...
//   onDragStart?: () => void;
//   onDragEnd?: () => void;
// }

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
  onHoverEnd,
  onDragStart,
  onDragEnd,
}) => {
  const [previewTime, setPreviewTime] = useState<Date | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  
  const blockRef = useRef<HTMLDivElement | null>(null);

  // Create the hour start time
  const hourStartTime = useMemo(() => {
    const time = new Date(date);
    time.setHours(hour, 0, 0, 0);
    return time;
  }, [hour, date]);

  // Calculate time from cursor position with enhanced precision
  const calculateTimeFromPosition = useCallback(
    (clientY: number): Date => {
      if (!blockRef.current) {
        return new Date(hourStartTime);
      }

      const rect = blockRef.current.getBoundingClientRect();
      const relativeY = clientY - rect.top;
      const percentageY = Math.min(Math.max(relativeY / rect.height, 0), 0.99);

      const minutesInHour = percentageY * 60;
      
      // Round to nearest 5 minutes for better precision control
      const roundedMinutes = Math.round(minutesInHour / 5) * 5;

      const time = new Date(hourStartTime);
      time.setMinutes(roundedMinutes);

      return time;
    },
    [hourStartTime]
  );

  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(
    () => ({
      accept: "COURSE",
      hover: (dragItem: DragItem, monitor: DropTargetMonitor) => {
        if (!isDraggingOver && monitor.isOver()) {
          setIsDraggingOver(true);
          // Notify parent component that dragging has started
          if (onDragStart) {
            onDragStart();
          }
        }
        
        if (dragItem && dragItem.id) {
          const clientOffset = monitor.getClientOffset();
          if (clientOffset) {
            const hoverTime = calculateTimeFromPosition(clientOffset.y);
            setPreviewTime(hoverTime);

            if (hoverTime) {
              // Send both hour and minute to parent component
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
          
          // Notify parent that drag operation has ended
          if (onDragEnd) {
            onDragEnd();
          }
        }
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [
      ambulanceId,
      calculateTimeFromPosition,
      onDropCourse,
      hour,
      onHoverTimeChange,
      onDragStart,
      onDragEnd,
      isDraggingOver
    ]
  );

  // Reset dragging state when no longer hovering
  useEffect(() => {
    if (!isOver && isDraggingOver) {
      setIsDraggingOver(false);
    }
  }, [isOver, isDraggingOver]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (onHoverEnd) onHoverEnd();
      if (onDragEnd && isDraggingOver) onDragEnd();
    };
  }, [onHoverEnd, onDragEnd, isDraggingOver]);

  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (blockNode) {
      blockRef.current = blockNode;
    }
  }, [blockNode]);

  const handleRefUpdate = useCallback(
    (node: HTMLDivElement | null) => {
      drop(node);
      setBlockNode(node);
    },
    [drop]
  );

  return (
    <div
      ref={handleRefUpdate}
      className={`border-t border-gray-200 relative ${
        isAlternateRow ? "bg-gray-50" : "bg-white"
      } 
        ${isOver ? "bg-blue-50" : ""} transition-colors duration-200`}
      style={{ height: "100px" }}
      onMouseLeave={() => {
        if (onHoverEnd) onHoverEnd();
        // Don't call onDragEnd here as it should only be called when drop occurs
      }}
    >
      {/* Minute markers for better precision - 15, 30, 45 minute intervals */}
      <div className="absolute top-[25px] left-0 right-0 border-t border-dashed border-gray-200 pointer-events-none opacity-30"></div>
      <div className="absolute top-[50px] left-0 right-0 border-t border-dashed border-gray-200 pointer-events-none opacity-50"></div>
      <div className="absolute top-[75px] left-0 right-0 border-t border-dashed border-gray-200 pointer-events-none opacity-30"></div>

      {/* Indicator for exact time during drag operation */}
      {isOver && previewTime && (
        <>
          {/* Line indicating exact minute position */}
          <div
            className="absolute left-0 right-0 border-t-2 border-blue-500 z-10 pointer-events-none"
            style={{
              top: `${(previewTime.getMinutes() / 60) * 100}px`,
            }}
          />
          
          {/* Optional: Small time indicator bubble */}
          <div 
            className="absolute left-0 bg-blue-600 text-white text-xs px-1 py-0.5 rounded z-20 pointer-events-none transform -translate-x-1/2"
            style={{
              top: `${(previewTime.getMinutes() / 60) * 100}px`,
              left: "0px"  // If you want it inside the block
            }}
          >
            {hour}:{previewTime.getMinutes().toString().padStart(2, '0')}
          </div>
        </>
      )}

      {/* Render scheduled courses */}
      {(() => {
        const courseItems = groupCloseScheduledCourses(scheduledCourses, 20);

        return courseItems.map((item) => {
          const isGroup = "courses" in item;

          if (isGroup) {
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

export default React.memo(HourBlock);