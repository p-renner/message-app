import db from '../db.js';

export interface Channel {
    name: string;
}

const getChannels = async (): Promise<Channel[]> => {
    const channels = await db.channel.get().catch((err) => {
        console.error(err.message);
        return null;
    });

    if (!channels) {
        return [{ name: 'default' }];
    }

    return channels;
};

const createChannel = async (channel: Channel): Promise<void> => {
    const success = await db.channel.insert(channel).catch((err) => {
        console.error(err.message);
        return false;
    });

    if (!success) {
        throw new Error('Could not create channel');
    }
};

export default {
    get: getChannels,
    create: createChannel,
};
