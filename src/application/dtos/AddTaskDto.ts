import { TaskPriority } from '../../domain/entities/Task.js';

export interface AddTaskDto {
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: TaskPriority | null;
}
