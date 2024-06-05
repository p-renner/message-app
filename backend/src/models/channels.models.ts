import db from '../db.js';

export interface Channel {
    name: string;
}

export const getChannels = (): Promise<Channel[]> => {
    return db.channel.get();
};

export const createChannel = async (channel: Channel): Promise<boolean> => {
    return db.channel.insert(channel);
};
