import { getRepos } from '../db.js';

export interface Channel {
    name: string;
}

const getChannels = async (): Promise<Channel[]> => {
    const channels = await getRepos()
        .channels.get()
        .catch((err) => {
            console.error(err);
            return null;
        });

    if (!channels) {
        return [{ name: 'default' }];
    }

    return channels;
};

const createChannel = async (channel: Channel): Promise<void> => {
    const success = await getRepos()
        .channels.insert(channel)
        .catch((err) => {
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
