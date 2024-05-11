import { Request, Response } from 'express';

import { ControllerInterface } from '../../interfaces/ControllerInterface.js';

export function makeExpressHandler(controller: ControllerInterface) {
  return async (request: Request, response: Response) => {
    const { status, body } = await controller.handle(request);

    response.status(status).send(body);
  };
}
