import { TasksRepositoryInterface } from '../repositories/TasksRepositoryInterface.js';
import { UseCaseInterface } from '../../interfaces/UseCaseInterface.js';
import { AddTaskDto } from '../dtos/AddTaskDto.js';
import { TaskPriority } from '../../domain/entities/Task.js';

export class AddTaskUseCase implements UseCaseInterface<AddTaskDto, void> {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  async execute(dto: AddTaskDto): Promise<void> {
    return this.tasksRepository.addTask({
      ...dto,
      priority: dto.priority || TaskPriority.NORMAL,
    });
  }
}
