import { Request, Response } from 'express';
import { Channel, getChannels, getChannelByName, createChannel } from '../models/channels.models.js';

export const getChannelsController = (_: Request, res: Response): void => {
    const channels: Channel[] = getChannels();
    res.status(200).json({ channels });
};

export const getChannelByNameController = (req: Request, res: Response): void => {
    const name: string = req.params.name!;
    const channel: Channel | undefined = getChannelByName(name);
    if (channel) {
        res.status(200).json({ channel });
    } else {
        res.status(404).json({ message: 'Channel not found' });
    }
};

export const createChannelController = (req: Request, res: Response): void => {
    const channel: Channel = req.body;
    createChannel(channel);
    res.status(201).json({
        message: 'Channel created',
        channel,
    });
};
