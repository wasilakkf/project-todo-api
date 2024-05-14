import { TasksRepositoryInterface } from '../repositories/TasksRepositoryInterface.js';
import { UseCaseInterface } from '../../interfaces/UseCaseInterface.js';
import { GetTaskDto } from '../dtos/GetTaskDto.js';

export class GetTaskUseCase implements UseCaseInterface<GetTaskDto> {
  constructor(private tasksRepository: TasksRepositoryInterface) {}

  execute(dto: GetTaskDto) {
    return this.tasksRepository.getTask(dto);
  }
}
