import { Channel } from '../../models/channels.models.js';
import { Message } from '../../models/messages.models.js';
import { MessagesRepository } from './messages.js';
import { Database } from 'sqlite';

type MessageRow = {
    id: number;
    userId: string;
    message: string;
    timestamp: string;
    channelName: string;
};

async function get(db: Database, channel: Channel): Promise<Message[]> {
    return await db
        .all<
            MessageRow[]
        >('SELECT * FROM (SELECT * FROM messages WHERE channelName = ? ORDER BY id DESC LIMIT 50) ORDER BY id ASC', [channel.name])
        .then((rows) =>
            rows.map(
                (row) =>
                    ({
                        id: row.id.toString(),
                        userId: row.userId,
                        message: row.message,
                        timestamp: row.timestamp,
                        channelName: row.channelName,
                    }) as Message,
            ),
        );
}

async function insert(db: Database, message: Message): Promise<{ id: string | undefined }> {
    if (!message.timestamp) {
        message.timestamp = new Date().toISOString();
    }

    const result = await db.run('INSERT INTO messages (userId, message, timestamp, channelName) VALUES (?, ?, ?, ?)', [
        message.userId,
        message.message,
        message.timestamp,
        message.channelName,
    ]);

    return { id: result.lastID?.toString() };
}

export async function getMessagesRepo(db: Database): Promise<MessagesRepository> {
    return {
        get: (channel: Channel) => get(db, channel),
        insert: (message: Message) => insert(db, message),
    };
}
