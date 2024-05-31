import { Router } from 'express';
import expressWs from 'express-ws';
import {
    getChannelsController,
    createChannelController,
    getChannelByNameController,
} from '../controllers/channel.controllers.js';

const router = Router() as expressWs.Router;

router.get('/', getChannelsController);

router.post('/', createChannelController);

router.get('/:name', getChannelByNameController);

export default router;
