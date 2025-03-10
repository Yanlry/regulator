import React from 'react';

interface RecrutementScreenProps {
    isOpen: boolean;
}

const RecrutementScreen: React.FC<RecrutementScreenProps> = ({isOpen}) => {
    return (
        <div
        className={`
          transition-all duration-300 
          bg-gray-100 min-h-screen 
          ${isOpen ? "ml-64" : "ml-16"}
        `}
      >
             <h1>Bienvenue sur la page qui gere le recrutement</h1>
        </div>
    );
};

export default RecrutementScreen;