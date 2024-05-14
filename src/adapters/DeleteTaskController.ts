import { TasksRepositoryInterface } from '../application/repositories/TasksRepositoryInterface.js';
import { DeleteTaskUseCase } from '../application/use-cases/DeleteTaskUseCase.js';
import { ControllerInterface, ControllerRequest } from '../interfaces/ControllerInterface.js';

interface RequestParams {
  taskId: string;
}

export class DeleteTaskController implements ControllerInterface {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  private hasValidParams(params: Partial<RequestParams>): params is RequestParams {
    return 'taskId' in params && typeof params.taskId === 'string' && !isNaN(Number(params.taskId));
  }

  async handle(request: ControllerRequest) {
    const { params } = request;

    if (!this.hasValidParams(params)) {
      return { status: 400, body: {} };
    }

    const deleteTaskUseCase = new DeleteTaskUseCase(this.tasksRepository);

    await deleteTaskUseCase.execute(params.taskId);

    return { status: 200, body: {} };
  }
}
