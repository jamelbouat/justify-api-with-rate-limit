import redis from 'redis';
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

import PaymentRequiredError from '../errors/PaymentRequiredError';
import { Record } from '../interfaces/Record';

const WINDOW_SIZE = 24;
const WINDOW_UNITS = 'hours';
const MAX_WINDOW_WORDS_COUNT = 80000;

const redisClient = redis.createClient({
    port: 6379,
    host: 'redis'
});

if (!redisClient) {
    throw new Error('Redis client does not exist!');
}

function RateLimitMiddleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
        const email = req.email;
        const receivedText = req.body;
        const receivedWordsCount = receivedText.split(' ').length;

        if (receivedWordsCount > MAX_WINDOW_WORDS_COUNT) {
            next(new PaymentRequiredError());
            return;
        }

        try {
            redisClient.get(email, (err, record) => {
                if (err) throw err;

                // First time email connection
                if (record === null) {
                    setCurrentRecord(email, receivedWordsCount);
                    next();
                    return;
                }

                // Retrieve already registered email record
                const oldEmailRecord = JSON.parse(record) as Record;
                const windowStartTimestamp = moment().subtract(WINDOW_SIZE, WINDOW_UNITS).unix();

                // Window time is already elapsed
                if (windowStartTimestamp > oldEmailRecord.timestamp) {
                    setCurrentRecord(email, receivedWordsCount);
                    next();

                // Window time is not yet elapsed
                } else {
                    const newWordsCount = oldEmailRecord.wordsCount + receivedWordsCount;

                    // Number of MAX_WINDOW_WORDS_COUNT is not yet reached
                    if (newWordsCount <= MAX_WINDOW_WORDS_COUNT) {
                        setNewWordsCount(email, newWordsCount, oldEmailRecord);
                        next();

                    // Number of MAX_WINDOW_WORDS_COUNT is already reached
                    } else {
                        next(new PaymentRequiredError());
                    }
                }
            });
        } catch (error) {
            next(error);
        }
    };
}

const setCurrentRecord = (email: string, wordsCount: number) => {
    const newRequestRecord: Record = {
        timestamp: moment().unix(),
        wordsCount: wordsCount
    };
    redisClient.set(email, JSON.stringify(newRequestRecord));
};

const setNewWordsCount = (email: string, wordsCount: number, record: Record) => {
    const newRequestRecord: Record = {
        ...record,
        wordsCount: wordsCount
    };
    redisClient.set(email, JSON.stringify(newRequestRecord));
};

export default RateLimitMiddleware;
