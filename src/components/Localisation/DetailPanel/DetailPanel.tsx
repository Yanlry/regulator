import React from "react";
import { useTheme } from '../../../contexts/ThemeContext';
import { DetailPanelProps } from "../data/types";
import AmbulanceDetail from "./AmbulanceDetail";
import DashboardView from "./DashboardView";

/**
 * DetailPanel component for displaying ambulance details or dashboard
 * Supports dynamic theming with light and dark mode
 */
const DetailPanel: React.FC<DetailPanelProps> = ({ 
  selectedAmbulance, 
  stats 
}) => {
  // Use theme context to determine current theme
  const { theme } = useTheme();

  // Generate dynamic classes based on theme
  const panelClasses = `
    w-1/4 
    shadow-md 
    overflow-y-auto
    ${theme === 'dark' 
      ? 'bg-gray-800 text-white border-gray-700' 
      : 'bg-white text-gray-900 border-gray-200'
    }
  `;

  return (
    <div className={panelClasses}>
      {selectedAmbulance ? (
        <AmbulanceDetail 
          ambulance={selectedAmbulance} 
          theme={theme} 
        />
      ) : (
        <DashboardView 
          stats={stats} 
          theme={theme} 
        />
      )}
    </div>
  );
};

export default DetailPanel;