// src/components/Sidebar/useSidebar.ts
import { useState, useCallback } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);
  
  return {
    isOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar
  };
};