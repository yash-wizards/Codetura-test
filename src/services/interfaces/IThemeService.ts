import { ThemeMode, Theme } from '../../models/Theme';

export interface IThemeService {
  getCurrentTheme(): Theme;
  getThemeMode(): ThemeMode;
  setThemeMode(mode: ThemeMode): void;
  toggleTheme(): void;
} 