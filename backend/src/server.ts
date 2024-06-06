import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import expressWs from 'express-ws';
import { websocketHandler } from './controllers/ws.controllers.js';
import { validateChannelWs } from './middleware/messagesMiddleware.js';
import channelRouter from './routes/channel.routes.js';
import messageRouter from './routes/message.routes.js';

const wsInstance = expressWs(express());
const app = wsInstance.app;
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', logMiddleware, errorMiddleware);
app.use('/api/channels', channelRouter);
app.use('/api/messages', messageRouter);
app.ws('/ws/:channel', validateChannelWs, websocketHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function logMiddleware(req: Request, _: Response, next: () => void) {
    console.log('Request received', req.method, req.url);
    next();
}

function errorMiddleware(err: Error, _: Request, res: Response, next: () => void) {
    console.error(err);
    res.status(500).send('Something went wrong');
    next();
}
