import { TasksRepositoryInterface } from '../repositories/TasksRepositoryInterface.js';
import { UseCaseInterface } from '../../interfaces/UseCaseInterface.js';

export class GetTaskUseCase implements UseCaseInterface<string> {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  execute(taskId: string) {
    return this.tasksRepository.getTask(taskId);
  }
}
