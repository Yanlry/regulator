import { useState, useCallback, useEffect } from 'react';
import { DropPreviewData } from '../types';

export const useDragPreview = () => {
  const [dragPreview, setDragPreview] = useState<DropPreviewData | null>(null);
  
  const [hoveredTimeInfo, setHoveredTimeInfo] = useState<{
    hour: number;
    minute: number;
  } | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragPreview && dragPreview.isVisible) {
        setDragPreview({
          ...dragPreview,
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [dragPreview]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const resetDragPreview = useCallback(() => {
    setDragPreview(null);
  }, []);

  return {
    dragPreview,
    setDragPreview,
    resetDragPreview,
    hoveredTimeInfo,
    setHoveredTimeInfo
  };
};