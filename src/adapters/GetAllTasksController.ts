import { ControllerInterface } from '../interfaces/ControllerInterface.js';
import { TasksRepositoryInterface } from '../application/repositories/TasksRepositoryInterface.js';
import { GetAllTasksUseCase } from '../application/use-cases/GetAllTasksUseCase.js';
import { Task } from '../domain/entities/Task.js';

interface GetAllTasksControllerResponse {
  tasks: ReadonlyArray<Task>;
}

export class GetAllTasksController implements ControllerInterface<GetAllTasksControllerResponse> {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  async handle() {
    const getTasksUseCase = new GetAllTasksUseCase(this.tasksRepository);

    const tasks = await getTasksUseCase.execute();

    console.log({ tasks });

    return {
      status: 200,
      body: { tasks },
    };
  }
}