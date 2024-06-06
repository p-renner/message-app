import { getRepos } from '../db.js';
import { Channel } from './channels.models.js';

export type Message = SharedTypes.Message;

const get = (channel: Channel): Promise<Message[]> => {
    return getRepos().messages.get(channel);
};

const insert = async (message: Message): Promise<{ id: string | undefined }> => {
    return getRepos().messages.insert(message);
};

export default {
    get,
    insert,
};
