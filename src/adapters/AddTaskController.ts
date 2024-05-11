import { TasksRepositoryInterface } from '../application/repositories/TasksRepositoryInterface.js';
import { AddTaskUseCase } from '../application/use-cases/AddTaskUseCase.js';
import { TaskPriority } from '../domain/entities/Task.js';
import { ControllerInterface, ControllerRequest } from '../interfaces/ControllerInterface.js';
import { isValidIsoDate } from '../utils/date.js';

interface RequestBody {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
}

export class AddTaskController implements ControllerInterface {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  private isValidRequestBody(body: Partial<RequestBody>): body is RequestBody {
    if (!body.title) {
      return false;
    }

    if ('description' in body && typeof body.description !== 'string') {
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
    const { body } = request;

    if (!this.isValidRequestBody(body)) {
      return { status: 400, body: {} };
    }

    const addTaskUseCase = new AddTaskUseCase(this.tasksRepository);

    await addTaskUseCase.execute({
      title: body.title,
      description: body.description ?? null,
      dueDate: body.dueDate ?? null,
      priority: body.priority ?? null,
    });

    return { status: 200, body: {} };
  }
}
