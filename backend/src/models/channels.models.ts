import { channelRepo } from '../db.js';
export interface Channel {
    name: string;
}

export const getChannels = (): Promise<Channel[]> => {
    return channelRepo.getChannels();
};

export const createChannel = async (channel: Channel): Promise<boolean> => {
    return channelRepo.insertChannel(channel);
};
