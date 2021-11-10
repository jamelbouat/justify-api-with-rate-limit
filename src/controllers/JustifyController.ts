import { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { IController } from '../interfaces/controllers';
import { JUSTIFY_URL } from '../config/url.config';
import JustifyService from '../services/JustifyService';

class JustifyController implements IController {
    public router: Router;
    private tokenValidationMiddleware: () => Promise<void>;
    private rateLimitMiddleware: () => Promise<void>;
    private justifyService: JustifyService;

    constructor({ justifyService, tokenValidationMiddleware, rateLimitMiddleware }:
                    {
                        justifyService: JustifyService
                        tokenValidationMiddleware: () => Promise<void>
                        rateLimitMiddleware: () => Promise<void>
                    })
    {
        this.router = Router();
        this.router.use(bodyParser.text());
        this.tokenValidationMiddleware = tokenValidationMiddleware;
        this.rateLimitMiddleware = rateLimitMiddleware;
        this.justifyService = justifyService;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            JUSTIFY_URL,
            this.tokenValidationMiddleware,
            this.rateLimitMiddleware,
            this.justifyText
        );
    }

    private justifyText = (req: Request, res: Response, next: NextFunction): void => {
        const text = req.body;
        const justifiedText = this.justifyService.justifyText(text);
        res.status(200).send(justifiedText);
    }
}

export default JustifyController;
