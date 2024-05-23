import { IMessagesRepository } from './IMessagesRepository.js';
import { Database } from 'sqlite';

export class MessagesSqliteRepository implements IMessagesRepository {
    constructor(private db: Database) {}

    async getMessages(): Promise<SharedTypes.Message[]> {
        return this.db.all<SharedTypes.Message[]>(
            'SELECT * FROM (SELECT * FROM messages ORDER BY id DESC LIMIT 50) ORDER BY id ASC',
        );
    }

    async insertMessage(message: SharedTypes.Message): Promise<{ id: number | undefined }> {
        if (!message.userId || !message.message) {
            throw new Error('Invalid message');
        }

        if (!message.timestamp) {
            message.timestamp = new Date().toISOString();
        }

        const result = await this.db.run('INSERT INTO messages (userId, message, timestamp) VALUES (?, ?, ?)', [
            message.userId,
            message.message,
            message.timestamp,
        ]);

        return { id: result.lastID };
    }
}
