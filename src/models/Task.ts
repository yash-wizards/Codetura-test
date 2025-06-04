export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  id: string;
  isCompleted?: boolean;
  title?: string;
  description?: string;
} 