import { Task } from '../../domain/entities/Task.js';
import { UseCaseInterface } from '../../interfaces/UseCaseInterface.js';
import { TasksRepositoryInterface } from '../repositories/TasksRepositoryInterface.js';

export class GetAllTasksUseCase implements UseCaseInterface<void, Promise<ReadonlyArray<Task>>> {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  execute(): Promise<ReadonlyArray<Task>> {
    return this.tasksRepository.getAll();
  }
}
