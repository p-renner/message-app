import cors from 'cors';
import channelRouter from './routes/channel.routes.js';
import expressWs from 'express-ws';
import express from 'express';
import { websocketHandler } from './controllers/ws.controllers.js';

const wsInstance = expressWs(express());
const app = wsInstance.app;
const port = 8000;

app.use(cors());
app.use('/api/channels', channelRouter);
app.ws('/ws/:channel', (ws, req) => websocketHandler(ws, req));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
