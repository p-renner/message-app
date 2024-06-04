import { MessagesRepository } from './messages.js';
import { Db } from 'mongodb';

async function get(db: Db, channel: string): Promise<SharedTypes.Message[]> {
    return db
        .collection<SharedTypes.Message>('messages')
        .find({ channelName: channel })
        .toArray()
        .catch(() => {
            console.error('Error getting messages. Is the database running?');
            return [];
        });
}

async function insert(db: Db, message: SharedTypes.Message): Promise<{ id: string | undefined }> {
    if (!message.timestamp) {
        message.timestamp = new Date().toISOString();
    }

    const result = await db
        .collection<SharedTypes.Message>('messages')
        .insertOne(message)
        .catch(() => {
            console.error('Error inserting message. Is the database running?');
            return { insertedId: undefined };
        });

    return { id: result.insertedId?.inspect() };
}

export function getMessagesRepo(db: Db): MessagesRepository {
    return {
        get: (channel: string) => get(db, channel),
        insert: (message: SharedTypes.Message) => insert(db, message),
    };
}
