import HttpError from './commons/HttpError';

class AccessTokenMissingError extends HttpError {
    constructor() {
        super('Token is missing');
        this.status = 403;
    }
}

export default AccessTokenMissingError;
