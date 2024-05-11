import express, { Express } from 'express';

import { tasksRouter } from './tasksRouter.js';

export class ExpressServer {
  private app: Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.app.use('/tasks', tasksRouter);
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Express server is listening on port ${port}`);
    });
  }
}
