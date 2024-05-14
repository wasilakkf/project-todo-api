import { Task } from '../../domain/entities/Task.js';
import { AddTaskDto } from '../dtos/AddTaskDto.js';
import { DeleteTaskDto } from '../dtos/DeleteTaskDto.js';

export interface TasksRepositoryInterface {
  addTask(dto: AddTaskDto): Promise<void>;
  deleteTask(dto: DeleteTaskDto): Promise<void>;
  getAll(): Promise<ReadonlyArray<Task>>;
}
