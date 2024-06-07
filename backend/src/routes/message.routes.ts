import express from 'express';
import MessageController from '../controllers/message.controllers.js';
import { validateChannel } from '../middleware/messagesMiddleware.js';

const router = express.Router();

router.get('/:channel', validateChannel, MessageController.get);

export default router;
