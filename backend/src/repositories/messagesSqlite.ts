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

        let channelId = await this.db.get('SELECT id FROM channels WHERE name = ?', [message.channel]);

        if (!channelId) {
            let res = await this.db.run('INSERT INTO channels (name) VALUES (?)', [message.channel]);
            channelId = res.lastID;
        }

        if (!channelId.id) {
            throw new Error('Failed to create channel ' + message.channel);
        }

        const result = await this.db.run('INSERT INTO messages (userId, message, timestamp) VALUES (?, ?, ?)', [
            message.userId,
            message.message,
            message.timestamp,
            channelId.id,
        ]);

        return { id: result.lastID };
    }
}
