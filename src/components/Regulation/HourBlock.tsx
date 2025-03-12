import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { DropTargetMonitor } from 'react-dnd';
import { HourBlockProps, DragItem, Course, CourseGroup } from '../Regulation/types';
import { groupCloseScheduledCourses } from '../Regulation/utils';
import ScheduledCourseCard from './ScheduledCourseCard';
import GroupedCoursesCard from './GroupedCoursesCard';
import { useTheme } from '../../contexts/ThemeContext';

// Interface étendue pour inclure le thème
interface ThemeAwareHourBlockProps extends HourBlockProps {
  theme?: 'dark' | 'light';
}

const HourBlock: React.FC<ThemeAwareHourBlockProps> = ({
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
  theme: propTheme,
}) => {
  // Récupérer le thème du contexte si non fourni via props
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;

  const [previewTime, setPreviewTime] = useState<Date | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  
  const blockRef = useRef<HTMLDivElement | null>(null);

  const minuteMarkerCommonClasses = `
    absolute left-0 right-0 border-t border-dashed pointer-events-none
    ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}
  `;

  const previewLineClasses = `
    absolute left-0 right-0 border-t-2 z-10 pointer-events-none
    ${theme === 'dark' ? 'border-blue-400' : 'border-blue-500'}
  `;

  const timeIndicatorClasses = `
    absolute left-0 text-white text-xs px-1 py-0.5 rounded z-20 pointer-events-none transform -translate-x-1/2
    ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'}
  `;

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
  
  // Classes CSS adaptatives selon le thème - défini après l'obtention de isOver
  const blockClasses = `
    border-t relative transition-colors duration-200
    ${theme === 'dark' 
      ? isAlternateRow 
        ? 'bg-gray-700 border-gray-600' 
        : 'bg-gray-800 border-gray-600' 
      : isAlternateRow 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-white border-gray-200'
    }
    ${isOver 
      ? theme === 'dark'
        ? 'bg-blue-900'
        : 'bg-blue-50'
      : ''
    }
  `;

  return (
    <div
      ref={handleRefUpdate}
      className={blockClasses}
      style={{ height: "100px" }}
      onMouseLeave={() => {
        if (onHoverEnd) onHoverEnd();
        // Don't call onDragEnd here as it should only be called when drop occurs
      }}
    >
      {/* Minute markers for better precision - 15, 30, 45 minute intervals */}
      <div className={`${minuteMarkerCommonClasses} top-[25px] opacity-30`}></div>
      <div className={`${minuteMarkerCommonClasses} top-[50px] opacity-50`}></div>
      <div className={`${minuteMarkerCommonClasses} top-[75px] opacity-30`}></div>

      {/* Indicator for exact time during drag operation */}
      {isOver && previewTime && (
        <>
          {/* Line indicating exact minute position */}
          <div
            className={previewLineClasses}
            style={{
              top: `${(previewTime.getMinutes() / 60) * 100}px`,
            }}
          />
          
          {/* Optional: Small time indicator bubble */}
          <div 
            className={timeIndicatorClasses}
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
                  theme={theme}
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
                  theme={theme}
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