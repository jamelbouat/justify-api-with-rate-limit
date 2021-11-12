import 'dotenv/config';

import { setupDIContainer, container } from '../config/di.config';
import { IController } from './interfaces/controllers';
import App from './app';
import DBClient from '../config/db.config';

setupDIContainer();

// MongoDB database instance for future usage !!
const dbClient: DBClient = container.resolve('dbClient');

// Controllers instances
const justifyController: IController = container.resolve('justifyController');
const tokenController: IController = container.resolve('tokenController');

// Application entry point
const server = new App(dbClient, [
    justifyController,
    tokenController
]);

server.listen();
