export interface Channel {
    name: string;
}

const channels: Array<Channel> = [{ name: 'test' }, { name: 'default' }, { name: 'general' }, { name: 'random' }];

export const getChannels = (): Array<Channel> => {
    return channels;
};

export const getChannelByName = (name: string): Channel | undefined => {
    return channels.find((channel) => channel.name === name.toLowerCase());
};

export const createChannel = (channel: Channel): void => {
    channels.push(channel);
};
