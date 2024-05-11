import { Task } from '../../domain/entities/Task.js';

export interface TasksRepositoryInterface {
  getAll(): Promise<ReadonlyArray<Task>>;
}
