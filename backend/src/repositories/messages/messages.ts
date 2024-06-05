import { getMessagesRepo as getMongoDbRepo } from './messagesMongoDb.js';
import { getMessagesRepo as getSqliteRepo } from './messagesSqlite.js';
import { Channel } from '../../models/channels.models.js';
import { db } from '../../db.js';
import { Database } from 'sqlite';

export type MessagesRepository = {
    get: (channel: Channel) => Promise<SharedTypes.Message[]>;
    insert: (message: SharedTypes.Message) => Promise<{ id: string | undefined }>;
};

export function getMessagesRepo(): MessagesRepository {
    if (db instanceof Database) {
        return getSqliteRepo(db);
    }
    return getMongoDbRepo(db);
}
