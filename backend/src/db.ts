import * as dotenv from 'dotenv';
import { Db } from 'mongodb';
import { Database } from 'sqlite';
import { default as initMongoDb } from './mongodb.js';
import { default as initSqliteDb } from './sqlite.js';
import { getChannelsRepo, ChannelsRepository } from './repositories/channels/channels.js';
import { getMessagesRepo, MessagesRepository } from './repositories/messages/messages.js';

export type DbWrapper = {
    db: Db | Database;
    channel: ChannelsRepository;
    messages: MessagesRepository;
};

dotenv.config();
const db = await wrapDb();

async function initDb(dbType: string | undefined): Promise<Db | Database> {
    if (dbType === 'mongodb') {
        return initMongoDb();
    }
    return initSqliteDb();
}

async function wrapDb(): Promise<DbWrapper> {
    const db = await initDb(process.env.DB_TYPE);
    const channel = getChannelsRepo(db);
    const messages = getMessagesRepo(db);

    return {
        db: db,
        channel: channel,
        messages: messages,
    };
}

export default db;
