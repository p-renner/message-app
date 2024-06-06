import { Db } from 'mongodb';
import { Database } from 'sqlite';
import { Channel } from '../../models/channels.models.js';
import { Message } from '../../models/messages.models.js';
import { getMessagesRepo as getMongoDbRepo } from './messagesMongoDb.js';
import { getMessagesRepo as getSqliteRepo } from './messagesSqlite.js';

export type MessagesRepository = {
    get: (channel: Channel) => Promise<Message[]>;
    insert: (message: Message) => Promise<{ id: string | undefined }>;
};

export async function getMessagesRepo(db: Database | Db): Promise<MessagesRepository> {
    if (db instanceof Database) {
        return await getSqliteRepo(db);
    }
    return await getMongoDbRepo(db);
}
