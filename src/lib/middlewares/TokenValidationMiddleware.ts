import { Request, Response, NextFunction } from 'express';

import { verifyTokenValidation } from '../utils/token';
import AccessTokenMissingError from '../errors/AccessTokenMissingError';
import AccessUnauthorizedError from '../errors/AccessUnauthorizedError';

function TokenValidationMiddleware() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authorization = req.headers.authorization;
        const token = authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1];

        if (!token) {
            next(new AccessTokenMissingError());
            return;
        }
        try {
            const { email } = verifyTokenValidation(token);
            req.email = email;
        } catch (error) {
            next(new AccessUnauthorizedError());
            return;
        }
        next();
    };
}

export default TokenValidationMiddleware;
