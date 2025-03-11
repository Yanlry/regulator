import React from 'react';
import { Timer, ChevronRight } from "lucide-react";

interface ReturnsListProps {
  title: string;
  count: number;
  description: string;
  iconColor: string;
  bgColor: string;
  patients: { name: string; location: string; badgeColor: string; status: string }[];
  theme: string;
}

const ReturnsList: React.FC<ReturnsListProps> = ({ 
  title, 
  count, 
  description, 
  iconColor, 
  bgColor, 
  patients, 
  theme 
}) => {
  
  const containerClasses = `
    rounded-xl shadow-md overflow-hidden
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
  `;

  const headerClasses = `
    p-6 flex items-start justify-between
    ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-100'}
  `;

  const titleClasses = `
    text-sm
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const countClasses = `
    text-3xl font-bold mt-1
    ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}
  `;

  const patientsContainerClasses = `
    max-h-64 overflow-y-auto
    ${theme === 'dark' ? 'divide-y divide-gray-700' : 'divide-y divide-gray-100'}
  `;

  const patientRowClasses = `
    p-4 
    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} 
    transition-colors
  `;

  const patientNameClasses = `
    font-medium
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}
  `;

  const patientLocationClasses = `
    text-sm
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
  `;

  const footerClasses = `
    p-3 
    ${theme === 'dark' ? 'bg-gray-700 border-t border-gray-600' : 'bg-gray-50 border-t border-gray-100'}
  `;

  const footerLinkClasses = `
    text-sm font-medium flex items-center justify-center
    ${theme === 'dark' ? 'text-gray-200 hover:text-gray-100' : iconColor}
  `;

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className={headerClasses}>
        <div>
          <p className={titleClasses}>{title}</p>
          <h3 className={countClasses}>{count}</h3>
          <p className={`${iconColor} text-sm mt-1`}>{description}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Timer size={24} className={iconColor} />
        </div>
      </div>

      {/* Liste des patients */}
      <div className={patientsContainerClasses}>
        {patients.map((patient, index) => (
          <div key={index} className={patientRowClasses}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className={patientNameClasses}>{patient.name}</h4>
                <p className={patientLocationClasses}>{patient.location}</p>
              </div>
              <span className={`${patient.badgeColor} text-xs px-2 py-1 rounded-full font-medium`}>
                {patient.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={footerClasses}>
        <a href="#" className={footerLinkClasses}>
          Voir tous les {title.toLowerCase()}
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default ReturnsList;