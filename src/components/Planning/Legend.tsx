import React from 'react';
import { LegendProps } from './types';

const Legend: React.FC<LegendProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-gray-700">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span className={`w-5 h-5 rounded-full ${item.color} inline-block mr-2`}></span>
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;