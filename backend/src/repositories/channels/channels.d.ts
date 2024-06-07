import { Channel } from '../../models/channels.models.js';

export type ChannelsRepository = {
    get: () => Promise<Channel[]>;
    insert: (channel: Channel) => Promise<boolean>;
    //delete: (channel: string) => Promise<void>;
    //update: (channel: Channel) => Promise<void>;
};
