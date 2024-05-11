import { ExpressServer } from './infrastructure/express/ExpressServer.js';

if (process.env.SERVER_PORT) {
  new ExpressServer().listen(Number(process.env.SERVER_PORT));
}
