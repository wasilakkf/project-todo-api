import { TaskPriority } from '../../domain/entities/Task.js';

export interface UpdateTaskDto {
  taskId: string;
  title: string;
  description: string | null;
  completed: boolean | null;
  dueDate: string | null;
  priority: TaskPriority | null;
}
