import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { ControlButtonProps } from "../data/types";

const ControlButton: React.FC<ControlButtonProps> = ({ 
  showDetails, 
  setShowDetails 
}) => {
  return (
    <button
      className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 fixed z-[9999]"
      style={{ bottom: '1rem', right: '1rem' }}
      onClick={() => setShowDetails(!showDetails)}
    >
      <FaChevronCircleRight size={20} />

    </button>
  );
};

export default ControlButton;