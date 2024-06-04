import { IMessagesRepository } from './IMessagesRepository.js';
import { Db } from 'mongodb';

export class MessagesMongoDbRepository implements IMessagesRepository {
    constructor(private db: Db) {}

    async getMessages(channel: string): Promise<SharedTypes.Message[]> {
        return this.db
            .collection<SharedTypes.Message>('messages')
            .find({ channelName: channel })
            .toArray()
            .catch(() => {
                console.error('Error getting messages. Is the database running?');
                return [];
            });
    }

    async insertMessage(message: SharedTypes.Message): Promise<{ id: string | undefined }> {
        if (!message.timestamp) {
            message.timestamp = new Date().toISOString();
        }

        const result = await this.db
            .collection<SharedTypes.Message>('messages')
            .insertOne(message)
            .catch(() => {
                console.error('Error inserting message. Is the database running?');
                return { insertedId: undefined };
            });

        return { id: result.insertedId?.inspect() };
    }
}
