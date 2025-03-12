import React from 'react';
import { CourseDragPreviewProps } from '../Regulation/types';
import { formatTime } from '../Regulation/utils';

// Interface pour les props du composant avec le thème
interface ThemeAwareCourseDragPreviewProps extends Omit<CourseDragPreviewProps, 'theme'> {
  theme?: 'dark' | 'light';
}

const CourseDragPreview: React.FC<ThemeAwareCourseDragPreviewProps> = ({ preview, theme = 'light' }) => {
  if (!preview || !preview.isVisible || !preview.time) return null;

  // Classes CSS adaptatives selon le thème
  const previewClasses = `
    fixed pointer-events-none px-2 py-1 text-xs rounded shadow-lg z-50 flex items-center
    ${theme === 'dark' 
      ? 'bg-blue-800 text-blue-100' 
      : 'bg-blue-600 text-white'}
  `;

  return (
    <div
      className={previewClasses}
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