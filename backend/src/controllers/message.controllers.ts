import { Request, Response } from 'express';
import MessageModel from '../models/messages.models.js';
import { Channel } from '../models/channels.models.js';

const getMessageController = async (req: Request, res: Response): Promise<void> => {
    await MessageModel.get({ name: req.params.channel! } as Channel)
        .then((messages) => res.status(200).json(messages))
        .catch(() => res.status(500).send('Could not get messages'));
};

export default {
    get: getMessageController,
};
