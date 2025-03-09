import React from "react";
import { ActionButtonsProps } from "../data/types";
import { FaPhoneAlt, FaRoute } from "react-icons/fa";

const ActionButtons: React.FC<ActionButtonsProps> = ({ onContact, onAssign }) => {
  const handleContact = () => {
    if (onContact) {
      onContact();
    } else {
      console.log("Contact action");
    }
  };

  const handleAssign = () => {
    if (onAssign) {
      onAssign();
    } else {
      console.log("Assign action");
    }
  };

  return (
    <div className="flex space-x-2 mt-5">
      <button 
        onClick={handleContact}
        className="flex-1 bg-blue-500 text-white rounded py-2 px-3 hover:bg-blue-600 flex items-center justify-center"
      >
        <FaPhoneAlt className="mr-2" /> Contacter
      </button>
      <button 
        onClick={handleAssign}
        className="flex-1 bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600 flex items-center justify-center"
      >
        <FaRoute className="mr-2" /> Assigner
      </button>
    </div>
  );
};

export default ActionButtons;