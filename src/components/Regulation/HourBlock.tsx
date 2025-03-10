import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { DropTargetMonitor } from 'react-dnd';
import { HourBlockProps, DragItem, Course, CourseGroup } from '../Regulation/types';
import { groupCloseScheduledCourses } from '../Regulation/utils';
import ScheduledCourseCard from './ScheduledCourseCard';
import GroupedCoursesCard from './GroupedCoursesCard';

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
}) => {
  const [previewTime, setPreviewTime] = useState<Date | null>(null);
  
  const blockRef = useRef<HTMLDivElement | null>(null);

  const hourStartTime = useMemo(() => {
    const time = new Date(date);
    time.setHours(hour, 0, 0, 0);
    return time;
  }, [hour, date]);

  const calculateTimeFromPosition = useCallback(
    (clientY: number): Date => {
      if (!blockRef.current) {
        return new Date(hourStartTime);
      }

      const rect = blockRef.current.getBoundingClientRect();
      const relativeY = clientY - rect.top;
      const percentageY = Math.min(Math.max(relativeY / rect.height, 0), 0.99);

      const minutesInHour = percentageY * 60;

      const roundedMinutes = Math.floor(minutesInHour / 5) * 5;

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
        if (dragItem && dragItem.id) {
          const clientOffset = monitor.getClientOffset();
          if (clientOffset) {
            const hoverTime = calculateTimeFromPosition(clientOffset.y);
            setPreviewTime(hoverTime);

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
    }),
    [
      ambulanceId,
      calculateTimeFromPosition,
      onDropCourse,
      hour,
      onHoverTimeChange,
    ]
  );

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
      onMouseLeave={() => onHoverEnd && onHoverEnd()}
    >
      {/* Indicateur de sélection de temps */}
      {isOver && previewTime && (
        <>
          {/* Ligne pointillée indiquant l'heure exacte */}
          <div
            className="absolute left-0 right-0 border-t border-dashed border-blue-500 z-10"
            style={{
              top: `${(previewTime.getMinutes() / 60) * 100}%`,
            }}
          />
        </>
      )}

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