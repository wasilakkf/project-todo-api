import { Router, Request, Response } from 'express';

import { GetAllTasksController } from '../../adapters/GetAllTasksController.js';
import { AddTaskController } from '../../adapters/AddTaskController.js';
import { DeleteTaskController } from '../../adapters/DeleteTaskController.js';
import { GetTaskController } from '../../adapters/GetTaskController.js';
import { UpdateTaskController } from '../../adapters/UpdateTaskController.js';
import { TasksRepository } from '../repositories/TasksRepository.js';
import { makeExpressHandler } from './makeExpressHandler.js';

const tasksRouter = Router();

const tasksRepository = new TasksRepository();
const getAllTasksController = new GetAllTasksController(tasksRepository);
const getTaskController = new GetTaskController(tasksRepository);
const addTaskController = new AddTaskController(tasksRepository);
const deleteTaskController = new DeleteTaskController(tasksRepository);
const updateTaskController = new UpdateTaskController(tasksRepository);

tasksRouter.get('/tasks', makeExpressHandler(getAllTasksController));
tasksRouter.get('/tasks/:taskId', makeExpressHandler(getTaskController));
tasksRouter.post('/tasks', makeExpressHandler(addTaskController));
tasksRouter.delete('/tasks/:taskId', makeExpressHandler(deleteTaskController));
tasksRouter.put('/tasks/:taskId', makeExpressHandler(updateTaskController));

tasksRouter.all('/tasks/*', (requst: Request, response: Response) => {
  response.status(405).end();
});

export { tasksRouter };
