import { channelRepo } from '../db.js';
export interface Channel {
    name: string;
}

export const getChannels = (): Promise<Channel[]> => {
    return channelRepo.get();
};

export const createChannel = async (channel: Channel): Promise<boolean> => {
    return channelRepo.insert(channel);
};
