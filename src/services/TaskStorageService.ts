import { ITaskStorageService } from './interfaces/ITaskStorageService';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../models/Task';
import { mmkvStorage } from '../state/storage';

class TaskStorageService implements ITaskStorageService {
  private readonly TASKS_KEY = 'tasks';

  async getAllTasks(): Promise<Task[]> {
    try {
      const tasksJson = mmkvStorage.getItem(this.TASKS_KEY);
      if (!tasksJson) {
        return [];
      }
      
      const tasks = JSON.parse(tasksJson);
      // Convert date strings back to Date objects
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  async createTask(request: CreateTaskRequest): Promise<Task> {
    try {
      const tasks = await this.getAllTasks();
      const newTask: Task = {
        id: this.generateId(),
        title: request.title,
        description: request.description,
        isCompleted: false,
        createdAt: new Date()
      };
      
      const updatedTasks = [...tasks, newTask];
      await this.saveTasks(updatedTasks);
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(request: UpdateTaskRequest): Promise<Task> {
    try {
      const tasks = await this.getAllTasks();
      const taskIndex = tasks.findIndex(task => task.id === request.id);
      
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      
      const updatedTask: Task = {
        ...tasks[taskIndex],
        ...request
      };
      
      tasks[taskIndex] = updatedTask;
      await this.saveTasks(tasks);
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const tasks = await this.getAllTasks();
      const filteredTasks = tasks.filter(task => task.id !== id);
      await this.saveTasks(filteredTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async clearAllTasks(): Promise<void> {
    try {
      mmkvStorage.removeItem(this.TASKS_KEY);
    } catch (error) {
      console.error('Error clearing tasks:', error);
      throw error;
    }
  }

  private async saveTasks(tasks: Task[]): Promise<void> {
    try {
      const tasksJson = JSON.stringify(tasks);
      mmkvStorage.setItem(this.TASKS_KEY, tasksJson);
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw error;
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export default TaskStorageService; 