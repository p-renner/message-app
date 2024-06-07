import { getChannelsRepo } from '../db.js';

export interface Channel {
    name: string;
}

const get = async (): Promise<Channel[]> => {
    return await getChannelsRepo().then((channels) => channels.get() || [{ name: 'default' }]);
};

const create = async (channel: Channel): Promise<boolean> => {
    return await getChannelsRepo().then((channels) => channels.insert(channel));
};

export default {
    get,
    create,
};
