import cors from 'cors';
import express from 'express';
import expressWs from 'express-ws';
import * as ws from 'ws';
import { getMessages, isValidChannel, processData } from './utils/websocket';

const wsInstance = expressWs(express());
const app = wsInstance.app;
const port: number = 8000;

app.use(cors());

app.ws('/:channel', async (ws: ws, req: express.Request) => {
    if (!isValidChannel(ws, req)) {
        return;
    }

    ws.send(await getMessages(req.params.channel!));

    ws.on('message', (msg: ws.RawData) => {
        processData(msg, req.params.channel!, wsInstance.getWss()).catch((e: Error) => {
            console.error('Could not process message:\n', e);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
