import { Router } from 'express';
import expressWs from 'express-ws';
import { getChannelsController, createChannelController } from '../controllers/channel.controllers.js';

const router = Router() as expressWs.Router;

router.get('/', getChannelsController);

router.post('/', createChannelController);

export default router;
