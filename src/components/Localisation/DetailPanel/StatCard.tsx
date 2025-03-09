import React from "react";
import { StatCardProps } from "../data/types";

const StatCard: React.FC<StatCardProps> = ({ value, color, label }) => {
  const bgColor = `bg-${color}-100`;
  const textColor = `text-${color}-700`;

  return (
    <div className={`${bgColor} rounded-md p-3`}>
      <div className="text-sm text-center">
        <span className="block text-2xl font-bold">{value}</span>
        <span className={textColor}>{label}</span>
      </div>
    </div>
  );
};

export default StatCard;