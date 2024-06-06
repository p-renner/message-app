import { Request, Response } from 'express';
import ChannelModel, { Channel } from '../models/channels.models.js';

const getChannelsController = async (_: Request, res: Response): Promise<void> => {
    await ChannelModel.get()
        .then((channels) => res.status(200).json({ channels }))
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

const createChannelController = async (req: Request, res: Response): Promise<void> => {
    ChannelModel.create(req.body as Channel)
        .then(() => {
            res.status(201).json({
                message: 'Channel created',
            });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

export default {
    get: getChannelsController,
    create: createChannelController,
};
