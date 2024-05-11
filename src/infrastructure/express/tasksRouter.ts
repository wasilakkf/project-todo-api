import { Router } from 'express';

import { GetAllTasksController } from '../../adapters/GetAllTasksController.js';
import { AddTaskController } from '../../adapters/AddTaskController.js';
import { TasksRepository } from '../repositories/TasksRepository.js';
import { makeExpressHandler } from './makeExpressHandler.js';

const tasksRouter = Router();

const tasksRepository = new TasksRepository();
const getAllTasksController = new GetAllTasksController(tasksRepository);
const addTaskController = new AddTaskController(tasksRepository);

tasksRouter.get('/tasks', makeExpressHandler(getAllTasksController));
tasksRouter.post('/task', makeExpressHandler(addTaskController));

export { tasksRouter };
