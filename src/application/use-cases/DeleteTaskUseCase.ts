import { UseCaseInterface } from '../../interfaces/UseCaseInterface.js';
import { TasksRepositoryInterface } from '../repositories/TasksRepositoryInterface.js';

export class DeleteTaskUseCase implements UseCaseInterface<string> {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  execute(taskId: string) {
    return this.tasksRepository.deleteTask(taskId);
  }
}
