import React from 'react';

interface RhScreenProps {
    isOpen: boolean;
}

const RhScreen: React.FC<RhScreenProps> = ({isOpen}) => {
    return (
        <div
        className={`
          transition-all duration-300 
          bg-gray-100 min-h-screen 
          ${isOpen ? "ml-64" : "ml-16"}
        `}
      >
             <h1>Bienvenue sur la page RH</h1>
        </div>
    );
};

export default RhScreen;