import { Task } from '../../domain/entities/Task.js';
import { AddTaskDto } from '../dtos/AddTaskDto.js';
import { DeleteTaskDto } from '../dtos/DeleteTaskDto.js';
import { GetTaskDto } from '../dtos/GetTaskDto.js';

export interface TasksRepositoryInterface {
  getAll(): Promise<ReadonlyArray<Task>>;
  getTask(dto: GetTaskDto): Promise<Task | null>;
  addTask(dto: AddTaskDto): Promise<void>;
  deleteTask(dto: DeleteTaskDto): Promise<void>;
}
