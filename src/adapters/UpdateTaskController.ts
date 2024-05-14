import { TasksRepositoryInterface } from '../application/repositories/TasksRepositoryInterface.js';
import { UpdateTaskUseCase } from '../application/use-cases/UpdateTaskUseCase.js';
import { TaskPriority } from '../domain/entities/Task.js';
import { NotFoundError } from '../domain/errors/NotFoundError.js';
import { ControllerInterface, ControllerRequest } from '../interfaces/ControllerInterface.js';
import { isValidIsoDate } from '../utils/date.js';

interface RequestParams {
  taskId: string;
}

interface RequestBody {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: TaskPriority;
  dueDate?: string;
}

export class UpdateTaskController implements ControllerInterface {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  private hasValidParams(params: Partial<RequestParams>): params is RequestParams {
    return 'taskId' in params && typeof params.taskId === 'string' && !isNaN(Number(params.taskId));
  }

  private isValidRequestBody(body: Partial<RequestBody>): body is RequestBody {
    if (!body.title) {
      return false;
    }

    if ('description' in body && typeof body.description !== 'string') {
      return false;
    }

    if ('completed' in body && typeof body.completed !== 'boolean') {
      return false;
    }

    if ('priority' in body) {
      if (typeof body.priority !== 'number') {
        return false;
      }

      if (!Object.values(TaskPriority).includes(body.priority)) {
        return false;
      }
    }

    if ('dueDate' in body) {
      if (typeof body.dueDate !== 'string') {
        return false;
      }

      if (!isValidIsoDate(body.dueDate)) {
        return false;
      }
    }

    return true;
  }

  async handle(request: ControllerRequest) {
    const { params, body } = request;

    if (!this.hasValidParams(params)) {
      return { status: 400, body: {} };
    }

    if (!this.isValidRequestBody(body)) {
      return { status: 400, body: {} };
    }

    const updateTaskUseCase = new UpdateTaskUseCase(this.tasksRepository);

    try {
      await updateTaskUseCase.execute({
        taskId: params.taskId,
        title: body.title,
        description: body.description ?? null,
        completed: body.completed ?? null,
        dueDate: body.dueDate ?? null,
        priority: body.priority ?? null,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return { status: 404, body: {} };
      }

      console.log(error);

      return { status: 500, body: {} };
    }

    return { status: 200, body: {} };
  }
}
