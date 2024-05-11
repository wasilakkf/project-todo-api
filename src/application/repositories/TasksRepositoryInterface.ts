import { Task } from '../../domain/entities/Task.js';
import { AddTaskDto } from '../dtos/AddTaskDto.js';

export interface TasksRepositoryInterface {
  addTask(dto: AddTaskDto): Promise<void>;
  getAll(): Promise<ReadonlyArray<Task>>;
}
