import express, { Application } from 'express';
import cors from 'cors';

import DBClient from '../config/db.config';
import { IController } from './interfaces/controllers';
import Constants from './constants/constants';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

class App {
    private app: Application;
    private dbClient: DBClient;
    private controllers: IController[];

    constructor(dbClient: DBClient, controllers: IController[]) {
        this.app = express();
        this.dbClient = dbClient;
        this.controllers = controllers;

        (async () => await this.makeDatabaseConnection())();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandlers();
    }

    private async makeDatabaseConnection(): Promise<void> {
        await this.dbClient.makeDatabaseConnection();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors());
    }

    private initializeRoutes(): void {
        this.controllers.map(controller => this.app.use('/', controller.router));
    }

    private initializeErrorHandlers(): void {
        this.app.use(errorHandlerMiddleware);
    }

    public listen(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(Constants.SERVER_RUNNING);
        });
    }
}

export default App;
