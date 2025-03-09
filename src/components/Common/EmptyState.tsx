import React from 'react';

/**
 * Props interface for the EmptyState component
 */
interface EmptyStateProps {
  message: string;
  description?: string;
}

/**
 * EmptyState: Reusable component for displaying empty state messages
 * Used when no data is available to display
 * @param props Component input properties
 */
const EmptyState: React.FC<EmptyStateProps> = ({ message, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center" role="status">
      <p className="text-gray-500 font-medium">{message}</p>
      {description && <p className="text-gray-400 mt-2 text-sm">{description}</p>}
    </div>
  );
};

export default EmptyState;