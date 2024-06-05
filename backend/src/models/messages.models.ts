import db from '../db.js';
import { Channel } from './channels.models.js';

export type Message = SharedTypes.Message;

const getMessages = (channel: Channel): Promise<Message[]> => {
    return db.messages.get(channel);
};

const insertMessage = async (message: Message): Promise<{ id: string | undefined }> => {
    return db.messages.insert(message);
};

export default {
    get: getMessages,
    insert: insertMessage,
};
