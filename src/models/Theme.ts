export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  overlay: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
} 