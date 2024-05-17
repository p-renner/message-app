import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const wsInstance = expressWs(express());
const wss = wsInstance.getWss();
const app = wsInstance.app;
const port: number = 8000;
const db = await open({ driver: sqlite3.Database, filename: 'chat.db' });

type Message = {
    userId: string;
    message: string;
    timestamp?: string;
};

await db
    .run(
        'CREATE TABLE IF NOT EXISTS messages (userId TEXT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)',
    )
    .catch((err) => {
        if (err) {
            console.error(err.message);
            process.exit(1);
        }
    });

const lastMessages =
    (await db.all<Message[]>('SELECT * FROM messages LIMIT 50').catch((err) => {
        if (err) {
            console.error(err.message);
        }
    })) || [];

app.use(cors());

app.ws('/', (ws) => {
    ws.on('message', (msg: string) => {
        if (msg === 'get') {
            ws.send(JSON.stringify(lastMessages));
            return;
        }

        let message: Message;

        try {
            message = JSON.parse(msg);
        } catch (e) {
            console.error('Invalid JSON:', msg, e);
            return;
        }

        if (!message.userId || !message.message) {
            console.error('Invalid message:', message);
            return;
        }

        if (!message.timestamp) {
            message.timestamp = new Date().toISOString();
        }

        db.run('INSERT INTO messages VALUES (?, ?, ?)', [message.userId, message.message, message.timestamp]).catch(
            (err) => {
                if (err) {
                    console.error(err.message);
                }
            },
        );

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
