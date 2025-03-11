import React, { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  useEffect 
} from 'react';
import { Theme, ThemeColors } from '../types/theme';
import { themeColors } from '../utils/themeColors';

/**
 * Interface définissant le contexte de thème
 */
interface ThemeContextType {
  /** Thème actuel de l'application */
  theme: Theme;
  
  /** Palette de couleurs correspondant au thème actuel */
  colors: ThemeColors;
  
  /** Bascule entre les modes clair et sombre */
  toggleTheme: () => void;
  
  /** Définit un thème spécifique */
  setTheme: (theme: Theme) => void;
}

/**
 * Contexte principal pour la gestion du thème
 */
const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Hook personnalisé pour accéder au contexte de thème
 * @returns Contexte de thème avec ses méthodes
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  }
  return context;
}

/**
 * Propriétés du composant ThemeProvider
 */
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Fournisseur de contexte gérant le thème de l'application
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  /**
   * Initialise le thème en fonction des préférences utilisateur
   */
  const [theme, setThemeState] = useState<Theme>(() => {
    // Vérifier la préférence sauvegardée
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Utiliser la préférence système
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  /**
   * Met à jour le thème dans l'interface et le stockage local
   */
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Mise à jour des classes du document
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${theme}-mode`);

    // Mise à jour de la couleur de thème pour les navigateurs mobiles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#1f2937' : '#f3f4f6'
      );
    }
  }, [theme]);

  /**
   * Bascule entre les modes clair et sombre
   */
  const toggleTheme = useCallback(() => {
    setThemeState((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  /**
   * Définit un thème spécifique
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Récupère les couleurs correspondant au thème actuel
  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};