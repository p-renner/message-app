import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import { IMessagesRepository } from './repositories/IMessagesRepository.js';
import { MessagesSqliteRepository } from './repositories/messagesSqlite.js';
import sqliteDb from './db.js';

let messagesRepository: IMessagesRepository;
const wsInstance = expressWs(express());
const wss = wsInstance.getWss();
const app = wsInstance.app;
const port: number = 8000;

if (process.env['DB_TYPE'] === 'mongodb') {
    // TODO: Implement MongoDB repository
    console.error('MongoDB not implemented yet');
    process.exit(1);
} else {
    messagesRepository = new MessagesSqliteRepository(sqliteDb);
}

const lastMessages = (await messagesRepository.getMessages()) || [];

app.use(cors());

wss.on('connection', (ws: WebSocket) => {
    ws.send(JSON.stringify(lastMessages));
    return;
});

app.ws('/', (ws) => {
    ws.on('message', async (msg) => {
        let message: SharedTypes.Message;

        try {
            message = JSON.parse(msg.toString());
        } catch (e) {
            console.error('Invalid JSON:', msg, e);
            return;
        }

        const res = await messagesRepository.insertMessage(message);
        if (!res || !res.id) {
            console.error('Error inserting message:', message);
            return;
        }

        message.id = res.id;

        if (lastMessages.length >= 50) {
            lastMessages.shift();
        }
        lastMessages.push(message);

        const stringifiedMessage = JSON.stringify(lastMessages);
        wss.clients.forEach((value) => {
            if (value.readyState === 1) {
                value.send(stringifiedMessage);
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
