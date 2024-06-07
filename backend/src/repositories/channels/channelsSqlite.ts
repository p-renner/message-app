import { Channel } from '../../models/channels.models.js';
import { ChannelsRepository } from './channels.js';
import { Database } from 'sqlite';

async function get(db: Database): Promise<Channel[]> {
    return db.all<Channel[]>('SELECT * FROM channels ORDER BY name ASC');
}

async function insert(db: Database, channel: Channel): Promise<boolean> {
    const result = await db.run('INSERT INTO channels (name) VALUES (?)', [channel.name]);
    return result.lastID !== undefined;
}

export async function getChannelsRepo(db: Database): Promise<ChannelsRepository> {
    return {
        get: () => get(db),
        insert: (message: Channel) => insert(db, message),
    };
}
