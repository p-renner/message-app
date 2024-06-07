import { Request, Response, NextFunction } from 'express';
import ws from 'ws';

export const validateChannel = (req: Request, res: Response, next: NextFunction): void => {
    if (!isValidChannel(req.params.channel)) {
        res.status(400).send('Invalid channel');
        return;
    }

    next();
};

export const validateChannelWs = (ws: ws, req: Request, next: NextFunction): void => {
    if (!isValidChannel(req.params.channel)) {
        ws.close();
        return;
    }

    next();
};

function isValidChannel(channel: string | undefined): boolean {
    return !!channel?.match(/^[a-zA-Z0-9_-]+$/);
}
