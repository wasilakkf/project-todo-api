export type TaskId = string;

export enum TaskPriority {
  HIGH = 1,
  NORMAL = 2,
  LOW = 3,
}

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  dueDate?: Date;
  projectId?: number;
  createdAt: string;
}
