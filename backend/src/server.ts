import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import { getMessages, insertMessage } from './messages';

const wsInstance = expressWs(express());
const wss = wsInstance.getWss();
const app = wsInstance.app;
const port: number = 8000;

const lastMessages = (await getMessages()) || [];

app.use(cors());

wss.on('connection', (ws: WebSocket) => {
    ws.send(JSON.stringify(lastMessages));
    return;
});

app.ws('/', (ws) => {
    ws.on('message', (msg: string) => {
        let message: SharedTypes.Message;

        try {
            message = JSON.parse(msg);
        } catch (e) {
            console.error('Invalid JSON:', msg, e);
            return;
        }

        insertMessage(message);

        if (lastMessages.length >= 50) {
            lastMessages.shift();
        }
        lastMessages.push(message);

        const stringifiedMessage = JSON.stringify(lastMessages);
        wss.clients.forEach((client: WebSocket) => {
            if (client.readyState === 1) {
                client.send(stringifiedMessage);
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
