import jwt from 'jsonwebtoken';

const tokenSecret = process.env.TOKEN_SECRET as string;
const expiresIn = 24 * 60 * 60; // 24 hours

const generateNewToken = (email: string): string => {
    return jwt.sign({ email }, tokenSecret, { expiresIn });
};

const verifyTokenValidation = (token: string): { email: string } => {
    return jwt.verify(token, tokenSecret) as { email: string };
};

export {
    generateNewToken,
    verifyTokenValidation
};
