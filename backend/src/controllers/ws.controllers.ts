import express from 'express';
import * as ws from 'ws';
import { getMessages, isValidChannel, processData } from '../utils/websocket.js';
import expressWs from 'express-ws';

export const websocketHandler = async (ws: ws, req: express.Request) => {
    if (!isValidChannel(ws, req)) {
        return;
    }

    ws.send(await getMessages(req.params.channel!));

    ws.on('message', (ws: expressWs.Instance, msg: ws.RawData) => {
        processData(msg, req.params.channel!, ws.getWss()).catch((e: Error) => {
            console.error('Could not process message:\n', e);
        });
    });
};
