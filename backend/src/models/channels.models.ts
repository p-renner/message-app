import { getChannelsRepo } from '../repositories/channels/channels.js';
export interface Channel {
    name: string;
}

const channelRepo = getChannelsRepo();

export const getChannels = (): Promise<Channel[]> => {
    return channelRepo.get();
};

export const createChannel = async (channel: Channel): Promise<boolean> => {
    return channelRepo.insert(channel);
};
