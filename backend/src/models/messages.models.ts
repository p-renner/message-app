import { getMessagesRepo } from '../repositories/messages/messages.js';
import { Channel } from './channels.models.js';

const messagesRepo = getMessagesRepo();

export const getMessages = (channel: Channel): Promise<SharedTypes.Message[]> => {
    return messagesRepo.get(channel);
};

export const insertMessage = async (message: SharedTypes.Message): Promise<{ id: string | undefined }> => {
    return messagesRepo.insert(message);
};
