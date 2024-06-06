import { Db } from 'mongodb';
import { ChannelsRepository } from './channels.js';
import { Channel } from '../../models/channels.models.js';

async function getChannels(db: Db): Promise<Channel[]> {
    return db.collection<Channel>('channels').find().toArray();
}

async function insertChannel(db: Db, channel: Channel): Promise<boolean> {
    return db
        .collection<Channel>('channels')
        .insertOne(channel)
        .then((result) => {
            return result.acknowledged;
        });
}

export async function getChannelsRepo(db: Db): Promise<ChannelsRepository> {
    return {
        get: () => getChannels(db),
        insert: (channel: Channel) => insertChannel(db, channel),
    };
}
