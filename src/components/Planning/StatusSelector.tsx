import React from 'react';
import { StatusSelectorProps } from './types';

const StatusSelector: React.FC<StatusSelectorProps> = ({ options, onSelect }) => {
  return (
    <div className="absolute top-full left-0 z-10 bg-white shadow-lg rounded-md border border-gray-200 p-2 w-40">
      {options.map((option) => (
        <div
          key={option.value}
          className={`p-2 ${option.color} mb-1 rounded cursor-pointer`}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default StatusSelector;