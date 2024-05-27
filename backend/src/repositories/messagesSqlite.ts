import { IMessagesRepository } from './IMessagesRepository.js';
import { Database } from 'sqlite';

export class MessagesSqliteRepository implements IMessagesRepository {
    constructor(private db: Database) {}

    async getMessages(channel: string): Promise<SharedTypes.Message[]> {
        return this.db.all<SharedTypes.Message[]>(
            'SELECT * FROM (SELECT * FROM messages WHERE channelName = ? ORDER BY id DESC LIMIT 50) ORDER BY id ASC',
            [channel],
        );
    }

    async insertMessage(message: SharedTypes.Message): Promise<{ id: number | undefined }> {
        if (!message.timestamp) {
            message.timestamp = new Date().toISOString();
        }

        const result = await this.db.run(
            'INSERT INTO messages (userId, message, timestamp, channelName) VALUES (?, ?, ?, ?)',
            [message.userId, message.message, message.timestamp, message.channelName],
        );

        return { id: result.lastID };
    }
}
