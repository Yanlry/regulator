import { useContext } from 'react';
import SidebarContext from './SidebarContext';
import { SidebarContextType } from './types';

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar doit être utilisé dans un SidebarProvider");
  }
  return context;
};
