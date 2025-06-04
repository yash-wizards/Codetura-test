import { useState, useCallback, useEffect } from 'react';
import { Theme, ThemeMode } from '../models/Theme';
import { IThemeService } from '../services/interfaces/IThemeService';
import ServiceContainer from '../services/ServiceContainer';

interface UseThemeReturn {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

export const useTheme = (): UseThemeReturn => {
  const themeService: IThemeService = ServiceContainer.getInstance().getThemeService();
  const [theme, setTheme] = useState<Theme>(themeService.getCurrentTheme());

  const toggleTheme = useCallback(() => {
    themeService.toggleTheme();
    setTheme(themeService.getCurrentTheme());
  }, [themeService]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    themeService.setThemeMode(mode);
    setTheme(themeService.getCurrentTheme());
  }, [themeService]);

  const isDarkMode = theme.mode === 'dark';

  // Initialize theme on mount
  useEffect(() => {
    setTheme(themeService.getCurrentTheme());
  }, [themeService]);

  return {
    theme,
    isDarkMode,
    toggleTheme,
    setThemeMode
  };
}; 