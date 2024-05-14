import { UseCaseInterface } from '../../interfaces/UseCaseInterface.js';
import { DeleteTaskDto } from '../dtos/DeleteTaskDto.js';
import { TasksRepositoryInterface } from '../repositories/TasksRepositoryInterface.js';

export class DeleteTaskUseCase implements UseCaseInterface<DeleteTaskDto> {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  execute(dto: DeleteTaskDto) {
    return this.tasksRepository.deleteTask(dto);
  }
}
