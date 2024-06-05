import { getMessagesRepo as getMongoDbRepo } from './messagesMongoDb.js';
import { getMessagesRepo as getSqliteRepo } from './messagesSqlite.js';
import { Channel } from '../../models/channels.models.js';
import { Database } from 'sqlite';
import { Db } from 'mongodb';

export type MessagesRepository = {
    get: (channel: Channel) => Promise<SharedTypes.Message[]>;
    insert: (message: SharedTypes.Message) => Promise<{ id: string | undefined }>;
};

export function getMessagesRepo(db: Database | Db): MessagesRepository {
    if (db instanceof Database) {
        return getSqliteRepo(db);
    }
    return getMongoDbRepo(db);
}
