import db from '../db.js';
import { Channel } from './channels.models.js';

export const getMessages = (channel: Channel): Promise<SharedTypes.Message[]> => {
    return db.messages.get(channel);
};

export const insertMessage = async (message: SharedTypes.Message): Promise<{ id: string | undefined }> => {
    return db.messages.insert(message);
};
