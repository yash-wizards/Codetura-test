import { Task, CreateTaskRequest, UpdateTaskRequest } from '../../models/Task';

export interface ITaskStorageService {
  getAllTasks(): Promise<Task[]>;
  createTask(request: CreateTaskRequest): Promise<Task>;
  updateTask(request: UpdateTaskRequest): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  clearAllTasks(): Promise<void>;
} 