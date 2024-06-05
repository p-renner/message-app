import db from '../db.js';
import { Channel } from './channels.models.js';

export type Message = SharedTypes.Message;

const get = (channel: Channel): Promise<Message[]> => {
    return db.messages.get(channel);
};

const insert = async (message: Message): Promise<{ id: string | undefined }> => {
    return db.messages.insert(message);
};

export default {
    get,
    insert,
};
