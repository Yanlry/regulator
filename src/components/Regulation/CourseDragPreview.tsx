import React from 'react';
import { CourseDragPreviewProps } from '../Regulation/types';
import { formatTime } from '../Regulation/utils';

const CourseDragPreview: React.FC<CourseDragPreviewProps> = ({ preview }) => {
  if (!preview || !preview.isVisible || !preview.time) return null;

  return (
    <div
      className="fixed pointer-events-none bg-blue-600 text-white px-2 py-1 text-xs rounded shadow-lg z-50 flex items-center"
      style={{ left: preview.x + 15, top: preview.y + 15 }}
    >
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
      {formatTime(preview.time)}
    </div>
  );
};

export default React.memo(CourseDragPreview);