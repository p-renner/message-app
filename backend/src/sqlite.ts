import fs from 'fs';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

const getMessagesTableSchema = () => `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        message TEXT NOT NULL,
        channelName TEXT CONSTRAINT fk_channel_name REFERENCES channels(name),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`;

const getChannelsTableSchema = () => `
    CREATE TABLE IF NOT EXISTS channels (
        name TEXT PRIMARY KEY NOT NULL UNIQUE
    );
`;

async function createTables(db: Database) {
    await Promise.all([db.exec(getChannelsTableSchema()), db.exec(getMessagesTableSchema())]);
    return db;
}

async function initDb(): Promise<Database> {
    if (!fs.existsSync('db')) {
        fs.mkdirSync('db');
    }

    return open({ driver: sqlite3.Database, filename: 'db/chat.db' })
        .then(createTables)
        .catch((e) => {
            console.error('Error initializing database:', e);
            process.exit(1);
        });
}

export default await initDb();
