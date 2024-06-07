import { Request, Response } from 'express';

export function logMiddleware(req: Request, _: Response, next: () => void) {
    console.log('Request received', req.method, req.url);
    next();
}
