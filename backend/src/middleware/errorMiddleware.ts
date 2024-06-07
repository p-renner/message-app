import { Request, Response } from 'express';

export function errorMiddleware(err: Error, _: Request, res: Response, next: () => void) {
    console.error(err);
    res.status(500).send('Something went wrong');
    next();
}
