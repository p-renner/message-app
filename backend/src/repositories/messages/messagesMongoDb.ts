import { Channel } from '../../models/channels.models.js';
import { Message } from '../../models/messages.models.js';
import { MessagesRepository } from './messages.js';
import { Db } from 'mongodb';

async function get(db: Db, channel: Channel): Promise<Message[]> {
    return db
        .collection<Message>('messages')
        .find({ channelName: channel.name })
        .toArray()
        .catch(() => {
            console.error('Error getting messages. Is the database running?');
            throw new Error('Could not get messages');
        });
}

async function insert(db: Db, message: Message): Promise<{ id: string | undefined }> {
    if (!message.timestamp) {
        message.timestamp = new Date().toISOString();
    }

    const result = await db
        .collection<Message>('messages')
        .insertOne(message)
        .catch(() => {
            console.error('Error inserting message. Is the database running?');
            return { insertedId: undefined };
        });

    return { id: result.insertedId?.inspect() };
}

export function getMessagesRepo(db: Db): MessagesRepository {
    return {
        get: (channel: Channel) => get(db, channel),
        insert: (message: Message) => insert(db, message),
    };
}
