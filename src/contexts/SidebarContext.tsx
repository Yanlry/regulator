import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Interface pour l'état de la sidebar et fonctions de contrôle
 */
interface SidebarContextType {
  /** État d'ouverture de la sidebar */
  isOpen: boolean;
  /** Fonction pour ouvrir la sidebar manuellement */
  openSidebar: () => void;
  /** Fonction pour fermer la sidebar manuellement */
  closeSidebar: () => void;
  /** Fonction pour basculer l'état de la sidebar */
  toggleSidebar: () => void;
}

/**
 * Contexte pour partager l'état de la sidebar dans l'application
 */
const SidebarContext = createContext<SidebarContextType | null>(null);

/**
 * Hook personnalisé pour accéder à l'état de la sidebar
 * @returns État et contrôles de la sidebar
 */
function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar doit être utilisé dans un SidebarProvider");
  }
  return context;
}

/**
 * Props du composant SidebarProvider
 */
interface SidebarProviderProps {
  /** Composants enfants */
  children: React.ReactNode;
}

/**
 * Fournisseur de contexte pour la sidebar
 * @param props Props du composant
 */
const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);
  
  const contextValue = {
    isOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar
  };
  
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export { useSidebar, SidebarProvider };