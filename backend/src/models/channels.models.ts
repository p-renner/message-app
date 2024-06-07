import { getRepos } from '../db.js';

export interface Channel {
    name: string;
}

const getChannels = async (): Promise<Channel[]> => {
    const channels = await getRepos().then((repos) => repos.channels);
    const res = await channels.get();

    if (!res) {
        return [{ name: 'default' }];
    }

    return res;
};

const createChannel = async (channel: Channel): Promise<void> => {
    const channels = await getRepos().then((repos) => repos.channels);
    const success = await channels.insert(channel).catch((err) => {
        console.error('Error inserting channel:', err.message);
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
