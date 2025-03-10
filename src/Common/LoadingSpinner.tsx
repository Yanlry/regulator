import React from 'react';


const LoadingSpinner: React.FC<{ isOpen?: boolean }> = () => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen" aria-live="polite" aria-busy="true">
      <div 
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        role="status"
        aria-label="Chargement..."
      />
      <span className="sr-only">Chargement...</span>
    </div>
  );
};

export default LoadingSpinner;