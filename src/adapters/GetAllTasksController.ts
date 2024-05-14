import { ControllerInterface } from '../interfaces/ControllerInterface.js';
import { TasksRepositoryInterface } from '../application/repositories/TasksRepositoryInterface.js';
import { GetAllTasksUseCase } from '../application/use-cases/GetAllTasksUseCase.js';

export class GetAllTasksController implements ControllerInterface {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  async handle() {
    const getTasksUseCase = new GetAllTasksUseCase(this.tasksRepository);

    const tasks = await getTasksUseCase.execute();

    return {
      status: 200,
      body: { tasks },
    };
  }
}
