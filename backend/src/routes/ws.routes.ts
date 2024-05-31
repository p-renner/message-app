import { router } from '../server.js';
import { websocketHandler } from '../controllers/ws.controllers.js';

router.ws('/:channel', (ws, req) => websocketHandler(ws, req));

export default router;
