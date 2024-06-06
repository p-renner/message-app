import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWs from 'express-ws';
import { websocketHandler } from './controllers/ws.controllers.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { logMiddleware } from './middleware/logMiddleware.js';
import { validateChannelWs } from './middleware/messagesMiddleware.js';
import channelRouter from './routes/channel.routes.js';
import messageRouter from './routes/message.routes.js';

const wsInstance = expressWs(express());
const app = wsInstance.app;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', logMiddleware, errorMiddleware);
app.use('/api/channels', channelRouter);
app.use('/api/messages', messageRouter);
app.ws('/ws/:channel', validateChannelWs, websocketHandler);

export default app;
