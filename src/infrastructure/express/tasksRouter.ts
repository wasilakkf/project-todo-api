import { Router } from 'express';

import { GetAllTasksController } from '../../adapters/GetAllTasksController.js';
import { TasksRepository } from '../repositories/TasksRepository.js';
import { makeExpressHandler } from './makeExpressHandler.js';

const tasksRouter = Router();

const tasksRepository = new TasksRepository();
const getAllTasksController = new GetAllTasksController(tasksRepository);

tasksRouter.get('/', makeExpressHandler(getAllTasksController));

export { tasksRouter };
