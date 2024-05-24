import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import fs from 'fs';

if (!fs.existsSync('db')) {
    fs.mkdirSync('db');
}

const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        message TEXT NOT NULL,
        channelId INTEGER CONSTRAINT fk_channel_id REFERENCES channels(id),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`;

const createChannelsTable = `
    CREATE TABLE IF NOT EXISTS channels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );
`;

async function initDb(): Promise<Database> {
    try {
        const db = await open({ driver: sqlite3.Database, filename: 'db/chat.db' });
        Promise.all([db.exec(createChannelsTable), db.exec(createMessagesTable)]);

        return db;
    } catch (e) {
        console.error('Error initializing database:', e);
        process.exit(1);
    }
}

const db = await initDb();

export default db;
