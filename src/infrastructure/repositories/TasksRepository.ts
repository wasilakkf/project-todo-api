import { AddTaskDto } from '../../application/dtos/AddTaskDto.js';
import { TasksRepositoryInterface } from '../../application/repositories/TasksRepositoryInterface.js';
import { Task } from '../../domain/entities/Task.js';
import { MySQL } from '../db/MySQL.js';
import { isoDateToDatetime } from '../../utils/date.js';
import { DeleteTaskDto } from '../../application/dtos/DeleteTaskDto.js';

export class TasksRepository implements TasksRepositoryInterface {
  private mysql: MySQL;

  constructor() {
    this.mysql = MySQL.getInstance();
  }

  async addTask({ title, description, dueDate, priority }: AddTaskDto) {
    await this.mysql.queryResult(
      `INSERT INTO task (title, description, due_date, priority) VALUES (?, ?, ?, ?)`,
      [title, description, dueDate && isoDateToDatetime(dueDate), priority]
    );
  }

  async deleteTask({ taskId }: DeleteTaskDto) {
    await this.mysql.queryResult('DELETE FROM task WHERE task_id = ?', [taskId]);
  }

  getAll() {
    return this.mysql.queryRows<Task>(`
      SELECT 
        task_id AS id,
        title,
        description,
        completed,
        priority,
        due_date AS dueDate,
        project_id AS projectId,
        created_at AS createdAt
      FROM task;`);
  }
}
