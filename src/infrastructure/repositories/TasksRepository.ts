import { AddTaskDto } from '../../application/dtos/AddTaskDto.js';
import { TasksRepositoryInterface } from '../../application/repositories/TasksRepositoryInterface.js';
import { Task } from '../../domain/entities/Task.js';
import { MySQL } from '../db/MySQL.js';
import { isoDateToDatetime } from '../../utils/date.js';

export class TasksRepository implements TasksRepositoryInterface {
  async addTask({ title, description, dueDate, priority }: AddTaskDto) {
    const mysql = MySQL.getInstance();

    await mysql.queryResult(
      `INSERT INTO task (title, description, due_date, priority) VALUES (?, ?, ?, ?)`,
      [title, description, dueDate && isoDateToDatetime(dueDate), priority]
    );
  }

  getAll() {
    const mysql = MySQL.getInstance();

    return mysql.queryRows<Task>(`
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
