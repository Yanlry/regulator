import { LucideIcon } from "lucide-react";

// Structure d'un élément de navigation
export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

// Structure d'une section de navigation
export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// Props du composant Sidebar
export interface SidebarProps {
  onOpenChange?: (isOpen: boolean) => void;
  initialOpen?: boolean;
}

// Props du composant SidebarSettings
export interface SidebarSettingsProps {
  isOpen: boolean;
  theme: string;
  hoverMode: boolean;
  toggleTheme: () => void;
  onHoverModeChange: (value: boolean) => void;
  onClose: () => void;
}

// Type pour le contexte de la Sidebar
export interface SidebarContextType {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

// Props du provider
export interface SidebarProviderProps {
  children: React.ReactNode;
  initialOpen?: boolean;
}