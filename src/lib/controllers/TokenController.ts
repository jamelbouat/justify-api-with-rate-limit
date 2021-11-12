import { NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';

import { TOKEN_URL } from '../../config/url.config';
import { IController } from '../interfaces/controllers';
import AccessForbiddenError from '../errors/AccessForbiddenError';
import TokenService from '../services/TokenService';

class TokenController implements IController {
    public router: Router;
    private tokenService: TokenService;

    constructor({ tokenService }:{ tokenService: TokenService}) {
        this.router = Router();
        this.router.use(bodyParser.json());
        this.tokenService = tokenService;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(TOKEN_URL, this.getToken);
    }

    private getToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const email = req.body.email;
            const newToken = await this.tokenService.getNewToken(email);
            res.status(200).json({ token: newToken });
        } catch(err) {
            next(new AccessForbiddenError());
        }
    }
}

export default TokenController;
