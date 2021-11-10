import HttpError from './commons/HttpError';

class PaymentRequiredError extends HttpError {
    constructor() {
        super('Payment required');
        this.status = 402;
    }
}

export default PaymentRequiredError;
