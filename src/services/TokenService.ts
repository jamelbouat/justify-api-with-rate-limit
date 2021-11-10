import { generateNewToken } from '../utils/token';

class TokenService {
    public getNewToken(email: string): string {
        return generateNewToken(email);
    }
}

export default TokenService;
