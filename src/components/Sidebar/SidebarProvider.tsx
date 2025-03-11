import React, { useState, useCallback } from 'react';
import { SidebarProviderProps } from './types';
import SidebarContext from './SidebarContext';

/**
 * Provider pour le contexte de la sidebar
 */
export const SidebarProvider: React.FC<SidebarProviderProps> = ({ 
  children, 
  initialOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  
  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);
  
  const value = {
    isOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar
  };
  
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;