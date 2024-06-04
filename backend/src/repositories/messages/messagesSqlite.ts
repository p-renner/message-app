import { MessagesRepository } from './messages.js';
import { Database } from 'sqlite';

async function get(db: Database, channel: string): Promise<SharedTypes.Message[]> {
    return db.all<SharedTypes.Message[]>(
        'SELECT * FROM (SELECT * FROM messages WHERE channelName = ? ORDER BY id DESC LIMIT 50) ORDER BY id ASC',
        [channel],
    );
}

async function insert(db: Database, message: SharedTypes.Message): Promise<{ id: string | undefined }> {
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

export function getMessagesRepo(db: Database): MessagesRepository {
    return {
        get: (channel: string) => get(db, channel),
        insert: (message: SharedTypes.Message) => insert(db, message),
    };
}
