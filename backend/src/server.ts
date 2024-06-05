import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
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
app.use('/api/channels', channelRouter);
app.use('/api/messages', messageRouter);
app.ws('/ws/:channel', validateChannelWs, websocketHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
