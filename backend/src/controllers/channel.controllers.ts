import { Request, Response } from 'express';
import { Channel, getChannels, createChannel } from '../models/channels.models.js';

export const getChannelsController = async (_: Request, res: Response): Promise<void> => {
    const channels: Channel[] = await getChannels().then((channels) =>
        channels.length > 0 ? channels : [{ name: 'default' }],
    );

    res.status(200).json({ channels });
};

//export const getChannelByNameController = (req: Request, res: Response): void => {
//    const name: string = req.params.name!;
//    const channel: Channel | undefined = getChannelByName(name);
//    if (channel) {
//        res.status(200).json({ channel });
//    } else {
//        res.status(404).json({ message: 'Channel not found' });
//    }
//};

export const createChannelController = async (req: Request, res: Response): Promise<void> => {
    const channel: Channel = req.body;
    createChannel(channel)
        .then((result) => {
            if (!result) {
                res.status(500).json({ message: 'Error creating channel' });
            } else {
                res.status(201).json({
                    message: 'Channel created',
                    channel,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};
