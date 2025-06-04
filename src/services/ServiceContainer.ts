import { ITaskStorageService } from './interfaces/ITaskStorageService';
import { IThemeService } from './interfaces/IThemeService';
import TaskStorageService from './TaskStorageService';
import ThemeService from './ThemeService';

class ServiceContainer {
  private static instance: ServiceContainer;
  private taskStorageService: ITaskStorageService;
  private themeService: IThemeService;

  private constructor() {
    this.taskStorageService = new TaskStorageService();
    this.themeService = new ThemeService();
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  getTaskStorageService(): ITaskStorageService {
    return this.taskStorageService;
  }

  getThemeService(): IThemeService {
    return this.themeService;
  }

  // For testing - allows injection of mock services
  setTaskStorageService(service: ITaskStorageService): void {
    this.taskStorageService = service;
  }

  setThemeService(service: IThemeService): void {
    this.themeService = service;
  }
}

export default ServiceContainer; 