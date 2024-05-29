import express, { Router } from 'express';
import { websocketHandler } from '../controllers/ws.controllers.js';
import expressWs from 'express-ws';

export const wsInstance = expressWs(express());

const router = Router();

router.ws('/:channel', websocketHandler);

export default router;
