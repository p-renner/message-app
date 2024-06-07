import { Db } from 'mongodb';
import { Database } from 'sqlite';
import { initMongo } from './mongodb.js';
import { initSqlite } from './sqlite.js';
import { MessagesRepository } from './repositories/messages/messages.js';
import type { ChannelsRepository } from './repositories/channels/channels';

export type DbWrapper<T> = {
    connect: () => Promise<T>;
    close: () => Promise<void>;
    getDb: () => T;
    getChannelsRepo: () => Promise<ChannelsRepository>;
    getMessagesRepo: () => Promise<MessagesRepository>;
};

let dbWrapper: DbWrapper<Database> | DbWrapper<Db>;

export async function connect(dbType?: string): Promise<Db | Database> {
    dbWrapper = dbType === 'mongodb' ? initMongo() : initSqlite();
    return dbWrapper.connect();
}

export async function close(): Promise<void> {
    if (dbWrapper) {
        await dbWrapper.close();
    }
}

export function getDb(): Db | Database {
    if (!dbWrapper) {
        throw new Error('Database not connected');
    }

    return dbWrapper.getDb();
}

export async function getChannelsRepo(): Promise<ChannelsRepository> {
    return dbWrapper.getChannelsRepo();
}

export async function getMessagesRepo(): Promise<MessagesRepository> {
    return dbWrapper.getMessagesRepo();
}

export default {
    connect,
    close,
    getDb,
    getChannelsRepo,
    getMessagesRepo,
};
