import { Request, Response } from 'express';
import ChannelModel, { Channel } from '../models/channels.models.js';

export const getChannelsController = async (_: Request, res: Response): Promise<void> => {
    const channels: Channel[] = await ChannelModel.get().then((channels) =>
        channels.length > 0 ? channels : [{ name: 'default' }],
    );

    res.status(200).json({ channels });
};

export const createChannelController = async (req: Request, res: Response): Promise<void> => {
    const channel: Channel = req.body;
    ChannelModel.create(channel)
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
