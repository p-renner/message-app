import express from 'express';
import { getMessageController } from '../controllers/message.controllers.js';
import { validateChannel } from '../middleware/messagesMiddleware.js';

const router = express.Router();

router.get('/:channel', validateChannel, getMessageController);

export default router;
