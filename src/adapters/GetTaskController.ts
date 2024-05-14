import { TasksRepositoryInterface } from '../application/repositories/TasksRepositoryInterface.js';
import { GetTaskUseCase } from '../application/use-cases/GetTaskUseCase.js';
import { ControllerInterface, ControllerRequest } from '../interfaces/ControllerInterface.js';

interface RequestParams {
  taskId: string;
}

export class GetTaskController implements ControllerInterface {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  private hasValidParams(params: Partial<RequestParams>): params is RequestParams {
    return 'taskId' in params && typeof params.taskId === 'string' && !isNaN(Number(params.taskId));
  }

  async handle(request: ControllerRequest) {
    const { params } = request;

    if (!this.hasValidParams(params)) {
      return { status: 400, body: {} };
    }

    const getTaskUseCase = new GetTaskUseCase(this.tasksRepository);

    const task = await getTaskUseCase.execute({ taskId: params.taskId });

    if (!task) {
      return { status: 404, body: {} };
    }

    return { status: 200, body: { task } };
  }
}
