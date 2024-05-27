import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import { IMessagesRepository } from './repositories/IMessagesRepository.js';
import { MessagesSqliteRepository } from './repositories/messagesSqlite.js';
import sqliteDb from './db.js';
import { broadcastMessage } from './utils/websocket.js';
import * as ws from 'ws';

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

app.use(cors());

wss.on('connection', async (ws: ws, req: express.Request) => {
    if (!req.params || !req.params.channel) {
        console.error('Invalid channel');
        ws.close();
        return;
    }
    const { channel } = req.params;

    ws.send(JSON.stringify(await messagesRepository.getMessages(channel)));
});

app.ws('/:channel', (ws: ws, req: express.Request) => {
    if (!req.params || !req.params.channel) {
        console.error('Invalid channel');
        ws.close();
        return;
    }
    const { channel } = req.params;

    ws.on('message', async (msg: ws.RawData) => {
        let newMessage: Omit<SharedTypes.Message, 'id'>;
        try {
            let obj: SharedTypes.WSMessage = JSON.parse(msg.toString());
            if (!obj.message || !obj.userId) {
                throw new Error('Invalid message');
            }

            newMessage = { message: obj.message, userId: obj.userId, channelName: channel };
        } catch (e) {
            console.error('Failed to parse message:', e);
            return;
        }

        await messagesRepository.insertMessage(newMessage).catch((e) => {
            console.error('Error inserting message:', e);
            return false;
        });

        broadcastMessage(wss, JSON.stringify(await messagesRepository.getMessages(channel)));
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
