import * as awilix from 'awilix';

import DBClient from './db.config';
import TokenController from '../lib/controllers/TokenController';
import JustifyController from '../lib/controllers/JustifyController';
import TokenService from '../lib/services/TokenService';
import TokenValidationMiddleware from '../lib/middlewares/TokenValidationMiddleware';
import JustifyService from '../lib/services/JustifyService';
import RateLimitMiddleware from '../lib/middlewares/RateLimitMiddleware';

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
