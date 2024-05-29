import { Router } from 'express';
import {
    getChannelsController,
    createChannelController,
    getChannelByNameController,
} from '../controllers/channel.controllers.js';

const router = Router();

router.get('/', getChannelsController);

router.post('/', createChannelController);

router.get('/:name', getChannelByNameController);

export default router;
