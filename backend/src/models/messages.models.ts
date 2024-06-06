import { getRepos } from '../db.js';
import { Channel } from './channels.models.js';

export type Message = SharedTypes.Message;

const get = async (channel: Channel): Promise<Message[]> => {
    const messages = await getRepos().then((repos) => repos.messages);
    return messages.get(channel);
};

const insert = async (message: Message): Promise<{ id: string | undefined }> => {
    const messages = await getRepos().then((repos) => repos.messages);
    return messages.insert(message);
};

export default {
    get,
    insert,
};
