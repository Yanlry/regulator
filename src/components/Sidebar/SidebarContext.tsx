import { createContext } from 'react';
import { SidebarContextType } from './types';

const SidebarContext = createContext<SidebarContextType | null>(null);

export default SidebarContext;
