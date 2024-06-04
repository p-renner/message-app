import { Channel } from '../../models/channels.models.js';

export abstract class IChannelsRepository {
    abstract getChannels(): Promise<Channel[]>;
    abstract insertChannel(channel: Channel): Promise<boolean>;
    //abstract deleteChannel(channel: string): Promise<void>;
    //abstract updateChannel(channel: Channel): Promise<void>;
}
