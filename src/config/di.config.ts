import * as awilix from 'awilix';

import DBClient from './db.config';
import TokenController from '../controllers/TokenController';
import JustifyController from '../controllers/JustifyController';
import TokenService from '../services/TokenService';
import TokenValidationMiddleware from '../middlewares/TokenValidationMiddleware';
import JustifyService from '../services/JustifyService';
import RateLimitMiddleware from '../middlewares/RateLimitMiddleware';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const setupDIContainer = (): void => {
    container.register({
        // Controllers
        justifyController: awilix.asClass(JustifyController),
        tokenController: awilix.asClass(TokenController),

        // Database
        dbClient: awilix.asClass(DBClient),

        // Services
        tokenService: awilix.asClass(TokenService),
        justifyService: awilix.asClass(JustifyService),

        // Models

        // Middlewares
        tokenValidationMiddleware: awilix.asFunction(TokenValidationMiddleware),
        rateLimitMiddleware: awilix.asFunction(RateLimitMiddleware)
    });
};

export { container, setupDIContainer };
