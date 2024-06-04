import { Database } from 'sqlite';
import { getMessagesRepo as getMongoDbRepo } from './messagesMongoDb.js';
import { getMessagesRepo as getSqliteRepo } from './messagesSqlite.js';
import { Db } from 'mongodb';

export type MessagesRepository = {
    get: (channel: string) => Promise<SharedTypes.Message[]>;
    insert: (message: SharedTypes.Message) => Promise<{ id: string | undefined }>;
};

export function getMessagesRepo(db: Db | Database): MessagesRepository {
    if (db instanceof Database) {
        return getSqliteRepo(db);
    }
    return getMongoDbRepo(db);
}
