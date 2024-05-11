import { TasksRepositoryInterface } from '../../application/repositories/TasksRepositoryInterface.js';
import { Task } from '../../domain/entities/Task.js';
import { MySQL } from '../db/MySQL.js';

export class TasksRepository implements TasksRepositoryInterface {
  getAll(): Promise<ReadonlyArray<Task>> {
    const mysql = MySQL.getInstance();

    return mysql.queryRows<Task>('SELECT * FROM task;');
  }
}
