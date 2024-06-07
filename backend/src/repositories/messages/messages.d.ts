import { Channel } from '../../models/channels.models.js';
import { Message } from '../../models/messages.models.js';

export type MessagesRepository = {
    get: (channel: Channel) => Promise<Message[]>;
    insert: (message: Message) => Promise<{ id: string | undefined }>;
};
