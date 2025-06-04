import { IThemeService } from './interfaces/IThemeService';
import { ThemeMode, Theme, ThemeColors } from '../models/Theme';
import { mmkvStorage } from '../state/storage';

class ThemeService implements IThemeService {
  private readonly THEME_KEY = 'theme_mode';
  private currentMode: ThemeMode;

  constructor() {
    this.currentMode = this.loadStoredTheme();
  }

  getCurrentTheme(): Theme {
    return {
      mode: this.currentMode,
      colors: this.getColorsForMode(this.currentMode)
    };
  }

  getThemeMode(): ThemeMode {
    return this.currentMode;
  }

  setThemeMode(mode: ThemeMode): void {
    this.currentMode = mode;
    this.saveThemeMode(mode);
  }

  toggleTheme(): void {
    const newMode: ThemeMode = this.currentMode === 'light' ? 'dark' : 'light';
    this.setThemeMode(newMode);
  }

  private loadStoredTheme(): ThemeMode {
    try {
      const stored = mmkvStorage.getItem(this.THEME_KEY);
      return (stored as ThemeMode) || 'light';
    } catch (error) {
      console.error('Error loading theme:', error);
      return 'light';
    }
  }

  private saveThemeMode(mode: ThemeMode): void {
    try {
      mmkvStorage.setItem(this.THEME_KEY, mode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }

  private getColorsForMode(mode: ThemeMode): ThemeColors {
    if (mode === 'dark') {
      return {
        background: '#1a1a1a',
        surface: '#2d2d2d',
        primary: '#6366f1',
        secondary: '#8b5cf6',
        text: '#ffffff',
        textSecondary: '#a1a1aa',
        border: '#404040',
        success: '#10b981',
        error: '#ef4444',
        overlay: 'rgba(0, 0, 0, 0.5)'
      };
    }
    
    return {
      background: '#ffffff',
      surface: '#f8fafc',
      primary: '#4f46e5',
      secondary: '#7c3aed',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#059669',
      error: '#dc2626',
      overlay: 'rgba(0, 0, 0, 0.3)'
    };
  }
}

export default ThemeService; 