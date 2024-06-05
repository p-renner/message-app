import db from '../db.js';

export interface Channel {
    name: string;
}

const getChannels = (): Promise<Channel[]> => {
    return db.channel.get();
};

const createChannel = async (channel: Channel): Promise<boolean> => {
    return db.channel.insert(channel);
};

export default {
    get: getChannels,
    create: createChannel,
};
