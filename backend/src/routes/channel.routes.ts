import { Router } from 'express';
import ChannelController from '../controllers/channel.controllers.js';

const router = Router();

router.get('/', ChannelController.get);
router.post('/', ChannelController.create);

export default router;
