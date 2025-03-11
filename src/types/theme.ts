/**
 * Définit les types pour la gestion du thème dans l'application
 */
export type Theme = 'light' | 'dark';

/**
 * Structure des couleurs pour chaque élément de l'interface
 */
export interface ThemeColors {
  background: string;
  text: string;
  sidebar: {
    background: string;
    hoverBackground: string;
    text: string;
    activeItem: string;
  };
  card: {
    background: string;
    border: string;
  };
  input: {
    background: string;
    text: string;
    placeholder: string;
  };
  button: {
    primary: string;
    hover: string;
  };
}