import { Channel } from '../../models/channels.models.js';
import { Database } from 'sqlite';
import { getChannelsRepo as getMongoDbRepo } from './channelsMongoDb.js';
import { getChannelsRepo as getSqliteRepo } from './channelsSqlite.js';
import { Db } from 'mongodb';

export type ChannelsRepository = {
    get: () => Promise<Channel[]>;
    insert: (channel: Channel) => Promise<boolean>;
    //delete: (channel: string) => Promise<void>;
    //update: (channel: Channel) => Promise<void>;
};

export function getChannelsRepo(db: Database | Db): ChannelsRepository {
    if (db instanceof Database) {
        return getSqliteRepo(db);
    }
    return getMongoDbRepo(db);
}
