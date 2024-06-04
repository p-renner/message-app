import * as dotenv from 'dotenv';
import { Db } from 'mongodb';
import { Database } from 'sqlite';
import { default as initMongoDb } from './mongodb.js';
import { ChannelsRepository, getChannelsRepo } from './repositories/channels/channels.js';
import { MessagesRepository, getMessagesRepo } from './repositories/messages/messages.js';
import { default as initSqliteDb } from './sqlite.js';

dotenv.config();
const dbType = process.env.DB_TYPE;
const db = await initDb(dbType);

export let messagesRepo: MessagesRepository = getMessagesRepo(db);
export let channelRepo: ChannelsRepository = getChannelsRepo(db);

async function initDb(dbType: string | undefined): Promise<Db | Database> {
    if (dbType === 'mongodb') {
        return initMongoDb();
    }

    return initSqliteDb();
}
