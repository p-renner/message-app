import { Channel } from '../../models/channels.models.js';
import { Message } from '../../models/messages.models.js';
import { MessagesRepository } from './messages.js';
import { Db } from 'mongodb';

type MessageDocument = { _id: string; userId: string; message: string; timestamp: string; channelName: string };

async function get(db: Db, channel: Channel): Promise<Message[]> {
    return db
        .collection<MessageDocument>('messages')
        .find({ channelName: channel.name })
        .toArray()
        .then((docs) =>
            docs.map(
                (doc) =>
                    ({
                        id: doc._id,
                        userId: doc.userId,
                        message: doc.message,
                        timestamp: doc.timestamp,
                        channelName: doc.channelName,
                    }) as Message,
            ),
        )
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
        .then((result) => result.insertedId.toString());

    return { id: result };
}

export async function getMessagesRepo(db: Db): Promise<MessagesRepository> {
    return {
        get: (channel: Channel) => get(db, channel),
        insert: (message: Message) => insert(db, message),
    };
}
