import { AddTaskDto } from '../../application/dtos/AddTaskDto.js';
import { TasksRepositoryInterface } from '../../application/repositories/TasksRepositoryInterface.js';
import { Task } from '../../domain/entities/Task.js';
import { MySQL } from '../db/MySQL.js';
import { isoDateToDatetime } from '../../utils/date.js';
import { UpdateTaskDto } from '../../application/dtos/UpdateTaskDto.js';

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

  async deleteTask(taskId: string) {
    await this.mysql.queryResult('DELETE FROM task WHERE task_id = ?', [taskId]);
  }

  async updateTask({
    taskId,
    title,
    description,
    completed,
    priority,
    dueDate,
  }: UpdateTaskDto): Promise<void> {
    await this.mysql.queryResult(
      `
      UPDATE task
      SET
        title = ?,
        description = ?,
        completed = ?,
        priority = ?,
        due_date = ?
      WHERE task_id = ?
    `,
      [title, description, Number(completed), priority, dueDate, taskId]
    );
  }

  async getTask(taskId: string) {
    const tasks = await this.mysql.queryRows<Task>(
      `
      SELECT
        task_id AS id,
        title,
        description,
        completed,
        priority,
        due_date AS dueDate,
        project_id AS projectId,
        created_at AS createdAt
      FROM task WHERE task_id = ?
    `,
      [taskId]
    );

    return tasks[0] ?? null;
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
      FROM task;
    `);
  }
}
