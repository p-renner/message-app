import { Request, Response } from 'express';
import MessageModel from '../models/messages.models.js';

export const getMessageController = async (req: Request, res: Response): Promise<void> => {
    const channel = { name: req.params.channel! };
    await MessageModel.get(channel)
        .then((messages) => {
            res.status(200).json(messages);
        })
        .catch(() => {
            res.status(500).send('Could not get messages');
        });
};
