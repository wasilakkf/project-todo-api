import { Task } from '../../domain/entities/Task.js';
import { AddTaskDto } from '../dtos/AddTaskDto.js';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto.js';

export interface TasksRepositoryInterface {
  getAll(): Promise<ReadonlyArray<Task>>;
  getTask(taskId: string): Promise<Task | null>;
  addTask(dto: AddTaskDto): Promise<void>;
  updateTask(dto: UpdateTaskDto): Promise<void>;
  deleteTask(taskId: string): Promise<void>;
}
