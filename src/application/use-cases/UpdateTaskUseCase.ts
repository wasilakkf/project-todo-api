import { TasksRepositoryInterface } from '../repositories/TasksRepositoryInterface.js';
import { UseCaseInterface } from '../../interfaces/UseCaseInterface.js';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto.js';
import { NotFoundError } from '../../domain/errors/NotFoundError.js';

export class UpdateTaskUseCase implements UseCaseInterface<UpdateTaskDto, void> {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  async execute(dto: UpdateTaskDto): Promise<void> {
    const existingTask = await this.tasksRepository.getTask(dto.taskId);

    if (!existingTask) {
      throw new NotFoundError('Task with given taskId does not exists');
    }

    const filteredDto = Object.fromEntries(
      Object.entries(dto).filter((entry) => Boolean(entry[1]))
    ) as NonNullable<UpdateTaskDto>;

    return this.tasksRepository.updateTask({ ...existingTask, ...filteredDto });
  }
}
