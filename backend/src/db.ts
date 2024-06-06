import * as dotenv from 'dotenv';
import { Db } from 'mongodb';
import { Database } from 'sqlite';
import { connect as connectMongo, close as closeMongo } from './mongodb.js';
import { connect as connectSqlite, close as closeSqlite } from './sqlite.js';
import { MessagesRepository, getMessagesRepo } from './repositories/messages/messages.js';
import { ChannelsRepository, getChannelsRepo } from './repositories/channels/channels.js';

export type Repo = {
    getMessagesRepo: MessagesRepository;
    getChannelsRepo: ChannelsRepository;
};

dotenv.config();

let db: Db | Database | null = null;

async function connect(dbType: string | undefined): Promise<Db | Database> {
    if (dbType === 'mongodb') {
        db = await connectMongo();
        return db;
    }
    db = await connectSqlite();
    return db;
}

async function close(): Promise<void> {
    if (db instanceof Db) {
        await closeMongo();
    } else {
        await closeSqlite();
    }
}

function getDb(): Db | Database {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

export const getRepos = () => {
    if (!db) {
        throw new Error('Database not connected');
    }

    return {
        messages: getMessagesRepo(db),
        channels: getChannelsRepo(db),
    };
};

export default {
    connect,
    close,
    getDb,
};
