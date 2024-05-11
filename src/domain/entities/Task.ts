export type TaskId = string;

export enum TaskPriority {
  HIGH = 0,
  NORMAL = 1,
  LOW = 2,
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
