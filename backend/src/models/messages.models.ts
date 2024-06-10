import { getMessagesRepo } from '../db.js';
import { Channel } from './channels.models.js';

export type Message = SharedTypes.Message;

const get = async (channel: Channel): Promise<Message[]> => {
    return await getMessagesRepo().then((messages) => messages.get(channel));
};

const insert = async (message: Message): Promise<{ id: string | undefined }> => {
    return await getMessagesRepo().then((messages) => messages.insert(message));
};

export default {
    get,
    insert,
};
