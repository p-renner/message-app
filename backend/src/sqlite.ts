import fs from 'fs';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

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

let db: Database | null;

async function connect(): Promise<Database> {
    const { DB_PATH } = process.env;

    if (!DB_PATH) {
        throw new Error('DB_PATH environment variables must be set');
    }

    const path = DB_PATH.split('/').slice(0, -1).join('/');
    if (!fs.existsSync(path) && DB_PATH !== ':memory:') {
        fs.mkdirSync(path);
    }

    db = await open({ driver: sqlite3.Database, filename: `${DB_PATH}` })
        .then(createTables)
        .catch((e) => {
            console.error('Error initializing database:', e);
            process.exit(1);
        });
    return db;
}

async function close() {
    await db?.close();
    db = null;
}

export { connect, close };
