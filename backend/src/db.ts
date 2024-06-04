import * as dotenv from 'dotenv';
import { Db } from 'mongodb';
import { Database } from 'sqlite';
import { default as initMongoDb } from './mongodb.js';
import { IChannelsRepository } from './repositories/channels/IChannelsRepository.js';
import { ChannelsMongoDbRepository } from './repositories/channels/channelsMongoDb.js';
import { IMessagesRepository } from './repositories/messages/IMessagesRepository.js';
import { MessagesMongoDbRepository } from './repositories/messages/messagesMongoDb.js';
import { MessagesSqliteRepository } from './repositories/messages/messagesSqlite.js';
import initDb from './sqlite.js';

dotenv.config();
const dbType = process.env.DB_TYPE;
let db: Db | Database;

if (dbType === 'mongodb') {
    db = await initMongoDb();
} else {
    db = await initDb();
}

export let messagesRepo: IMessagesRepository;
export let channelRepo: IChannelsRepository;

if (dbType === 'mongodb') {
    messagesRepo = new MessagesMongoDbRepository(db as Db);
    channelRepo = new ChannelsMongoDbRepository(db as Db);
} else {
    messagesRepo = new MessagesSqliteRepository(db as Database);
    throw new Error('Channels repository not implemented for SQLite');
}
