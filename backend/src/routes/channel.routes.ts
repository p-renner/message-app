import { Router } from 'express';
import { getChannelsController, createChannelController } from '../controllers/channel.controllers.js';

const router = Router();

router.get('/', getChannelsController);

router.post('/', createChannelController);

export default router;
