import { useState, useEffect, useCallback } from 'react';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../models/Task';
import { ITaskStorageService } from '../services/interfaces/ITaskStorageService';
import ServiceContainer from '../services/ServiceContainer';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refreshTasks: () => Promise<void>;
  createTask: (request: CreateTaskRequest) => Promise<void>;
  updateTask: (request: UpdateTaskRequest) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const taskService: ITaskStorageService = ServiceContainer.getInstance().getTaskStorageService();

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allTasks = await taskService.getAllTasks();
      // Sort tasks by creation date (newest first)
      const sortedTasks = allTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setTasks(sortedTasks);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error refreshing tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [taskService]);

  const createTask = useCallback(async (request: CreateTaskRequest) => {
    try {
      setError(null);
      await taskService.createTask(request);
      await refreshTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  }, [taskService, refreshTasks]);

  const updateTask = useCallback(async (request: UpdateTaskRequest) => {
    try {
      setError(null);
      await taskService.updateTask(request);
      await refreshTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  }, [taskService, refreshTasks]);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      await refreshTasks();
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  }, [taskService, refreshTasks]);

  const toggleTaskCompletion = useCallback(async (id: string) => {
    try {
      setError(null);
      const task = tasks.find(t => t.id === id);
      if (task) {
        await taskService.updateTask({
          id,
          isCompleted: !task.isCompleted
        });
        await refreshTasks();
      }
    } catch (err) {
      setError('Failed to toggle task completion');
      console.error('Error toggling task completion:', err);
    }
  }, [taskService, refreshTasks, tasks]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  return {
    tasks,
    loading,
    error,
    refreshTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  };
}; 