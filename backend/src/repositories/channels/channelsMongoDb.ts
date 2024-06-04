import { Channel } from '../../models/channels.models.js';
import { IChannelsRepository } from './IChannelsRepository.js';
import { Db } from 'mongodb';

export class ChannelsMongoDbRepository implements IChannelsRepository {
    constructor(private db: Db) {}

    async getChannels(): Promise<Channel[]> {
        return this.db.collection<Channel>('channels').find().toArray();
    }

    async insertChannel(channel: Channel): Promise<boolean> {
        return this.db
            .collection<Channel>('channels')
            .insertOne(channel)
            .then((result) => {
                return result.acknowledged;
            });
    }
}
